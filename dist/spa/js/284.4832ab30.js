(globalThis["webpackChunksit_frontend"]=globalThis["webpackChunksit_frontend"]||[]).push([[284],{55770:e=>{e.exports={endpoint_path_v2:"https://bck-test.factura-smart.com/",version:"2.0.0"}},90661:(e,l,a)=>{"use strict";a.r(l),a.d(l,{default:()=>He});var i=a(83673),o=a(98880),t=a(62323);const s={class:"my-font my-fondo q-pa-md"},n={class:"row",style:{"margin-bottom":"40px","justify-content":"space-between"}},r=(0,i._)("span",{class:"text-secondary",style:{margin:"0 20px","font-size":"25px","font-weight":"bolder"}},"Clientes emisores",-1),d=["src","width","onClick"],c=["src","width"],m=["src","width","onClick"],u=["src","width"],p={class:"text-center"},h={key:0},f={key:0},b={key:0},w=(0,i._)("div",{class:"text-h6"},"Crear emisor",-1),g={class:"row"},v={class:"row"},j={class:"row"},_={class:"row"},y={class:"col-6 q-pa-sm",style:{"text-align":"center","margin-top":"20px"}},V=(0,i._)("div",null,"Envío de correo",-1),k={class:"col-6 q-pa-sm",style:{"text-align":"center","margin-top":"20px"}},z=(0,i._)("div",null,"Validar número interno",-1),W={style:{display:"flex","justify-content":"space-evenly"}},x={class:"q-ml-sm"},U={style:{}},C={class:"q-ml-sm"},q=(0,i._)("div",{class:"text-h6"},"Actualizar cliente emisor",-1),I={class:"row"},S={class:"row"},H={class:"row"},A={class:"row"},D={class:"col-4 q-pa-sm",style:{"text-align":"center","margin-top":"20px"}},E=(0,i._)("div",null,"Envío de correo",-1),Z={class:"col-4 q-pa-sm",style:{"text-align":"center","margin-top":"20px"}},F=(0,i._)("div",null,"Validar número interno",-1),N={class:"col-4 q-pa-sm",style:{"text-align":"center","margin-top":"20px"}},O=(0,i._)("div",null,"Publicidad",-1),P={style:{display:"flex","justify-content":"space-evenly"}},T=(0,i._)("div",{class:"text-h6",style:{"text-align":"center"}},"Actualizar Estatus",-1),L={style:{display:"flex","justify-content":"space-evenly"}},Q=(0,i._)("div",{class:"text-h6",style:{"text-align":"center"}},"En Horabuena!",-1),R=(0,i._)("img",{src:"confirmar.png",alt:"Actualizar",style:{"max-width":"285px"}},null,-1),M={style:{display:"flex","justify-content":"space-evenly"}},$={class:"text-h6",style:{"text-align":"center"}},Y={style:{"text-align":"center"}},B=(0,i._)("div",{class:"text-h6",style:{"text-align":"center"}},"Gestionar plantilla PDF",-1),G={style:{margin:"10px"}},K=(0,i._)("img",{src:"factura1.png",alt:"",style:{width:"200px"}},null,-1),J={class:"text-center"},X={style:{margin:"10px"}},ee=(0,i._)("img",{src:"factura2.png",alt:"",style:{width:"200px"}},null,-1),le={class:"text-center"},ae={style:{display:"flex","justify-content":"space-evenly"}};function ie(e,l,a,ie,oe,te){const se=(0,i.up)("q-btn"),ne=(0,i.up)("q-icon"),re=(0,i.up)("q-input"),de=(0,i.up)("q-td"),ce=(0,i.up)("q-table"),me=(0,i.up)("q-card-section"),ue=(0,i.up)("q-radio"),pe=(0,i.up)("q-form"),he=(0,i.up)("q-card"),fe=(0,i.up)("q-dialog"),be=(0,i.up)("q-card-actions"),we=(0,i.up)("q-th"),ge=(0,i.up)("q-tr"),ve=(0,i.up)("q-select"),je=(0,i.up)("q-uploader"),_e=(0,i.Q2)("close-popup");return(0,i.wg)(),(0,i.iD)("div",s,[(0,i._)("div",n,[r,"1"===ie.co_rol?((0,i.wg)(),(0,i.j4)(se,{key:0,color:"secondary",disabled:oe.btndisable,label:"Crear emisor",onClick:te.openCrear,style:{"border-radius":"20px",padding:"7px 20px"}},null,8,["disabled","onClick"])):(0,i.kq)("",!0)]),(0,i.Wm)(ce,{dense:"",rows:oe.rows,columns:oe.columns,"row-key":"name",filter:ie.filter,pagination:ie.pagination,"onUpdate:pagination":l[1]||(l[1]=e=>ie.pagination=e)},{top:(0,i.w5)((()=>[(0,i.Wm)(re,{borderless:"",dense:"",debounce:"300",color:"primary",modelValue:ie.filter,"onUpdate:modelValue":l[0]||(l[0]=e=>ie.filter=e),label:"Buscar"},{append:(0,i.w5)((()=>[(0,i.Wm)(ne,{name:"search"})])),_:1},8,["modelValue"])])),"body-cell-logo":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>[(0,i._)("div",null,["1"===ie.co_rol?((0,i.wg)(),(0,i.iD)("img",{key:0,src:e.row.logo,onerror:"this.src='default.svg'",width:e.row.width,style:{cursor:"pointer"},onClick:(0,o.iM)((l=>te.openLogo(e.row)),["stop"])},null,8,d)):((0,i.wg)(),(0,i.iD)("img",{key:1,src:e.row.logo,onerror:"this.src='default.svg'",width:e.row.width},null,8,c))])])),_:2},1032,["props"])])),"body-cell-direccion":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>[(0,i.Uk)((0,t.zw)(e.row.direccion),1)])),_:2},1032,["props"])])),"body-cell-bannerpublicidad":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>[(0,i._)("div",null,["1"===ie.co_rol?((0,i.wg)(),(0,i.iD)("img",{key:0,src:e.row.bannerpublicidad,onerror:"this.src='publicidad.png'",width:e.row.widthbanner,style:{cursor:"pointer"},onClick:(0,o.iM)((l=>te.openPublicidad(e.row)),["stop"])},null,8,m)):((0,i.wg)(),(0,i.iD)("img",{key:1,src:e.row.bannerpublicidad,onerror:"this.src='publicidad.png'",width:e.row.widthbanner},null,8,u))])])),_:2},1032,["props"])])),"body-cell-plantilla":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>[(0,i._)("div",p,[(0,i.Wm)(se,{color:"primary",label:e.row.plantilla,onClick:(0,o.iM)((l=>te.btnviewplantilla(e.row)),["stop"])},null,8,["label","onClick"])])])),_:2},1032,["props"])])),"body-cell-tokenservicios":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>["1"===ie.co_rol?((0,i.wg)(),(0,i.iD)("div",h,[(0,i.Wm)(se,{icon:"visibility",onClick:(0,o.iM)((l=>te.btnviewtoken(e.row)),["stop"]),dense:"",flat:"",disable:"1"!==ie.co_rol},null,8,["onClick","disable"])])):(0,i.kq)("",!0)])),_:2},1032,["props"])])),"body-cell-numeracionactual":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>[(0,i._)("div",null,[(0,i.Wm)(se,{icon:"list_alt",onClick:(0,o.iM)((l=>te.btnviewdetails(e.row)),["stop"]),dense:"",flat:""},null,8,["onClick"])])])),_:2},1032,["props"])])),"body-cell-edit":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>["1"===ie.co_rol?((0,i.wg)(),(0,i.iD)("div",f,[(0,i.Wm)(se,{color:"secondary",icon:"edit",onClick:(0,o.iM)((l=>te.btnOpenUpd(e.row)),["stop"]),dense:"",disable:"1"!==ie.co_rol},null,8,["onClick","disable"])])):(0,i.kq)("",!0)])),_:2},1032,["props"])])),"body-cell-estatus":(0,i.w5)((e=>[(0,i.Wm)(de,{props:e},{default:(0,i.w5)((()=>["1"===ie.co_rol?((0,i.wg)(),(0,i.iD)("div",b,[(0,i.Wm)(se,{color:"Activo"===e.row.estatus?"primary":"negative",icon:"Activo"===e.row.estatus?"toggle_on":"toggle_off",onClick:(0,o.iM)((l=>te.btnOpenUpdEstatus(e.row)),["stop"]),disable:"1"!==ie.co_rol,dense:""},null,8,["color","icon","onClick","disable"])])):(0,i.kq)("",!0)])),_:2},1032,["props"])])),_:1},8,["rows","columns","filter","pagination"]),(0,i.Wm)(fe,{modelValue:ie.modalcrear,"onUpdate:modelValue":l[13]||(l[13]=e=>ie.modalcrear=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,{style:{"min-width":"550px"}},{default:(0,i.w5)((()=>[(0,i.Wm)(me,null,{default:(0,i.w5)((()=>[w])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i.Wm)(pe,{onSubmit:(0,o.iM)(te.crear,["prevent"]),class:"q-gutter-md"},{default:(0,i.w5)((()=>[(0,i._)("div",g,[(0,i.Wm)(re,{class:"col-6 q-pa-sm",dense:"",label:"RIF",modelValue:ie.rif,"onUpdate:modelValue":l[2]||(l[2]=e=>ie.rif=e),autofocus:"",hint:"Formato J-########-#",rules:[e=>e.length>0||"Ingresar RIF"]},null,8,["modelValue","rules"]),(0,i.Wm)(re,{class:"col-6 q-pa-sm",dense:"",label:"Razón Social",modelValue:ie.razonsocial,"onUpdate:modelValue":l[3]||(l[3]=e=>ie.razonsocial=e),hint:"Tal cual como va a salir en los documentos",autofocus:"",rules:[e=>e.length>0||"Ingresar RAZON SOCIAL"]},null,8,["modelValue","rules"])]),(0,i._)("div",v,[(0,i.Wm)(re,{class:"col q-pa-sm",dense:"",label:"Dirección",modelValue:ie.direccion,"onUpdate:modelValue":l[4]||(l[4]=e=>ie.direccion=e),rules:[e=>e.length>0||"Ingresar DIRECCIÓN"]},null,8,["modelValue","rules"])]),(0,i._)("div",j,[(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.email,"onUpdate:modelValue":l[5]||(l[5]=e=>ie.email=e),label:"Email",hint:"Formato correo@mail.com",rules:[e=>e.length>0||"Ingresar EMAIL"]},null,8,["modelValue","rules"]),(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.emailbcc,"onUpdate:modelValue":l[6]||(l[6]=e=>ie.emailbcc=e),label:"Email Cco"},null,8,["modelValue"])]),(0,i._)("div",_,[(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.telefono,"onUpdate:modelValue":l[7]||(l[7]=e=>ie.telefono=e),label:"Teléfono de contacto",hint:"Formato +5842612345678",rules:[e=>e.length>0||"Ingresar TELÉFONO"]},null,8,["modelValue","rules"]),(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.sitioweb,"onUpdate:modelValue":l[8]||(l[8]=e=>ie.sitioweb=e),hint:"Formato www.sitiowebejemplo.com",label:"Sitio Web"},null,8,["modelValue"]),(0,i._)("div",y,[V,(0,i.Wm)(ue,{modelValue:ie.shape,"onUpdate:modelValue":l[9]||(l[9]=e=>ie.shape=e),val:"0",label:"No"},null,8,["modelValue"]),(0,i.Wm)(ue,{modelValue:ie.shape,"onUpdate:modelValue":l[10]||(l[10]=e=>ie.shape=e),val:"1",label:"Si"},null,8,["modelValue"])]),(0,i._)("div",k,[z,(0,i.Wm)(ue,{modelValue:ie.shapeinterno,"onUpdate:modelValue":l[11]||(l[11]=e=>ie.shapeinterno=e),val:"0",label:"No"},null,8,["modelValue"]),(0,i.Wm)(ue,{modelValue:ie.shapeinterno,"onUpdate:modelValue":l[12]||(l[12]=e=>ie.shapeinterno=e),val:"2",label:"Si"},null,8,["modelValue"])])]),(0,i._)("div",W,[(0,i.wy)((0,i.Wm)(se,{color:"negative",label:"Cancelar"},null,512),[[_e]]),(0,i.Wm)(se,{color:"secondary",label:"Aceptar",type:"submit"})])])),_:1},8,["onSubmit"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.viewtoken,"onUpdate:modelValue":l[14]||(l[14]=e=>ie.viewtoken=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,{style:{width:"auto"}},{default:(0,i.w5)((()=>[(0,i.Wm)(me,{class:"row items-center"},{default:(0,i.w5)((()=>[(0,i._)("span",x,"Token del Cliente Emisor "+(0,t.zw)(ie.razonsocialtitulo+" - "+ie.riftitulo),1)])),_:1}),(0,i.Wm)(me,{class:"row items-center",style:{"word-break":"break-all"}},{default:(0,i.w5)((()=>[(0,i._)("div",U,(0,t.zw)(ie.tokenservicios),1)])),_:1}),(0,i.Wm)(be,{align:"right"},{default:(0,i.w5)((()=>[(0,i.wy)((0,i.Wm)(se,{flat:"",label:"Aceptar",color:"primary"},null,512),[[_e]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.viewdetails,"onUpdate:modelValue":l[15]||(l[15]=e=>ie.viewdetails=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,{style:{width:"fit-content","max-width":"fit-content"}},{default:(0,i.w5)((()=>[(0,i.Wm)(me,{class:"row items-center"},{default:(0,i.w5)((()=>[(0,i._)("span",C,"Numeración actual de "+(0,t.zw)(ie.razonsocialtitulo+" - "+ie.riftitulo),1)])),_:1}),(0,i.Wm)(me,{class:"row items-center",style:{"word-break":"break-all","justify-content":"center"}},{default:(0,i.w5)((()=>[(0,i.Wm)(ce,{dense:"",rows:oe.rowsdetails,columns:oe.columnsdetails,"row-key":"name","hide-pagination":""},{header:(0,i.w5)((e=>[(0,i.Wm)(ge,{props:e},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.cols,(l=>((0,i.wg)(),(0,i.j4)(we,{key:l.name,props:e,class:"text-italic text-blue",style:{"font-size":"20px"}},{default:(0,i.w5)((()=>[(0,i.Uk)((0,t.zw)(l.label),1)])),_:2},1032,["props"])))),128))])),_:2},1032,["props"])])),_:1},8,["rows","columns"])])),_:1}),(0,i.Wm)(me,{class:"row items-center",style:{"word-break":"break-all","justify-content":"center"}},{default:(0,i.w5)((()=>[(0,i.Wm)(ce,{dense:"",rows:oe.rowslotes,columns:oe.columnslotes,"row-key":"name","hide-pagination":""},{header:(0,i.w5)((e=>[(0,i.Wm)(ge,{props:e},{default:(0,i.w5)((()=>[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.cols,(l=>((0,i.wg)(),(0,i.j4)(we,{key:l.name,props:e,class:"text-italic text-blue",style:{"font-size":"20px"}},{default:(0,i.w5)((()=>[(0,i.Uk)((0,t.zw)(l.label),1)])),_:2},1032,["props"])))),128))])),_:2},1032,["props"])])),_:1},8,["rows","columns"])])),_:1}),(0,i.Wm)(be,{align:"right"},{default:(0,i.w5)((()=>[(0,i.wy)((0,i.Wm)(se,{label:"Cerrar",color:"negative"},null,512),[[_e]])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.modalactualizar,"onUpdate:modelValue":l[30]||(l[30]=e=>ie.modalactualizar=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,{style:{width:"560px"}},{default:(0,i.w5)((()=>[(0,i.Wm)(me,null,{default:(0,i.w5)((()=>[q])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i.Wm)(pe,{onSubmit:(0,o.iM)(te.actualizar,["prevent"]),class:"q-gutter-md"},{default:(0,i.w5)((()=>[(0,i._)("div",I,[(0,i.Wm)(re,{class:"col-6 q-pa-sm",dense:"",label:"RIF",modelValue:ie.rif,"onUpdate:modelValue":l[16]||(l[16]=e=>ie.rif=e),autofocus:"",rules:[e=>e.length>0||"Ingresar RIF"]},null,8,["modelValue","rules"]),(0,i.Wm)(re,{class:"col-6 q-pa-sm",dense:"",label:"Razón Social",modelValue:ie.razonsocial,"onUpdate:modelValue":l[17]||(l[17]=e=>ie.razonsocial=e),autofocus:"",rules:[e=>e.length>0||"Ingresar RAZON SOCIAL"]},null,8,["modelValue","rules"])]),(0,i._)("div",S,[(0,i.Wm)(re,{class:"col q-pa-sm",dense:"",label:"Dirección",modelValue:ie.direccion,"onUpdate:modelValue":l[18]||(l[18]=e=>ie.direccion=e),rules:[e=>e.length>0||"Ingresar DIRECCIÓN"]},null,8,["modelValue","rules"])]),(0,i._)("div",H,[(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.email,"onUpdate:modelValue":l[19]||(l[19]=e=>ie.email=e),label:"Email principal",rules:[e=>e.length>0||"Ingresar EMAIL Comercial"]},null,8,["modelValue","rules"]),(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.emailbcc,"onUpdate:modelValue":l[20]||(l[20]=e=>ie.emailbcc=e),label:"Email Cco"},null,8,["modelValue"])]),(0,i._)("div",A,[(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.telefono,"onUpdate:modelValue":l[21]||(l[21]=e=>ie.telefono=e),label:"Teléfono de contacto",rules:[e=>e.length>0||"Ingresar TELÉFONO"]},null,8,["modelValue","rules"]),(0,i.Wm)(re,{dense:"",class:"col-6 q-pa-sm",modelValue:ie.sitioweb,"onUpdate:modelValue":l[22]||(l[22]=e=>ie.sitioweb=e),label:"Sitio Web"},null,8,["modelValue"]),(0,i.Wm)(ve,{dense:"","options-dense":"",modelValue:oe.modelcodes,"onUpdate:modelValue":l[23]||(l[23]=e=>oe.modelcodes=e),options:oe.optionscodes,"option-label":"name","option-value":"cod",class:"col-12 q-pa-sm",label:"Código comercial",rules:[te.myRule]},null,8,["modelValue","options","rules"]),(0,i._)("div",D,[E,(0,i.Wm)(ue,{modelValue:ie.shape,"onUpdate:modelValue":l[24]||(l[24]=e=>ie.shape=e),val:"0",label:"No"},null,8,["modelValue"]),(0,i.Wm)(ue,{modelValue:ie.shape,"onUpdate:modelValue":l[25]||(l[25]=e=>ie.shape=e),val:"1",label:"Si"},null,8,["modelValue"])]),(0,i._)("div",Z,[F,(0,i.Wm)(ue,{modelValue:ie.shapeinterno,"onUpdate:modelValue":l[26]||(l[26]=e=>ie.shapeinterno=e),val:"0",label:"No"},null,8,["modelValue"]),(0,i.Wm)(ue,{modelValue:ie.shapeinterno,"onUpdate:modelValue":l[27]||(l[27]=e=>ie.shapeinterno=e),val:"2",label:"Si"},null,8,["modelValue"])]),(0,i._)("div",N,[O,(0,i.Wm)(ue,{modelValue:ie.shapepublicidad,"onUpdate:modelValue":l[28]||(l[28]=e=>ie.shapepublicidad=e),val:"0",label:"No"},null,8,["modelValue"]),(0,i.Wm)(ue,{modelValue:ie.shapepublicidad,"onUpdate:modelValue":l[29]||(l[29]=e=>ie.shapepublicidad=e),val:"1",label:"Si"},null,8,["modelValue"])])]),(0,i._)("div",P,[(0,i.wy)((0,i.Wm)(se,{color:"negative",label:"Cancel"},null,512),[[_e]]),(0,i.Wm)(se,{color:"secondary",label:"Aceptar",type:"submit"})])])),_:1},8,["onSubmit"])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.modalactualizarestatus,"onUpdate:modelValue":l[31]||(l[31]=e=>ie.modalactualizarestatus=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,null,{default:(0,i.w5)((()=>[(0,i.Wm)(me,null,{default:(0,i.w5)((()=>[T])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i._)("div",null," ¿Desea "+(0,t.zw)(e.messageActualizar)+" este cliente emisor? ",1)])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i._)("div",L,[(0,i.wy)((0,i.Wm)(se,{color:"negative",label:"Cancelar"},null,512),[[_e]]),(0,i.Wm)(se,{color:"secondary",label:"Aceptar",onClick:te.actualizarEstatus},null,8,["onClick"])])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.modalconfirmar,"onUpdate:modelValue":l[32]||(l[32]=e=>ie.modalconfirmar=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,null,{default:(0,i.w5)((()=>[(0,i.Wm)(me,null,{default:(0,i.w5)((()=>[Q])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[R,(0,i._)("div",null," ¡Cliente emisor "+(0,t.zw)(e.messageConfirmar)+" con éxito! ",1)])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i._)("div",M,[(0,i.wy)((0,i.Wm)(se,{color:"secondary",label:"Aceptar"},null,512),[[_e]])])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.modallogo,"onUpdate:modelValue":l[33]||(l[33]=e=>ie.modallogo=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,null,{default:(0,i.w5)((()=>[(0,i.Wm)(me,null,{default:(0,i.w5)((()=>[(0,i._)("div",$,"Actualizar "+(0,t.zw)(ie.tituloCargarImagen),1)])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i.Wm)(je,{label:"Upload",factory:te.factoryFn,style:{"max-width":"350px"},onUploaded:te.closeLogoUploader},null,8,["factory","onUploaded"])])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i._)("div",Y,[(0,i.wy)((0,i.Wm)(se,{flat:"",label:"Cancelar"},null,512),[[_e]])])])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,i.Wm)(fe,{modelValue:ie.modalplantillapdf,"onUpdate:modelValue":l[36]||(l[36]=e=>ie.modalplantillapdf=e),persistent:""},{default:(0,i.w5)((()=>[(0,i.Wm)(he,null,{default:(0,i.w5)((()=>[(0,i.Wm)(me,null,{default:(0,i.w5)((()=>[B])),_:1}),(0,i.Wm)(me,{class:"q-pt-none flex"},{default:(0,i.w5)((()=>[(0,i._)("div",G,[K,(0,i._)("div",J,[(0,i.Wm)(ue,{modelValue:ie.plantilla,"onUpdate:modelValue":l[34]||(l[34]=e=>ie.plantilla=e),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",val:"1",label:"1",disable:"1"!==ie.co_rol},null,8,["modelValue","disable"])])]),(0,i._)("div",X,[ee,(0,i._)("div",le,[(0,i.Wm)(ue,{modelValue:ie.plantilla,"onUpdate:modelValue":l[35]||(l[35]=e=>ie.plantilla=e),"checked-icon":"task_alt","unchecked-icon":"panorama_fish_eye",val:"2",label:"2",disable:"1"!==ie.co_rol},null,8,["modelValue","disable"])])])])),_:1}),(0,i.Wm)(me,{class:"q-pt-none"},{default:(0,i.w5)((()=>[(0,i._)("div",ae,[(0,i.wy)((0,i.Wm)(se,{color:"negative",label:"Cerrar"},null,512),[[_e]]),(0,i.Wm)(se,{color:"secondary",label:"Actualizar",disable:"1"!==ie.co_rol,onClick:te.actualizarPlantillapdf},null,8,["disable","onClick"])])])),_:1})])),_:1})])),_:1},8,["modelValue"])])}a(54564);var oe=a(61959),te=a(64434),se=a(11488),ne=a.n(se),re=a(30052),de=a.n(re);const ce=a(55770),me=ce.endpoint_path_v2,ue={setup(){return{plantilla:(0,oe.iH)(1),modalcrear:(0,oe.iH)(!1),modalactualizar:(0,oe.iH)(!1),modalplantillapdf:(0,oe.iH)(!1),modalconfirmar:(0,oe.iH)(!1),modalactualizarestatus:(0,oe.iH)(!1),modallogo:(0,oe.iH)(!1),viewtoken:(0,oe.iH)(!1),viewdetails:(0,oe.iH)(!1),tokenservicios:(0,oe.iH)(""),rif:(0,oe.iH)(""),razonsocial:(0,oe.iH)(""),riftitulo:(0,oe.iH)(""),razonsocialtitulo:(0,oe.iH)(""),email:(0,oe.iH)(""),emailbcc:(0,oe.iH)(""),direccion:(0,oe.iH)(""),telefono:(0,oe.iH)(""),cantidad:(0,oe.iH)(""),sitioweb:(0,oe.iH)(""),shape:(0,oe.iH)("0"),shapeinterno:(0,oe.iH)("0"),shapepublicidad:(0,oe.iH)("0"),filter:(0,oe.iH)(""),co_rol:sessionStorage.getItem("co_rol"),loading:(0,oe.iH)(!1),tituloCargarImagen:(0,oe.iH)(""),pagination:(0,oe.iH)({sortBy:"cod",descending:!1,page:1,rowsPerPage:15})}},data(){return{columns:[{name:"cod",required:!0,label:"#",align:"left",field:e=>e.cod,format:e=>`${e}`,sortable:!0},{name:"logo",align:"center",label:"Logo",field:"logo"},{name:"rif",align:"center",label:"RIF",field:"rif",sortable:!0},{name:"razonsocial",align:"center",label:"Razón social",field:"razonsocial",sortable:!0},{name:"direccion",label:"Dirección",field:"direccion",sortable:!0,align:"left",style:"max-width: 300px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;"},{name:"email",label:"Correo electrónico",field:"email",sortable:!0},{name:"telefono",label:"Teléfono contacto",field:"telefono",sortable:!0},{name:"codigocomercial",label:"Código comercial",field:"codigocomercial",sortable:!0},{name:"plantilla",label:"Plantilla PDF",field:"plantilla"},{name:"tokenservicios",label:"Token",field:"tokenservicios",sortable:!0},{name:"numeracionactual",label:"Numeración actual",field:"numeracionactual",sortable:!0},{name:"enviocorreo",label:"Envio correo",field:"enviocorreo",sortable:!0},{name:"validarinterno",label:"Validar interno",field:"validarinterno",sortable:!0},{name:"publicidad",label:"Publicidad",field:"publicidad",sortable:!0},{name:"bannerpublicidad",label:"Diseño publicidad",field:"bannerpublicidad",sortable:!0},{name:"estatus",label:"Estatus",field:"estatus"},{name:"edit",label:"Editar",field:"edit"}],rows:[],columnsdetails:[{name:"identificador",align:"center",label:"Identificador",field:"identificador",style:"font-size:20px"},{name:"corelativo",align:"center",label:"Correlativo  actual",field:"corelativo",style:"font-size:20px"}],rowsdetails:[],columnslotes:[{name:"lote",align:"center",label:"Lote",field:"lote",style:"font-size:20px"},{name:"fecha",align:"center",label:"Fecha",field:"fecha",style:"font-size:20px"},{name:"cantidad",align:"center",label:"Adquiridos",field:"cantidad",style:"font-size:20px"},{name:"utilizado",align:"center",label:"Utilizados",field:"utilizado",style:"font-size:20px"},{name:"inicia",align:"center",label:"Inicia",field:"inicia",style:"font-size:20px"},{name:"termina",align:"center",label:"Termina",field:"termina",style:"font-size:20px"},{name:"disponible",align:"center",label:"Disponibles",field:"disponible",style:"font-size:20px"}],rowslotes:[],optionscodes:[],modelcodes:[],btndisable:!0,co_sede_seleted:sessionStorage.getItem("co_sede_seleted")}},methods:{uploadFile(e,l){const a=this.$refs.files.files.concat(e),i=new FormData;for(let o=0;o<a.length-1;o++){const e=a[o];i.append("files["+o+"]",e)}i.append("caption",this.caption),this.$axios.post(this.getUrl(),i).then((e=>{this.loading=!1,e.data.error&&this.$q.notify({message:e.data.message,type:"negative",color:"negative",icon:"fas fa-exclamation-triangle"})}),(e=>{}))},factoryFn(e){return new Promise(((e,l)=>{e({url:this.getUrl(),method:"POST"})}))},getUrl(){return`${me}imagen/uploadimg/${this.rifUpd}`},openLogo(e){this.tituloCargarImagen="Logo",this.rifUpd=e.rif,this.modallogo=!0},openPublicidad(e){this.tituloCargarImagen="Publicidad",this.rifUpd=e.rif+"_publi01",this.modallogo=!0},closeLogoUploader:function(e){te.Z.create(e.xhr.response);const l=this;setTimeout((function(){l.cerrarLogo()}),3e3)},cerrarLogo(){this.modallogo=!1,this.$router.go(0)},openCrear(){this.limpiar(),this.modalcrear=!0},btnviewtoken(e){this.razonsocialtitulo=e.razonsocial,this.riftitulo=e.rif,this.tokenservicios=e.tokenservicios,this.viewtoken=!0},btnviewplantilla(e){this.plantilla=e.plantilla,this.idUpd=e.cod,this.rifUpd=e.rif,this.modalplantillapdf=!0},btnOpenUpdEstatus(e){this.idUpd=e.cod,this.messageActualizar="Activo"===e.estatus?"desactivar":"activar",this.estatusAct=e.estatus,this.modalactualizarestatus=!0},btnOpenUpd(e){const l=this.optionscodes.filter((l=>l.codigocomercial===e.codigocomercial));this.idUpd=e.cod,this.rif=e.rif,this.razonsocial=e.razonsocial,this.direccion=e.direccion,this.email=e.email,this.emailbcc=e.emailbcc,this.modelcodes=l[0],this.telefono=e.telefono,this.cantidad=e.asignados,this.sitioweb=e.sitioweb,this.shape="Si"===e.enviocorreo?"1":"0",this.shapepublicidad="Si"===e.publicidad?"1":"0",this.shapeinterno="Sin validar"===e.validarinterno?"0":"2",this.modalactualizar=!0},btnviewdetails(e){this.razonsocialtitulo=e.razonsocial,this.riftitulo=e.rif,de().get(me+"sede/"+e.cod).then((async e=>{const l=e.data;this.rowsdetails=[],this.rowslotes=[];const a={};a.identificador=l.identificador.toString().padStart(2,"0"),a.corelativo=l.corelativo.toString().padStart(8,"0"),this.rowsdetails.push(a);for(const i in l.data){const e=l.data[i],a={};a.lote=e.id,a.fecha=ne()(e.fecha).format("DD/MM/YYYY"),a.cantidad=e.cantidad,a.inicia=e.inicia,a.termina=e.termina,a.utilizado=e.utilizado,a.disponible=Number(e.cantidad)-Number(e.utilizado),this.rowslotes.push(a)}})).catch((e=>{te.Z.create("Problemas al listar Detalles corelativo "+e)})),this.viewdetails=!0},limpiar(){this.rif="",this.razonsocial="",this.direccion="",this.email="",this.emailbcc="",this.telefono="",this.sitioweb=""},crear(){if(0===this.rif.length)return;if(0===this.razonsocial.length)return;if(0===this.direccion.length)return;if(0===this.email.length)return;if(0===this.telefono.length)return;const e={rif:this.rif,razonsocial:this.razonsocial,direccion:this.direccion,email:this.email,emailbcc:this.emailbcc,telefono:this.telefono,asignados:0,sitioweb:this.sitioweb,enviocorreo:this.shape,validarinterno:this.shapeinterno};de().post(me+"sede",e).then((async e=>{this.messageConfirmar="creado",this.modalcrear=!1,this.modalconfirmar=!0,this.limpiar(),this.listar()}))},actualizar(){if(0===this.rif.length)return;if(0===this.razonsocial.length)return;if(0===this.direccion.length)return;if(0===this.email.length)return;if(0===this.telefono.length)return;if(void 0===this.modelcodes)return;const e={rif:this.rif,razonsocial:this.razonsocial,direccion:this.direccion,email:this.email,emailbcc:this.emailbcc,telefono:this.telefono,sitioweb:this.sitioweb,enviocorreo:this.shape,idcodigocomercial:Number(this.modelcodes.cod),validarinterno:this.shapeinterno,publicidad:this.shapepublicidad};de().put(me+"sede/"+this.idUpd,e).then((async e=>{this.messageConfirmar="actualizado",this.modalactualizar=!1,this.modalconfirmar=!0,this.limpiar(),this.listar()}))},actualizarPlantillapdf(){const e={plantilla:this.plantilla,rif:this.rifUpd};de().put(me+"sede/plantilla/"+this.idUpd,e).then((async e=>{this.modalplantillapdf=!1,this.listar()}))},actualizarEstatus(){const e={estatus:"Activo"===this.estatusAct?0:1};de().put(me+"sede/estatus/"+this.idUpd,e).then((async e=>{this.modalactualizarestatus=!1,this.listar()}))},listar(){this.btndisable=!1,de().get(me+"sede").then((async e=>{console.log(e.data);const l=e.data.data;this.rows=[];for(const a in l){const e={};e.cod=l[a].id,e.rif=l[a].rif,e.logo=me+"imagen/"+l[a].rif+".png",e.bannerpublicidad=me+"imagen/"+l[a].rif+"_publi01.png",e.width=40,e.widthbanner=140,e.razonsocial=l[a].razonsocial,e.direccion=l[a].direccion,e.email=l[a].email,e.emailbcc=l[a].emailbcc,e.telefono=l[a].telefono,e.sitioweb=l[a].sitioweb,e.codigocomercial=l[a].codigocomercial,e.plantilla=l[a].plantillapdf,e.tokenservicios=l[a].tokenservicios,e.estatus="1"===l[a].estatus?"Activo":"Inactivo",e.enviocorreo="1"===l[a].enviocorreo?"Si":"No",e.publicidad="1"===l[a].publicidad?"Si":"No",e.validarinterno="1"===l[a].validarinterno?"Sin repetidos":"2"===l[a].validarinterno?"Validar consecutivo":"Sin validar",e.asignados=l[a].asignados||"","2"===this.co_rol?this.co_sede_seleted?this.co_sede_seleted===l[a].id&&this.rows.push(e):"1"===l[a].estatus&&this.rows.push(e):this.rows.push(e)}console.log(this.rows)})).catch((e=>{te.Z.create("Problemas al listar Sedes "+e)}))},getCodes(){de().get(me+"sede/codes").then((async e=>{const l=e.data.data;this.optionscodes=[];for(const a in l){const e={};e.cod=l[a].id,e.codigocomercial=l[a].codigocomercial,e.name=l[a].codigocomercial+"-"+l[a].descripcion,this.optionscodes.push(e)}})).catch((e=>{te.Z.create("Problemas al listar Codigos comerciales "+e)}))},myRule(e){if(void 0===e)return"Seleccione CÓDIGO COMERCIAL"}},mounted(){"1"!==this.co_rol&&"2"!==this.co_rol&&this.$router.push("/erroracceso"),this.listar(),this.getCodes()}};var pe=a(74260),he=a(2165),fe=a(54993),be=a(34842),we=a(24554),ge=a(83884),ve=a(46778),je=a(10151),_e=a(25589),ye=a(68689),Ve=a(77991),ke=a(99367),ze=a(18186),We=a(92414),xe=a(68516),Ue=a(81745),Ce=a(60677),qe=a(7518),Ie=a.n(qe);const Se=(0,pe.Z)(ue,[["render",ie]]),He=Se;Ie()(ue,"components",{QBtn:he.Z,QTable:fe.Z,QInput:be.Z,QIcon:we.Z,QTd:ge.Z,QDialog:ve.Z,QCard:je.Z,QCardSection:_e.Z,QForm:ye.Z,QRadio:Ve.Z,QCardActions:ke.Z,QTr:ze.Z,QTh:We.Z,QSelect:xe.Z,QUploader:Ue.Z}),Ie()(ue,"directives",{ClosePopup:Ce.Z})},46700:(e,l,a)=>{var i={"./af":5809,"./af.js":5809,"./ar":46069,"./ar-dz":70481,"./ar-dz.js":70481,"./ar-kw":93994,"./ar-kw.js":93994,"./ar-ly":33312,"./ar-ly.js":33312,"./ar-ma":90239,"./ar-ma.js":90239,"./ar-ps":47916,"./ar-ps.js":47916,"./ar-sa":31863,"./ar-sa.js":31863,"./ar-tn":19607,"./ar-tn.js":19607,"./ar.js":46069,"./az":69281,"./az.js":69281,"./be":29945,"./be.js":29945,"./bg":59384,"./bg.js":59384,"./bm":21476,"./bm.js":21476,"./bn":43345,"./bn-bd":70216,"./bn-bd.js":70216,"./bn.js":43345,"./bo":81713,"./bo.js":81713,"./br":19655,"./br.js":19655,"./bs":87296,"./bs.js":87296,"./ca":43049,"./ca.js":43049,"./cs":62722,"./cs.js":62722,"./cv":98039,"./cv.js":98039,"./cy":95563,"./cy.js":95563,"./da":31960,"./da.js":31960,"./de":67533,"./de-at":76674,"./de-at.js":76674,"./de-ch":17732,"./de-ch.js":17732,"./de.js":67533,"./dv":78343,"./dv.js":78343,"./el":37004,"./el.js":37004,"./en-au":32517,"./en-au.js":32517,"./en-ca":84929,"./en-ca.js":84929,"./en-gb":99722,"./en-gb.js":99722,"./en-ie":96923,"./en-ie.js":96923,"./en-il":68050,"./en-il.js":68050,"./en-in":99624,"./en-in.js":99624,"./en-nz":70540,"./en-nz.js":70540,"./en-sg":14375,"./en-sg.js":14375,"./eo":10040,"./eo.js":10040,"./es":99720,"./es-do":25595,"./es-do.js":25595,"./es-mx":10180,"./es-mx.js":10180,"./es-us":61563,"./es-us.js":61563,"./es.js":99720,"./et":9217,"./et.js":9217,"./eu":39474,"./eu.js":39474,"./fa":85243,"./fa.js":85243,"./fi":57645,"./fi.js":57645,"./fil":55350,"./fil.js":55350,"./fo":75622,"./fo.js":75622,"./fr":91467,"./fr-ca":53439,"./fr-ca.js":53439,"./fr-ch":14335,"./fr-ch.js":14335,"./fr.js":91467,"./fy":86026,"./fy.js":86026,"./ga":32969,"./ga.js":32969,"./gd":21347,"./gd.js":21347,"./gl":11085,"./gl.js":11085,"./gom-deva":904,"./gom-deva.js":904,"./gom-latn":69597,"./gom-latn.js":69597,"./gu":28705,"./gu.js":28705,"./he":69128,"./he.js":69128,"./hi":92821,"./hi.js":92821,"./hr":9002,"./hr.js":9002,"./hu":94814,"./hu.js":94814,"./hy-am":30658,"./hy-am.js":30658,"./id":29344,"./id.js":29344,"./is":28204,"./is.js":28204,"./it":70376,"./it-ch":81549,"./it-ch.js":81549,"./it.js":70376,"./ja":69293,"./ja.js":69293,"./jv":96401,"./jv.js":96401,"./ka":60482,"./ka.js":60482,"./kk":87329,"./kk.js":87329,"./km":44241,"./km.js":44241,"./kn":23566,"./kn.js":23566,"./ko":52742,"./ko.js":52742,"./ku":92915,"./ku-kmr":12346,"./ku-kmr.js":12346,"./ku.js":92915,"./ky":86846,"./ky.js":86846,"./lb":44959,"./lb.js":44959,"./lo":82188,"./lo.js":82188,"./lt":58967,"./lt.js":58967,"./lv":41245,"./lv.js":41245,"./me":90751,"./me.js":90751,"./mi":57501,"./mi.js":57501,"./mk":11643,"./mk.js":11643,"./ml":15597,"./ml.js":15597,"./mn":67612,"./mn.js":67612,"./mr":19065,"./mr.js":19065,"./ms":84703,"./ms-my":84645,"./ms-my.js":84645,"./ms.js":84703,"./mt":64365,"./mt.js":64365,"./my":83788,"./my.js":83788,"./nb":57357,"./nb.js":57357,"./ne":99109,"./ne.js":99109,"./nl":63746,"./nl-be":31985,"./nl-be.js":31985,"./nl.js":63746,"./nn":27175,"./nn.js":27175,"./oc-lnc":70566,"./oc-lnc.js":70566,"./pa-in":32733,"./pa-in.js":32733,"./pl":182,"./pl.js":182,"./pt":505,"./pt-br":17839,"./pt-br.js":17839,"./pt.js":505,"./ro":39578,"./ro.js":39578,"./ru":32328,"./ru.js":32328,"./sd":641,"./sd.js":641,"./se":51758,"./se.js":51758,"./si":36680,"./si.js":36680,"./sk":25016,"./sk.js":25016,"./sl":7424,"./sl.js":7424,"./sq":88635,"./sq.js":88635,"./sr":49038,"./sr-cyrl":73716,"./sr-cyrl.js":73716,"./sr.js":49038,"./ss":64771,"./ss.js":64771,"./sv":3517,"./sv.js":3517,"./sw":39419,"./sw.js":39419,"./ta":55959,"./ta.js":55959,"./te":21739,"./te.js":21739,"./tet":22264,"./tet.js":22264,"./tg":94792,"./tg.js":94792,"./th":88328,"./th.js":88328,"./tk":60702,"./tk.js":60702,"./tl-ph":57814,"./tl-ph.js":57814,"./tlh":10797,"./tlh.js":10797,"./tr":16691,"./tr.js":16691,"./tzl":76891,"./tzl.js":76891,"./tzm":16362,"./tzm-latn":37855,"./tzm-latn.js":37855,"./tzm.js":16362,"./ug-cn":77606,"./ug-cn.js":77606,"./uk":30513,"./uk.js":30513,"./ur":43803,"./ur.js":43803,"./uz":60344,"./uz-latn":8957,"./uz-latn.js":8957,"./uz.js":60344,"./vi":70003,"./vi.js":70003,"./x-pseudo":8842,"./x-pseudo.js":8842,"./yo":62083,"./yo.js":62083,"./zh-cn":84536,"./zh-cn.js":84536,"./zh-hk":92475,"./zh-hk.js":92475,"./zh-mo":67593,"./zh-mo.js":67593,"./zh-tw":4746,"./zh-tw.js":4746};function o(e){var l=t(e);return a(l)}function t(e){if(!a.o(i,e)){var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}return i[e]}o.keys=function(){return Object.keys(i)},o.resolve=t,e.exports=o,o.id=46700}}]);