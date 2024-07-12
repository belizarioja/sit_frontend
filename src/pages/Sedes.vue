<template>
  <div class="my-font my-fondo q-pa-md">
    <div class="row" style="margin-bottom: 40px;justify-content: space-between;">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Clientes emisores</span>
      <q-btn
         v-if="co_rol === '1'"
         color="secondary"
         :disabled="btndisable"
         label="Crear emisor"
         @click="openCrear"
         style="border-radius: 20px;padding: 7px 20px;" />
    </div>
    <q-table
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      v-model:pagination="pagination"
    >
      <template v-slot:top>
        <q-input borderless dense debounce="300" color="primary" v-model="filter" label="Buscar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-logo="props">
        <q-td :props="props">
          <div>
            <img
              v-if="co_rol === '1'"
              v-bind:src="props.row.logo"
              onerror="this.src='default.svg'"
              :width="props.row.width"
              style="cursor: pointer;"
              @click.stop="openLogo(props.row)"
            />
            <img
              v-else
              v-bind:src="props.row.logo"
              onerror="this.src='default.svg'"
              :width="props.row.width"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-direccion="props">
        <q-td :props="props">
          {{ props.row.direccion }}
        </q-td>
      </template>
      <template v-slot:body-cell-bannerpublicidad="props">
        <q-td :props="props">
          <div>
            <img
              v-if="co_rol === '1'"
              v-bind:src="props.row.bannerpublicidad"
              onerror="this.src='publicidad.png'"
              :width="props.row.widthbanner"
              style="cursor: pointer;"
              @click.stop="openPublicidad(props.row)"
            />
            <img
              v-else
              v-bind:src="props.row.bannerpublicidad"
              onerror="this.src='publicidad.png'"
              :width="props.row.widthbanner"
            />
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-plantilla="props">
        <q-td :props="props">
          <div class="text-center">
            <q-btn color="primary" :label="props.row.plantilla" @click.stop="btnviewplantilla(props.row)"/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-tokenservicios="props">
        <q-td :props="props">
          <div v-if="co_rol === '1'">
            <q-btn icon="visibility" @click.stop="btnviewtoken(props.row)" dense flat :disable="co_rol !== '1'"/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-numeracionactual="props">
        <q-td :props="props">
          <div>
            <q-btn icon="list_alt" @click.stop="btnviewdetails(props.row)" dense flat/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div v-if="co_rol === '1'">
            <q-btn color="secondary" icon="edit" @click.stop="btnOpenUpd(props.row)" dense :disable="co_rol !== '1'"/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props">
          <div v-if="co_rol === '1'">
            <q-btn
             :color="props.row.estatus === 'Activo' ? 'primary' : 'negative'"
             :icon="props.row.estatus === 'Activo' ? 'toggle_on' : 'toggle_off' "
             @click.stop="btnOpenUpdEstatus(props.row)"
             :disable="co_rol !== '1'"
             dense/>
          </div>
        </q-td>
      </template>
    </q-table>
    <!-- MODAL PARA CREAR CLIENTE EMISOR -->
    <q-dialog v-model="modalcrear" persistent>
      <q-card style="min-width: 550px">
        <q-card-section>
          <div class="text-h6">Crear emisor</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="crear" class="q-gutter-md">
            <div class="row">
              <q-input
                class="col-6 q-pa-sm"
                dense
                label="RIF"
                v-model="rif"
                autofocus
                hint="Formato J-########-#"
                :rules="[ val => val.length > 0 || 'Ingresar RIF' ]"
              />
              <q-input
                class="col-6 q-pa-sm"
                dense
                label="Razón Social"
                v-model="razonsocial"
                hint="Tal cual como va a salir en los documentos"
                autofocus
                :rules="[ val => val.length > 0 || 'Ingresar RAZON SOCIAL' ]"
              />
            </div>
            <div class="row">
              <q-input
                class="col q-pa-sm"
                dense
                label="Dirección"
                v-model="direccion"
                :rules="[ val => val.length > 0 || 'Ingresar DIRECCIÓN' ]"
              />
            </div>
            <div class="row">
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="email"
                label="Email"
                hint="Formato correo@mail.com"
                :rules="[ val => val.length > 0 || 'Ingresar EMAIL' ]"
              />
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="emailbcc"
                label="Email Cco"
              />
            </div>
            <div class="row">
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="telefono"
                label="Teléfono de contacto"
                hint="Formato +5842612345678"
                :rules="[ val => val.length > 0 || 'Ingresar TELÉFONO' ]"
              />
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="sitioweb"
                hint="Formato www.sitiowebejemplo.com"
                label="Sitio Web"
              />
              <div class="col-6 q-pa-sm" style="text-align: center;margin-top: 20px;">
                <div>Envío de correo</div>
                <q-radio v-model="shape" val="0" label="No" />
                <q-radio v-model="shape" val="1" label="Si" />
              </div>
              <div class="col-6 q-pa-sm" style="text-align: center;margin-top: 20px;">
                <div>Validar número interno</div>
                <q-radio v-model="shapeinterno" val="0" label="No" />
                <q-radio v-model="shapeinterno" val="2" label="Si" />
              </div>
            </div>
            <div style="display: flex; justify-content: space-evenly;">
              <q-btn color="negative" label="Cancelar" v-close-popup />
              <q-btn
                color="secondary"
                label="Aceptar"
                type="submit"
              />
            </div>
           </q-form>
          </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA VISUALIZAR TOKEN -->
    <q-dialog v-model="viewtoken" persistent>
      <q-card style="width: auto;">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Token del Cliente Emisor {{ razonsocialtitulo + ' - ' + riftitulo}}</span>
        </q-card-section>
        <q-card-section class="row items-center" style="word-break: break-all;">
          <div style="">
            {{ tokenservicios }}
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA MOSTRAR NUMERACION ACTUAL DEL CLIENTE EMISOR -->
    <q-dialog v-model="viewdetails" persistent>
      <q-card style="width: fit-content; max-width: fit-content;">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Numeración actual de {{ razonsocialtitulo + ' - ' + riftitulo }}</span>
        </q-card-section>
        <q-card-section class="row items-center" style="word-break: break-all;justify-content: center;">
          <q-table
            dense
            :rows="rowsdetails"
            :columns="columnsdetails"
            row-key="name"
            hide-pagination
          >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-italic text-blue"
                style="font-size: 20px"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
        </q-table>

        </q-card-section>
        <q-card-section class="row items-center" style="word-break: break-all;justify-content: center;">
          <q-table
            dense
            :rows="rowslotes"
            :columns="columnslotes"
            row-key="name"
            hide-pagination
          >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
                class="text-italic text-blue"
                style="font-size: 20px"
              >
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
        </q-table>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA EDITAR CLIENTE EMISOR -->
    <q-dialog v-model="modalactualizar" persistent>
      <q-card style="width: 560px">
        <q-card-section>
          <div class="text-h6">Actualizar cliente emisor</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="actualizar" class="q-gutter-md">
            <div class="row">
              <q-input
                class="col-6 q-pa-sm"
                dense
                label="RIF"
                v-model="rif"
                autofocus
                :rules="[ val => val.length > 0 || 'Ingresar RIF' ]"
              />
              <q-input
                class="col-6 q-pa-sm"
                dense
                label="Razón Social"
                v-model="razonsocial"
                autofocus
                :rules="[ val => val.length > 0 || 'Ingresar RAZON SOCIAL' ]"
              />
            </div>
            <div class="row">
              <q-input
                class="col q-pa-sm"
                dense
                label="Dirección"
                v-model="direccion"
                :rules="[ val => val.length > 0 || 'Ingresar DIRECCIÓN' ]"
              />
            </div>
            <div class="row">
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="email"
                label="Email principal"
                :rules="[ val => val.length > 0 || 'Ingresar EMAIL Comercial' ]"
              />
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="emailbcc"
                label="Email Cco"
              />
            </div>
            <div class="row">
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="telefono"
                label="Teléfono de contacto"
                :rules="[ val => val.length > 0 || 'Ingresar TELÉFONO' ]"
              />
              <q-input
                dense
                class="col-6 q-pa-sm"
                v-model="sitioweb"
                label="Sitio Web"
              />
              <q-select
                dense
                options-dense
                v-model="modelcodes"
                :options="optionscodes"
                option-label="name"
                option-value="cod"
                class="col-12 q-pa-sm"
                label="Código comercial"
                :rules="[myRule]"
              />
              <div class="col-4 q-pa-sm" style="text-align: center;margin-top: 20px;">
                <div>Envío de correo</div>
                <q-radio v-model="shape" val="0" label="No" />
                <q-radio v-model="shape" val="1" label="Si" />
              </div>
              <div class="col-4 q-pa-sm" style="text-align: center;margin-top: 20px;">
                <div>Validar número interno</div>
                <q-radio v-model="shapeinterno" val="0" label="No" />
                <q-radio v-model="shapeinterno" val="2" label="Si" />
              </div>
              <div class="col-4 q-pa-sm" style="text-align: center;margin-top: 20px;">
                <div>Publicidad</div>
                <q-radio v-model="shapepublicidad" val="0" label="No" />
                <q-radio v-model="shapepublicidad" val="1" label="Si" />
              </div>
            </div>
            <div style="display: flex; justify-content: space-evenly;">
              <q-btn color="negative" label="Cancel" v-close-popup />
              <q-btn
                color="secondary"
                label="Aceptar"
                type="submit"
              />
            </div>
           </q-form>
          </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA GESTIONAR STATUS DEL CLIENTE EMISOR -->
    <q-dialog v-model="modalactualizarestatus" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Actualizar Estatus</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div>
            ¿Desea {{ messageActualizar }} este cliente emisor?
           </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;">
             <q-btn color="negative" label="Cancelar" v-close-popup />
             <q-btn
              color="secondary"
              label="Aceptar"
              @click="actualizarEstatus"
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA CONFIRMAR EDITAR CON EXITO -->
    <q-dialog v-model="modalconfirmar" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6" style="text-align: center;">En Horabuena!</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <img src="confirmar.png" alt="Actualizar" style="max-width: 285px;">
          <div>
            ¡Cliente emisor {{ messageConfirmar }} con éxito!
           </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;">
             <q-btn
              color="secondary"
              label="Aceptar"
              v-close-popup
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA GESTIONAR LOGO -->
    <q-dialog v-model="modallogo" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Actualizar {{tituloCargarImagen}}</div>
        </q-card-section>
          <q-card-section class="q-pt-none">
            <q-uploader
              label="Upload"
              :factory="factoryFn"
              style="max-width: 350px"
              @uploaded="closeLogoUploader"
            />
          </q-card-section>
          <q-card-section class="q-pt-none">
           <div  style="text-align: center;">
             <q-btn flat label="Cancelar" v-close-popup />
           </div>
         </q-card-section>

      </q-card>
    </q-dialog>
    <!-- MODAL PARA GESTIONAR PLANTILLA PDF-->
    <q-dialog v-model="modalplantillapdf" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Gestionar plantilla PDF</div>
        </q-card-section>
        <q-card-section class="q-pt-none flex">
          <div style="margin: 10px;">
            <img src="factura1.png" alt="" style="width: 200px;">
            <div class="text-center">
              <q-radio v-model="plantilla" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="1" label="1"  :disable="co_rol !== '1'" />
            </div>
          </div>
          <div style="margin: 10px;">
            <img src="factura2.png" alt="" style="width: 200px;">
            <div class="text-center">
              <q-radio v-model="plantilla" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="2" label="2" :disable="co_rol !== '1'"/>
            </div>
          </div>
        </q-card-section>
        <!-- <q-card-section class="q-pt-none flex">
          <div style="margin: 10px;">
            <img src="factura4.png" alt="" style="width: 200px;">
            <div class="text-center">
              <q-radio v-model="plantilla" checked-icon="task_alt" unchecked-icon="panorama_fish_eye" val="4" label="4"  :disable="co_rol !== '1'" />
            </div>
          </div>
        </q-card-section> -->
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;">
             <q-btn color="negative" label="Cerrar" v-close-popup />
             <q-btn
              color="secondary"
              label="Actualizar"
              :disable="co_rol !== '1'"
              @click="actualizarPlantillapdf"
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar'
import moment from 'moment'
import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  setup () {
    return {
      plantilla: ref(1),
      modalcrear: ref(false),
      modalactualizar: ref(false),
      modalplantillapdf: ref(false),
      modalconfirmar: ref(false),
      modalactualizarestatus: ref(false),
      modallogo: ref(false),
      viewtoken: ref(false),
      viewdetails: ref(false),
      tokenservicios: ref(''),
      rif: ref(''),
      razonsocial: ref(''),
      riftitulo: ref(''),
      razonsocialtitulo: ref(''),
      email: ref(''),
      emailbcc: ref(''),
      direccion: ref(''),
      telefono: ref(''),
      cantidad: ref(''),
      sitioweb: ref(''),
      shape: ref('0'),
      shapeinterno: ref('0'),
      shapepublicidad: ref('0'),
      filter: ref(''),
      co_rol: sessionStorage.getItem('co_rol'),
      loading: ref(false),
      tituloCargarImagen: ref(''),
      pagination: ref({
        sortBy: 'cod',
        descending: false,
        page: 1,
        rowsPerPage: 15
        // rowsNumber: xx if getting data from a server
      })
    }
  },
  data () {
    return {
      columns: [
        {
          name: 'cod',
          required: true,
          label: '#',
          align: 'left',
          field: row => row.cod,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'logo', align: 'center', label: 'Logo', field: 'logo' },
        { name: 'rif', align: 'center', label: 'RIF', field: 'rif', sortable: true },
        { name: 'razonsocial', align: 'center', label: 'Razón social', field: 'razonsocial', sortable: true },
        { name: 'direccion', label: 'Dirección', field: 'direccion', sortable: true, align: 'left', style: 'max-width: 300px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;' },
        { name: 'email', label: 'Correo electrónico', field: 'email', sortable: true },
        { name: 'telefono', label: 'Teléfono contacto', field: 'telefono', sortable: true },
        { name: 'codigocomercial', label: 'Código comercial', field: 'codigocomercial', sortable: true },
        { name: 'plantilla', label: 'Plantilla PDF', field: 'plantilla' },
        { name: 'tokenservicios', label: 'Token', field: 'tokenservicios', sortable: true },
        { name: 'numeracionactual', label: 'Numeración actual', field: 'numeracionactual', sortable: true },
        { name: 'enviocorreo', label: 'Envio correo', field: 'enviocorreo', sortable: true },
        { name: 'validarinterno', label: 'Validar interno', field: 'validarinterno', sortable: true },
        { name: 'publicidad', label: 'Publicidad', field: 'publicidad', sortable: true },
        { name: 'bannerpublicidad', label: 'Diseño publicidad', field: 'bannerpublicidad', sortable: true },
        { name: 'estatus', label: 'Estatus', field: 'estatus' },
        { name: 'edit', label: 'Editar', field: 'edit' }
      ],
      rows: [],
      columnsdetails: [
        { name: 'identificador', align: 'center', label: 'Identificador', field: 'identificador', style: 'font-size:20px' },
        { name: 'corelativo', align: 'center', label: 'Correlativo  actual', field: 'corelativo', style: 'font-size:20px' }
      ],
      rowsdetails: [],
      columnslotes: [
        { name: 'lote', align: 'center', label: 'Lote', field: 'lote', style: 'font-size:20px' },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha', style: 'font-size:20px' },
        { name: 'cantidad', align: 'center', label: 'Adquiridos', field: 'cantidad', style: 'font-size:20px' },
        { name: 'utilizado', align: 'center', label: 'Utilizados', field: 'utilizado', style: 'font-size:20px' },
        { name: 'inicia', align: 'center', label: 'Inicia', field: 'inicia', style: 'font-size:20px' },
        { name: 'termina', align: 'center', label: 'Termina', field: 'termina', style: 'font-size:20px' },
        { name: 'disponible', align: 'center', label: 'Disponibles', field: 'disponible', style: 'font-size:20px' }
      ],
      rowslotes: [],
      optionscodes: [],
      modelcodes: [],
      btndisable: true,
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted')
    }
  },
  methods: {
    uploadFile (file, updateProgress) {
      // this.loading = true
      const files = this.$refs.files.files.concat(file)
      const formData = new FormData()
      for (let i = 0; i < files.length - 1; i++) {
        const file = files[i]
        formData.append('files[' + i + ']', file)
      }
      formData.append('caption', this.caption)
      this.$axios.post(this.getUrl(), formData)
        .then((response) => {
          this.loading = false
          if (response.data.error) {
            this.$q.notify({
              message: response.data.message,
              type: 'negative',
              color: 'negative',
              icon: 'fas fa-exclamation-triangle'
            })
          }
        }, (response) => {
          // this.loading = false
        })
    },
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        resolve({
          url: this.getUrl(),
          method: 'POST'
        })
      })
    },
    getUrl () {
      return `${ENDPOINT_PATH_V2}imagen/uploadimg/${this.rifUpd}`
    },
    openLogo (row) {
      this.tituloCargarImagen = 'Logo'
      this.rifUpd = row.rif
      this.modallogo = true
    },
    openPublicidad (row) {
      this.tituloCargarImagen = 'Publicidad'
      this.rifUpd = row.rif + '_publi01'
      this.modallogo = true
    },
    closeLogoUploader: function (info) {
      Notify.create(info.xhr.response)
      const $this = this
      setTimeout(function () {
        $this.cerrarLogo()
      }, 3000)
    },
    cerrarLogo () {
      this.modallogo = false
      this.$router.go(0)
      // this.listar()
    },
    openCrear () {
      this.limpiar()
      this.modalcrear = true
    },
    btnviewtoken (row) {
      this.razonsocialtitulo = row.razonsocial
      this.riftitulo = row.rif
      this.tokenservicios = row.tokenservicios
      this.viewtoken = true
    },
    btnviewplantilla (row) {
      this.plantilla = row.plantilla
      this.idUpd = row.cod
      this.rifUpd = row.rif
      this.modalplantillapdf = true
    },
    btnOpenUpdEstatus (row) {
      this.idUpd = row.cod
      this.messageActualizar = row.estatus === 'Activo' ? 'desactivar' : 'activar'
      this.estatusAct = row.estatus
      this.modalactualizarestatus = true
    },
    btnOpenUpd (row) {
      const codecomercial = this.optionscodes.filter(obj => obj.codigocomercial === row.codigocomercial)
      this.idUpd = row.cod
      this.rif = row.rif
      this.razonsocial = row.razonsocial
      this.direccion = row.direccion
      this.email = row.email
      this.emailbcc = row.emailbcc
      this.modelcodes = codecomercial[0]
      this.telefono = row.telefono
      this.cantidad = row.asignados
      this.sitioweb = row.sitioweb
      this.shape = row.enviocorreo === 'Si' ? '1' : '0'
      this.shapepublicidad = row.publicidad === 'Si' ? '1' : '0'
      this.shapeinterno = row.validarinterno === 'Sin validar' ? '0' : '2'
      this.modalactualizar = true
    },
    btnviewdetails (row) {
      this.razonsocialtitulo = row.razonsocial
      this.riftitulo = row.rif
      axios.get(ENDPOINT_PATH_V2 + 'sede/' + row.cod).then(async response => {
        // console.log(response.data)
        const datos = response.data
        this.rowsdetails = []
        this.rowslotes = []
        const obj = {}
        obj.identificador = datos.identificador.toString().padStart(2, '0')
        obj.corelativo = datos.corelativo.toString().padStart(8, '0')
        this.rowsdetails.push(obj)
        for (const i in datos.data) {
          const item = datos.data[i]
          const obj2 = {}
          obj2.lote = item.id
          obj2.fecha = moment(item.fecha).format('DD/MM/YYYY')
          obj2.cantidad = item.cantidad
          obj2.inicia = item.inicia
          obj2.termina = item.termina
          obj2.utilizado = item.utilizado
          obj2.disponible = Number(item.cantidad) - Number(item.utilizado)
          this.rowslotes.push(obj2)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Detalles corelativo ' + error)
      })
      this.viewdetails = true
    },
    limpiar () {
      this.rif = ''
      this.razonsocial = ''
      this.direccion = ''
      this.email = ''
      this.emailbcc = ''
      this.telefono = ''
      this.sitioweb = ''
    },
    crear () {
      if (this.rif.length === 0) {
        return
      }
      if (this.razonsocial.length === 0) {
        return
      }
      if (this.direccion.length === 0) {
        return
      }
      if (this.email.length === 0) {
        return
      }
      if (this.telefono.length === 0) {
        return
      }
      const data = {
        rif: this.rif,
        razonsocial: this.razonsocial,
        direccion: this.direccion,
        email: this.email,
        emailbcc: this.emailbcc,
        telefono: this.telefono,
        asignados: 0,
        sitioweb: this.sitioweb,
        enviocorreo: this.shape,
        validarinterno: this.shapeinterno
      }
      // console.log(data)
      axios.post(ENDPOINT_PATH_V2 + 'sede', data).then(async response => {
        this.messageConfirmar = 'creado'
        this.modalcrear = false
        this.modalconfirmar = true
        this.limpiar()
        this.listar()
      })
    },
    actualizar () {
      if (this.rif.length === 0) {
        return
      }
      if (this.razonsocial.length === 0) {
        return
      }
      if (this.direccion.length === 0) {
        return
      }
      if (this.email.length === 0) {
        return
      }
      if (this.telefono.length === 0) {
        return
      }
      if (this.modelcodes === undefined) {
        // console.log('Error this.modelcodes.cod')
        return
      }
      const data = {
        rif: this.rif,
        razonsocial: this.razonsocial,
        direccion: this.direccion,
        email: this.email,
        emailbcc: this.emailbcc,
        telefono: this.telefono,
        sitioweb: this.sitioweb,
        enviocorreo: this.shape,
        idcodigocomercial: Number(this.modelcodes.cod),
        validarinterno: this.shapeinterno,
        publicidad: this.shapepublicidad
      }
      axios.put(ENDPOINT_PATH_V2 + 'sede/' + this.idUpd, data).then(async response => {
        this.messageConfirmar = 'actualizado'
        this.modalactualizar = false
        this.modalconfirmar = true
        // console.log(response.data)
        this.limpiar()
        this.listar()
      })
    },
    actualizarPlantillapdf () {
      const data = {
        plantilla: this.plantilla,
        rif: this.rifUpd
      }
      axios.put(ENDPOINT_PATH_V2 + 'sede/plantilla/' + this.idUpd, data).then(async response => {
        this.modalplantillapdf = false
        // console.log(response.data)
        this.listar()
      })
    },
    actualizarEstatus () {
      const data = {
        estatus: this.estatusAct === 'Activo' ? 0 : 1
      }
      axios.put(ENDPOINT_PATH_V2 + 'sede/estatus/' + this.idUpd, data).then(async response => {
        this.modalactualizarestatus = false
        // console.log(response.data)
        this.listar()
      })
    },
    listar () {
      this.btndisable = false
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.rows = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.rif = datos[i].rif
          obj.logo = ENDPOINT_PATH_V2 + 'imagen/' + datos[i].rif + '.png'
          obj.bannerpublicidad = ENDPOINT_PATH_V2 + 'imagen/' + datos[i].rif + '_publi01.png'
          obj.width = 40
          obj.widthbanner = 140
          obj.razonsocial = datos[i].razonsocial
          obj.direccion = datos[i].direccion
          obj.email = datos[i].email
          obj.emailbcc = datos[i].emailbcc
          obj.telefono = datos[i].telefono
          obj.sitioweb = datos[i].sitioweb
          obj.codigocomercial = datos[i].codigocomercial
          obj.plantilla = datos[i].plantillapdf
          obj.tokenservicios = datos[i].tokenservicios
          obj.estatus = datos[i].estatus === '1' ? 'Activo' : 'Inactivo'
          obj.enviocorreo = datos[i].enviocorreo === '1' ? 'Si' : 'No'
          obj.publicidad = datos[i].publicidad === '1' ? 'Si' : 'No'
          obj.validarinterno = datos[i].validarinterno === '1' ? 'Sin repetidos' : datos[i].validarinterno === '2' ? 'Validar consecutivo' : 'Sin validar'
          obj.asignados = datos[i].asignados || ''
          if (this.co_rol === '2') {
            if (this.co_sede_seleted) {
              if (this.co_sede_seleted === datos[i].id) {
                this.rows.push(obj)
              }
            } else {
              if (datos[i].estatus === '1') {
                this.rows.push(obj)
              }
            }
          } else {
            this.rows.push(obj)
          }
        }
        console.log(this.rows)
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    },
    getCodes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede/codes').then(async response => {
        const datos = response.data.data
        this.optionscodes = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.codigocomercial = datos[i].codigocomercial
          obj.name = datos[i].codigocomercial + '-' + datos[i].descripcion
          this.optionscodes.push(obj)
        }
        // console.log(this.optionscodes)
      }).catch(error => {
        Notify.create('Problemas al listar Codigos comerciales ' + error)
      })
    },
    myRule (val) {
      if (val === undefined) {
        return 'Seleccione CÓDIGO COMERCIAL'
      }
    }
  },
  mounted () {
    if (this.co_rol !== '1' && this.co_rol !== '2') {
      this.$router.push('/erroracceso')
    }
    this.listar()
    this.getCodes()
  }
}
</script>
