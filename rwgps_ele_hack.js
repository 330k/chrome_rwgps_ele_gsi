(function () {
  let func_str = '!function(e){const t=256,n="__NOT_EXISTS__",o=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}],a="processing_points_total",l="processing_points_fetched",r="fetchElevations_org";e.__330k_ele_gsi=e.__330k_ele_gsi||{};const s=e.__330k_ele_gsi;s[a]=s[a]||0,s[l]=s[l]||0,s[r]=s[r]||rwgps.Map.prototype.fetchElevations;const i=new function(e,t,n=1e3,o=2592e6){const a=new Map;let l=null,r=!1;return caches.open(e).then(e=>{l=e,r=!0}),this.fetch=async function(e){let s=null,i=!1,c=!1;const _=Date.now();let p=_+o;if(!r)throw new Exception("Cache API not ready");if(a.has(e)){const t=a.get(e);_>t.expire_on?i=!0:(a.delete(e),a.set(e,t),s=t.data)}else{const n=await l.match(e);void 0===n||null===n.headers.get("_expire_on")||_>Number.parseInt(n.headers.get("_expire_on"))?i=!0:(s=await t(n),p=Number.parseInt(n.headers.get("_expire_on")),c=!0)}if(i){const n=await fetch(e),o=n.clone(),a=new Headers(o.headers);a.append("_expire_on",p);const r=await o.blob();await l.put(e,new Response(r,{status:o.status,statusText:o.statusText,headers:a})),s=await t(n),c=!0}return c&&(a.set(e,{data:s,expire_on:p}),a.length>n&&a.delete(a.keys().next().value)),s},this}("__330k_gsi_ele_tile",function(){const e=document.createElement("canvas"),o=e.getContext("2d");return e.width=t,e.height=t,async function(e){if(e.ok){const n=await e.clone().blob(),a=document.createElement("img"),l=await new Promise(function(e,t){a.src=URL.createObjectURL(n),a.onload=function(){e(a)}});return o.drawImage(l,0,0,t,t),o.getImageData(0,0,t,t).data}return n}}());async function c(e,t){let n=null;for(const a of o)if(null!==(n=await _(e,t,a.tilename,a.zoom)))break;return n}async function _(e,o,a="dem5a_png",l=15){const r=function(e,t,n){const o=(t+180)/360*Math.pow(2,n),a=(1-Math.log(Math.tan(e*Math.PI/180)+1/Math.cos(e*Math.PI/180))/Math.PI)/2*Math.pow(2,n);return{tile_x:Math.floor(o),tile_y:Math.floor(a),pixel_x:256*(o-Math.floor(o)),pixel_y:256*(a-Math.floor(a))}}(e,o,l),s=await i.fetch("https://cyberjapandata.gsi.go.jp/xyz/"+a+"/"+l+"/"+r.tile_x+"/"+r.tile_y+".png");if(s!==n){const e=4*(Math.floor(r.pixel_y)*t+Math.floor(r.pixel_x)),n=65536*s[e]+256*s[e+1]+s[e+2];return n<2**23?.01*n:n===2**23?null:.01*(n-2**24)}return null}rwgps.Map.prototype.fetchElevations===s[r]?(rwgps.Map.prototype.fetchElevations=async function(e,t){const n=[...e],o=[];s[a]+=n.length;for(const e of n)e.fetchingEle=!0;for(const e of n)e.ele=await c(e.point.lat,e.point.lng),null===e.ele?(console.log("TILE_ERROR"),o.push(e)):s[l]++,delete e.fetchingEle,delete e.flattened;if(o.length>0)try{await new Promise(function(e){s[r](o,e)}),console.log(o.map(e=>e.ele))}catch(e){console.log("Fallback Error")}finally{s[l]+=o.length}s[a]-=n.length,s[l]-=n.length,0===s[l]&&t()},document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink"):(rwgps.Map.prototype.fetchElevations=s[r],document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent"),s.interval_timer=s.interval_timer||setInterval(()=>{const e=document.getElementById("%%TEMPLATE_MESSAGE_ID%%");s[l]<s[a]?(e.style.backgroundColor="red",e.style.width=100*s[l]/s[a]+"%"):e.style.backgroundColor="transparent"},100)}(window);';
  
  const BUTTON_ID = "__330k_ele_button";
  func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_ele_message").replaceAll(/%%TEMPLATE_BUTTON_ID%%/g, BUTTON_ID);
  
  let ele = document.getElementById(BUTTON_ID);
  if(ele === null){
    ele = document.createElement("div");
    ele.innerHTML = "<a href='javascript:" + func_str + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAACHUh6HUyCHUR+AXyCFUh+HUSCGUx+GUx+HUR6GUh6HUh+FUR+HUh+HUR6GUh6HWxKGUh+GUh+GUh+HUh+FUR+FUh6JVxiGUh+GUh+GUR+GUh+GUR+DVRqGUh+GUyCFUx6EUiGGUh+GUh+FUR+FUh+GUh8lX6NOAAAAJnRSTlMA20CjB5tImu5TO7QSe3ZlA/n0imlfTArr1cCrGw3mkSYf45yEMvWYN1gAAADeSURBVDjLzdLJjsMgEEVRCk8QMHienaGH9/+f2CatppM49iqL3FUJH4mSDHujMt362ZpsDTgCPxPCTVAS3wcR4peB9nsPTFYVMMz3JUSBXAgxO3A+YomQ/IOU6IiCiNoIqgcwVNMByeqKsEk6IFfC7fAMVFhKZ0Zb4PLZBIjZNliKXgamtt4HvVt3D5hRnfQjyJpR3v6sOLwHHx1gr+AQZ+6NgfxXXQcC6Mqzu8IfYvBgAPJRhtcd5N+hROSBVPX8O5WgU2pMWiaqQMXW8Ry+XrMnaS5rW1nZ8At7m34ANX0Xx1GhHfcAAAAASUVORK5CYII=' width='32' height='32'></img></a><div id='__330k_ele_message' style='position:absolute;bottom:2px;height:2px;'></div>";
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
