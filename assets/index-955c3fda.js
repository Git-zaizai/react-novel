import{r,j as e}from"./index-7ee441ac.js";import{i as H}from"./index-ab6ddabd.js";const A="_textdisabled_61jkt_20",K="_loaderBox_61jkt_45",R="_rotate180_61jkt_1",V="_loader_61jkt_45",F="_loadingskKeyframes_61jkt_1",O="_content_61jkt_83",q="_loaderBottomBox_61jkt_89",o={"footer-position":"_footer-position_61jkt_1",textdisabled:A,"dropdown-pullup":"_dropdown-pullup_61jkt_24","scroll-hihe":"_scroll-hihe_61jkt_32",loaderBox:K,"dropdown-pullup-opacity":"_dropdown-pullup-opacity_61jkt_55","dropdown-pullup-opacity-1":"_dropdown-pullup-opacity-1_61jkt_59","dropdown-icon":"_dropdown-icon_61jkt_65","dropdown-icon-rotate180":"_dropdown-icon-rotate180_61jkt_70",rotate180:R,loader:V,loadingskKeyframes:F,content:O,loaderBottomBox:q},p=70,G=40;let x=0,B=0,f=0,Y=0,s=0,L=0,h=!1,y=0;function M(_){y>0||h||(x=_.touches[0].clientY,B=_.touches[0].clientX)}const J=_=>{const{headerPosition:P=null,children:g,onEnd:m,onPullup:w,InfiniteDropdown:T=!0,isMount:k=!0,scroll:S,isOnPullup:z=!0}=_,N=r.useRef(null),[D,n]=r.useState({"--zai-translateY":"0px","--overflow":"scroll"}),[i,c]=r.useState({text:"下拉刷新",status:1,className:"",opacity:0}),[d,v]=r.useState({text:"加载中...",show:!1,iconShow:!0,opacity:0}),X=t=>{v({text:"加载中...",show:!0,iconShow:!0,opacity:0,...t}),n({"--overflow":"scroll","--zai-translateY":"0px"})};function $(t){const{scrollHeight:j,clientHeight:a,scrollTop:l}=t.target;y=l,a+l>=j&&z&&w&&(n(u=>({...u,"--overflow":"hidden"})),v(u=>({...u,opacity:1})),w(X)),typeof S=="function"&&S()}function b(t){if(y>0||(f=t.touches[0].clientY,Y=t.touches[0].clientX,h)||f-x<0)return;if(s=f-x,L=Y-B,Math.atan(Math.abs(L)/s)*(180/Math.PI)>G){[x,B]=[f,Y];return}let a=(100-s*.5)/100;a=Math.max(.5,a),s=s*a,s>p&&(i.status!==2&&c({className:o["dropdown-icon-rotate180"],status:2,text:"放手刷新",opacity:1}),T||(s=p)),c(l=>({...l,opacity:1})),n({"--overflow":"hidden","--zai-translateY":s+"px"})}const E=()=>{h=!1,s=0,n({"--overflow":"scroll","--zai-translateY":"0px"}),c({className:"",status:1,text:"下拉刷新",opacity:0}),!d.show&&typeof w=="function"&&v(t=>({...t,show:!0}))};function I(){y>0||h||f-x<0||(s<p?(s=0,c(()=>({className:"",status:1,text:"下拉刷新",opacity:0})),n(()=>({"--overflow":"scroll","--zai-translateY":"0px"}))):(h=!0,n(t=>({...t,"--zai-translateY":p+"px"})),c(t=>({...t,status:3})),m?m(E):setTimeout(()=>{E()},1e3)))}function C(){const t=N.current;return t&&(t.addEventListener("touchstart",M,{passive:!1}),t.addEventListener("touchmove",b,{passive:!1}),t.addEventListener("touchend",I,{passive:!1})),()=>{t&&(t.removeEventListener("touchstart",M),t.removeEventListener("touchmove",b),t.removeEventListener("touchend",I))}}return r.useEffect(()=>{if(!k){const t=N.current;if(typeof w=="function"&&t){const{scrollHeight:j,clientHeight:a}=t,l=j<=a;l&&v(u=>({...u,show:l}))}}},[g]),r.useLayoutEffect(()=>(k&&(n({"--overflow":"hidden","--zai-translateY":p+"px"}),c(t=>({...t,status:3}))),C()),[]),r.useEffect(()=>{k&&m&&m(E)},[]),e.jsx(e.Fragment,{children:e.jsxs("div",{ref:N,id:"dropdown-pullup",className:`${o["dropdown-pullup"]}${H()?"":"web-dropdown-pullup"}`,onScroll:$,style:D,children:[P,e.jsxs("div",{className:o.loaderBox,children:[i.status!==3&&e.jsxs("div",{className:`${o.textdisabled} flex-ai-c`,style:{opacity:i.opacity},children:[e.jsx("i",{className:`cuIcon-refresharrow ${o["dropdown-icon"]} ${i.className}`}),e.jsx("span",{children:i.text})]}),i.status===3&&e.jsxs("div",{className:"flex-ai-c",children:[e.jsx("i",{className:o.loader}),e.jsx("span",{className:o.textdisabled+" flex-ai-c ml-5",children:"加载中..."})]})]}),e.jsxs("div",{className:o.content,children:[g,d.show&&e.jsxs("div",{className:o.loaderBottomBox,style:{opacity:d.opacity},children:[d.iconShow&&e.jsx("i",{className:o.loader}),e.jsx("span",{className:"ml-5",children:d.text})]}),e.jsx("div",{className:o["footer-position"]})]})]})})},W=J;export{W as D};