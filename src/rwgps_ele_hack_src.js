// https://www.toptal.com/developers/javascript-minifier/
// minifyしたものをrwgps_ele_hack.jsのfunc_strにコピー

((global) => {
  const TILE_SIZE = 256;
  const TILE_NULL_SYMBOL = "__NOT_EXISTS__"; // タイルファイルが存在しないことを示すシンボル
  const TILE_ORDER = [ // 検索順序とズームレベル
    {tilename: "dem5a_png", zoom: 15},
    {tilename: "dem5b_png", zoom: 15},
    {tilename: "dem5c_png", zoom: 15},
    {tilename: "dem_png", zoom: 14}
  ];
  const GLOBAL_ROOT_VAR = "__330k_ele_gsi"; // 繰り返しOn/Offされた時に進行状況等を保存するためにグローバル変数に格納
  const PROCESSING_POINTS_TOTAL = "processing_points_total";
  const PROCESSING_POINTS_FETCHED = "processing_points_fetched";
  const FETCH_ELEVATIONS_ORG = "fetchElevations_org";
  const INTERVAL_TIMER = "interval_timer";
  
  global[GLOBAL_ROOT_VAR] = global[GLOBAL_ROOT_VAR] || {};
  const root = global[GLOBAL_ROOT_VAR];
  root[PROCESSING_POINTS_TOTAL] = root[PROCESSING_POINTS_TOTAL] || 0;
  root[PROCESSING_POINTS_FETCHED] = root[PROCESSING_POINTS_FETCHED] || 0;
  root[FETCH_ELEVATIONS_ORG] = root[FETCH_ELEVATIONS_ORG] || rwgps.Map.prototype.fetchElevations;
  
  /**
   * L1, L2の2層のキャッシュ
   * @param {string} cache_name          Cache APIで使用する名前(cacheName)
   * @param {function} parser            responseを受け取ってキャッシュに保存する内容を返すコールバック関数(async function可)
   * @param {number} l1_cache_size       L1キャッシュに保持するURL件数
   * @param {number} l2_cache_expiration L2キャッシュの有効期限
   */
  function LayeredCache(cache_name, parser, l1_cache_size = 1000, cache_expiration = 30 * 86400 * 1000){
    const HEADER_EXPIRATION = "_expire_on";
    const l1_cache = new Map();
    let l2_cache = null;
    let prepared = false;
    
    caches.open(cache_name).then((cs) => {
      l2_cache = cs;
      prepared = true;
    });
    
    /**
     * 指定したURLのデータをparser関数で処理した結果を返す。
     * L1にあればL1キャッシュからparserで処理済みの結果を返し、
     * 有効期限内のL2キャッシュ(Cache API)があれば、再度parser関数で処理して返す。
     * @param {string} url
     * @return {Promise}
     */
    this.fetch = async (url) => {
      let data = null;
      let fetch_flag = false;
      let l1_update_flag = false;
      const now = Date.now();
      let expiration = now + cache_expiration;

      if(!prepared){
        // Cache APIの準備ができていなければ例外を投げる
        throw new Exception("Cache API not ready");
      }
      
      if(l1_cache.has(url)){
        // L1キャッシュにヒット
        const v = l1_cache.get(url);

        if(now > v.expire_on){
          // L1キャッシュで期限切れ
          fetch_flag = true;
        }else{
          // L1キャッシュの末尾に移動(LRU)
          l1_cache.delete(url);
          l1_cache.set(url, v);
          data = v.data;
        }

      }else{
        const response = await l2_cache.match(url);
        
        if((response === undefined)
          || response.headers.get(HEADER_EXPIRATION) === null
          || (now > Number.parseInt(response.headers.get(HEADER_EXPIRATION)))){
          // L2キャッシュにない場合、またはL2キャッシュが期限切れの場合
          fetch_flag = true;
        }else{
          data = await parser(response);
          expiration = Number.parseInt(response.headers.get(HEADER_EXPIRATION));
          
          l1_update_flag = true;
        }
      }
      
      if(fetch_flag){
        // 通信して取得する
        const response = await fetch(url);
        
        const copy = response.clone();
        const headers = new Headers(copy.headers);
        headers.append(HEADER_EXPIRATION, expiration);
        
        const body = await copy.blob();
        
        await l2_cache.put(url, new Response(body, {
          status: copy.status,
          statusText: copy.statusText,
          headers: headers
        }));
        
        data = await parser(response);
        l1_update_flag = true;
      }
      
      if(l1_update_flag){
        // L1キャッシュの末尾に保存
        l1_cache.set(url, {
          data: data,
          expire_on: expiration
        });
        if(l1_cache.length > l1_cache_size){
          l1_cache.delete(l1_cache.keys().next().value);
        }
      }
      
      return data;
    };
    
    return this;
  }
  
  const tileparser = (() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    canvas.width = TILE_SIZE;
    canvas.height = TILE_SIZE;
    
    return async (response) => {
      if(response.ok){
        const blob = await response.clone().blob(); // ユーザが連続して操作した場合にresponseが使用済みとなるのを防ぐためcloneして使用する
        
        const image = await new Promise((resolve, reject) => {
          img.src = URL.createObjectURL(blob);
          img.onload = () => { resolve(img); };
        });
        ctx.drawImage(image, 0, 0, TILE_SIZE, TILE_SIZE);
        URL.revokeObjectURL(img.src);
        
        return ctx.getImageData(0, 0, TILE_SIZE, TILE_SIZE).data;
        
      }else{
        return TILE_NULL_SYMBOL;
      }
    };
  })();
  const layeredcache = new LayeredCache("__330k_gsi_ele_tile", tileparser);
  
  /**
   * 指定した緯度経度とズームレベルから、タイル番号とタイル内のx, y座標を返す
   * @param {number} lat 緯度
   * @param {number} lon 経度
   * @return {{tile_x:number,tile_y:number,pixel_x:number,pixel_y:number}}
   */
  function latlon2tile(lat, lon, zoom){
    const x = (lon+180)/360*Math.pow(2,zoom);
    const y = (1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom);
    return {
      "tile_x" : Math.floor(x),
      "tile_y" : Math.floor(y),
      "pixel_x" : (x - Math.floor(x)) * 256,
      "pixel_y" : (y - Math.floor(y)) * 256
    };
  }
  
  /**
   * 指定した緯度経度の標高を基盤地図情報APIから取得する
   * @param {number} lat 緯度
   * @param {number} lon 経度
   * @return {Promise}
   */
  async function getElevationGSI(lat, lon){
    let ele = null;
    for(const tile of TILE_ORDER){
      ele = await _getElevationGSI(lat, lon, tile.tilename, tile.zoom);
      if(ele !== null){
        //if(tile.tilename !== "dem5a_png"){ console.log(tile.tilename); }
        break;
      }
    }
    
    return ele;
  }
  
  /**
   * 指定した緯度経度の標高を基盤地図情報APIから取得(内部関数)
   * @param {number} lat 緯度
   * @param {number} lon 経度
   * @param {String} tilename タイル名
   * @param {number} zoom ズームレベル(タイルにより1-15, 1-14)
   * @return {Promise}
   */
  async function _getElevationGSI(lat, lon, tilename = "dem5a_png", zoom = 15){
    const tileinfo = latlon2tile(lat, lon, zoom);
    const imagedata = await layeredcache.fetch("https://cyberjapandata.gsi.go.jp/xyz/" + tilename + "/" + zoom + "/" + tileinfo.tile_x + "/" + tileinfo.tile_y + ".png");
    
    // 最近傍点の標高を返す
    if(imagedata !== TILE_NULL_SYMBOL){
      const idx = 4 * (Math.floor(tileinfo.pixel_y) * TILE_SIZE + Math.floor(tileinfo.pixel_x));
      const x = 65536 * imagedata[idx] + 256 * imagedata[idx + 1] + imagedata[idx + 2];
      
      if(x < 2 ** 23){
        return x * 0.01;
      }else if(x === 2 ** 23){
        return null;
      }else{
        return (x - 2 ** 24) * 0.01;
      }
    }else{
      return null;
    }
    
  }
  
  async function _fetchElevations(trackPoints, _success) {
    const trkpts = [...trackPoints]; // 処理中に変わることがあるので最初にtrackPointsをコピーしておく
    const fallbackpoints = [];
    root[PROCESSING_POINTS_TOTAL] += trkpts.length;
    
    for(const trkpt of trkpts){
      trkpt.fetchingEle = true;
    }
    
    for(const trkpt of trkpts){
      try{
        trkpt.ele = await getElevationGSI(trkpt.point.lat, trkpt.point.lng);
        if(trkpt.ele === null){
          throw new Error("TILE ELE ERROR");
        }else{
          // 正常に取得
          root[PROCESSING_POINTS_FETCHED]++;
          delete trkpt.fetchingEle;
          delete trkpt.flattened;
        }
      }catch(err){
        // エラー発生時はフォールバック
        fallbackpoints.push(trkpt);
        console.log(err);
      }
    }
    
    // 国土地理院タイルがエラーだった地点(水辺など)は、標準の関数を呼び出す
    if(fallbackpoints.length > 0){
      try{
        fallbackpoints.map((trkpt) => {
          delete trkpt.fetchingEle;
          delete trkpt.flattened;
        });
        await new Promise((resolve) => {
          root[FETCH_ELEVATIONS_ORG](fallbackpoints, resolve);
        });
        console.log(fallbackpoints.map((e)=> e.ele));
      }catch(err){
        console.log("Fallback Error");
        
      }finally{
        // エラーが出ようが取り敢えず処理済みとしてカウントする
        root[PROCESSING_POINTS_FETCHED] += fallbackpoints.length;
      }
    }
    
    root[PROCESSING_POINTS_TOTAL] -= trkpts.length;
    root[PROCESSING_POINTS_FETCHED] -= trkpts.length;
    
    // すべての標高を得られたときに限り、_successを呼ぶ
    if(root[PROCESSING_POINTS_FETCHED] === 0){
      _success();
    }
  }
  
  if(rwgps.Map.prototype.fetchElevations === root[FETCH_ELEVATIONS_ORG]){
    // RWGPSのfetchElevations関数を書き換える
    rwgps.Map.prototype.fetchElevations = _fetchElevations;
    document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor = "pink";
  }else{
    // 元に戻す
    rwgps.Map.prototype.fetchElevations = root[FETCH_ELEVATIONS_ORG];
    document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor = "transparent";
  }
  
  root[INTERVAL_TIMER] = root[INTERVAL_TIMER] || setInterval(() => {
    const ele = document.getElementById("%%TEMPLATE_MESSAGE_ID%%");
    if(root[PROCESSING_POINTS_FETCHED] < root[PROCESSING_POINTS_TOTAL]){
      ele.style.backgroundColor = "red";
      ele.style.width = (root[PROCESSING_POINTS_FETCHED] * 100 / root[PROCESSING_POINTS_TOTAL]) + "%";
    }else{
      ele.style.backgroundColor = "transparent";
    }
  }, 100);
})(window);
