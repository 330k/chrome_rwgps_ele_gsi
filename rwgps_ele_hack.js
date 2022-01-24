(function () {
  let func_str = '!function(t){t.__330k_ele_gsi||(t.__330k_ele_gsi={});const e=t.__330k_ele_gsi;e.tile_cache||(e.tile_cache={});const o=e.tile_cache;e.fetchElevations_org||(e.fetchElevations_org=rwgps.Map.prototype.fetchElevations),e.processing_points||(e.processing_points={fetched:0,total:0});const n=256,i="__NOT_EXISTS__",l=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}],a=document.createElement("canvas"),s=a.getContext("2d");async function c(t,e){let o=null;for(const n of l)if(null!==(o=await r(t,e,n.tilename,n.zoom)))break;return o}async function r(t,e,l="dem5a_png",a=15){const c=function(t,e,o){const n=(e+180)/360*Math.pow(2,o),i=(1-Math.log(Math.tan(t*Math.PI/180)+1/Math.cos(t*Math.PI/180))/Math.PI)/2*Math.pow(2,o);return{tile_x:Math.floor(n),tile_y:Math.floor(i),pixel_x:256*(n-Math.floor(n)),pixel_y:256*(i-Math.floor(i))}}(t,e,a);if(o[l]||(o[l]={}),o[l][a]||(o[l][a]={}),!o[l][a][c.tile_x]||!o[l][a][c.tile_x][c.tile_y]){let t=i;await fetch("https://cyberjapandata.gsi.go.jp/xyz/"+l+"/"+a+"/"+c.tile_x+"/"+c.tile_y+".png").then(t=>{if(t.ok)return t.blob();throw new Error(t.status)}).then(t=>new Promise(function(e,o){const n=document.createElement("img");n.src=URL.createObjectURL(t),n.onload=function(){e(n)}})).then(e=>{s.drawImage(e,0,0,n,n),t=s.getImageData(0,0,n,n).data}).catch(()=>{}),o[l][a][c.tile_x]||(o[l][a][c.tile_x]={}),o[l][a][c.tile_x][c.tile_y]=t}const r=o[l][a][c.tile_x][c.tile_y];if(r!==i){const t=4*(Math.floor(c.pixel_y)*n+Math.floor(c.pixel_x)),e=65536*r[t]+256*r[t+1]+r[t+2];return e<2**23?.01*e:e===2**23?null:.01*(e-2**24)}return null}a.width=n,a.height=n,rwgps.Map.prototype.fetchElevations===e.fetchElevations_org?(rwgps.Map.prototype.fetchElevations=async function(t,o){e.processing_points.total+=t.length;for(const e of t)e.fetchingEle=!0;for(const o of t)o.ele=await c(o.point.lat,o.point.lng),e.processing_points.fetched++;for(const e of t)delete e.fetchingEle,delete e.flattened;var n;e.processing_points.total-=t.length,e.processing_points.fetched-=t.length,n=this,setTimeout(()=>{o(),setTimeout(()=>{n.activeRoute.calculateMetrics()},1e3)},1e3)},document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink"):(rwgps.Map.prototype.fetchElevations=e.fetchElevations_org,document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent"),setInterval(()=>{const t=document.getElementById("%%TEMPLATE_MESSAGE_ID%%");e.processing_points.fetched<e.processing_points.total?(t.style.borderWidth="1px",t.style.width=100*e.processing_points.fetched/e.processing_points.total+"%"):t.style.borderWidth="0px"},100)}(window);';
  
  func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_ele_message").replaceAll(/%%TEMPLATE_BUTTON_ID%%/g, "__330k_ele_button");
  
  const ele = document.createElement("div");
  ele.innerHTML = "<a href='javascript:" + func_str + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAACHUh6HUyCHUR+AXyCFUh+HUSCGUx+GUx+HUR6GUh6HUh+FUR+HUh+HUR6GUh6HWxKGUh+GUh+GUh+HUh+FUR+FUh6JVxiGUh+GUh+GUR+GUh+GUR+DVRqGUh+GUyCFUx6EUiGGUh+GUh+FUR+FUh+GUh8lX6NOAAAAJnRSTlMA20CjB5tImu5TO7QSe3ZlA/n0imlfTArr1cCrGw3mkSYf45yEMvWYN1gAAADeSURBVDjLzdLJjsMgEEVRCk8QMHienaGH9/+f2CatppM49iqL3FUJH4mSDHujMt362ZpsDTgCPxPCTVAS3wcR4peB9nsPTFYVMMz3JUSBXAgxO3A+YomQ/IOU6IiCiNoIqgcwVNMByeqKsEk6IFfC7fAMVFhKZ0Zb4PLZBIjZNliKXgamtt4HvVt3D5hRnfQjyJpR3v6sOLwHHx1gr+AQZ+6NgfxXXQcC6Mqzu8IfYvBgAPJRhtcd5N+hROSBVPX8O5WgU2pMWiaqQMXW8Ry+XrMnaS5rW1nZ8At7m34ANX0Xx1GhHfcAAAAASUVORK5CYII=' width='32' height='32'></img></a><div id='__330k_ele_message' style='position:absolute;border:0px solid red;bottom:2px;'></div>";
  ele.id = "__330k_ele_button";
  ele.title = "国土地理院の標高を使用する";
  ele.style.display = "block";
  ele.style.textAlign = "right";
  ele.style.zIndex = 4000; //保存画面のモーダル背景のz-indexが5000
  ele.style.position = "fixed";
  ele.style.right = "20px";
  ele.style.bottom = "60px";
  ele.style.borderRadius = "10px";
  ele.style.borderWidth = "3px";
  ele.style.borderStyle = "solid";
  ele.style.borderColor = "transparent";
  ele.style.backgroundColor = "white";
  
  document.body.appendChild(ele);
  
  const regs = [
    new RegExp("^https://ridewithgps.com/routes/.+/edit.*$"),
    new RegExp("^https://ridewithgps.com/routes/new$")
  ];
  setInterval(() => {
    if(regs.filter((e)=>e.test(location.href)).length > 0){
      ele.style.display = "block";
    }else{
      ele.style.display = "none";
    }
  }, 500);
  
})();
