(function () {
  let func_str = '!function(t){const e=256,o="__NOT_EXISTS__",n=[{tilename:"dem5a_png",zoom:15},{tilename:"dem5b_png",zoom:15},{tilename:"dem5c_png",zoom:15},{tilename:"dem_png",zoom:14}];t.__330k_cache__||(t.__330k_cache__={});const a=t.__330k_cache__,l=document.createElement("canvas"),_=l.getContext("2d");async function i(t,e){let o=null;for(const a of n)if(null!==(o=await c(t,e,a.tilename,a.zoom))){"dem5a_png"!==a.tilename&&console.log(a.tilename);break}return o}async function c(t,n,l="dem5a_png",i=15){const c=function(t,e,o){const n=(e+180)/360*Math.pow(2,o),a=(1-Math.log(Math.tan(t*Math.PI/180)+1/Math.cos(t*Math.PI/180))/Math.PI)/2*Math.pow(2,o);return{tile_x:Math.floor(n),tile_y:Math.floor(a),pixel_x:256*(n-Math.floor(n)),pixel_y:256*(a-Math.floor(a))}}(t,n,i);if(a[l]||(a[l]={}),a[l][i]||(a[l][i]={}),!a[l][i][c.tile_x]||!a[l][i][c.tile_x][c.tile_y]){let t=o;await fetch("https://cyberjapandata.gsi.go.jp/xyz/"+l+"/"+i+"/"+c.tile_x+"/"+c.tile_y+".png").then(t=>{if(t.ok)return t.blob();throw new Error(t.status)}).then(t=>new Promise(function(e,o){const n=document.createElement("img");n.src=URL.createObjectURL(t),n.onload=function(){e(n)}})).then(o=>{_.drawImage(o,0,0,e,e),t=_.getImageData(0,0,e,e).data}).catch(()=>{}),a[l][i][c.tile_x]||(a[l][i][c.tile_x]={}),a[l][i][c.tile_x][c.tile_y]=t}const r=a[l][i][c.tile_x][c.tile_y];if(r!==o){const t=4*(Math.floor(c.pixel_y)*e+Math.floor(c.pixel_x)),o=65536*r[t]+256*r[t+1]+r[t+2];return o<2**23?.01*o:o===2**23?null:.01*(o-2**24)}return null}l.width=e,l.height=e,t.__330k_fetchElevations_org||(t.__330k_fetchElevations_org=rwgps.Map.prototype.fetchElevations),rwgps.Map.prototype.fetchElevations===t.__330k_fetchElevations_org?(rwgps.Map.prototype.fetchElevations=async function(t,e){for(const e of t)e.fetchingEle=!0;for(const e of t)e.ele=await i(e.point.lat,e.point.lng);for(const e of t)delete e.fetchingEle,delete e.flattened;setTimeout(()=>{e()},1e3)},document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="pink"):(rwgps.Map.prototype.fetchElevations=t.__330k_fetchElevations_org,document.getElementById("%%TEMPLATE_BUTTON_ID%%").style.borderColor="transparent")}(window);';
  
  func_str = func_str.replaceAll(/%%TEMPLATE_MESSAGE_ID%%/g, "__330k_ele_message").replaceAll(/%%TEMPLATE_BUTTON_ID%%/g, "__330k_ele_button");
  
  {
    const ele = document.createElement("div");
    ele.innerHTML = "<div id='__330k_ele_message'></div><a href='javascript:" + func_str + "'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAilBMVEUAAACGUh+BThqGUh+FUx6FUR6EVB6GUR6GUh+GUh6HUh6HUx6HUh+GUR6GUh+GUh+FUyCHUh+XXy+GUh+FUh+GUh6HUh6FUx6GUh+GUR+FUiCGUh+FUx6FUR6HUiCJUhuGUh+GUh+GUh+HUR+GUh+GUh+EUR+EUyCIUByAgACGUh+GUyCGUSCGUh/oe3BoAAAALXRSTlMA7QrmVl46ut55fUSfTfWpiC0Fta2XZiXxwJmScEU/HPnXy6SMhDUgFgL40oFZ2xo+AAABBklEQVQ4y+XS126DMBiGYTAJGGOz98webb/7v726EAWIoHBSqVLeA0uGR5Yt/cq7V1u3fuMZhj8HNWz7jQ6QJZgdqnVQxeYfQCJKfxk229AGjmOUUUoBTa5xBwXaUhhjKNUjU8Lz+ROyg5mYr1C3LEuFK9ekstGVyO8STt/Rc1IAuyAWAPkNXgAb7WMW4D0SRF0Df/pbyFbBmMV7hCvgCTK2Atb5kZtkGl5Z+DJm3hR0MkDt4NV1uwHb0cuYJaUNWSBa+IwAwzObgkJGWaMoY+iNJ52kgBrV98djyv7PCVQZ9sWr58zvYRs8L9yCh4YGOMpcEYZ96LPQFyziThA4PHfZ5qa8c9/Q3ShW4nrTXAAAAABJRU5ErkJggg==' width='40' height='40'></img></a>";
    ele.id = "__330k_ele_button";
    ele.title = "国土地理院の標高を使用する";
    ele.style.display = "block";
    ele.style.textAlign = "right";
    ele.style.zIndex = 9999;
    ele.style.position = "fixed";
    ele.style.right = "20px";
    ele.style.bottom = "60px";
    ele.style.borderRadius = "10px";
    ele.style.borderWidth = "5px";
    ele.style.borderStyle = "solid";
    ele.style.borderColor = "transparent";
    
    document.body.appendChild(ele);
  }
})();
