import{r as n,n as d,C as u,o as p,j as f}from"./index-cb5f5546.js";function m(l,e){var i;const r=n.useRef(e);r.current=e;const t=n.useRef(((i=r.current)===null||i===void 0?void 0:i.call(r,l.data))||[]);return d.useSyncExternalStore(a=>{function o(){if(!r.current)a();else{const s=t.current,c=r.current(l.data);b(s,c)&&a(),t.current=c}}return l.subscribers.add(o),()=>{l.subscribers.delete(o)}},()=>l.data)}function b(l,e){if(l.length!==e.length)return!0;for(const i in e)if(l[i]!==e[i])return!0;return!1}function g(l){let e=null;function i(){if(!e)throw new Error("Failed to retrieve data from global container. Please make sure you have rendered HoxRoot.");return e}const r=n.memo(()=>{const[o]=n.useState(()=>new u(l));return e=o,o.data=l(),n.useEffect(()=>{o.notify()}),null});p(r);function t(o){return m(i(),o)}function a(){return i().data}return[t,a]}const w=["appreciate","check","close","edit","emoji","favorfill","favor","loading","locationfill","location","phone","roundcheckfill","roundcheck","roundclosefill","roundclose","roundrightfill","roundright","search","taxi","timefill","time","unfold","warnfill","warn","camerafill","camera","commentfill","comment","likefill","like","notificationfill","notification","order","samefill","same","deliver","evaluate","pay","send","shop","ticket","back","cascades","discover","list","more","scan","settings","questionfill","question","shopfill","form","pic","filter","footprint","top","pulldown","pullup","right","refresh","moreandroid","deletefill","refund","cart","qrcode","remind","delete","profile","home","cartfill","discoverfill","homefill","message","addressbook","link","lock","unlock","vip","weibo","activity","friendaddfill","friendadd","friendfamous","friend","goods","selection","explore","present","squarecheckfill","square","squarecheck","round","roundaddfill","roundadd","add","notificationforbidfill","explorefill","fold","game","redpacket","selectionfill","similar","appreciatefill","infofill","info","forwardfill","forward","rechargefill","recharge","vipcard","voice","voicefill","friendfavor","wifi","share","wefill","we","lightauto","lightforbid","lightfill","camerarotate","light","barcode","flashlightclose","flashlightopen","searchlist","service","sort","down","mobile","mobilefill","copy","countdownfill","countdown","noticefill","notice","upstagefill","upstage","babyfill","baby","brandfill","brand","choicenessfill","choiceness","clothesfill","clothes","creativefill","creative","female","keyboard","male","newfill","new","pullleft","pullright","rankfill","rank","bad","cameraadd","focus","friendfill","cameraaddfill","apps","paintfill","paint","picfill","refresharrow","colorlens","markfill","mark","presentfill","repeal","album","peoplefill","people","servicefill","repair","file","repairfill","taoxiaopu","weixin","attentionfill","attention","commandfill","command","communityfill","community","read","calendar","cut","magic","backwardfill","playfill","stop","tagfill","tag","group","all","backdelete","hotfill","hot","post","radiobox","rounddown","upload","writefill","write","radioboxfill","punch","shake","move","safe","activityfill","crownfill","crown","goodsfill","messagefill","profilefill","sound","sponsorfill","sponsor","upblock","weblock","weunblock","my","myfill","emojifill","emojiflashfill","flashbuyfill","text","goodsfavor","musicfill","musicforbidfill","card","triangledownfill","triangleupfill","roundleftfill-copy","font","title","recordfill","record","cardboardfill","cardboard","formfill","coin","cardboardforbid","circlefill","circle","attentionforbid","attentionforbidfill","attentionfavorfill","attentionfavor","titles","icloading","full","mail","peoplelist","goodsnewfill","goodsnew","medalfill","medal","newsfill","newshotfill","newshot","news","videofill","video","exit","skinfill","skin","moneybagfill","usefullfill","usefull","moneybag","redpacket_fill","subscription","loading1","github","global","settingsfill","back_android","expressman","evaluate_fill","group_fill","play_forward_fill","deliver_fill","notice_forbid_fill","fork","pick","wenzi","ellipse","qr_code","dianhua","cuIcon","loading2","btn"],k=({icon:l,size:e,color:i,onClick:r,style:t,className:a,isTransiton:o=!0})=>f.jsx(f.Fragment,{children:f.jsx("i",{className:`${o?"el-transition-color":""} cuIcon-${l} ${a??""}`,style:{fontSize:e+"px",color:i,...t},onClick:r})});export{k as C,g as a,w as c};
