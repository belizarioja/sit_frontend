(globalThis["webpackChunksit_frontend"]=globalThis["webpackChunksit_frontend"]||[]).push([[258],{5770:e=>{e.exports={endpoint_path_v2:"https://bck.factura-smart.com/",version:"1.0.2"}},9687:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>Q});var o=a(3673),t=a(8880);const i={class:"q-pa-md"},l=(0,o._)("div",{class:"row"},[(0,o._)("span",{style:{margin:"0 20px","font-size":"25px","font-weight":"bolder"}},"Asignaciones")],-1),n={class:"row"},r={class:"row items-center justify-end"},d={class:"row items-center justify-end"},c=(0,o._)("div",{class:"text-h6",style:{"text-align":"center"}},"Actualizar Fecha Inicio",-1),u={class:"row items-center justify-end"},m={style:{"text-align":"center"}};function p(e,s,a,p,j,h){const f=(0,o.up)("q-select"),b=(0,o.up)("q-btn"),_=(0,o.up)("q-date"),g=(0,o.up)("q-popup-proxy"),v=(0,o.up)("q-icon"),w=(0,o.up)("q-input"),y=(0,o.up)("q-td"),k=(0,o.up)("q-table"),z=(0,o.up)("q-card-section"),Y=(0,o.up)("q-card"),D=(0,o.up)("q-dialog"),V=(0,o.Q2)("close-popup");return(0,o.wg)(),(0,o.iD)("div",i,[l,(0,o._)("div",n,["1"===p.co_rol||"2"===p.co_rol?((0,o.wg)(),(0,o.j4)(f,{key:0,label:"Buscar por Nombre o RIF del Emisor",dense:"",class:"col-md-4 col-sm-6 col-xs-12",filled:"",modelValue:e.modelsede,"onUpdate:modelValue":[s[0]||(s[0]=s=>e.modelsede=s),s[1]||(s[1]=e=>h.changeSede())],disable:e.disabledSede,"use-input":"","hide-selected":"","fill-input":"",clearable:"","options-dense":"","option-label":"namerif","option-value":"cod","input-debounce":"0",options:j.optionssede,"onInput:":s[2]||(s[2]=e=>h.changeSede()),onFilter:h.searchEmisor,style:{padding:"5px"}},null,8,["modelValue","disable","options","onFilter"])):(0,o.kq)("",!0),(0,o.Wm)(f,{label:"Buscar por Nombre o Username del usuario",dense:"",class:"col-md-4 col-sm-6 col-xs-12",filled:"",modelValue:j.modelusuario,"onUpdate:modelValue":[s[3]||(s[3]=e=>j.modelusuario=e),s[4]||(s[4]=e=>h.listar())],"use-input":"","hide-selected":"","fill-input":"",clearable:"","options-dense":"","option-label":"nameuser","option-value":"cod","input-debounce":"0",options:j.optionsusuarios,"onInput:":s[5]||(s[5]=e=>h.listar()),onFilter:h.searchUsuario,style:{padding:"5px"}},null,8,["modelValue","options","onFilter"]),(0,o.Wm)(w,{dense:"",filled:"",label:"Desde",mask:"date",modelValue:p.dateFrom,"onUpdate:modelValue":s[7]||(s[7]=e=>p.dateFrom=e),class:"col-md-2 col-sm-6 col-xs-6",style:{padding:"5px"}},{append:(0,o.w5)((()=>[(0,o.Wm)(v,{name:"event",class:"cursor-pointer"},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,o.w5)((()=>[(0,o.Wm)(_,{modelValue:p.dateFrom,"onUpdate:modelValue":s[6]||(s[6]=e=>p.dateFrom=e),locale:p.myLocale},{default:(0,o.w5)((()=>[(0,o._)("div",r,[(0,o.wy)((0,o.Wm)(b,{label:"Close",color:"primary",flat:""},null,512),[[V]])])])),_:1},8,["modelValue","locale"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,o.Wm)(w,{dense:"",filled:"",label:"Hasta",modelValue:p.dateTo,"onUpdate:modelValue":s[9]||(s[9]=e=>p.dateTo=e),class:"col-md-2 col-sm-6 col-xs-6",style:{padding:"5px"},mask:"date"},{append:(0,o.w5)((()=>[(0,o.Wm)(v,{name:"event",class:"cursor-pointer"},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,o.w5)((()=>[(0,o.Wm)(_,{modelValue:p.dateTo,"onUpdate:modelValue":s[8]||(s[8]=e=>p.dateTo=e),locale:p.myLocale},{default:(0,o.w5)((()=>[(0,o._)("div",d,[(0,o.wy)((0,o.Wm)(b,{label:"Close",color:"primary",flat:""},null,512),[[V]])])])),_:1},8,["modelValue","locale"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,o.Wm)(k,{dense:"",rows:j.rowstodos,title:"Tranzas",columns:j.columnsdetails,"row-key":"num",pagination:p.pagination,style:{width:"100%","margin-top":"40px"}},{"body-cell-edit":(0,o.w5)((e=>[(0,o.Wm)(y,{props:e},{default:(0,o.w5)((()=>[(0,o._)("div",null,[(0,o.Wm)(b,{color:"secondary",icon:"edit",onClick:(0,t.iM)((s=>h.btnOpenUpd(e.row)),["stop"]),dense:""},null,8,["onClick"])])])),_:2},1032,["props"])])),_:1},8,["rows","columns","pagination"]),(0,o.Wm)(D,{modelValue:j.modalactualizar,"onUpdate:modelValue":s[12]||(s[12]=e=>j.modalactualizar=e),persistent:""},{default:(0,o.w5)((()=>[(0,o.Wm)(Y,null,{default:(0,o.w5)((()=>[(0,o.Wm)(z,null,{default:(0,o.w5)((()=>[c])),_:1}),(0,o.Wm)(z,{class:"q-pt-none"},{default:(0,o.w5)((()=>[(0,o._)("div",null,[(0,o.Wm)(w,{dense:"",filled:"",label:"Fecha",mask:"date",modelValue:p.dateProd,"onUpdate:modelValue":s[11]||(s[11]=e=>p.dateProd=e),style:{padding:"5px"}},{append:(0,o.w5)((()=>[(0,o.Wm)(v,{name:"event",class:"cursor-pointer"},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{cover:"","transition-show":"scale","transition-hide":"scale"},{default:(0,o.w5)((()=>[(0,o.Wm)(_,{modelValue:p.dateProd,"onUpdate:modelValue":s[10]||(s[10]=e=>p.dateProd=e),locale:p.myLocale},{default:(0,o.w5)((()=>[(0,o._)("div",u,[(0,o.wy)((0,o.Wm)(b,{label:"Close",color:"primary",flat:""},null,512),[[V]])])])),_:1},8,["modelValue","locale"])])),_:1})])),_:1})])),_:1},8,["modelValue"])])])),_:1}),(0,o.Wm)(z,{class:"q-pt-none"},{default:(0,o.w5)((()=>[(0,o._)("div",m,[(0,o.wy)((0,o.Wm)(b,{flat:"",label:"Cancel"},null,512),[[V]]),(0,o.Wm)(b,{color:"primary",label:"Aceptar",onClick:h.actualizar},null,8,["onClick"])])])),_:1})])),_:1})])),_:1},8,["modelValue"])])])}a(5663);var j=a(1959),h=a(6417),f=a(52),b=a.n(f),_=a(1488),g=a.n(_);const v=a(5770),w=v.endpoint_path_v2,y={setup(){return{myLocale:{days:"Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split("_"),daysShort:"Dom_Lun_Mar_Mié_Jue_Vie_Sáb".split("_"),months:"Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split("_"),monthsShort:"Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic".split("_"),firstDayOfWeek:1,format24h:!0,pluralDay:"dias"},filter:(0,j.iH)(""),co_rol:sessionStorage.getItem("co_rol"),dateFrom:(0,j.iH)(g()().format("YYYY-MM-DD")),dateTo:(0,j.iH)(g()().format("YYYY-MM-DD")),dateProd:(0,j.iH)(g()().format("YYYY-MM-DD")),loading:(0,j.iH)(!1),pagination:{page:1,rowsPerPage:20}}},data(){return{columnsdetails:[{name:"num",align:"center",label:"#",field:"num"},{name:"fecha",align:"center",label:"Fecha",field:"fecha"},{name:"usuario",align:"left",label:"Usuario",field:"usuario"},{name:"razonsocial",align:"left",label:"Cliente Emisor",field:"razonsocial"},{name:"cantidad",align:"left",label:"Cantidad",field:"cantidad"},{name:"soportefactura",align:"center",label:"N° Factura",field:"soportefactura"},{name:"fechaproduccion",align:"center",label:"Fecha inicio",field:"fechaproduccion"},{name:"inicia",align:"center",label:"Inicia",field:"inicia"},{name:"termina",align:"center",label:"Termina",field:"termina"},{name:"estatus",align:"center",label:"Estatus",field:"estatus"},{name:"edit",label:"Editar",field:"edit"}],rowstodos:[],modelusuario:[],optionsusuarios:[],optionssede:[],modalactualizar:!1}},methods:{btnOpenUpd(e){this.idUpd=e.id,this.modalactualizar=!0},actualizar(){const e={fechaproduccion:this.dateProd};b().put(w+"asignaciones/"+this.idUpd,e),this.modalactualizar=!1,this.listar()},listarsedes(){b().get(w+"sede").then((async e=>{const s=e.data.data;this.optionssede=[];for(const a in s)if(s[a].razonsocial.length>0){const e={};e.cod=s[a].id,e.name=s[a].razonsocial,e.rif=s[a].rif,e.namerif=s[a].razonsocial+" "+s[a].rif,e.tokenservicios=s[a].tokenservicios,this.optionssede.push(e)}this.emisores=this.optionssede})).catch((e=>{h.Z.create("Problemas al listar Sedes "+e)}))},searchEmisor(e,s,a){e.length<3?a():s((()=>{if(""===e)this.optionssede=this.emisores;else{const s=e.toLowerCase();this.optionssede=this.emisores.filter((e=>e.namerif.toLowerCase().indexOf(s)>-1))}}))},searchUsuario(e,s,a){s((()=>{if(""===e)this.optionsusuarios=this.usuarios;else{const s=e.toLowerCase();this.optionsusuarios=this.usuarios.filter((e=>e.nameuser.toLowerCase().indexOf(s)>-1))}}))},listarusuarios(){b().get(w+"usuario").then((async e=>{const s=e.data.resp;this.optionsusuarios=[];for(const a in s){const e={};e.cod=s[a].id,e.name=s[a].nombre,e.usuario=s[a].usuario,e.nameuser=s[a].usuario+" "+s[a].nombre,this.optionsusuarios.push(e),this.usuarios=this.optionsusuarios}})).catch((e=>{h.Z.create("Problemas al listar Usuarios "+e)}))},changeSede(){this.disable=!0,this.idserviciosmasivo=this.modelsede?.cod,this.serviciosmasivo=this.modelsede?.namerif,this.modelsede?.cod&&(this.disable=!1),this.listar()},listar(){const e=g()(this.dateFrom,"YYYY/MM/DD").format("YYYY-MM-DD"),s=g()(this.dateTo,"YYYY/MM/DD").format("YYYY-MM-DD"),a={idserviciosmasivo:this.modelsede?.cod,idusuario:this.modelusuario?.cod,desde:e,hasta:s};b().post(w+"asignaciones/listar",a).then((async e=>{const s=e.data.data;console.log(s),this.rowstodos=[];let a=0;for(const o in s.reverse()){const e={};a=Number(a)+Number(1),e.num=a,e.id=s[o].id,e.idserviciosmasivo=s[o].idserviciosmasivo,e.razonsocial=s[o].razonsocial,e.idusuario=s[o].idusuario,e.usuario=s[o].usuario,e.cantidad=s[o].cantidad,e.inicia=s[o].inicia,e.termina=s[o].termina,e.estatus=s[o].estatus,e.fechaproduccion=s[o].fechaproduccion?g()(s[o].fechaproduccion).format("DD/MM/YYYY"):"S/Inf",e.soportefactura=s[o].soportefactura,e.fecha=g()(s[o].fecha).format("DD/MM/YYYY HH:mm:ss"),this.rowstodos.push(e)}})).catch((e=>{h.Z.create("Problemas al listar Tranzas Asignaciones "+e)}))}},watch:{dateFrom:function(e){console.log(e),this.listar()},dateTo:function(e){console.log(e),this.listar()}},mounted(){this.listar(),this.listarsedes(),this.listarusuarios()}};var k=a(4260),z=a(8516),Y=a(4842),D=a(4554),V=a(3944),M=a(3124),W=a(2165),x=a(4993),C=a(3884),F=a(6778),U=a(151),q=a(5589),Z=a(677),S=a(7518),T=a.n(S);const P=(0,k.Z)(y,[["render",p]]),Q=P;T()(y,"components",{QSelect:z.Z,QInput:Y.Z,QIcon:D.Z,QPopupProxy:V.Z,QDate:M.Z,QBtn:W.Z,QTable:x.Z,QTd:C.Z,QDialog:F.Z,QCard:U.Z,QCardSection:q.Z}),T()(y,"directives",{ClosePopup:Z.Z})},6700:(e,s,a)=>{var o={"./af":5809,"./af.js":5809,"./ar":6069,"./ar-dz":481,"./ar-dz.js":481,"./ar-kw":3994,"./ar-kw.js":3994,"./ar-ly":3312,"./ar-ly.js":3312,"./ar-ma":239,"./ar-ma.js":239,"./ar-sa":1863,"./ar-sa.js":1863,"./ar-tn":9607,"./ar-tn.js":9607,"./ar.js":6069,"./az":9281,"./az.js":9281,"./be":9945,"./be.js":9945,"./bg":9384,"./bg.js":9384,"./bm":1476,"./bm.js":1476,"./bn":3345,"./bn-bd":216,"./bn-bd.js":216,"./bn.js":3345,"./bo":1713,"./bo.js":1713,"./br":9655,"./br.js":9655,"./bs":7296,"./bs.js":7296,"./ca":3049,"./ca.js":3049,"./cs":2722,"./cs.js":2722,"./cv":8039,"./cv.js":8039,"./cy":5563,"./cy.js":5563,"./da":1960,"./da.js":1960,"./de":7533,"./de-at":6674,"./de-at.js":6674,"./de-ch":7732,"./de-ch.js":7732,"./de.js":7533,"./dv":8343,"./dv.js":8343,"./el":7004,"./el.js":7004,"./en-au":2517,"./en-au.js":2517,"./en-ca":4929,"./en-ca.js":4929,"./en-gb":9722,"./en-gb.js":9722,"./en-ie":6923,"./en-ie.js":6923,"./en-il":8050,"./en-il.js":8050,"./en-in":9624,"./en-in.js":9624,"./en-nz":540,"./en-nz.js":540,"./en-sg":4375,"./en-sg.js":4375,"./eo":40,"./eo.js":40,"./es":9720,"./es-do":5595,"./es-do.js":5595,"./es-mx":180,"./es-mx.js":180,"./es-us":1563,"./es-us.js":1563,"./es.js":9720,"./et":9217,"./et.js":9217,"./eu":9474,"./eu.js":9474,"./fa":5243,"./fa.js":5243,"./fi":7645,"./fi.js":7645,"./fil":5350,"./fil.js":5350,"./fo":5622,"./fo.js":5622,"./fr":1467,"./fr-ca":3439,"./fr-ca.js":3439,"./fr-ch":4335,"./fr-ch.js":4335,"./fr.js":1467,"./fy":6026,"./fy.js":6026,"./ga":2969,"./ga.js":2969,"./gd":1347,"./gd.js":1347,"./gl":1085,"./gl.js":1085,"./gom-deva":904,"./gom-deva.js":904,"./gom-latn":9597,"./gom-latn.js":9597,"./gu":8705,"./gu.js":8705,"./he":9128,"./he.js":9128,"./hi":2821,"./hi.js":2821,"./hr":9002,"./hr.js":9002,"./hu":4814,"./hu.js":4814,"./hy-am":658,"./hy-am.js":658,"./id":9344,"./id.js":9344,"./is":8204,"./is.js":8204,"./it":376,"./it-ch":1549,"./it-ch.js":1549,"./it.js":376,"./ja":9293,"./ja.js":9293,"./jv":6401,"./jv.js":6401,"./ka":482,"./ka.js":482,"./kk":7329,"./kk.js":7329,"./km":4241,"./km.js":4241,"./kn":3566,"./kn.js":3566,"./ko":2742,"./ko.js":2742,"./ku":2915,"./ku.js":2915,"./ky":6846,"./ky.js":6846,"./lb":4959,"./lb.js":4959,"./lo":2188,"./lo.js":2188,"./lt":8967,"./lt.js":8967,"./lv":1245,"./lv.js":1245,"./me":751,"./me.js":751,"./mi":7501,"./mi.js":7501,"./mk":1643,"./mk.js":1643,"./ml":5597,"./ml.js":5597,"./mn":7612,"./mn.js":7612,"./mr":9065,"./mr.js":9065,"./ms":4703,"./ms-my":4645,"./ms-my.js":4645,"./ms.js":4703,"./mt":4365,"./mt.js":4365,"./my":3788,"./my.js":3788,"./nb":7357,"./nb.js":7357,"./ne":9109,"./ne.js":9109,"./nl":3746,"./nl-be":1985,"./nl-be.js":1985,"./nl.js":3746,"./nn":7175,"./nn.js":7175,"./oc-lnc":566,"./oc-lnc.js":566,"./pa-in":2733,"./pa-in.js":2733,"./pl":182,"./pl.js":182,"./pt":505,"./pt-br":7839,"./pt-br.js":7839,"./pt.js":505,"./ro":9578,"./ro.js":9578,"./ru":2328,"./ru.js":2328,"./sd":641,"./sd.js":641,"./se":1758,"./se.js":1758,"./si":6680,"./si.js":6680,"./sk":5016,"./sk.js":5016,"./sl":7424,"./sl.js":7424,"./sq":8635,"./sq.js":8635,"./sr":9038,"./sr-cyrl":3716,"./sr-cyrl.js":3716,"./sr.js":9038,"./ss":4771,"./ss.js":4771,"./sv":3517,"./sv.js":3517,"./sw":9419,"./sw.js":9419,"./ta":5959,"./ta.js":5959,"./te":1739,"./te.js":1739,"./tet":2264,"./tet.js":2264,"./tg":4792,"./tg.js":4792,"./th":8328,"./th.js":8328,"./tk":702,"./tk.js":702,"./tl-ph":7814,"./tl-ph.js":7814,"./tlh":797,"./tlh.js":797,"./tr":6691,"./tr.js":6691,"./tzl":6891,"./tzl.js":6891,"./tzm":6362,"./tzm-latn":7855,"./tzm-latn.js":7855,"./tzm.js":6362,"./ug-cn":7606,"./ug-cn.js":7606,"./uk":513,"./uk.js":513,"./ur":3803,"./ur.js":3803,"./uz":344,"./uz-latn":8957,"./uz-latn.js":8957,"./uz.js":344,"./vi":3,"./vi.js":3,"./x-pseudo":8842,"./x-pseudo.js":8842,"./yo":2083,"./yo.js":2083,"./zh-cn":4536,"./zh-cn.js":4536,"./zh-hk":2475,"./zh-hk.js":2475,"./zh-mo":7593,"./zh-mo.js":7593,"./zh-tw":4746,"./zh-tw.js":4746};function t(e){var s=i(e);return a(s)}function i(e){if(!a.o(o,e)){var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}return o[e]}t.keys=function(){return Object.keys(o)},t.resolve=i,e.exports=t,t.id=6700}}]);