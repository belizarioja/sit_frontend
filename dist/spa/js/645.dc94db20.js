(globalThis["webpackChunksit_frontend"]=globalThis["webpackChunksit_frontend"]||[]).push([[645],{5770:e=>{e.exports={endpoint_path_v2:"https://bck.factura-smart.com/",version:"2.0.0"}},2321:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>ie});var t=a(3673),o=a(2323),i=a(8880);const l={class:"my-font my-fondo q-pa-md"},r=(0,t._)("div",{class:"row"},[(0,t._)("span",{class:"text-secondary",style:{margin:"0 20px","font-size":"25px","font-weight":"bolder"}},"Asignaciones")],-1),n={class:"row"},d={class:"col",style:{position:"relative"}},c={style:{"margin-top":"20px",border:"solid 1px #ccc","border-radius":"5px",padding:"15px"}},u={class:"filtros"},m={class:"filtros"},p={class:"filtros"},h=(0,t._)("span",{class:"my-fondo",style:{position:"absolute",top:"9px",left:"20px",color:"#ccc"}},"Filtrado por:",-1),j={class:"row"},f={style:{display:"inline"}},b=(0,t._)("div",{class:"text-h6",style:{"text-align":"center"}},"Actualizar fecha inicio",-1),_={class:"row items-center justify-end"},g={style:{display:"flex","justify-content":"space-around"}},v={class:"q-pa-sm"},y={class:"tituloDrawer"},w=(0,t._)("div",{style:{margin:"0 20px","font-size":"25px","font-weight":"bolder"}},"Filtros",-1),k={style:{margin:"20px 5px",border:"solid 1px #ccc","border-radius":"5px",padding:"15px",position:"relative"}},x=(0,t._)("span",{class:"bg-white",style:{position:"absolute",top:"-12px",left:"10px",color:"#ccc"}},"Fechas:",-1),z={style:{display:"flex","justify-content":"space-around"}},Y=["value"],D=["value"],M={style:{margin:"20px 5px",border:"solid 1px #ccc","border-radius":"5px",padding:"15px",position:"relative"}},F=(0,t._)("span",{class:"bg-white",style:{position:"absolute",top:"-12px",left:"10px",color:"#ccc"}},"Cliente emisor:",-1),C={class:"text-center"};function q(e,s,a,q,W,V){const T=(0,t.up)("q-icon"),S=(0,t.up)("q-input"),Z=(0,t.up)("q-btn"),E=(0,t.up)("q-td"),U=(0,t.up)("q-table"),P=(0,t.up)("q-card-section"),Q=(0,t.up)("q-date"),L=(0,t.up)("q-popup-proxy"),O=(0,t.up)("q-card"),A=(0,t.up)("q-dialog"),H=(0,t.up)("q-select"),N=(0,t.up)("q-scroll-area"),I=(0,t.up)("q-drawer"),J=(0,t.Q2)("close-popup");return(0,t.wg)(),(0,t.iD)("div",l,[r,(0,t._)("div",n,[(0,t._)("div",d,[(0,t._)("div",c,[(0,t._)("span",u,"Desde: "+(0,o.zw)(q.dateFrom),1),(0,t._)("span",m,"Hasta: "+(0,o.zw)(q.dateTo),1),(0,t._)("span",p,"Cliente emisor: "+(0,o.zw)(q.clienteEmisorfilter),1)]),h])]),(0,t._)("div",j,[(0,t.Wm)(U,{dense:"",rows:W.rowstodos,columns:W.columnsdetails,"row-key":"num",pagination:q.pagination,filter:q.filterTable,style:{width:"100%","margin-top":"40px"},"no-data-label":"No hay registros!"},{"top-left":(0,t.w5)((()=>[(0,t.Wm)(S,{dense:"",debounce:"300",color:"primary",modelValue:q.filterTable,"onUpdate:modelValue":s[0]||(s[0]=e=>q.filterTable=e),placeholder:"Buscar"},{append:(0,t.w5)((()=>[(0,t.Wm)(T,{name:"search"})])),_:1},8,["modelValue"])])),"top-right":(0,t.w5)((()=>[(0,t._)("div",f,[(0,t.Wm)(Z,{"icon-right":"filter_alt",class:"q-ml-sm col-md-4 col-sm-3 col-xs-3",color:"secondary",label:"Filtrar",onClick:s[1]||(s[1]=e=>q.drawerFilters=!0)})])])),"body-cell-edit":(0,t.w5)((e=>[(0,t.Wm)(E,{props:e},{default:(0,t.w5)((()=>[(0,t._)("div",null,[(0,t.Wm)(Z,{color:"secondary",icon:"edit",onClick:(0,i.iM)((s=>V.btnOpenUpd(e.row)),["stop"]),dense:""},null,8,["onClick"])])])),_:2},1032,["props"])])),_:1},8,["rows","columns","pagination","filter"]),(0,t.Wm)(A,{modelValue:W.modalactualizar,"onUpdate:modelValue":s[4]||(s[4]=e=>W.modalactualizar=e),persistent:""},{default:(0,t.w5)((()=>[(0,t.Wm)(O,null,{default:(0,t.w5)((()=>[(0,t.Wm)(P,null,{default:(0,t.w5)((()=>[b])),_:1}),(0,t.Wm)(P,{class:"q-pt-none"},{default:(0,t.w5)((()=>[(0,t._)("div",null,[(0,t.Wm)(S,{dense:"",filled:"",label:"Fecha",mask:"date",modelValue:q.dateProd,"onUpdate:modelValue":s[3]||(s[3]=e=>q.dateProd=e),style:{padding:"5px"}},{append:(0,t.w5)((()=>[(0,t.Wm)(T,{name:"event",class:"cursor-pointer"},{default:(0,t.w5)((()=>[(0,t.Wm)(L,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,t.w5)((()=>[(0,t.Wm)(Q,{modelValue:q.dateProd,"onUpdate:modelValue":s[2]||(s[2]=e=>q.dateProd=e),locale:q.myLocale},{default:(0,t.w5)((()=>[(0,t._)("div",_,[(0,t.wy)((0,t.Wm)(Z,{label:"Close",color:"primary",flat:""},null,512),[[J]])])])),_:1},8,["modelValue","locale"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])])),_:1}),(0,t.Wm)(P,{class:"q-pt-none"},{default:(0,t.w5)((()=>[(0,t._)("div",g,[(0,t.wy)((0,t.Wm)(Z,{color:"negative",label:"Cancelar"},null,512),[[J]]),(0,t.Wm)(Z,{color:"secondary",label:"Aceptar",onClick:V.actualizar},null,8,["onClick"])])])),_:1})])),_:1})])),_:1},8,["modelValue"])]),(0,t.Wm)(I,{modelValue:q.drawerFilters,"onUpdate:modelValue":s[10]||(s[10]=e=>q.drawerFilters=e),side:"right",width:300,breakpoint:700,overlay:"",elevated:"",class:"bg-white text-secondary"},{default:(0,t.w5)((()=>[(0,t.Wm)(N,{class:"fit"},{default:(0,t.w5)((()=>[(0,t._)("div",v,[(0,t._)("div",y,[w,(0,t.Wm)(T,{color:"red",name:"close",onClick:s[5]||(s[5]=e=>q.drawerFilters=!1),class:"cursor-pointer",style:{"font-size":"x-large"}})]),(0,t._)("div",k,[x,(0,t._)("div",z,[(0,t._)("input",{class:"inputDate fecha1",type:"date",id:"desde",value:q.dateFrom},null,8,Y),(0,t._)("input",{class:"inputDate fecha2",type:"date",id:"hasta",value:q.dateTo},null,8,D)])]),(0,t._)("div",M,[F,"1"===q.co_rol||"2"===q.co_rol?((0,t.wg)(),(0,t.j4)(H,{key:0,label:"Agregue Nombre o RIF",dense:"",class:"col-md-3 col-sm-12 col-xs-12",filled:"",modelValue:e.modelsede,"onUpdate:modelValue":[s[6]||(s[6]=s=>e.modelsede=s),s[7]||(s[7]=e=>V.changeSede())],disable:e.disabledSede,"use-input":"","hide-selected":"","fill-input":"",clearable:"","options-dense":"","option-label":"namerif","option-value":"cod","input-debounce":"0",options:W.optionssede,"onInput:":s[8]||(s[8]=e=>V.changeSede()),onFilter:V.searchEmisor,style:{padding:"5px"}},null,8,["modelValue","disable","options","onFilter"])):(0,t.kq)("",!0)]),(0,t._)("div",C,[(0,t.Wm)(Z,{label:"Cerrar",color:"negative",onClick:s[9]||(s[9]=e=>q.drawerFilters=!1)})])])])),_:1})])),_:1},8,["modelValue"])])}a(4564);var W=a(1959),V=a(4434),T=a(52),S=a.n(T),Z=a(1488),E=a.n(Z);const U=a(5770),P=U.endpoint_path_v2,Q={setup(){return{myLocale:{days:"Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),daysShort:"Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:"Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),firstDayOfWeek:1,format24h:!0,pluralDay:"dias"},drawerFilters:(0,W.iH)(!1),co_rol:sessionStorage.getItem("co_rol"),dateFrom:(0,W.iH)(E()().format("YYYY-MM-DD")),dateTo:(0,W.iH)(E()().format("YYYY-MM-DD")),dateProd:(0,W.iH)(E()().format("YYYY-MM-DD")),loading:(0,W.iH)(!1),clienteEmisorfilter:(0,W.iH)("Todos"),filterTable:(0,W.iH)(""),pagination:{page:1,rowsPerPage:20}}},data(){return{columnsdetails:[{name:"num",align:"center",label:"#",field:"num"},{name:"fecha",align:"center",label:"Fecha",field:"fecha"},{name:"usuario",align:"left",label:"Usuario",field:"usuario"},{name:"razonsocial",align:"left",label:"Cliente Emisor",field:"razonsocial"},{name:"cantidad",align:"left",label:"Cantidad",field:"cantidad"},{name:"soportefactura",align:"center",label:"N° Factura",field:"soportefactura"},{name:"fechaproduccion",align:"center",label:"Fecha inicio",field:"fechaproduccion"},{name:"inicia",align:"center",label:"Inicia",field:"inicia"},{name:"termina",align:"center",label:"Termina",field:"termina"},{name:"estatus",align:"center",label:"Estatus",field:"estatus"},{name:"edit",label:"Editar",field:"edit"}],rowstodos:[],modelusuario:[],optionsusuarios:[],optionssede:[],modalactualizar:!1}},methods:{btnOpenUpd(e){this.idUpd=e.id,this.modalactualizar=!0},actualizar(){const e={fechaproduccion:this.dateProd};S().put(P+"asignaciones/"+this.idUpd,e),this.modalactualizar=!1,this.listar()},listarsedes(){S().get(P+"sede").then((async e=>{const s=e.data.data;this.optionssede=[];for(const a in s)if(s[a].razonsocial.length>0){const e={};e.cod=s[a].id,e.name=s[a].razonsocial,e.rif=s[a].rif,e.namerif=s[a].razonsocial+" "+s[a].rif,e.tokenservicios=s[a].tokenservicios,this.optionssede.push(e)}this.emisores=this.optionssede})).catch((e=>{V.Z.create("Problemas al listar Sedes "+e)}))},searchEmisor(e,s,a){e.length<3?a():s((()=>{if(""===e)this.optionssede=this.emisores;else{const s=e.toLowerCase();this.optionssede=this.emisores.filter((e=>e.namerif.toLowerCase().indexOf(s)>-1))}}))},searchUsuario(e,s,a){s((()=>{if(""===e)this.optionsusuarios=this.usuarios;else{const s=e.toLowerCase();this.optionsusuarios=this.usuarios.filter((e=>e.nameuser.toLowerCase().indexOf(s)>-1))}}))},listarusuarios(){S().get(P+"usuario").then((async e=>{const s=e.data.resp;this.optionsusuarios=[];for(const a in s){const e={};e.cod=s[a].id,e.name=s[a].nombre,e.usuario=s[a].usuario,e.nameuser=s[a].usuario+" "+s[a].nombre,this.optionsusuarios.push(e),this.usuarios=this.optionsusuarios}})).catch((e=>{V.Z.create("Problemas al listar Usuarios "+e)}))},changeSede(){this.disable=!0,this.idserviciosmasivo=this.modelsede?.cod,this.serviciosmasivo=this.modelsede?.namerif,this.clienteEmisorfilter="Todos",this.modelsede?.cod&&(this.disable=!1,this.clienteEmisorfilter=this.modelsede?.name),this.listar()},listar(){const e=E()(this.dateFrom,"YYYY/MM/DD").format("YYYY-MM-DD"),s=E()(this.dateTo,"YYYY/MM/DD").format("YYYY-MM-DD"),a={idserviciosmasivo:this.modelsede?.cod,idusuario:this.modelusuario?.cod,desde:e,hasta:s};S().post(P+"asignaciones/listar",a).then((async e=>{const s=e.data.data;console.log(s),this.rowstodos=[];let a=0;for(const t in s.reverse()){const e={};a=Number(a)+Number(1),e.num=a,e.id=s[t].id,e.idserviciosmasivo=s[t].idserviciosmasivo,e.razonsocial=s[t].razonsocial,e.idusuario=s[t].idusuario,e.usuario=s[t].usuario,e.cantidad=s[t].cantidad,e.inicia=s[t].inicia,e.termina=s[t].termina,e.estatus=s[t].estatus,e.fechaproduccion=s[t].fechaproduccion?E()(s[t].fechaproduccion).format("DD/MM/YYYY"):"S/Inf",e.soportefactura=s[t].soportefactura,e.fecha=E()(s[t].fecha).format("DD/MM/YYYY HH:mm:ss"),this.rowstodos.push(e)}})).catch((e=>{V.Z.create("Problemas al listar Tranzas Asignaciones "+e)}))}},watch:{dateFrom:function(e){console.log(e),this.listar()},dateTo:function(e){console.log(e),this.listar()}},mounted(){"1"!==this.co_rol&&"2"!==this.co_rol&&this.$router.push("/erroracceso"),this.listar(),this.listarsedes();const e=document.querySelector(".fecha1"),s=document.querySelector(".fecha2");e.addEventListener("change",(s=>{this.dateFrom=e.value,this.listarfacturas()})),s.addEventListener("change",(e=>{this.dateTo=s.value,this.listarfacturas()}))}};var L=a(4260),O=a(4993),A=a(4842),H=a(4554),N=a(2165),I=a(3884),J=a(6778),B=a(151),R=a(5589),$=a(3944),G=a(3124),K=a(2901),X=a(7704),ee=a(8516),se=a(677),ae=a(7518),te=a.n(ae);const oe=(0,L.Z)(Q,[["render",q]]),ie=oe;te()(Q,"components",{QTable:O.Z,QInput:A.Z,QIcon:H.Z,QBtn:N.Z,QTd:I.Z,QDialog:J.Z,QCard:B.Z,QCardSection:R.Z,QPopupProxy:$.Z,QDate:G.Z,QDrawer:K.Z,QScrollArea:X.Z,QSelect:ee.Z}),te()(Q,"directives",{ClosePopup:se.Z})},6700:(e,s,a)=>{var t={"./af":5809,"./af.js":5809,"./ar":6069,"./ar-dz":481,"./ar-dz.js":481,"./ar-kw":3994,"./ar-kw.js":3994,"./ar-ly":3312,"./ar-ly.js":3312,"./ar-ma":239,"./ar-ma.js":239,"./ar-ps":7916,"./ar-ps.js":7916,"./ar-sa":1863,"./ar-sa.js":1863,"./ar-tn":9607,"./ar-tn.js":9607,"./ar.js":6069,"./az":9281,"./az.js":9281,"./be":9945,"./be.js":9945,"./bg":9384,"./bg.js":9384,"./bm":1476,"./bm.js":1476,"./bn":3345,"./bn-bd":216,"./bn-bd.js":216,"./bn.js":3345,"./bo":1713,"./bo.js":1713,"./br":9655,"./br.js":9655,"./bs":7296,"./bs.js":7296,"./ca":3049,"./ca.js":3049,"./cs":2722,"./cs.js":2722,"./cv":8039,"./cv.js":8039,"./cy":5563,"./cy.js":5563,"./da":1960,"./da.js":1960,"./de":7533,"./de-at":6674,"./de-at.js":6674,"./de-ch":7732,"./de-ch.js":7732,"./de.js":7533,"./dv":8343,"./dv.js":8343,"./el":7004,"./el.js":7004,"./en-au":2517,"./en-au.js":2517,"./en-ca":4929,"./en-ca.js":4929,"./en-gb":9722,"./en-gb.js":9722,"./en-ie":6923,"./en-ie.js":6923,"./en-il":8050,"./en-il.js":8050,"./en-in":9624,"./en-in.js":9624,"./en-nz":540,"./en-nz.js":540,"./en-sg":4375,"./en-sg.js":4375,"./eo":40,"./eo.js":40,"./es":9720,"./es-do":5595,"./es-do.js":5595,"./es-mx":180,"./es-mx.js":180,"./es-us":1563,"./es-us.js":1563,"./es.js":9720,"./et":9217,"./et.js":9217,"./eu":9474,"./eu.js":9474,"./fa":5243,"./fa.js":5243,"./fi":7645,"./fi.js":7645,"./fil":5350,"./fil.js":5350,"./fo":5622,"./fo.js":5622,"./fr":1467,"./fr-ca":3439,"./fr-ca.js":3439,"./fr-ch":4335,"./fr-ch.js":4335,"./fr.js":1467,"./fy":6026,"./fy.js":6026,"./ga":2969,"./ga.js":2969,"./gd":1347,"./gd.js":1347,"./gl":1085,"./gl.js":1085,"./gom-deva":904,"./gom-deva.js":904,"./gom-latn":9597,"./gom-latn.js":9597,"./gu":8705,"./gu.js":8705,"./he":9128,"./he.js":9128,"./hi":2821,"./hi.js":2821,"./hr":9002,"./hr.js":9002,"./hu":4814,"./hu.js":4814,"./hy-am":658,"./hy-am.js":658,"./id":9344,"./id.js":9344,"./is":8204,"./is.js":8204,"./it":376,"./it-ch":1549,"./it-ch.js":1549,"./it.js":376,"./ja":9293,"./ja.js":9293,"./jv":6401,"./jv.js":6401,"./ka":482,"./ka.js":482,"./kk":7329,"./kk.js":7329,"./km":4241,"./km.js":4241,"./kn":3566,"./kn.js":3566,"./ko":2742,"./ko.js":2742,"./ku":2915,"./ku-kmr":2346,"./ku-kmr.js":2346,"./ku.js":2915,"./ky":6846,"./ky.js":6846,"./lb":4959,"./lb.js":4959,"./lo":2188,"./lo.js":2188,"./lt":8967,"./lt.js":8967,"./lv":1245,"./lv.js":1245,"./me":751,"./me.js":751,"./mi":7501,"./mi.js":7501,"./mk":1643,"./mk.js":1643,"./ml":5597,"./ml.js":5597,"./mn":7893,"./mn.js":7893,"./mr":9065,"./mr.js":9065,"./ms":4703,"./ms-my":4645,"./ms-my.js":4645,"./ms.js":4703,"./mt":4365,"./mt.js":4365,"./my":3788,"./my.js":3788,"./nb":7357,"./nb.js":7357,"./ne":9109,"./ne.js":9109,"./nl":3746,"./nl-be":1985,"./nl-be.js":1985,"./nl.js":3746,"./nn":7175,"./nn.js":7175,"./oc-lnc":566,"./oc-lnc.js":566,"./pa-in":2733,"./pa-in.js":2733,"./pl":182,"./pl.js":182,"./pt":505,"./pt-br":7839,"./pt-br.js":7839,"./pt.js":505,"./ro":9578,"./ro.js":9578,"./ru":2328,"./ru.js":2328,"./sd":641,"./sd.js":641,"./se":1758,"./se.js":1758,"./si":6680,"./si.js":6680,"./sk":5016,"./sk.js":5016,"./sl":7424,"./sl.js":7424,"./sq":8635,"./sq.js":8635,"./sr":9038,"./sr-cyrl":3716,"./sr-cyrl.js":3716,"./sr.js":9038,"./ss":4771,"./ss.js":4771,"./sv":3517,"./sv.js":3517,"./sw":9419,"./sw.js":9419,"./ta":5959,"./ta.js":5959,"./te":1739,"./te.js":1739,"./tet":2264,"./tet.js":2264,"./tg":4792,"./tg.js":4792,"./th":8328,"./th.js":8328,"./tk":702,"./tk.js":702,"./tl-ph":7814,"./tl-ph.js":7814,"./tlh":797,"./tlh.js":797,"./tr":6691,"./tr.js":6691,"./tzl":6891,"./tzl.js":6891,"./tzm":6362,"./tzm-latn":7855,"./tzm-latn.js":7855,"./tzm.js":6362,"./ug-cn":7606,"./ug-cn.js":7606,"./uk":513,"./uk.js":513,"./ur":3803,"./ur.js":3803,"./uz":344,"./uz-latn":8957,"./uz-latn.js":8957,"./uz.js":344,"./vi":3,"./vi.js":3,"./x-pseudo":8842,"./x-pseudo.js":8842,"./yo":2083,"./yo.js":2083,"./zh-cn":4536,"./zh-cn.js":4536,"./zh-hk":2475,"./zh-hk.js":2475,"./zh-mo":7593,"./zh-mo.js":7593,"./zh-tw":4746,"./zh-tw.js":4746};function o(e){var s=i(e);return a(s)}function i(e){if(!a.o(t,e)){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}return t[e]}o.keys=function(){return Object.keys(t)},o.resolve=i,e.exports=o,o.id=6700}}]);