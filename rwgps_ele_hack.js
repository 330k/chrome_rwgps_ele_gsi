(function () {
  let func_str = '(e=>{let t="__NOT_EXISTS__",l=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}],a="__330k_ele_gsi",n="processing_points_total",o="processing_points_fetched",i="fetchElevations_org",r="interval_timer";e[a]=e[a]||{};let s=e[a];function c(e,t,l=1e3,a=2592e6){let n="_expire_on",o=new Map,i=null,r=!1;return caches.open(e).then(e=>{i=e,r=!0}),this.fetch=async e=>{let s=null,c=!1,g=!1,$=Date.now(),f=$+a;if(!r)throw new Exception("Cache API not ready");if(o.has(e)){let p=o.get(e);$>p.expire_on?c=!0:(o.delete(e),o.set(e,p),s=p.data)}else{let d=await i.match(e);void 0===d||null===d.headers.get(n)||$>Number.parseInt(d.headers.get(n))?c=!0:(s=await t(d),f=Number.parseInt(d.headers.get(n)),g=!0)}if(c){let h=await fetch(e),u=h.clone(),w=new Headers(u.headers);w.append(n,f);let E=await u.blob();await i.put(e,new Response(E,{status:u.status,statusText:u.statusText,headers:w})),s=await t(h),g=!0}return g&&(o.set(e,{data:s,expire_on:f}),o.length>l&&o.delete(o.keys().next().value)),s},this}s[n]=s[n]||0,s[o]=s[o]||0,s[i]=s[i]||Routes.activeMap.fetchElevations;let g=(()=>{let e=document.createElement("canvas"),l=e.getContext("2d"),a=document.createElement("img");return e.width=256,e.height=256,async e=>{if(!e.ok)return t;{let n=await e.clone().blob(),o=await new Promise((e,t)=>{a.src=URL.createObjectURL(n),a.onload=()=>{e(a)}});return l.drawImage(o,0,0,256,256),URL.revokeObjectURL(a.src),l.getImageData(0,0,256,256).data}}})(),$=new c("__330k_gsi_ele_tile",g);function f(e,t,l){let a=(t+180)/360*Math.pow(2,l),n=(1-Math.log(Math.tan(e*Math.PI/180)+1/Math.cos(e*Math.PI/180))/Math.PI)/2*Math.pow(2,l);return{tile_x:Math.floor(a),tile_y:Math.floor(n),pixel_x:(a-Math.floor(a))*256,pixel_y:(n-Math.floor(n))*256}}async function p(e,t){let a=null;for(let n of l)if(null!==(a=await d(e,t,n.tilename,n.zoom)))break;return a}async function d(e,l,a,n){let o=f(e,l,n),i=await $.fetch("https://cyberjapandata.gsi.go.jp/xyz/"+a+"/"+n+"/"+o.tile_x+"/"+o.tile_y+".png");if(i===t)return null;{let r=4*(256*Math.floor(o.pixel_y)+Math.floor(o.pixel_x)),s=65536*i[r]+256*i[r+1]+i[r+2];return s<8388608?.01*s:8388608===s?null:(s-16777216)*.01}}async function h(e,t){let l=[...e],a=[];for(let r of(s[n]+=l.length,l))r.fetchingEle=!0;for(let c of l)try{if(c.ele=await p(c.point.lat,c.point.lng),null===c.ele)throw Error("TILE ELE ERROR");s[o]++,delete c.fetchingEle,delete c.flattened}catch(g){a.push(c),console.log(g)}if(a.length>0)try{a.map(e=>{delete e.fetchingEle,delete e.flattened}),await new Promise(e=>{s[i](a,e)}),console.log(a.map(e=>e.ele))}catch($){console.log("Fallback Error")}finally{s[o]+=a.length}s[n]-=l.length,s[o]-=l.length,0===s[o]&&t()}Routes.activeMap.fetchElevations===s[i]?(Routes.activeMap.fetchElevations=h,document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink"):(Routes.activeMap.fetchElevations=s[i],document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent"),s[r]=s[r]||setInterval(()=>{let e=document.getElementById("%%TEMPLATE_MESSAGE_ID%%");s[o]<s[n]?(e.style.backgroundColor="red",e.style.width=100*s[o]/s[n]+"%"):e.style.backgroundColor="transparent"},100)})(window);';
  
  const BUTTON_ID = "__330k_ele_button";
  func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_ele_message").replaceAll(/%%TEMPLATE_BUTTON_ID%%/g, BUTTON_ID);
  
  const buttons = [];
  {
    let ele = document.getElementById(BUTTON_ID);
    if(ele === null){
      ele = document.createElement("div");
      ele.innerHTML = "<a href='javascript:" + func_str + "' accesskey='w'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAACHUh6HUyCHUR+AXyCFUh+HUSCGUx+GUx+HUR6GUh6HUh+FUR+HUh+HUR6GUh6HWxKGUh+GUh+GUh+HUh+FUR+FUh6JVxiGUh+GUh+GUR+GUh+GUR+DVRqGUh+GUyCFUx6EUiGGUh+GUh+FUR+FUh+GUh8lX6NOAAAAJnRSTlMA20CjB5tImu5TO7QSe3ZlA/n0imlfTArr1cCrGw3mkSYf45yEMvWYN1gAAADeSURBVDjLzdLJjsMgEEVRCk8QMHienaGH9/+f2CatppM49iqL3FUJH4mSDHujMt362ZpsDTgCPxPCTVAS3wcR4peB9nsPTFYVMMz3JUSBXAgxO3A+YomQ/IOU6IiCiNoIqgcwVNMByeqKsEk6IFfC7fAMVFhKZ0Zb4PLZBIjZNliKXgamtt4HvVt3D5hRnfQjyJpR3v6sOLwHHx1gr+AQZ+6NgfxXXQcC6Mqzu8IfYvBgAPJRhtcd5N+hROSBVPX8O5WgU2pMWiaqQMXW8Ry+XrMnaS5rW1nZ8At7m34ANX0Xx1GhHfcAAAAASUVORK5CYII=' width='32' height='32'></img></a><div id='__330k_ele_message' style='position:absolute;bottom:2px;height:2px;'></div>";
      ele.id = BUTTON_ID;
      ele.title = "国土地理院の標高を使用する(Alt + W)";
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
