import{R as p,j as e,r as u}from"./index-cb5f5546.js";import{B as b,a as I,u as N,I as z,S as E,h as H}from"./viewdata-f41ba799.js";import{S as T,T as W,a as B}from"./Transition-45e03733.js";import{C as w}from"./cuIcon-4967541d.js";import{u as R,N as M}from"./index-66b94434.js";import{I as $,i as P}from"./index-32cc6cdd.js";import{F as k}from"./index-c79a38a3.js";import{C as V}from"./index-f181448a.js";import{C}from"./index-19be1c8c.js";import"./index-ae17524f.js";const D=$("hamburger-button",!1,function(t){return p.createElement("svg",{width:t.size,height:t.size,viewBox:"0 0 48 48",fill:"none"},p.createElement("path",{d:"M7.94971 11.9497H39.9497",stroke:t.colors[0],strokeWidth:t.strokeWidth,strokeLinecap:t.strokeLinecap,strokeLinejoin:t.strokeLinejoin}),p.createElement("path",{d:"M7.94971 23.9497H39.9497",stroke:t.colors[0],strokeWidth:t.strokeWidth,strokeLinecap:t.strokeLinecap,strokeLinejoin:t.strokeLinejoin}),p.createElement("path",{d:"M7.94971 35.9497H39.9497",stroke:t.colors[0],strokeWidth:t.strokeWidth,strokeLinecap:t.strokeLinecap,strokeLinejoin:t.strokeLinejoin}))}),G="_search_snuxm_1",O="_searchtitle_snuxm_10",q="_searchcard_snuxm_24",A="_searchScroll_snuxm_34",J="_cardindex_snuxm_94",K="_carppeizhu_snuxm_99",Q="_cardtitle_snuxm_107",U="_cardbut_snuxm_115",X="_searchFormItem_snuxm_119",x={search:G,searchtitle:O,searchcard:q,searchScroll:A,cardindex:J,carppeizhu:K,cardtitle:Q,cardbut:U,searchFormItem:X},Y=({value:t=!1,change:i,icon:h=null,align:o="",txt:c,index:l})=>{let s={display:"flex",alignItems:"center",verticalAlign:"middle",lineHeight:"1.6"},a=c;return o==="left"&&(s.justifyContent="flex-start",a=e.jsxs(e.Fragment,{children:[h,c]})),o==="right"&&(s.justifyContent="flex-end",a=e.jsxs(e.Fragment,{children:[c,h]})),e.jsx(b,{type:t?"primary":"default",onClick:()=>i(t,l),block:!0,children:e.jsx("div",{style:s,children:a})})},Z=({options:t=[],onChange:i})=>{if(!t.length)return null;const[h,o]=u.useState(t.map((l,s)=>({index:s,value:!1}))),c=u.useCallback((l,s)=>{const a=h.map(f=>(f.value=!1,f));a[s].value=!l,o(a),i&&i(a[s])});return e.jsx(e.Fragment,{children:e.jsx(T.Compact,{size:5,className:"w-100",children:h.map((l,s)=>e.jsx(Y,{align:t[s].align,icon:t[s].icon,txt:t[s].txt,index:s,value:h[s].value,change:c},s))})})},ee=[{icon:e.jsx(w,{icon:"medal",className:"mr-10",isTransiton:!1}),align:"left",txt:"完结"},{icon:e.jsx(w,{icon:"tag",className:"ml-10",isTransiton:!1}),align:"right",txt:"连载"}],de=()=>{console.log("search 路由页面");const[t]=k.useForm(),[i,{toggle:h}]=I(!0),{tabs:o,novel:c}=N(),[l,s]=u.useState([]),[a,f]=u.useState(10),L=u.useRef(),S=async()=>{const r=[],j=L.current.input.value;if(j&&r.push({title:j}),!i&&t){const n=t.getFieldsValue();n.wanjie.value&&(n.wanjie=n.wanjie.index);for(const d in n)n[d]&&r.push({[d]:n[d]})}if(console.log(r),!r.length)return;const v={$and:r};let m=await H.post("/curd-mongo/find/novel",{ops:{many:!0},where:v}).catch(n=>(window.$message.error("搜索不出东西"),Promise.reject(n))),g=m.map(n=>(console.log(o),n.tabs=n.tabs.map(d=>(console.log(o.find(_=>_.tab===d),d),o.find(_=>_.tab===d))),n));console.log(g),m=g,s(m)},F=()=>{s(c.novelList.slice(0,10))},{run:y}=R(r=>{const{scrollHeight:j,clientHeight:v,scrollTop:m}=r.target,g=v+m+400;a<c.novelList.length-1&&g>=j&&(s(n=>n.concat(c.novelList.slice(a,a+20))),f(a+20))},{wait:300});return u.useEffect(()=>{const r=document.querySelector("#zaiViewId");return r.addEventListener("scroll",y),c.novelList.length&&s(c.novelList.slice(0,10)),()=>{r.removeEventListener("scroll",y)}},[]),e.jsxs(e.Fragment,{children:[e.jsx(V,{className:`${x.search} ${x.searchcard}`,hoverable:!0,title:e.jsx(e.Fragment,{children:e.jsxs("div",{className:x.searchtitle+" flex-ai-c",children:[e.jsx(z,{placeholder:"名",variant:"filled",type:"Primary",ref:L}),e.jsx(b,{className:"ml-5",onClick:S,children:e.jsx(E,{})}),e.jsx(b,{type:"text",className:"ml-5",onClick:h,children:e.jsx(D,{theme:"outline",size:"26",fill:i?"#333":"var(--primary-color)"})})]})}),children:e.jsx(W,{show:i,children:i?e.jsx("p",{}):e.jsx(e.Fragment,{children:e.jsxs(k,{className:x.searchFormItem,form:t,children:[e.jsx(k.Item,{name:"tabs",children:e.jsx(C.Group,{children:o.length&&o.map(r=>e.jsx(C,{value:r.tab,style:{lineHeight:"32px"},children:e.jsx(B,{color:r.color,children:r.tab})},r.tab))})}),e.jsx(k.Item,{name:"wanjie",className:"mt-10",children:e.jsx(Z,{options:ee})})]})})})}),e.jsxs("div",{className:x.searchScroll,style:{height:l.length?"auto":"60vh"},children:[e.jsx("div",{style:{width:"100vw",height:P()?"76px":"100px"}}),l.length?e.jsx(M,{data:l}):e.jsx("div",{className:"flex-fdc-aic-juc w-100-vw cursor-pointer",children:e.jsx(w,{onClick:F,icon:"refresh",size:50,color:"var(--icon-color-disabled)"})})]})]})};export{de as default};
