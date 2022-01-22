// https://www.toptal.com/developers/javascript-minifier/
// minifyしたものをrwgps_ele_hack.jsのfunc_strにコピー

(function(global){
  const TILE_SIZE = 256;
  const TILE_NULL_SYMBOL = "__NOT_EXISTS__"; // タイルファイルが存在しないことを示すシンボル
  const TILE_ORDER = [
    {tilename: "dem5a_png", zoom: 15},
    {tilename: "dem5b_png", zoom: 15},
    {tilename: "dem5c_png", zoom: 15},
    {tilename: "dem_png", zoom: 14}
  ]; // 検索順序とズームレベル
  
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
  if(!(global["__330k_cache__"])){
    global["__330k_cache__"] = {};
  }
  const cache = global["__330k_cache__"];
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = TILE_SIZE;
  canvas.height = TILE_SIZE;
  
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
        if(tile.tilename !== "dem5a_png"){ console.log(tile.tilename); }
        break;
      }
    }
    
    return ele;
  };
  
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
    if(!(cache[tilename])){
      cache[tilename] = {};
    }
    if(!(cache[tilename][zoom])){
      cache[tilename][zoom] = {};
    }
    
    if(!(cache[tilename][zoom][tileinfo.tile_x] && cache[tilename][zoom][tileinfo.tile_x][tileinfo.tile_y])){
      // キャッシュにタイルがない場合
      let imagedata = TILE_NULL_SYMBOL;
      await fetch("https://cyberjapandata.gsi.go.jp/xyz/" + tilename + "/" + zoom + "/" + tileinfo.tile_x + "/" + tileinfo.tile_y + ".png").then(response => {
        if(response.ok){
          return response.blob();
        }else{
          throw new Error(response.status);
        }
      }).then((pngblob) => new Promise(function(resolve, reject){
        const img = document.createElement("img");
        img.src = URL.createObjectURL(pngblob);
        img.onload = function(){ resolve(img); };
          
      })).then((img) => {
        ctx.drawImage(img, 0, 0, TILE_SIZE, TILE_SIZE);
        imagedata = ctx.getImageData(0, 0, TILE_SIZE, TILE_SIZE).data;
        
      }).catch(() => {
        //console.log("ERROR");
      });
        
      // ImageDataをキャッシュに登録
      if(!(cache[tilename][zoom][tileinfo.tile_x])){
        cache[tilename][zoom][tileinfo.tile_x] = {};
      }
      cache[tilename][zoom][tileinfo.tile_x][tileinfo.tile_y] = imagedata;
    }
    
    const imagedata = cache[tilename][zoom][tileinfo.tile_x][tileinfo.tile_y];
    
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
    
  };
  
  async function _fetchElevations(trackPoints, _success) {
    for(const trkpt of trackPoints){
      trkpt.fetchingEle = true;
    }
    
    for(const trkpt of trackPoints){
      trkpt.ele = await getElevationGSI(trkpt.point.lat, trkpt.point.lng);
    }
    for(const trkpt of trackPoints){
      delete trkpt.fetchingEle;
      delete trkpt.flattened;
    }
    
    // なぜか獲得標高の計算にトンネル補正がなぜかかからない(たぶん路面状態の取得とタイミングが合わなくなる)ので、1秒後に再計算・描画させる。
    setTimeout(() => {
      //this.activeRoute.flattenBridgesAndTunnels();
      _success();
    }, 1000);
  }
  
  if(!(global["__330k_fetchElevations_org"])){
    global["__330k_fetchElevations_org"] = rwgps.Map.prototype.fetchElevations;
  }
  if(rwgps.Map.prototype.fetchElevations === global["__330k_fetchElevations_org"]){
    // RWGPSのfetchElevations関数を書き換える
    rwgps.Map.prototype.fetchElevations = _fetchElevations;
    document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor = "pink";
  }else{
    // 元に戻す
    rwgps.Map.prototype.fetchElevations = global["__330k_fetchElevations_org"];
    document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor = "transparent";
  }
  
})(window);
