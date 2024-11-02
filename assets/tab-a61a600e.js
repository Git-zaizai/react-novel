import{r as g,a as _,j as e,B as u,T as F,q as z}from"./index-7ee441ac.js";import{V as C}from"./index-2766be9f.js";import{C as i}from"./cuIcon-525887b3.js";import{u as v,r as b}from"./viewdata-73f96ad8.js";import{h as p}from"./http-21f83e32.js";import{u as $}from"./index-e1b3429a.js";import{S as y,T as k}from"./index-ac6a781e.js";import{C as S}from"./index-8a5d6158.js";import{F as I}from"./index-ac544244.js";import{I as A}from"./index-d7749322.js";import"./index-e1fd296a.js";import"./EllipsisOutlined-936bc574.js";import"./create-global-store-da266218.js";const B="_view_19ap5_1",D="_circleCard_19ap5_5",P="_addForm_19ap5_12",f={view:B,circleCard:D,addForm:P};function E(){const{tabs:o,setTabs:d,initTabs:w}=v(),x=()=>{let s=window.structuredClone?structuredClone(o):JSON.parse(JSON.stringify(o));return s=s.map(t=>({...t,checked:!1})),s},[c,m]=g.useState(x()),[j,{set:a}]=_(c.some(s=>s.checked)),[r,l]=g.useState("");$(async()=>{o.length||await w(),o.length!==c.length&&m(x())},[o]);const h=(s,t)=>{s.checked=!s.checked,c[t]=s,a(c.some(n=>n.checked)),m([...c])},N=async()=>{if(!r){window.$message.warning("请输入标签");return}if(c.some(t=>t.tab===r)){window.$message.warning(`${r} 已有`);return}let s=c.map(t=>t.tab);s.push(r),await p.post("/json-set",{ph:"tabs.json",data:s}).catch(t=>(window.$message.error("添加标签失败"),Promise.reject(t))),d([...o,{tab:r,color:b()}])},T=async()=>{if(!await window.$modal.confirm({okText:"删除",okType:"danger",maskClosable:!0,centered:!0,cancelText:"取消",title:"删除记录类型",content:"是否将（删除）"}))return;let t=c.filter(n=>!n.checked);await p.post("/json-set",{ph:"tabs.json",data:t.map(n=>n.tab)}).catch(n=>(window.$message.error(n),Promise.reject(n))),d(t.map(n=>({tab:n.tab,color:n.color}))),a(!1)};return e.jsxs(C,{className:f.circleCard,title:e.jsxs("div",{className:"flex-ai-c",children:[e.jsx(i,{icon:"tag",size:"22",color:"var(--primary-color)",className:"mr-10"}),e.jsx("h4",{className:"wax-100 singe-line",children:"标签"})]}),children:[c.length?e.jsx(y,{size:[0,8],wrap:!0,className:"mt-10",children:c.map((s,t)=>e.jsx(S,{onChange:()=>h(s,t),checked:s.checked,children:e.jsx(k,{color:s.color,children:s.tab})},s.tab))}):e.jsx("div",{className:"flex-fdc-aic-juc w-100",children:e.jsx(i,{icon:"home",color:"var(--primary-color)",size:"24"})}),e.jsx(I.Item,{className:f.addForm+" w-100 mb-30",labelAlign:"right",children:e.jsxs(y.Compact,{className:"w-100",children:[e.jsx(A,{placeholder:"标签名",onChange:s=>l(s.target.value),allowClear:!0}),e.jsx(u,{type:"primary",icon:e.jsx(i,{icon:"add",size:16}),onClick:N,children:"添加"})]})}),e.jsx(F,{show:j,children:j?e.jsx(u,{danger:!0,type:"primary",block:!0,className:"mt-10",onClick:T,children:e.jsx(i,{icon:"delete",size:16})}):e.jsx(e.Fragment,{})})]})}const R=()=>{const[o,d]=g.useState([]),{setTabs:w,tabs:x}=v(),c=async()=>{const a=await p.post("/curd-mongo/find/tabs",{ops:{many:!0}}).catch(r=>(window.$message.error("获取数据失败"),Promise.reject(r)));d(a)};z(()=>{c()});const m=async(a,r)=>{(await p.post("/curd-mongo/del/tabs",{where:{_id:a}}).catch(h=>Promise.reject(h))).deletedCount?(o.splice(r,1),d([].concat(o))):window.$message.success("删除失败")},j=async(a,r)=>{try{let l=[...x,{tab:a.name,color:b()}];await p.post("/json-set",{ph:"tabs.json",data:l.map(h=>h.tab)}),w(l),m(a._id,r)}catch(l){console.log(l),window.$message.error("操作失败")}};return e.jsx(e.Fragment,{children:e.jsx(C,{title:e.jsxs("div",{className:"flex",children:[e.jsx(i,{icon:"form",size:"22",color:"var(--primary-color)",className:"mr-10"}),e.jsxs("h4",{className:"wax-100 singe-line",children:["申请的便签 ",o.length]})]}),children:o.length>0?o.map((a,r)=>e.jsxs("div",{className:"mt-10 mb-10 flex-ai-c",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx(k,{color:b(),children:a.name}),"说明：",a.txt]}),e.jsx(u,{type:"primary",ghost:!0,className:"ml-10",onClick:()=>j(a,r),children:e.jsx(i,{icon:"check",size:16})}),e.jsx(u,{danger:!0,type:"primary",ghost:!0,className:"ml-10",onClick:()=>m(a._id,r),children:e.jsx(i,{icon:"delete",size:16})})]},a._id)):e.jsx("div",{className:"flex-fdc-aic-juc w-100",children:e.jsx(i,{icon:"home",color:"var(--primary-color)",size:"24"})})})})},Y=()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:f.view+" h-100-vh",children:[e.jsx("div",{style:{height:"calc(var(--Header-height) + 10px)"}}),e.jsx(E,{}),e.jsx(R,{})]})});export{Y as default};