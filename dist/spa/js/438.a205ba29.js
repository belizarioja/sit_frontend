(globalThis["webpackChunksit_frontend"]=globalThis["webpackChunksit_frontend"]||[]).push([[438],{20384:e=>{e.exports={endpoint_path_v2:"https://bck-test.factura-smart.com/",version:"2.0.0"}},64438:(e,s,o)=>{"use strict";o.r(s),o.d(s,{default:()=>S});var t=o(42852),a=o(63100);const i={class:"my-font my-fondo q-pa-md"},l=(0,t.Lk)("div",{class:"row"},[(0,t.Lk)("span",{class:"text-secondary",style:{margin:"0 20px","font-size":"25px","font-weight":"bolder"}},"Anular documento")],-1),n={class:"row"},c={class:"row"},d=(0,t.Lk)("div",{class:"text-h6"},"Resultado",-1);function r(e,s,o,r,u,m){const p=(0,t.g2)("q-select"),h=(0,t.g2)("q-input"),b=(0,t.g2)("q-card-section"),g=(0,t.g2)("q-btn"),v=(0,t.g2)("q-card-actions"),f=(0,t.g2)("q-card");return(0,t.uX)(),(0,t.CE)("div",i,[l,(0,t.Lk)("div",n,[(0,t.bF)(p,{dense:"",class:"col",filled:"","options-dense":"",modelValue:u.modelsede,"onUpdate:modelValue":[s[0]||(s[0]=e=>u.modelsede=e),s[1]||(s[1]=e=>m.changeSede())],options:u.optionssede,"option-label":"name","option-value":"cod",label:"Seleccione Servicio",style:{margin:"20px"}},null,8,["modelValue","options"]),(0,t.bF)(p,{dense:"",class:"col",filled:"","options-dense":"",modelValue:u.modeltipo,"onUpdate:modelValue":s[2]||(s[2]=e=>u.modeltipo=e),options:u.optionstipo,"option-label":"name","option-value":"cod",label:"Seleccione Tipo Documento",style:{margin:"20px"}},null,8,["modelValue","options"])]),(0,t.Lk)("div",c,[(0,t.bF)(f,{class:"col q-pa-md",style:{"min-width":"350px"}},{default:(0,t.k6)((()=>[(0,t.bF)(b,{class:"row q-pt-none"},{default:(0,t.k6)((()=>[(0,t.bF)(h,{class:"col-12 q-pa-md",dense:"",type:"textarea",modelValue:r.tokenservicios,"onUpdate:modelValue":s[3]||(s[3]=e=>r.tokenservicios=e),label:"Token",autofocus:""},null,8,["modelValue"]),(0,t.bF)(h,{class:"col-6 q-pa-md",dense:"",modelValue:r.rif,"onUpdate:modelValue":s[4]||(s[4]=e=>r.rif=e),label:"RIF",autofocus:""},null,8,["modelValue"]),(0,t.bF)(h,{class:"col-6 q-pa-md",dense:"",modelValue:r.numerodocumento,"onUpdate:modelValue":s[5]||(s[5]=e=>r.numerodocumento=e),label:"Número documento",autofocus:""},null,8,["modelValue"]),(0,t.bF)(h,{class:"col-12 q-pa-md",type:"textarea",dense:"",modelValue:r.observacion,"onUpdate:modelValue":s[6]||(s[6]=e=>r.observacion=e),label:"Observación"},null,8,["modelValue"])])),_:1}),(0,t.bF)(v,{align:"right",class:"text-primary"},{default:(0,t.k6)((()=>[(0,t.bF)(g,{color:"secondary",label:"Anular",onClick:m.crear},null,8,["onClick"])])),_:1})])),_:1}),(0,t.bF)(f,{class:"col q-pa-md"},{default:(0,t.k6)((()=>[(0,t.bF)(b,null,{default:(0,t.k6)((()=>[d])),_:1}),(0,t.bF)(b,null,{default:(0,t.k6)((()=>[(0,t.Lk)("span",{class:(0,a.C4)(r.statusProcess?"text-positive":"text-negative")},(0,a.v_)(r.resultProcess),3)])),_:1}),(0,t.bF)(b,null,{default:(0,t.k6)((()=>[(0,t.Lk)("span",{class:(0,a.C4)(r.statusProcess?"text-positive":"text-negative")},(0,a.v_)(r.messageProcess),3)])),_:1})])),_:1})])])}o(96809);var u=o(45124),m=o(56962),p=o(17352),h=o.n(p);const b=o(20384),g=b.endpoint_path_v2,v={setup(){return{statusProcess:(0,u.KR)(!0),resultProcess:(0,u.KR)(""),messageProcess:(0,u.KR)(""),tokenservicios:(0,u.KR)(""),rif:(0,u.KR)(""),numerodocumento:(0,u.KR)(""),observacion:(0,u.KR)(""),loading:(0,u.KR)(!1)}},data(){return{co_rol:sessionStorage.getItem("co_rol"),modeltipo:[],optionstipo:[],modelsede:[],optionssede:[],pagination:{page:1,rowsPerPage:0}}},methods:{changeSede(){console.log(this.modelsede.cod),this.rif=this.modelsede.rif,this.tokenservicios=this.modelsede.tokenservicios},changeTipo(){console.log(this.modeltipo.cod)},crear(){if(!this.modelsede.cod)return void m.A.create("Debe seleccionar Servicio Masivo ");if(!this.modeltipo.cod)return void m.A.create("Debe seleccionar tipo de Documento ");this.statusProcess=!1,this.resultProcess="",this.messageProcess="";const e={headers:{Authorization:"Bearer "+this.tokenservicios}},s={rif:this.rif,numerodocumento:this.numerodocumento,idtipodocumento:this.modeltipo.cod,observacion:this.observacion};h().post(g+"anulacion",s,e).then((async e=>{console.log(e.data),200===e.status&&(this.statusProcess=e.data.success,this.resultProcess="Transmisión EXITOSA!",this.limpiar()),202===e.status&&(this.statusProcess=e.data.success,this.resultProcess="Transmisión FALLIDA!",this.messageProcess=e.data.error.message)}))},limpiar(){this.cedula="",this.subtotal=0,this.nombre="",this.total=0,this.exento=0,this.tasag=0,this.baseg=0,this.impuestog=0,this.tasar=0,this.baser=0,this.impuestor=0,this.tasaa=0,this.basea=0,this.impuestoa=0,this.tasaigtf=0,this.baseigtf=0,this.impuestoigtf=0},listartipos(){h().get(g+"tipodocumento").then((async e=>{console.log(e.data);const s=e.data.data;this.optionstipo=[];for(const o in s){const e={};e.cod=s[o].id,e.name=s[o].tipodocumento,this.optionstipo.push(e)}})).catch((e=>{m.A.create("Problemas al listar Tipos de documentos "+e)}))},listarsedes(){h().get(g+"sede").then((async e=>{console.log(e.data);const s=e.data.data;this.optionssede=[];for(const o in s){const e={};e.cod=s[o].id,e.name=s[o].razonsocial,e.rif=s[o].rif,e.tokenservicios=s[o].tokenservicios,this.optionssede.push(e)}})).catch((e=>{m.A.create("Problemas al listar Sedes "+e)}))}},mounted(){"1"!==this.co_rol&&this.$router.push("/erroracceso"),this.listarsedes(),this.listartipos()}};var f=o(16317),k=o(12013),P=o(44483),A=o(91656),V=o(96805),_=o(9204),x=o(44427),F=o(41082),q=o.n(F);const y=(0,f.A)(v,[["render",r]]),S=y;q()(v,"components",{QSelect:k.A,QCard:P.A,QCardSection:A.A,QInput:V.A,QCardActions:_.A,QBtn:x.A})}}]);