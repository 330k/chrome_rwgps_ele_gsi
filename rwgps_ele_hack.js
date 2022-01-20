(function () {
  const ele = document.createElement("a");
  ele.innerText = "国土地理院標高に書き換え";
  ele.id = "__330k_rwgps_gsi_001";
  ele.style.display = "block";
  ele.style.zIndex = 9999;
  ele.style.position = "absolute";
  ele.style.right = 0;
  ele.style.bottom = 0;
  ele.href = 'javascript:!function(t){const e=256,a="__NOT_EXISTS__",n=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}];t.__330k_cache__||(t.__330k_cache__={});const o=t.__330k_cache__,l=document.createElement("canvas"),i=l.getContext("2d");async function c(t,e){let a=null;for(const o of n)if(null!==(a=await _(t,e,o.tilename,o.zoom))){"dem5a_png"!==o.tilename&&console.log(o.tilename);break}return a}async function _(t,n,l="dem5a_png",c=15){const _=function(t,e,a){const n=(e+180)/360*Math.pow(2,a),o=(1-Math.log(Math.tan(t*Math.PI/180)+1/Math.cos(t*Math.PI/180))/Math.PI)/2*Math.pow(2,a);return{tile_x:Math.floor(n),tile_y:Math.floor(o),pixel_x:256*(n-Math.floor(n)),pixel_y:256*(o-Math.floor(o))}}(t,n,c);if(o[l]||(o[l]={}),o[l][c]||(o[l][c]={}),!o[l][c][_.tile_x]||!o[l][c][_.tile_x][_.tile_y]){const t=await fetch("https://cyberjapandata.gsi.go.jp/xyz/"+l+"/"+c+"/"+_.tile_x+"/"+_.tile_y+".png").then(t=>t.ok?t.blob():null);let n=[];null!==t?await new Promise(function(e,a){const n=document.createElement("img");n.src=URL.createObjectURL(t),n.onload=function(){e(n)}}).then(t=>{i.drawImage(t,0,0,e,e);const a=i.getImageData(0,0,e,e).data;for(let t=0;t<e;t++){const o=[];for(let n=0;n<e;n++){const l=65536*a[4*(t*e+n)]+256*a[4*(t*e+n)+1]+a[4*(t*e+n)+2];l<2**23?o.push(.01*l):l===2**23?o.push(null):o.push(.01*(l-2**24))}n.push(o)}}):n=a,o[l][c][_.tile_x]||(o[l][c][_.tile_x]={}),o[l][c][_.tile_x][_.tile_y]=n}const s=o[l][c][_.tile_x][_.tile_y];return s!==a?s[Math.floor(_.pixel_y)][Math.floor(_.pixel_x)]:null}l.width=e,l.height=e,async function(){const t=document.getElementById("__330k_rwgps_gsi_001");for(let e=0;e<Routes.activeMap.activeRoute._trackPoints.length;e++){let a=Routes.activeMap.activeRoute._trackPoints[e];a.flattened=null,a.ele=await c(a.point.lat,a.point.lng),t.innerText="国土地理院標高に書き換え ("+e+" / "+Routes.activeMap.activeRoute._trackPoints.length+")"}t.innerText="国土地理院標高に書き換え",Routes.activeMap.activeRoute.flattenBridgesAndTunnels(),Routes.activeMap.activeRoute.resetGrade(),Routes.activeMap.activeRoute.calculateMetrics(),Routes.activeMap.activeRoute.redrawPolylines(),Routes.activeMap.showElevation()}()}(this);';
  document.body.appendChild(ele);
  
})();
