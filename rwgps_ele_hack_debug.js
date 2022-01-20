// https://www.toptal.com/developers/javascript-minifier/
// minifyしたものをhrefに入れる

(function(global){
  const TILE_SIZE = 256;
  const TILE_NULL_SYMBOL = Symbol(); // タイルファイルが存在しないことを示すシンボル
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
  
  const cache = {};
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
      const pngblob = await fetch("https://cyberjapandata.gsi.go.jp/xyz/" + tilename + "/" + zoom + "/" + tileinfo.tile_x + "/" + tileinfo.tile_y + ".png").then(response => {
        if(response.ok){
          return response.blob();
        }else{
          return null;
        }
      });
      
      let eledata = [];
      if(pngblob !== null){
        await (new Promise(function(resolve, reject){
          const img = document.createElement("img");
          img.src = URL.createObjectURL(pngblob);
          img.onload = function(){ resolve(img); };
          
        })).then(img => {
          ctx.drawImage(img, 0, 0, TILE_SIZE, TILE_SIZE);
          const imagedata = ctx.getImageData(0, 0, TILE_SIZE, TILE_SIZE).data;
          
          for(let j = 0; j < TILE_SIZE; j++){
            const r = [];
            for(let i = 0; i < TILE_SIZE; i++){
              const x = 65536 * imagedata[(j * TILE_SIZE + i) * 4] + 256 * imagedata[(j * TILE_SIZE + i) * 4 + 1] + imagedata[(j * TILE_SIZE + i) * 4 + 2];
              
              if(x < 2 ** 23){
                r.push(x * 0.01);
              }else if(x === 2 ** 23){
                r.push(null);
              }else{
                r.push((x - 2 ** 24) * 0.01);
              }
            }
            eledata.push(r);
          }
        });
        
      }else{
        // エラー時は存在しないことを示すシンボルにする
        eledata = TILE_NULL_SYMBOL;
      }
        
      // キャッシュに登録
      if(!(cache[tilename][zoom][tileinfo.tile_x])){
        cache[tilename][zoom][tileinfo.tile_x] = {};
      }
      cache[tilename][zoom][tileinfo.tile_x][tileinfo.tile_y] = eledata;
    }
    
    const eledata = cache[tilename][zoom][tileinfo.tile_x][tileinfo.tile_y];
    
    // 最近傍点の標高を返す
    if(eledata !== TILE_NULL_SYMBOL){
      return eledata[Math.floor(tileinfo.pixel_y)][Math.floor(tileinfo.pixel_x)];
    }else{
      return null;
    }
    
  };
  
  async function addElevationToRoute(){
    const ele_status = document.getElementById("__330k_rwgps_gsi_001");
    
    for(let i = 0; i < Routes.activeMap.activeRoute._trackPoints.length; i++){
      let pt = Routes.activeMap.activeRoute._trackPoints[i];
      
      pt.flattened = null;
      pt.ele = await getElevationGSI(pt.point.lat, pt.point.lng);
      
      ele_status.innerText = "国土地理院標高に書き換え (" + i + " / " + Routes.activeMap.activeRoute._trackPoints.length + ")";
    }
    
    ele_status.innerText = "国土地理院標高に書き換え";
    
    Routes.activeMap.activeRoute.flattenBridgesAndTunnels();
    Routes.activeMap.activeRoute.resetGrade();
    Routes.activeMap.activeRoute.calculateMetrics();
    Routes.activeMap.activeRoute.redrawPolylines();
    Routes.activeMap.showElevation();
  };
  
  addElevationToRoute();
})(this);
