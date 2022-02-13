(function () {
  let func_str = '!function(e){const t=256,n="__NOT_EXISTS__",o=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}];e.__330k_ele_gsi||(e.__330k_ele_gsi={});const s=e.__330k_ele_gsi;const a=new function(e,t,n=1e3,o=2592e6){const s=[];let a=null,i=!1;return caches.open(e).then(e=>{a=e,i=!0}),this.fetch=async function(e){let l=null,r=!1,c=!1;const p=Date.now();let _=p+o;if(!i)throw new Exception("Cache API not ready");let h=s.findIndex(t=>t.url===e);if(h>=0){let e=s.splice(h,1)[0];s.unshift(e),p>e.expire_on?(s.shift(),r=!0):l=e.data}else{let n=await a.match(e);void 0===n||null===n.headers.get("_expire_on")||p>Number.parseInt(n.headers.get("_expire_on"))?r=!0:(l=await t(n),_=Number.parseInt(n.headers.get("_expire_on")),c=!0)}if(r){response=await fetch(e);const n=response.clone(),o=new Headers(n.headers);o.append("_expire_on",_);const s=await n.blob();await a.put(e,new Response(s,{status:n.status,statusText:n.statusText,headers:o})),l=await t(response),c=!0}return c&&(s.unshift({url:e,data:l,expire_on:_}),s.length>n&&(s.length=n)),l},this}("__330k_gsi_ele_tile",function(){const e=document.createElement("canvas"),o=e.getContext("2d");return e.width=t,e.height=t,async function(e){if(e.ok){const n=await e.clone().blob(),s=document.createElement("img"),a=await new Promise(function(e,t){s.src=URL.createObjectURL(n),s.onload=function(){e(s)}});return o.drawImage(a,0,0,t,t),o.getImageData(0,0,t,t).data}return n}}());async function i(e,t){let n=null;for(const s of o)if(null!==(n=await l(e,t,s.tilename,s.zoom)))break;return n}async function l(e,o,s="dem5a_png",i=15){const l=function(e,t,n){const o=(t+180)/360*Math.pow(2,n),s=(1-Math.log(Math.tan(e*Math.PI/180)+1/Math.cos(e*Math.PI/180))/Math.PI)/2*Math.pow(2,n);return{tile_x:Math.floor(o),tile_y:Math.floor(s),pixel_x:256*(o-Math.floor(o)),pixel_y:256*(s-Math.floor(s))}}(e,o,i),r=await a.fetch("https://cyberjapandata.gsi.go.jp/xyz/"+s+"/"+i+"/"+l.tile_x+"/"+l.tile_y+".png");if(r!==n){const e=4*(Math.floor(l.pixel_y)*t+Math.floor(l.pixel_x)),n=65536*r[e]+256*r[e+1]+r[e+2];return n<2**23?.01*n:n===2**23?null:.01*(n-2**24)}return null}s.fetchElevations_org||(s.fetchElevations_org=rwgps.Map.prototype.fetchElevations),s.processing_points||(s.processing_points={fetched:0,total:0}),rwgps.Map.prototype.fetchElevations===s.fetchElevations_org?(rwgps.Map.prototype.fetchElevations=async function(e,t){const n=[];s.processing_points.total+=e.length;for(const t of e)t.fetchingEle=!0;for(const t of e)t.ele=await i(t.point.lat,t.point.lng),null===t.ele?(console.log("TILE_ERROR"),n.push(t)):(s.processing_points.fetched++,delete t.fetchingEle,delete t.flattened);if(n.length>0){await new Promise(function(e){s.fetchElevations_org(n,e)}),console.log(n.map(e=>e.ele));for(const e of n)s.processing_points.fetched++,delete e.fetchingEle,delete e.flattened}s.processing_points.total-=e.length,s.processing_points.fetched-=e.length,0===s.processing_points.fetched&&t()},document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink"):(rwgps.Map.prototype.fetchElevations=s.fetchElevations_org,document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent"),setInterval(()=>{const e=document.getElementById("%%TEMPLATE_MESSAGE_ID%%");s.processing_points.fetched<s.processing_points.total?(e.style.backgroundColor="red",e.style.width=100*s.processing_points.fetched/s.processing_points.total+"%"):e.style.backgroundColor="transparent"},100)}(window);';
  
  func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_ele_message").replaceAll(/%%TEMPLATE_BUTTON_ID%%/g, "__330k_ele_button");
  
  const ele = document.createElement("div");
  ele.innerHTML = "<a href='javascript:" + func_str + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAdVBMVEUAAACHUh6HUyCHUR+AXyCFUh+HUSCGUx+GUx+HUR6GUh6HUh+FUR+HUh+HUR6GUh6HWxKGUh+GUh+GUh+HUh+FUR+FUh6JVxiGUh+GUh+GUR+GUh+GUR+DVRqGUh+GUyCFUx6EUiGGUh+GUh+FUR+FUh+GUh8lX6NOAAAAJnRSTlMA20CjB5tImu5TO7QSe3ZlA/n0imlfTArr1cCrGw3mkSYf45yEMvWYN1gAAADeSURBVDjLzdLJjsMgEEVRCk8QMHienaGH9/+f2CatppM49iqL3FUJH4mSDHujMt362ZpsDTgCPxPCTVAS3wcR4peB9nsPTFYVMMz3JUSBXAgxO3A+YomQ/IOU6IiCiNoIqgcwVNMByeqKsEk6IFfC7fAMVFhKZ0Zb4PLZBIjZNliKXgamtt4HvVt3D5hRnfQjyJpR3v6sOLwHHx1gr+AQZ+6NgfxXXQcC6Mqzu8IfYvBgAPJRhtcd5N+hROSBVPX8O5WgU2pMWiaqQMXW8Ry+XrMnaS5rW1nZ8At7m34ANX0Xx1GhHfcAAAAASUVORK5CYII=' width='32' height='32'></img></a><div id='__330k_ele_message' style='position:absolute;bottom:2px;height:2px;'></div>";
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
