function c(){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)}function s(n){const e=[];n.forEach(r=>{e.push(JSON.stringify(r)),e.push(",")});const i=new Blob(["[",...e,"]"],{type:"application/json"}),t=URL.createObjectURL(i),o=document.createElement("a");o.download="export.json",o.href=t,o.id="download",document.body.appendChild(o),o.click(),setTimeout(()=>{document.querySelector("#download").remove(),URL.revokeObjectURL(t)},1e3)}function d(n,e){console.log("🚀 ~ copyText ~ data:",n),console.log("🚀 ~ copyText ~ navigator.clipboard:",navigator.clipboard),navigator.clipboard?navigator.clipboard.writeText(n).then(function(){e&&e("复制成功")},function(){i(n)}):i(n);function i(t){const o=document.createElement("input");document.body.appendChild(o),o.value=t,navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)?(o.setSelectionRange(0,t.length),o.focus()):o.select(),document.execCommand("copy")?e&&e("复制成功"):e&&e("复制失败"),o.blur()}}const a=(n=1e3)=>new Promise(e=>{setTimeout(()=>{e()},n)});export{d as c,s as e,c as i,a as w};
