(()=>{"use strict";var e={9942:(e,t,r)=>{var n=r(8880),o=r(9592),a=r(3673);function i(e,t,r,n,o,i){const l=(0,a.up)("router-view");return(0,a.wg)(),(0,a.j4)(l)}const l=(0,a.aZ)({name:"App"});var s=r(4260);const d=(0,s.Z)(l,[["render",i]]),c=d;var u=r(3340),p=r(8339);const h=[{path:"/",component:()=>Promise.all([r.e(736),r.e(557)]).then(r.bind(r,942))},{path:"/emisores",component:()=>Promise.all([r.e(736),r.e(522)]).then(r.bind(r,4522))},{path:"/viewqrinvoice/:qrinvoice",component:()=>Promise.all([r.e(736),r.e(346)]).then(r.bind(r,3038))},{path:"/dashboard",component:()=>Promise.all([r.e(736),r.e(181)]).then(r.bind(r,7181)),children:[{path:"/dashboard",component:()=>Promise.all([r.e(736),r.e(361)]).then(r.bind(r,54))},{path:"/usuarios",component:()=>Promise.all([r.e(736),r.e(401)]).then(r.bind(r,4685))},{path:"/sedes",component:()=>Promise.all([r.e(736),r.e(705)]).then(r.bind(r,7309))},{path:"/simulador",component:()=>Promise.all([r.e(736),r.e(384)]).then(r.bind(r,9805))},{path:"/simulador2",component:()=>Promise.all([r.e(736),r.e(576)]).then(r.bind(r,8576))},{path:"/simuladorAsignacion",component:()=>Promise.all([r.e(736),r.e(490)]).then(r.bind(r,8008))},{path:"/tranzasAsignacion",component:()=>Promise.all([r.e(736),r.e(790)]).then(r.bind(r,5223))},{path:"/reportes",component:()=>Promise.all([r.e(736),r.e(391)]).then(r.bind(r,9057))},{path:"/consulta",component:()=>Promise.all([r.e(736),r.e(314)]).then(r.bind(r,8017))},{path:"/anulaciones",component:()=>Promise.all([r.e(736),r.e(386)]).then(r.bind(r,9653))},{path:"/auditorias",component:()=>Promise.all([r.e(736),r.e(956)]).then(r.bind(r,1506))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(193)]).then(r.bind(r,2193))}],f=h,m=(0,u.BC)((function(){const e=p.r5,t=(0,p.p7)({scrollBehavior:()=>({left:0,top:0}),routes:f,history:e("")});return t}));async function b(e,t){const r="function"===typeof m?await m({}):m,n=e(c);return n.use(o.Z,t),{app:n,router:r}}var v=r(1509),g=r(4434);const y={config:{},plugins:{Dialog:v.Z,Notify:g.Z}};async function P({app:e,router:t}){e.use(t),e.mount("#q-app")}b(n.ri,y).then(P)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=e,(()=>{var e=[];r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,o,a]=e[c],l=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(l=!1,a<i&&(i=a));if(l){e.splice(c--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"===typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"===typeof n.then)return n}var a=Object.create(null);r.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var l=2&o&&n;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((e=>i[e]=()=>n[e]));return i["default"]=()=>n,r.d(a,i),a}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{181:"51263696",193:"3a5475a8",314:"ca222ea5",346:"911cd9fc",361:"7adf1ad4",384:"2a3ee387",386:"12f2658c",391:"564c80d0",401:"93e0455d",490:"9521a7d8",522:"9c9462d5",557:"88a893d2",576:"08a7af15",705:"e50ca738",790:"cff9249f",956:"94173f75"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+"."+{143:"21d584d8",314:"68aeec55",346:"3a46fe20",361:"e59a908d",386:"3d04fe58",391:"b59ba4f5",522:"2f6ef0dc",557:"a6559bb5",736:"d6ed3614",790:"c8749e5a",956:"c8749e5a"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="sit_frontend:";r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var l,s;if(void 0!==a)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+a){l=u;break}}l||(s=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.setAttribute("data-webpack",t+a),l.src=n),e[n]=[o];var p=(t,r)=>{l.onerror=l.onload=null,clearTimeout(h);var o=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((e=>e(r))),t)return t(r)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),s&&document.head.appendChild(l)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=a=>{if(o.onerror=o.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=l,o.parentNode.removeChild(o),n(s)}};return o.onerror=o.onload=a,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=r[n],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],a=o.getAttribute("data-href");if(a===e||a===t)return o}},n=n=>new Promise(((o,a)=>{var i=r.miniCssF(n),l=r.p+i;if(t(i,l))return o();e(n,l,o,a)})),o={143:0};r.f.miniCss=(e,t)=>{var r={314:1,346:1,361:1,386:1,391:1,522:1,557:1,790:1,956:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=n(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((r,n)=>o=e[t]=[r,n]));n.push(o[2]=a);var i=r.p+r.u(t),l=new Error,s=n=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,o[1](l)}};r.l(i,s,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,l,s]=n,d=0;if(i.some((t=>0!==e[t]))){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(s)var c=s(r)}for(t&&t(n);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return r.O(c)},n=globalThis["webpackChunksit_frontend"]=globalThis["webpackChunksit_frontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[736],(()=>r(9942)));n=r.O(n)})();