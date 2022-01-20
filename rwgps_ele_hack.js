(function () {
  let func_str = '!function(t){const e=256,a="__NOT_EXISTS__",n=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}];t.__330k_cache__||(t.__330k_cache__={});const o=t.__330k_cache__,i=document.createElement("canvas"),l=i.getContext("2d");async function c(t,e){let a=null;for(const o of n)if(null!==(a=await _(t,e,o.tilename,o.zoom))){"dem5a_png"!==o.tilename&&console.log(o.tilename);break}return a}async function _(t,n,i="dem5a_png",c=15){const _=function(t,e,a){const n=(e+180)/360*Math.pow(2,a),o=(1-Math.log(Math.tan(t*Math.PI/180)+1/Math.cos(t*Math.PI/180))/Math.PI)/2*Math.pow(2,a);return{tile_x:Math.floor(n),tile_y:Math.floor(o),pixel_x:256*(n-Math.floor(n)),pixel_y:256*(o-Math.floor(o))}}(t,n,c);if(o[i]||(o[i]={}),o[i][c]||(o[i][c]={}),!o[i][c][_.tile_x]||!o[i][c][_.tile_x][_.tile_y]){let t=a;await fetch("https://cyberjapandata.gsi.go.jp/xyz/"+i+"/"+c+"/"+_.tile_x+"/"+_.tile_y+".png").then(t=>{if(t.ok)return t.blob();throw new Error(t.status)}).then(t=>new Promise(function(e,a){const n=document.createElement("img");n.src=URL.createObjectURL(t),n.onload=function(){e(n)}})).then(a=>{l.drawImage(a,0,0,e,e),t=l.getImageData(0,0,e,e).data}).catch(()=>{}),o[i][c][_.tile_x]||(o[i][c][_.tile_x]={}),o[i][c][_.tile_x][_.tile_y]=t}const r=o[i][c][_.tile_x][_.tile_y];if(r!==a){const t=4*(Math.floor(_.pixel_y)*e+Math.floor(_.pixel_x)),a=65536*r[t]+256*r[t+1]+r[t+2];return a<2**23?.01*a:a===2**23?null:.01*(a-2**24)}return null}i.width=e,i.height=e,async function(){const t=document.getElementById("%%TEMPLATE_MESSAGE_ID%%");for(let e=0;e<Routes.activeMap.activeRoute._trackPoints.length;e++){let a=Routes.activeMap.activeRoute._trackPoints[e];a.flattened=null,a.ele=await c(a.point.lat,a.point.lng),t.innerText="%%TEMPLATE_DEFAULT_MESSAGE%% ("+e+" / "+Routes.activeMap.activeRoute._trackPoints.length+")"}t.innerText="%%TEMPLATE_DEFAULT_MESSAGE%%",Routes.activeMap.activeRoute.flattenBridgesAndTunnels(),Routes.activeMap.activeRoute.resetGrade(),Routes.activeMap.activeRoute.calculateMetrics(),Routes.activeMap.activeRoute.redrawPolylines(),Routes.activeMap.showElevation()}()}(window);';
  
  func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_rwgps_gsi_001").replace(/%%TEMPLATE_DEFAULT_MESSAGE%%/g, "国土地理院標高に書き換えa");
  
  {
    const ele = document.createElement("a");
    ele.innerHTML = "<img src='data:image/png;base64,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' width='40' height='40'></img><span id='__330k_rwgps_gsi_001'></span>";
    ele.title = "国土地理院の標高タイルで書き換え"
    ele.style.display = "block";
    ele.style.zIndex = 9999;
    ele.style.position = "fixed";
    ele.style.right = "20px";
    ele.style.bottom = "60px";
    ele.href = "javascript:" + func_str;
    
    document.body.appendChild(ele);
  }
})();
