import{z as Qe,p as ye,r as Le,C as ie,c as Q,aN as Ke,bb as Te,t as _e,bc as $e,aQ as Se,o as U,O as Ye,l as Je,bd as Ze,G as et,J as tt,be as nt,at as rt,bf as ot,bg as We,bh as J,bi as lt,Z as st,F as ue,b0 as Ie,D as it,ax as at,ai as ct,f as ut,ar as dt,aH as mt,aC as ft,v as pt,E as gt,w as ht,L as bt,bj as yt,P as $t,$ as xt,bk as He,bl as Ct,bm as vt,al as wt,bn as St,aG as It,bo as Et,aF as Ot,y as Ft,bp as Mt,bq as jt}from"./viewdata-f41ba799.js";import{R as Nt,r as s}from"./index-cb5f5546.js";const Ee=e=>typeof e=="object"&&e!=null&&e.nodeType===1,Oe=(e,t)=>(!t||e!=="hidden")&&e!=="visible"&&e!=="clip",ge=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){const n=getComputedStyle(e,null);return Oe(n.overflowY,t)||Oe(n.overflowX,t)||(r=>{const o=(l=>{if(!l.ownerDocument||!l.ownerDocument.defaultView)return null;try{return l.ownerDocument.defaultView.frameElement}catch{return null}})(r);return!!o&&(o.clientHeight<r.scrollHeight||o.clientWidth<r.scrollWidth)})(e)}return!1},ce=(e,t,n,r,o,l,a,i)=>l<e&&a>t||l>e&&a<t?0:l<=e&&i<=n||a>=t&&i>=n?l-e-r:a>t&&i<n||l<e&&i>n?a-t+o:0,Pt=e=>{const t=e.parentElement;return t??(e.getRootNode().host||null)},Fe=(e,t)=>{var n,r,o,l;if(typeof document>"u")return[];const{scrollMode:a,block:i,inline:c,boundary:m,skipOverflowHiddenElements:g}=t,h=typeof m=="function"?m:j=>j!==m;if(!Ee(e))throw new TypeError("Invalid target");const M=document.scrollingElement||document.documentElement,S=[];let b=e;for(;Ee(b)&&h(b);){if(b=Pt(b),b===M){S.push(b);break}b!=null&&b===document.body&&ge(b)&&!ge(document.documentElement)||b!=null&&ge(b,g)&&S.push(b)}const I=(r=(n=window.visualViewport)==null?void 0:n.width)!=null?r:innerWidth,E=(l=(o=window.visualViewport)==null?void 0:o.height)!=null?l:innerHeight,{scrollX:d,scrollY:u}=window,{height:x,width:y,top:$,right:f,bottom:v,left:p}=e.getBoundingClientRect(),{top:N,right:H,bottom:_,left:V}=(j=>{const C=window.getComputedStyle(j);return{top:parseFloat(C.scrollMarginTop)||0,right:parseFloat(C.scrollMarginRight)||0,bottom:parseFloat(C.scrollMarginBottom)||0,left:parseFloat(C.scrollMarginLeft)||0}})(e);let P=i==="start"||i==="nearest"?$-N:i==="end"?v+_:$+x/2-N+_,w=c==="center"?p+y/2-V+H:c==="end"?f+H:p-V;const q=[];for(let j=0;j<S.length;j++){const C=S[j],{height:F,width:z,top:A,right:k,bottom:ee,left:W}=C.getBoundingClientRect();if(a==="if-needed"&&$>=0&&p>=0&&v<=E&&f<=I&&$>=A&&v<=ee&&p>=W&&f<=k)return q;const O=getComputedStyle(C),L=parseInt(O.borderLeftWidth,10),T=parseInt(O.borderTopWidth,10),B=parseInt(O.borderRightWidth,10),X=parseInt(O.borderBottomWidth,10);let D=0,G=0;const K="offsetWidth"in C?C.offsetWidth-C.clientWidth-L-B:0,R="offsetHeight"in C?C.offsetHeight-C.clientHeight-T-X:0,te="offsetWidth"in C?C.offsetWidth===0?0:z/C.offsetWidth:0,re="offsetHeight"in C?C.offsetHeight===0?0:F/C.offsetHeight:0;if(M===C)D=i==="start"?P:i==="end"?P-E:i==="nearest"?ce(u,u+E,E,T,X,u+P,u+P+x,x):P-E/2,G=c==="start"?w:c==="center"?w-I/2:c==="end"?w-I:ce(d,d+I,I,L,B,d+w,d+w+y,y),D=Math.max(0,D+u),G=Math.max(0,G+d);else{D=i==="start"?P-A-T:i==="end"?P-ee+X+R:i==="nearest"?ce(A,ee,F,T,X+R,P,P+x,x):P-(A+F/2)+R/2,G=c==="start"?w-W-L:c==="center"?w-(W+z/2)+K/2:c==="end"?w-k+B+K:ce(W,k,z,L,B+K,w,w+y,y);const{scrollLeft:Y,scrollTop:oe}=C;D=re===0?0:Math.max(0,Math.min(oe+D/re,C.scrollHeight-F/re+R)),G=te===0?0:Math.max(0,Math.min(Y+G/te,C.scrollWidth-z/te+K)),P+=oe-D,w+=Y-G}q.push({el:C,top:D,left:G})}return q},Rt=e=>e===!1?{block:"end",inline:"nearest"}:(t=>t===Object(t)&&Object.keys(t).length!==0)(e)?e:{block:"start",inline:"nearest"};function Lt(e,t){if(!e.isConnected||!(o=>{let l=o;for(;l&&l.parentNode;){if(l.parentNode===document)return!0;l=l.parentNode instanceof ShadowRoot?l.parentNode.host:l.parentNode}return!1})(e))return;const n=(o=>{const l=window.getComputedStyle(o);return{top:parseFloat(l.scrollMarginTop)||0,right:parseFloat(l.scrollMarginRight)||0,bottom:parseFloat(l.scrollMarginBottom)||0,left:parseFloat(l.scrollMarginLeft)||0}})(e);if((o=>typeof o=="object"&&typeof o.behavior=="function")(t))return t.behavior(Fe(e,t));const r=typeof t=="boolean"||t==null?void 0:t.behavior;for(const{el:o,top:l,left:a}of Fe(e,Rt(t))){const i=l-n.top+n.bottom,c=a-n.left+n.right;o.scroll({top:i,left:c,behavior:r})}}const se=["xxl","xl","lg","md","sm","xs"],Tt=e=>({xs:`(max-width: ${e.screenXSMax}px)`,sm:`(min-width: ${e.screenSM}px)`,md:`(min-width: ${e.screenMD}px)`,lg:`(min-width: ${e.screenLG}px)`,xl:`(min-width: ${e.screenXL}px)`,xxl:`(min-width: ${e.screenXXL}px)`}),_t=e=>{const t=e,n=[].concat(se).reverse();return n.forEach((r,o)=>{const l=r.toUpperCase(),a=`screen${l}Min`,i=`screen${l}`;if(!(t[a]<=t[i]))throw new Error(`${a}<=${i} fails : !(${t[a]}<=${t[i]})`);if(o<n.length-1){const c=`screen${l}Max`;if(!(t[i]<=t[c]))throw new Error(`${i}<=${c} fails : !(${t[i]}<=${t[c]})`);const g=`screen${n[o+1].toUpperCase()}Min`;if(!(t[c]<=t[g]))throw new Error(`${c}<=${g} fails : !(${t[c]}<=${t[g]})`)}}),e};function Wt(){const[,e]=Qe(),t=Tt(_t(e));return Nt.useMemo(()=>{const n=new Map;let r=-1,o={};return{matchHandlers:{},dispatch(l){return o=l,n.forEach(a=>a(o)),n.size>=1},subscribe(l){return n.size||this.register(),r+=1,n.set(r,l),l(o),r},unsubscribe(l){n.delete(l),n.size||this.unregister()},unregister(){Object.keys(t).forEach(l=>{const a=t[l],i=this.matchHandlers[a];i==null||i.mql.removeListener(i==null?void 0:i.listener)}),n.clear()},register(){Object.keys(t).forEach(l=>{const a=t[l],i=m=>{let{matches:g}=m;this.dispatch(Object.assign(Object.assign({},o),{[l]:g}))},c=window.matchMedia(a);c.addListener(i),this.matchHandlers[a]={mql:c,listener:i},i(c)})},responsiveMap:t}},[e])}const Ht=s.createContext({}),Ve=Ht,Vt=e=>{const{componentCls:t}=e;return{[t]:{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around":{justifyContent:"space-around"},"&-space-evenly":{justifyContent:"space-evenly"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}}}},qt=e=>{const{componentCls:t}=e;return{[t]:{position:"relative",maxWidth:"100%",minHeight:1}}},zt=(e,t)=>{const{componentCls:n,gridColumns:r}=e,o={};for(let l=r;l>=0;l--)l===0?(o[`${n}${t}-${l}`]={display:"none"},o[`${n}-push-${l}`]={insetInlineStart:"auto"},o[`${n}-pull-${l}`]={insetInlineEnd:"auto"},o[`${n}${t}-push-${l}`]={insetInlineStart:"auto"},o[`${n}${t}-pull-${l}`]={insetInlineEnd:"auto"},o[`${n}${t}-offset-${l}`]={marginInlineStart:0},o[`${n}${t}-order-${l}`]={order:0}):(o[`${n}${t}-${l}`]=[{["--ant-display"]:"block",display:"block"},{display:"var(--ant-display)",flex:`0 0 ${l/r*100}%`,maxWidth:`${l/r*100}%`}],o[`${n}${t}-push-${l}`]={insetInlineStart:`${l/r*100}%`},o[`${n}${t}-pull-${l}`]={insetInlineEnd:`${l/r*100}%`},o[`${n}${t}-offset-${l}`]={marginInlineStart:`${l/r*100}%`},o[`${n}${t}-order-${l}`]={order:l});return o},be=(e,t)=>zt(e,t),At=(e,t,n)=>({[`@media (min-width: ${t}px)`]:Object.assign({},be(e,n))}),Dt=ye("Grid",e=>[Vt(e)]),Bt=ye("Grid",e=>{const t=Le(e,{gridColumns:24}),n={"-sm":t.screenSMMin,"-md":t.screenMDMin,"-lg":t.screenLGMin,"-xl":t.screenXLMin,"-xxl":t.screenXXLMin};return[qt(t),be(t,""),be(t,"-xs"),Object.keys(n).map(r=>At(t,n[r],r)).reduce((r,o)=>Object.assign(Object.assign({},r),o),{})]});var Gt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function kt(e){return typeof e=="number"?`${e} ${e} auto`:/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?`0 0 ${e}`:e}const Xt=["xs","sm","md","lg","xl","xxl"],Ut=s.forwardRef((e,t)=>{const{getPrefixCls:n,direction:r}=s.useContext(ie),{gutter:o,wrap:l}=s.useContext(Ve),{prefixCls:a,span:i,order:c,offset:m,push:g,pull:h,className:M,children:S,flex:b,style:I}=e,E=Gt(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),d=n("col",a),[u,x]=Bt(d);let y={};Xt.forEach(v=>{let p={};const N=e[v];typeof N=="number"?p.span=N:typeof N=="object"&&(p=N||{}),delete E[v],y=Object.assign(Object.assign({},y),{[`${d}-${v}-${p.span}`]:p.span!==void 0,[`${d}-${v}-order-${p.order}`]:p.order||p.order===0,[`${d}-${v}-offset-${p.offset}`]:p.offset||p.offset===0,[`${d}-${v}-push-${p.push}`]:p.push||p.push===0,[`${d}-${v}-pull-${p.pull}`]:p.pull||p.pull===0,[`${d}-${v}-flex-${p.flex}`]:p.flex||p.flex==="auto",[`${d}-rtl`]:r==="rtl"})});const $=Q(d,{[`${d}-${i}`]:i!==void 0,[`${d}-order-${c}`]:c,[`${d}-offset-${m}`]:m,[`${d}-push-${g}`]:g,[`${d}-pull-${h}`]:h},M,y,x),f={};if(o&&o[0]>0){const v=o[0]/2;f.paddingLeft=v,f.paddingRight=v}return b&&(f.flex=kt(b),l===!1&&!f.minWidth&&(f.minWidth=0)),u(s.createElement("div",Object.assign({},E,{style:Object.assign(Object.assign({},f),I),className:$,ref:t}),S))}),qe=Ut;var Qt=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function Me(e,t){const[n,r]=s.useState(typeof e=="string"?e:""),o=()=>{if(typeof e=="string"&&r(e),typeof e=="object")for(let l=0;l<se.length;l++){const a=se[l];if(!t[a])continue;const i=e[a];if(i!==void 0){r(i);return}}};return s.useEffect(()=>{o()},[JSON.stringify(e),t]),n}const Kt=s.forwardRef((e,t)=>{const{prefixCls:n,justify:r,align:o,className:l,style:a,children:i,gutter:c=0,wrap:m}=e,g=Qt(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),{getPrefixCls:h,direction:M}=s.useContext(ie),[S,b]=s.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),[I,E]=s.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),d=Me(o,I),u=Me(r,I),x=s.useRef(c),y=Wt();s.useEffect(()=>{const j=y.subscribe(C=>{E(C);const F=x.current||0;(!Array.isArray(F)&&typeof F=="object"||Array.isArray(F)&&(typeof F[0]=="object"||typeof F[1]=="object"))&&b(C)});return()=>y.unsubscribe(j)},[]);const $=()=>{const j=[void 0,void 0];return(Array.isArray(c)?c:[c,void 0]).forEach((F,z)=>{if(typeof F=="object")for(let A=0;A<se.length;A++){const k=se[A];if(S[k]&&F[k]!==void 0){j[z]=F[k];break}}else j[z]=F}),j},f=h("row",n),[v,p]=Dt(f),N=$(),H=Q(f,{[`${f}-no-wrap`]:m===!1,[`${f}-${u}`]:u,[`${f}-${d}`]:d,[`${f}-rtl`]:M==="rtl"},l,p),_={},V=N[0]!=null&&N[0]>0?N[0]/-2:void 0;V&&(_.marginLeft=V,_.marginRight=V),[,_.rowGap]=N;const[P,w]=N,q=s.useMemo(()=>({gutter:[P,w],wrap:m}),[P,w,m]);return v(s.createElement(Ve.Provider,{value:q},s.createElement("div",Object.assign({},g,{className:H,style:Object.assign(Object.assign({},_),a),ref:t}),i)))}),Yt=Kt;function de(e){const[t,n]=s.useState(e);return s.useEffect(()=>{const r=setTimeout(()=>{n(e)},e.length?0:10);return()=>{clearTimeout(r)}},[e]),t}const Jt=e=>{const{componentCls:t}=e,n=`${t}-show-help`,r=`${t}-show-help-item`;return{[n]:{transition:`opacity ${e.motionDurationSlow} ${e.motionEaseInOut}`,"&-appear, &-enter":{opacity:0,"&-active":{opacity:1}},"&-leave":{opacity:1,"&-active":{opacity:0}},[r]:{overflow:"hidden",transition:`height ${e.motionDurationSlow} ${e.motionEaseInOut},
                     opacity ${e.motionDurationSlow} ${e.motionEaseInOut},
                     transform ${e.motionDurationSlow} ${e.motionEaseInOut} !important`,[`&${r}-appear, &${r}-enter`]:{transform:"translateY(-5px)",opacity:0,["&-active"]:{transform:"translateY(0)",opacity:1}},[`&${r}-leave-active`]:{transform:"translateY(-5px)"}}}}},Zt=Jt,en=e=>({legend:{display:"block",width:"100%",marginBottom:e.marginLG,padding:0,color:e.colorTextDescription,fontSize:e.fontSizeLG,lineHeight:"inherit",border:0,borderBottom:`${e.lineWidth}px ${e.lineType} ${e.colorBorder}`},label:{fontSize:e.fontSize},'input[type="search"]':{boxSizing:"border-box"},'input[type="radio"], input[type="checkbox"]':{lineHeight:"normal"},'input[type="file"]':{display:"block"},'input[type="range"]':{display:"block",width:"100%"},"select[multiple], select[size]":{height:"auto"},[`input[type='file']:focus,
  input[type='radio']:focus,
  input[type='checkbox']:focus`]:{outline:0,boxShadow:`0 0 0 ${e.controlOutlineWidth}px ${e.controlOutline}`},output:{display:"block",paddingTop:15,color:e.colorText,fontSize:e.fontSize,lineHeight:e.lineHeight}}),je=(e,t)=>{const{formItemCls:n}=e;return{[n]:{[`${n}-label > label`]:{height:t},[`${n}-control-input`]:{minHeight:t}}}},tn=e=>{const{componentCls:t}=e;return{[e.componentCls]:Object.assign(Object.assign(Object.assign({},_e(e)),en(e)),{[`${t}-text`]:{display:"inline-block",paddingInlineEnd:e.paddingSM},"&-small":Object.assign({},je(e,e.controlHeightSM)),"&-large":Object.assign({},je(e,e.controlHeightLG))})}},nn=e=>{const{formItemCls:t,iconCls:n,componentCls:r,rootPrefixCls:o,labelRequiredMarkColor:l,labelColor:a,labelFontSize:i,labelHeight:c,labelColonMarginInlineStart:m,labelColonMarginInlineEnd:g,itemMarginBottom:h}=e;return{[t]:Object.assign(Object.assign({},_e(e)),{marginBottom:h,verticalAlign:"top","&-with-help":{transition:"none"},[`&-hidden,
        &-hidden.${o}-row`]:{display:"none"},"&-has-warning":{[`${t}-split`]:{color:e.colorError}},"&-has-error":{[`${t}-split`]:{color:e.colorWarning}},[`${t}-label`]:{flexGrow:0,overflow:"hidden",whiteSpace:"nowrap",textAlign:"end",verticalAlign:"middle","&-left":{textAlign:"start"},"&-wrap":{overflow:"unset",lineHeight:`${e.lineHeight} - 0.25em`,whiteSpace:"unset"},"> label":{position:"relative",display:"inline-flex",alignItems:"center",maxWidth:"100%",height:c,color:a,fontSize:i,[`> ${n}`]:{fontSize:e.fontSize,verticalAlign:"top"},[`&${t}-required:not(${t}-required-mark-optional)::before`]:{display:"inline-block",marginInlineEnd:e.marginXXS,color:l,fontSize:e.fontSize,fontFamily:"SimSun, sans-serif",lineHeight:1,content:'"*"',[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-optional`]:{display:"inline-block",marginInlineStart:e.marginXXS,color:e.colorTextDescription,[`${r}-hide-required-mark &`]:{display:"none"}},[`${t}-tooltip`]:{color:e.colorTextDescription,cursor:"help",writingMode:"horizontal-tb",marginInlineStart:e.marginXXS},"&::after":{content:'":"',position:"relative",marginBlock:0,marginInlineStart:m,marginInlineEnd:g},[`&${t}-no-colon::after`]:{content:'"\\a0"'}}},[`${t}-control`]:{["--ant-display"]:"flex",flexDirection:"column",flexGrow:1,[`&:first-child:not([class^="'${o}-col-'"]):not([class*="' ${o}-col-'"])`]:{width:"100%"},"&-input":{position:"relative",display:"flex",alignItems:"center",minHeight:e.controlHeight,"&-content":{flex:"auto",maxWidth:"100%"}}},[t]:{"&-explain, &-extra":{clear:"both",color:e.colorTextDescription,fontSize:e.fontSize,lineHeight:e.lineHeight},"&-explain-connected":{width:"100%"},"&-extra":{minHeight:e.controlHeightSM,transition:`color ${e.motionDurationMid} ${e.motionEaseOut}`},"&-explain":{"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning}}},[`&-with-help ${t}-explain`]:{height:"auto",opacity:1},[`${t}-feedback-icon`]:{fontSize:e.fontSize,textAlign:"center",visibility:"visible",animationName:Te,animationDuration:e.motionDurationMid,animationTimingFunction:e.motionEaseOutBack,pointerEvents:"none","&-success":{color:e.colorSuccess},"&-error":{color:e.colorError},"&-warning":{color:e.colorWarning},"&-validating":{color:e.colorPrimary}}})}},rn=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-horizontal`]:{[`${n}-label`]:{flexGrow:0},[`${n}-control`]:{flex:"1 1 0",minWidth:0},[`${n}-label[class$='-24'], ${n}-label[class*='-24 ']`]:{[`& + ${n}-control`]:{minWidth:"unset"}}}}},on=e=>{const{componentCls:t,formItemCls:n}=e;return{[`${t}-inline`]:{display:"flex",flexWrap:"wrap",[n]:{flex:"none",marginInlineEnd:e.margin,marginBottom:0,"&-row":{flexWrap:"nowrap"},[`> ${n}-label,
        > ${n}-control`]:{display:"inline-block",verticalAlign:"top"},[`> ${n}-label`]:{flex:"none"},[`${t}-text`]:{display:"inline-block"},[`${n}-has-feedback`]:{display:"inline-block"}}}}},ne=e=>({padding:e.verticalLabelPadding,margin:e.verticalLabelMargin,whiteSpace:"initial",textAlign:"start","> label":{margin:0,"&::after":{visibility:"hidden"}}}),ln=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${n} ${n}-label`]:ne(e),[`${t}:not(${t}-inline)`]:{[n]:{flexWrap:"wrap",[`${n}-label, ${n}-control`]:{[`&:not([class*=" ${r}-col-xs"])`]:{flex:"0 0 100%",maxWidth:"100%"}}}}}},sn=e=>{const{componentCls:t,formItemCls:n,rootPrefixCls:r}=e;return{[`${t}-vertical`]:{[n]:{"&-row":{flexDirection:"column"},"&-label > label":{height:"auto"},[`${t}-item-control`]:{width:"100%"}}},[`${t}-vertical ${n}-label,
      .${r}-col-24${n}-label,
      .${r}-col-xl-24${n}-label`]:ne(e),[`@media (max-width: ${e.screenXSMax}px)`]:[ln(e),{[t]:{[`.${r}-col-xs-24${n}-label`]:ne(e)}}],[`@media (max-width: ${e.screenSMMax}px)`]:{[t]:{[`.${r}-col-sm-24${n}-label`]:ne(e)}},[`@media (max-width: ${e.screenMDMax}px)`]:{[t]:{[`.${r}-col-md-24${n}-label`]:ne(e)}},[`@media (max-width: ${e.screenLGMax}px)`]:{[t]:{[`.${r}-col-lg-24${n}-label`]:ne(e)}}}},ze=(e,t)=>Le(e,{formItemCls:`${e.componentCls}-item`,rootPrefixCls:t}),xe=ye("Form",(e,t)=>{let{rootPrefixCls:n}=t;const r=ze(e,n);return[tn(r),nn(r),Zt(r),rn(r),on(r),sn(r),Ke(r),Te]},e=>({labelRequiredMarkColor:e.colorError,labelColor:e.colorTextHeading,labelFontSize:e.fontSize,labelHeight:e.controlHeight,labelColonMarginInlineStart:e.marginXXS/2,labelColonMarginInlineEnd:e.marginXS,itemMarginBottom:e.marginLG,verticalLabelPadding:`0 0 ${e.paddingXS}px`,verticalLabelMargin:0}),{order:-1e3}),Ne=[];function he(e,t,n){let r=arguments.length>3&&arguments[3]!==void 0?arguments[3]:0;return{key:typeof e=="string"?e:`${t}-${r}`,error:e,errorStatus:n}}const an=e=>{let{help:t,helpStatus:n,errors:r=Ne,warnings:o=Ne,className:l,fieldId:a,onVisibleChanged:i}=e;const{prefixCls:c}=s.useContext($e),m=`${c}-item-explain`,[,g]=xe(c),h=s.useMemo(()=>Se(c),[c]),M=de(r),S=de(o),b=s.useMemo(()=>t!=null?[he(t,"help",n)]:[].concat(U(M.map((E,d)=>he(E,"error","error",d))),U(S.map((E,d)=>he(E,"warning","warning",d)))),[t,n,M,S]),I={};return a&&(I.id=`${a}_help`),s.createElement(Ye,{motionDeadline:h.motionDeadline,motionName:`${c}-show-help`,visible:!!b.length,onVisibleChanged:i},E=>{const{className:d,style:u}=E;return s.createElement("div",Object.assign({},I,{className:Q(m,d,l,g),style:u,role:"alert"}),s.createElement(Je,Object.assign({keys:b},Se(c),{motionName:`${c}-show-help-item`,component:!1}),x=>{const{key:y,error:$,errorStatus:f,className:v,style:p}=x;return s.createElement("div",{key:y,className:Q(v,{[`${m}-${f}`]:f}),style:p},$)}))})},Ae=an,cn=["parentNode"],un="form_item";function le(e){return e===void 0||e===!1?[]:Array.isArray(e)?e:[e]}function De(e,t){if(!e.length)return;const n=e.join("_");return t?`${t}_${n}`:cn.includes(n)?`${un}_${n}`:n}function Be(e,t,n,r,o,l){let a=r;return l!==void 0?a=l:n.validating?a="validating":e.length?a="error":t.length?a="warning":(n.touched||o&&n.validated)&&(a="success"),a}function Pe(e){return le(e).join("_")}function Ge(e){const[t]=Ze(),n=s.useRef({}),r=s.useMemo(()=>e??Object.assign(Object.assign({},t),{__INTERNAL__:{itemRef:o=>l=>{const a=Pe(o);l?n.current[a]=l:delete n.current[a]}},scrollToField:function(o){let l=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=le(o),i=De(a,r.__INTERNAL__.name),c=i?document.getElementById(i):null;c&&Lt(c,Object.assign({scrollMode:"if-needed",block:"nearest"},l))},getFieldInstance:o=>{const l=Pe(o);return n.current[l]}}),[e,t]);return[r]}var dn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const mn=(e,t)=>{const n=s.useContext(et),{getPrefixCls:r,direction:o,form:l}=s.useContext(ie),{prefixCls:a,className:i,rootClassName:c,size:m,disabled:g=n,form:h,colon:M,labelAlign:S,labelWrap:b,labelCol:I,wrapperCol:E,hideRequiredMark:d,layout:u="horizontal",scrollToFirstError:x,requiredMark:y,onFinishFailed:$,name:f,style:v,feedbackIcons:p}=e,N=dn(e,["prefixCls","className","rootClassName","size","disabled","form","colon","labelAlign","labelWrap","labelCol","wrapperCol","hideRequiredMark","layout","scrollToFirstError","requiredMark","onFinishFailed","name","style","feedbackIcons"]),H=tt(m),_=s.useContext(nt),V=s.useMemo(()=>y!==void 0?y:l&&l.requiredMark!==void 0?l.requiredMark:!d,[d,y,l]),P=M??(l==null?void 0:l.colon),w=r("form",a),[q,j]=xe(w),C=Q(w,`${w}-${u}`,{[`${w}-hide-required-mark`]:V===!1,[`${w}-rtl`]:o==="rtl",[`${w}-${H}`]:H},j,l==null?void 0:l.className,i,c),[F]=Ge(h),{__INTERNAL__:z}=F;z.name=f;const A=s.useMemo(()=>({name:f,labelAlign:S,labelCol:I,labelWrap:b,wrapperCol:E,vertical:u==="vertical",colon:P,requiredMark:V,itemRef:z.itemRef,form:F,feedbackIcons:p}),[f,S,I,E,u,P,V,F,p]);s.useImperativeHandle(t,()=>F);const k=(W,O)=>{if(W){let L={block:"nearest"};typeof W=="object"&&(L=W),F.scrollToField(O,L)}},ee=W=>{if($==null||$(W),W.errorFields.length){const O=W.errorFields[0].name;if(x!==void 0){k(x,O);return}l&&l.scrollToFirstError!==void 0&&k(l.scrollToFirstError,O)}};return q(s.createElement(rt,{disabled:g},s.createElement(ot.Provider,{value:H},s.createElement(We,{validateMessages:_},s.createElement(J.Provider,{value:A},s.createElement(lt,Object.assign({id:f},N,{name:f,onFinishFailed:ee,form:F,style:Object.assign(Object.assign({},l==null?void 0:l.style),v),className:C})))))))},fn=s.forwardRef(mn),pn=fn;function gn(e){if(typeof e=="function")return e;const t=st(e);return t.length<=1?t[0]:t}const ke=()=>{const{status:e,errors:t=[],warnings:n=[]}=s.useContext(ue);return{status:e,errors:t,warnings:n}};ke.Context=ue;const hn=ke;function bn(e){const[t,n]=s.useState(e),r=s.useRef(null),o=s.useRef([]),l=s.useRef(!1);s.useEffect(()=>(l.current=!1,()=>{l.current=!0,Ie.cancel(r.current),r.current=null}),[]);function a(i){l.current||(r.current===null&&(o.current=[],r.current=Ie(()=>{r.current=null,n(c=>{let m=c;return o.current.forEach(g=>{m=g(m)}),m})})),o.current.push(i))}return[t,a]}function yn(){const{itemRef:e}=s.useContext(J),t=s.useRef({});function n(r,o){const l=o&&typeof o=="object"&&o.ref,a=r.join("_");return(t.current.name!==a||t.current.originRef!==l)&&(t.current.name=a,t.current.originRef=l,t.current.ref=it(e(r),l)),t.current.ref}return n}const $n=e=>{const{formItemCls:t}=e;return{"@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none)":{[`${t}-control`]:{display:"flex"}}}},xn=at(["Form","item-item"],(e,t)=>{let{rootPrefixCls:n}=t;const r=ze(e,n);return[$n(r)]}),Cn=e=>{const{prefixCls:t,status:n,wrapperCol:r,children:o,errors:l,warnings:a,_internalItemRender:i,extra:c,help:m,fieldId:g,marginBottom:h,onErrorVisibleChanged:M}=e,S=`${t}-item`,b=s.useContext(J),I=r||b.wrapperCol||{},E=Q(`${S}-control`,I.className),d=s.useMemo(()=>Object.assign({},b),[b]);delete d.labelCol,delete d.wrapperCol;const u=s.createElement("div",{className:`${S}-control-input`},s.createElement("div",{className:`${S}-control-input-content`},o)),x=s.useMemo(()=>({prefixCls:t,status:n}),[t,n]),y=h!==null||l.length||a.length?s.createElement("div",{style:{display:"flex",flexWrap:"nowrap"}},s.createElement($e.Provider,{value:x},s.createElement(Ae,{fieldId:g,errors:l,warnings:a,help:m,helpStatus:n,className:`${S}-explain-connected`,onVisibleChanged:M})),!!h&&s.createElement("div",{style:{width:0,height:h}})):null,$={};g&&($.id=`${g}_extra`);const f=c?s.createElement("div",Object.assign({},$,{className:`${S}-extra`}),c):null,v=i&&i.mark==="pro_table_render"&&i.render?i.render(e,{input:u,errorList:y,extra:f}):s.createElement(s.Fragment,null,u,y,f);return s.createElement(J.Provider,{value:d},s.createElement(qe,Object.assign({},I,{className:E}),v),s.createElement(xn,{prefixCls:t}))},vn=Cn;var wn={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z"}}]},name:"question-circle",theme:"outlined"};const Sn=wn;var In=function(t,n){return s.createElement(ct,ut({},t,{ref:n,icon:Sn}))};const En=s.forwardRef(In);var On=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function Fn(e){return e?typeof e=="object"&&!s.isValidElement(e)?e:{title:e}:null}const Mn=e=>{let{prefixCls:t,label:n,htmlFor:r,labelCol:o,labelAlign:l,colon:a,required:i,requiredMark:c,tooltip:m}=e;var g;const[h]=dt("Form"),{vertical:M,labelAlign:S,labelCol:b,labelWrap:I,colon:E}=s.useContext(J);if(!n)return null;const d=o||b||{},u=l||S,x=`${t}-item-label`,y=Q(x,u==="left"&&`${x}-left`,d.className,{[`${x}-wrap`]:!!I});let $=n;const f=a===!0||E!==!1&&a!==!1;f&&!M&&typeof n=="string"&&n.trim()!==""&&($=n.replace(/[:|：]\s*$/,""));const p=Fn(m);if(p){const{icon:V=s.createElement(En,null)}=p,P=On(p,["icon"]),w=s.createElement(mt,Object.assign({},P),s.cloneElement(V,{className:`${t}-item-tooltip`,title:""}));$=s.createElement(s.Fragment,null,$,w)}const N=c==="optional",H=typeof c=="function";H?$=c($,{required:!!i}):N&&!i&&($=s.createElement(s.Fragment,null,$,s.createElement("span",{className:`${t}-item-optional`,title:""},(h==null?void 0:h.optional)||((g=ft.Form)===null||g===void 0?void 0:g.optional))));const _=Q({[`${t}-item-required`]:i,[`${t}-item-required-mark-optional`]:N||H,[`${t}-item-no-colon`]:!f});return s.createElement(qe,Object.assign({},d,{className:y}),s.createElement("label",{htmlFor:r,className:_,title:typeof n=="string"?n:""},$))},jn=Mn,Nn={success:pt,warning:gt,error:ht,validating:bt};function Xe(e){let{children:t,errors:n,warnings:r,hasFeedback:o,validateStatus:l,prefixCls:a,meta:i,noStyle:c}=e;const m=`${a}-item`,{feedbackIcons:g}=s.useContext(J),h=Be(n,r,i,null,!!o,l),{isFormItemInput:M,status:S,hasFeedback:b,feedbackIcon:I}=s.useContext(ue),E=s.useMemo(()=>{var d;let u;if(o){const y=o!==!0&&o.icons||g,$=h&&((d=y==null?void 0:y({status:h,errors:n,warnings:r}))===null||d===void 0?void 0:d[h]),f=h&&Nn[h];u=$!==!1&&f?s.createElement("span",{className:Q(`${m}-feedback-icon`,`${m}-feedback-icon-${h}`)},$||s.createElement(f,null)):null}const x={status:h||"",errors:n,warnings:r,hasFeedback:!!o,feedbackIcon:u,isFormItemInput:!0};return c&&(x.status=(h??S)||"",x.isFormItemInput=M,x.hasFeedback=!!(o??b),x.feedbackIcon=o!==void 0?x.feedbackIcon:I),x},[h,o,c,M,S]);return s.createElement(ue.Provider,{value:E},t)}var Pn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function Rn(e){const{prefixCls:t,className:n,rootClassName:r,style:o,help:l,errors:a,warnings:i,validateStatus:c,meta:m,hasFeedback:g,hidden:h,children:M,fieldId:S,required:b,isRequired:I,onSubItemMetaChange:E}=e,d=Pn(e,["prefixCls","className","rootClassName","style","help","errors","warnings","validateStatus","meta","hasFeedback","hidden","children","fieldId","required","isRequired","onSubItemMetaChange"]),u=`${t}-item`,{requiredMark:x}=s.useContext(J),y=s.useRef(null),$=de(a),f=de(i),v=l!=null,p=!!(v||a.length||i.length),N=!!y.current&&yt(y.current),[H,_]=s.useState(null);$t(()=>{if(p&&y.current){const j=getComputedStyle(y.current);_(parseInt(j.marginBottom,10))}},[p,N]);const V=j=>{j||_(null)},w=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;const C=j?$:m.errors,F=j?f:m.warnings;return Be(C,F,m,"",!!g,c)}(),q=Q(u,n,r,{[`${u}-with-help`]:v||$.length||f.length,[`${u}-has-feedback`]:w&&g,[`${u}-has-success`]:w==="success",[`${u}-has-warning`]:w==="warning",[`${u}-has-error`]:w==="error",[`${u}-is-validating`]:w==="validating",[`${u}-hidden`]:h});return s.createElement("div",{className:q,style:o,ref:y},s.createElement(Yt,Object.assign({className:`${u}-row`},xt(d,["_internalItemRender","colon","dependencies","extra","fieldKey","getValueFromEvent","getValueProps","htmlFor","id","initialValue","isListField","label","labelAlign","labelCol","labelWrap","messageVariables","name","normalize","noStyle","preserve","requiredMark","rules","shouldUpdate","trigger","tooltip","validateFirst","validateTrigger","valuePropName","wrapperCol","validateDebounce"])),s.createElement(jn,Object.assign({htmlFor:S},e,{requiredMark:x,required:b??I,prefixCls:t})),s.createElement(vn,Object.assign({},e,m,{errors:$,warnings:f,prefixCls:t,status:w,help:l,marginBottom:H,onErrorVisibleChanged:V}),s.createElement(He.Provider,{value:E},s.createElement(Xe,{prefixCls:t,meta:m,errors:m.errors,warnings:m.warnings,hasFeedback:g,validateStatus:w},M)))),!!H&&s.createElement("div",{className:`${u}-margin-offset`,style:{marginBottom:-H}}))}const Ln="__SPLIT__",Tn=s.memo(e=>{let{children:t}=e;return t},(e,t)=>e.value===t.value&&e.update===t.update&&e.childProps.length===t.childProps.length&&e.childProps.every((n,r)=>n===t.childProps[r]));function Re(){return{errors:[],warnings:[],touched:!1,validating:!1,name:[],validated:!1}}function _n(e){const{name:t,noStyle:n,className:r,dependencies:o,prefixCls:l,shouldUpdate:a,rules:i,children:c,required:m,label:g,messageVariables:h,trigger:M="onChange",validateTrigger:S,hidden:b,help:I}=e,{getPrefixCls:E}=s.useContext(ie),{name:d}=s.useContext(J),u=gn(c),x=typeof u=="function",y=s.useContext(He),{validateTrigger:$}=s.useContext(Ct),f=S!==void 0?S:$,v=t!=null,p=E("form",l),[N,H]=xe(p);Ft();const _=s.useContext(vt),V=s.useRef(),[P,w]=bn({}),[q,j]=wt(()=>Re()),C=O=>{const L=_==null?void 0:_.getKey(O.name);if(j(O.destroy?Re():O,!0),n&&I!==!1&&y){let T=O.name;if(O.destroy)T=V.current||T;else if(L!==void 0){const[B,X]=L;T=[B].concat(U(X)),V.current=T}y(O,T)}},F=(O,L)=>{w(T=>{const B=Object.assign({},T),D=[].concat(U(O.name.slice(0,-1)),U(L)).join(Ln);return O.destroy?delete B[D]:B[D]=O,B})},[z,A]=s.useMemo(()=>{const O=U(q.errors),L=U(q.warnings);return Object.values(P).forEach(T=>{O.push.apply(O,U(T.errors||[])),L.push.apply(L,U(T.warnings||[]))}),[O,L]},[P,q.errors,q.warnings]),k=yn();function ee(O,L,T){return n&&!b?s.createElement(Xe,{prefixCls:p,hasFeedback:e.hasFeedback,validateStatus:e.validateStatus,meta:q,errors:z,warnings:A,noStyle:!0},O):s.createElement(Rn,Object.assign({key:"row"},e,{className:Q(r,H),prefixCls:p,fieldId:L,isRequired:T,errors:z,warnings:A,meta:q,onSubItemMetaChange:F}),O)}if(!v&&!x&&!o)return N(ee(u));let W={};return typeof g=="string"?W.label=g:t&&(W.label=String(t)),h&&(W=Object.assign(Object.assign({},W),h)),N(s.createElement(St,Object.assign({},e,{messageVariables:W,trigger:M,validateTrigger:f,onMetaChange:C}),(O,L,T)=>{const B=le(t).length&&L?L.name:[],X=De(B,d),D=m!==void 0?m:!!(i&&i.some(R=>{if(R&&typeof R=="object"&&R.required&&!R.warningOnly)return!0;if(typeof R=="function"){const te=R(T);return te&&te.required&&!te.warningOnly}return!1})),G=Object.assign({},O);let K=null;if(Array.isArray(u)&&v)K=u;else if(!(x&&(!(a||o)||v))){if(!(o&&!x&&!v))if(It(u)){const R=Object.assign(Object.assign({},u.props),G);if(R.id||(R.id=X),I||z.length>0||A.length>0||e.extra){const Y=[];(I||z.length>0)&&Y.push(`${X}_help`),e.extra&&Y.push(`${X}_extra`),R["aria-describedby"]=Y.join(" ")}z.length>0&&(R["aria-invalid"]="true"),D&&(R["aria-required"]="true"),Et(u)&&(R.ref=k(B,u)),new Set([].concat(U(le(M)),U(le(f)))).forEach(Y=>{R[Y]=function(){for(var oe,Ce,me,ve,fe,we=arguments.length,pe=new Array(we),ae=0;ae<we;ae++)pe[ae]=arguments[ae];(me=G[Y])===null||me===void 0||(oe=me).call.apply(oe,[G].concat(pe)),(fe=(ve=u.props)[Y])===null||fe===void 0||(Ce=fe).call.apply(Ce,[ve].concat(pe))}});const re=[R["aria-required"],R["aria-invalid"],R["aria-describedby"]];K=s.createElement(Tn,{value:G[e.valuePropName||"value"],update:u,childProps:re},Ot(u,R))}else x&&(a||o)&&!v?K=u(T):K=u}return ee(K,X,D)}))}const Ue=_n;Ue.useStatus=hn;const Wn=Ue;var Hn=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const Vn=e=>{var{prefixCls:t,children:n}=e,r=Hn(e,["prefixCls","children"]);const{getPrefixCls:o}=s.useContext(ie),l=o("form",t),a=s.useMemo(()=>({prefixCls:l,status:"error"}),[l]);return s.createElement(Mt,Object.assign({},r),(i,c,m)=>s.createElement($e.Provider,{value:a},n(i.map(g=>Object.assign(Object.assign({},g),{fieldKey:g.key})),c,{errors:m.errors,warnings:m.warnings})))},qn=Vn;function zn(){const{form:e}=s.useContext(J);return e}const Z=pn;Z.Item=Wn;Z.List=qn;Z.ErrorList=Ae;Z.useForm=Ge;Z.useFormInstance=zn;Z.useWatch=jt;Z.Provider=We;Z.create=()=>{};const Bn=Z;export{Bn as F,Yt as R};
