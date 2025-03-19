(function () {
  const buttons = [];
  {
    const BUTTON_ID = "__330k_ele_button";
    let func_str = '(e=>{let t="__NOT_EXISTS__",l=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}],n="__330k_ele_gsi",a="injectElevations_org",i="injectElevations_gsi",o="interval_timer";e[n]=e[n]??{};let r=e[n];function c(e,t,l=1e3,n=2592e6){let a="_expire_on",i=new Map,o=null,r=!1;return caches.open(e).then(e=>{o=e,r=!0}),this.fetch=async e=>{let c=null,s=!1,g=!1,f=Date.now(),d=f+n;if(!r)throw new Exception("Cache API not ready");if(i.has(e)){let p=i.get(e);f>p.expire_on?s=!0:(i.delete(e),i.set(e,p),c=p.data)}else{let h=await o.match(e);void 0===h||null===h.headers.get(a)||f>Number.parseInt(h.headers.get(a))?s=!0:(c=await t(h),d=Number.parseInt(h.headers.get(a)),g=!0)}if(s){let u=await fetch(e),E=u.clone(),$=new Headers(E.headers);$.append(a,d);let m=await E.blob();await o.put(e,new Response(m,{status:E.status,statusText:E.statusText,headers:$})),c=await t(u),g=!0}return g&&(i.set(e,{data:c,expire_on:d}),i.length>l&&i.delete(i.keys().next().value)),c},this}r[a]=r[a]??Routes.activeMap.activeRoute.injectElevations;let s=(()=>{let e=document.createElement("canvas"),l=e.getContext("2d"),n=document.createElement("img");return e.width=256,e.height=256,async e=>{if(!e.ok)return t;{let a=await e.clone().blob(),i=await new Promise((e,t)=>{n.src=URL.createObjectURL(a),n.onload=()=>{e(n)}});return l.drawImage(i,0,0,256,256),URL.revokeObjectURL(n.src),l.getImageData(0,0,256,256).data}}})(),g=new c("__330k_gsi_ele_tile",s);function f(e,t,l){let n=(t+180)/360*Math.pow(2,l),a=(1-Math.log(Math.tan(e*Math.PI/180)+1/Math.cos(e*Math.PI/180))/Math.PI)/2*Math.pow(2,l);return{tile_x:Math.floor(n),tile_y:Math.floor(a),pixel_x:(n-Math.floor(n))*256,pixel_y:(a-Math.floor(a))*256}}async function d(e,t){let n=null;for(let a of l)if(null!==(n=await p(e,t,a.tilename,a.zoom)))break;return n}async function p(e,l,n,a){let i=f(e,l,a),o=await g.fetch("https://cyberjapandata.gsi.go.jp/xyz/"+n+"/"+a+"/"+i.tile_x+"/"+i.tile_y+".png");if(o===t)return null;{let r=4*(256*Math.floor(i.pixel_y)+Math.floor(i.pixel_x)),c=65536*o[r]+256*o[r+1]+o[r+2];return c<8388608?.01*c:8388608===c?null:(c-16777216)*.01}}async function h(e,t){let l=e.filter(e=>!0!==e.fetchingEle),n=[];for(let i of l)i.fetchingEle=!0,i.fetchingEleCompleted=!1;for(let o of l)try{let c=await d(o.point.lat,o.point.lng);if(Number.isFinite(c))o.ele=c,o.flattened=!1,o.fetchingEleCompleted=!0;else throw Error("TILE ELE ERROR")}catch(s){n.push(o),console.log(s)}if(n.length>0)try{await r[a]()}catch(g){console.log("Fallback Error")}for(let f of(console.log({argument:e.length,requested:l.length,completed:l.filter(e=>e.fetchingEleCompleted).length}),l))Number.isFinite(f.ele)&&(delete f.fetchingEle,delete f.fetchingEleCompleted);0===l.filter(e=>!Number.isFinite(e.ele)).length&&t()}r[i]=r[i]??function(){return new Promise(function(e,t){h(Routes.activeMap.activeRoute.trackPoints().filter(e=>!Number.isFinite(e.ele)),e)})},Routes.activeMap.activeRoute.injectElevations!==r[i]?(Routes.activeMap.activeRoute.injectElevations=r[i],document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink"):(Routes.activeMap.activeRoute.injectElevations=r[a],document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent"),r[o]=r[o]??setInterval(()=>{let e=document.getElementById("%%TEMPLATE_MESSAGE_ID%%"),t=Routes.activeMap.activeRoute.trackPoints();t.filter(e=>e.fetchingEle).length?(e.style.backgroundColor="red",e.style.width=100*t.filter(e=>e.fetchingEleCompleted).length/t.filter(e=>e.fetchingEle).length+"%"):e.style.backgroundColor="transparent",Routes.activeMap.activeRoute.injectElevations===r[i]?document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink":document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent"},200)})(window);';
    func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_ele_message").replaceAll(/%%TEMPLATE_BUTTON_ID%%/g, BUTTON_ID);
    
    let ele = document.getElementById(BUTTON_ID);
    if(ele === null){
      ele = document.createElement("div");
      ele.innerHTML = "<a href='javascript:" + func_str + "' accesskey='w'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAACHUh6HUyCHUR+AXyCFUh+HUSCGUx+GUx+HUR6GUh6HUh+FUR+HUh+HUR6GUh6HWxKGUh+GUh+GUh+HUh+FUR+FUh6JVxiGUh+GUh+GUR+GUh+GUR+DVRqGUh+GUyCFUx6EUiGGUh+GUh+FUR+FUh+GUh8lX6NOAAAAJnRSTlMA20CjB5tImu5TO7QSe3ZlA/n0imlfTArr1cCrGw3mkSYf45yEMvWYN1gAAADeSURBVDjLzdLJjsMgEEVRCk8QMHienaGH9/+f2CatppM49iqL3FUJH4mSDHujMt362ZpsDTgCPxPCTVAS3wcR4peB9nsPTFYVMMz3JUSBXAgxO3A+YomQ/IOU6IiCiNoIqgcwVNMByeqKsEk6IFfC7fAMVFhKZ0Zb4PLZBIjZNliKXgamtt4HvVt3D5hRnfQjyJpR3v6sOLwHHx1gr+AQZ+6NgfxXXQcC6Mqzu8IfYvBgAPJRhtcd5N+hROSBVPX8O5WgU2pMWiaqQMXW8Ry+XrMnaS5rW1nZ8At7m34ANX0Xx1GhHfcAAAAASUVORK5CYII=' width='32' height='32'></img></a><div id='__330k_ele_message' style='position:absolute;bottom:2px;height:2px;'></div>";
      ele.id = BUTTON_ID;
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
    }
    buttons.push(ele);
  }
  
  {
    const BUTTON_BATCH_MOD_ELE_ID = "__330k_batch_modify";
    
    let ele = document.getElementById(BUTTON_BATCH_MOD_ELE_ID);
    if(ele === null){
      ele = document.createElement("div");
      ele.id = BUTTON_BATCH_MOD_ELE_ID;
      ele.innerHTML = "<a href='javascript:!function(){let e=Routes.activeMap,t=e.activeRoute,i=t.trackPoints(),n=()=>{i.length===i.filter(e=>void 0!==e.roadEnv).length?(e.loadElevationProfile(),t.rebuildBounds(),t.flattenBridgesAndTunnels(),t.calculateMetrics()):setTimeout(n,1e3)};e.injectSurfaces(i),e.fetchElevations(i,n)}();' accesskey='a'/>";
      ele.style.position = "absolute";
      ele.style.width = "0px";
      ele.style.height = "0px";
      
      document.body.appendChild(ele);
    }
    buttons.push(ele);
  }
  
  const regs = [
    new RegExp("^https://ridewithgps.com/routes/.+/edit.*$"),
    new RegExp("^https://ridewithgps.com/routes/new.*$")
  ];
  setInterval(() => {
    if(regs.find((e)=>e.test(location.href))){
      buttons.forEach((ele) => { ele.style.display = "block"; });
    }else{
      buttons.forEach((ele) => { ele.style.display = "none"; });
    }
  }, 500);
  
})();
