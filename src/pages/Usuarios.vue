<template>
  <div class="my-font my-fondo q-pa-md">
    <div class="row" style="margin-bottom: 40px;justify-content: space-between;">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Usuarios</span>
      <q-btn
         v-if="co_rol === '1' || co_rol === '2'"
         color="secondary"
         label="Crear usuario"
         @click="modalcrear = true"
         style="border-radius: 20px;padding: 7px 20px;" />
    </div>
    <q-table
      dense
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      :pagination="pagination"
    >
      <template v-slot:top>
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-bitacora="props">
        <q-td :props="props">
          <div>
            <q-btn icon="list_alt" @click.stop="btnviewdetails(props.row)" dense flat/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-clave="props">
        <q-td :props="props">
          <div>
            <q-btn :disable="co_rol !== '1'" icon="key" @click.stop="btnOpenUpdClave(props.row)" dense flat/>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-razonsocial="props">
        <q-td :props="props">
          <div>
            {{ (props.row.idrol === '2' || props.row.idrol === '4' ) ? 'SENIAT' : (props.row.idrol === '1' || props.row.idrol === '5' ) ? 'SMART' : props.row.razonsocial }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          <div v-if="co_rol === '1' || co_rol === '2'">
            <q-badge v-if="props.row.emailbcc" color="blue" @click.stop="btnOpenUpdEmail(props.row, 1)" style="padding: 5px 10px; cursor: pointer;">
              {{props.row.emailbcc}}
            </q-badge>
            <q-badge v-if="(!props.row.emailbcc && props.row.idrol !== '1' && props.row.idrol !== '5')" color="green" @click.stop="btnOpenUpdEmail(props.row, 1)" style="padding: 5px 10px; cursor: pointer;">
              Agregar email
            </q-badge>
          </div>
          <div v-else>
            {{props.row.emailbcc}}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-emailrecuperacion="props">
        <q-td :props="props">
          <div v-if="co_rol === '1' || co_rol === '2'">
            <q-badge v-if="props.row.emailrecuperacion" color="blue" @click.stop="btnOpenUpdEmail(props.row, 2)" style="padding: 5px 10px; cursor: pointer;">
              {{props.row.emailrecuperacion}}
            </q-badge>
            <q-badge v-if="(!props.row.emailrecuperacion && props.row.idrol !== '1' && props.row.idrol !== '5')" color="green" @click.stop="btnOpenUpdEmail(props.row, 2)" style="padding: 5px 10px; cursor: pointer;">
              Agregar email
            </q-badge>
          </div>
          <div v-else>
            {{props.row.emailrecuperacion}}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-horaentrada="props">
        <q-td :props="props">
          <div v-if="co_rol === '1' || co_rol === '2'">
            <q-badge v-if="props.row.horaentrada" color="blue" @click.stop="btnOpenUpdHora(props.row, 1)" style="padding: 5px 10px; cursor: pointer;">
              {{props.row.horaentrada}}
            </q-badge>
            <q-badge v-if="(!props.row.horaentrada && props.row.idrol !== '1' && props.row.idrol !== '5')" color="green" @click.stop="btnOpenUpdHora(props.row, 1)" style="padding: 5px 10px; cursor: pointer;">
              Agregar hora
            </q-badge>
          </div>
          <div v-else>
            {{props.row.horaentrada}}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-horasalida="props">
        <q-td :props="props">
          <div v-if="co_rol === '1' || co_rol === '2'">
            <q-badge v-if="props.row.horasalida" color="blue" @click.stop="btnOpenUpdHora(props.row, 2)" style="padding: 5px 10px; cursor: pointer;">
              {{props.row.horasalida}}
            </q-badge>
            <q-badge v-if="(!props.row.horasalida && props.row.idrol !== '1' && props.row.idrol !== '5')" color="green" @click.stop="btnOpenUpdHora(props.row, 2)" style="padding: 5px 10px; cursor: pointer;">
              Agregar hora
            </q-badge>
          </div>
          <div v-else>
            {{props.row.horasalida}}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props">
          <div v-if="props.row.id !== '1'">
            <q-btn :color="props.row.estatus === 'Activo' ? 'primary' : 'negative'" :icon="props.row.estatus === 'Activo' ? 'toggle_on' : 'toggle_off' " @click.stop="btnOpenUpdEstatus(props.row)" dense/>
          </div>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="modalcrear" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Crear usuario</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="nombre"
            label="Nombre"
            hint="Debe ser distinto a la razón social"
            autofocus
            :rules="[ val => val.length > 0 || 'Ingresar NOMBRE DE USUARIO' ]"
          />
          <q-input
            dense
            v-model="usuario"
            label="Usuario"
            autofocus
            :rules="[ val => val.length > 0 || 'Ingresar DESCRIPCION DE USUARIO' ]"
          />
          <q-input
            dense
            v-model="clave"
            label="Clave"
            autofocus
            :rules="[ val => val.length > 0 || 'Ingresar CLAVE DE USUARIO' ]"
          />
          <q-select
            dense
            class="col"
            filled
            options-dense
            v-model="modelrol"
            :options="optionsrol"
            option-label="name"
            option-value="cod"
            label="Rol de usuario"
            style="margin: 10px;" />
          <q-select
            v-if="co_rol === '1'"
            dense
            class="col"
            filled
            options-dense
            v-model="modelsede"
            :options="optionssede"
            option-label="name"
            option-value="cod"
            label="Cliente emisor"
            style="margin: 10px;" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="negative" label="Cancelar" v-close-popup />
          <q-btn color="secondary" label="Aceptar" @click="crearusuario"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewdetails" persistent>
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Trazas de seguridad</span>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-table
            dense
            :rows="rowsdetails"
            :columns="columnsdetails"
            row-key="num"
            hide-pagination
            style="width: 100%;"
          >
        </q-table>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="secondary" label="Aceptar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
          <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
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

    <q-dialog v-model="modalactualizarclave" persistent>
      <q-card  style="width: 300px;">
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Actualizar Clave</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="nuevaclave"
            label="Ingrese nueva clave"
            autofocus
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
             <q-btn color="negative" label="Cancelar" v-close-popup />
             <q-btn
              color="secondary"
              label="Aceptar"
              @click="cambiarclave"
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA ACTUALIZAR EMAIL DE USUARIO-->
    <q-dialog v-model="modalactualizaremail" persistent>
      <q-card  style="width: 300px;">
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Actualizar Email {{ idCorreo === 1 ? 'Principal' : 'Secundario' }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="nuevoemail"
            label="Ingrese nuevo email"
            autofocus
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
            <q-btn color="negative" label="Cancelar" v-close-popup />
             <q-btn
              color="secondary"
              label="Aceptar"
              @click="cambiaremail"
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA ACTUALIZAR HORA DE SESION DE USUARIO-->
    <q-dialog v-model="modalactualizarhora" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Hora de {{ idHora === 1 ? 'Inicio' : 'Fin' }} de Sesión</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-time v-model="nuevahora" format24h />
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
             <q-btn color="negative" label="Cerrar" v-close-popup />
             <q-btn color="positive" label="Limpiar" @click="nuevahora = null" />
             <q-btn
              color="secondary"
              label="Guardar"
              @click="cambiarhora"
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
import axios from 'axios'
import moment from 'moment'
import md5 from 'md5'
// import M from 'minimatch'

const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  setup () {
    return {
      idUpd: ref(''),
      idHora: ref(1),
      idCorreo: ref(1),
      viewdetails: ref(false),
      modalactualizarestatus: ref(false),
      modalactualizarclave: ref(false),
      modalactualizaremail: ref(false),
      modalactualizarhora: ref(false),
      modalcrear: ref(false),
      usuario: ref(''),
      clave: ref(''),
      nuevaclave: ref(''),
      nuevoemail: ref(''),
      nuevahora: ref(moment().format('HH:mm')),
      email: ref(''),
      nombre: ref(''),
      filter: ref(''),
      loading: ref(false),
      co_rol: sessionStorage.getItem('co_rol'),
      pagination: {
        page: 1,
        rowsPerPage: 10 // 0 means all rows
      }
    }
  },
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nombre',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'razonsocial', align: 'left', label: 'Razon Social', field: 'razonsocial', sortable: true },
        { name: 'usuario', align: 'left', label: 'Usuario', field: 'usuario', sortable: true },
        // { name: 'clave', align: 'center', label: 'Clave', field: 'clave', sortable: true },
        { name: 'rol', label: 'Rol', field: 'rol', sortable: true },
        { name: 'horaentrada', label: 'Inicio Sesión', field: 'horasalida', sortable: true },
        { name: 'horasalida', label: 'Fin Sesión', field: 'horasalida', sortable: true },
        { name: 'email', label: 'Email Principal', field: 'emailbcc', sortable: true },
        { name: 'emailrecuperacion', label: 'Email Secundario', field: 'emailrecuperacion', sortable: true },
        { name: 'fecharecuperacion', label: 'Fecha Recuperación', field: 'fecharecuperacion', sortable: true },
        { name: 'bitacora', label: 'Bitácora' },
        { name: 'clave', label: 'Clave' },
        { name: 'estatus', label: 'Estatus', field: 'estatus' }
      ],
      rows: [],
      columnsdetails: [
        { name: 'num', align: 'center', label: '#', field: 'num' },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha' },
        { name: 'evento', align: 'left', label: 'Evento', field: 'evento' },
        { name: 'observacion', align: 'left', label: 'Observación', field: 'observacion' },
        { name: 'ip', align: 'center', label: 'IP', field: 'ip' },
        { name: 'idusuario', align: 'center', label: 'Id Usuario', field: 'idusuario' },
        { name: 'nombre', align: 'left', label: 'Nombre Usuario', field: 'nombre' }
      ],
      rowsdetails: [],
      modelrol: [],
      optionsrol: [],
      modelsede: [],
      optionssede: []
    }
  },
  methods: {
    btnOpenUpdHora (row, val) {
      this.idUpd = row.id
      this.idHora = val
      this.nuevahora = val === 1 ? row.horaentrada : row.horasalida
      this.modalactualizarhora = true
    },
    btnOpenUpdEmail (row, val) {
      this.idUpd = row.id
      this.idCorreo = val
      this.nuevoemail = val === 1 ? row.emailbcc : row.emailrecuperacion
      this.modalactualizaremail = true
    },
    btnOpenUpdEstatus (row) {
      this.idUpd = row.id
      this.messageActualizar = row.estatus === 'Activo' ? 'desactivar' : 'activar'
      this.estatusAct = row.estatus
      this.modalactualizarestatus = true
    },
    btnOpenUpdClave (row) {
      this.idUpd = row.id
      this.modalactualizarclave = true
    },

    actualizarEstatus () {
      const data = {
        estatus: this.estatusAct === 'Activo' ? 0 : 1
      }
      axios.put(ENDPOINT_PATH_V2 + 'usuario/estatus/' + this.idUpd, data).then(async response => {
        this.modalactualizarestatus = false
        console.log(response.data)
        this.listarusuarios()
      })
    },
    btnviewdetails (row) {
      const body = {
        idusuario: row.id || undefined
      }
      axios.post(ENDPOINT_PATH_V2 + 'bitacora/listar', body).then(async response => {
        const datos = response.data.data
        console.log(datos)
        this.rowsdetails = []
        for (const i in datos) {
          const obj = {}
          obj.num = Number(i) + 1
          obj.evento = datos[i].evento
          obj.idusuario = datos[i].idusuario
          obj.usuario = datos[i].usuario
          obj.nombre = datos[i].nombre
          obj.ip = datos[i].ip
          obj.observacion = datos[i].observacion
          obj.fecha = moment(datos[i].fecha).format('DD/MM/YYYY HH:mm:ss')
          this.rowsdetails.push(obj)
        }

        if (row.id) {
          this.viewdetails = true
        }
      }).catch(error => {
        Notify.create('Problemas al listar Detalles bitacora ' + error)
      })
    },
    cambiarclave () {
      if (this.nuevaclave.length < 4) {
        Notify.create('Debe ingresar nueva clave correcta ')
        return
      }
      const body = {
        nuevaclave: md5(this.nuevaclave)
      }
      axios.put(ENDPOINT_PATH_V2 + 'usuario/cambioclave/' + this.idUpd, body).then(async response => {
        console.log(response.data)
        this.modalactualizarclave = false
        this.listarusuarios()
        Notify.create('Calve cambiada en forma correcta')
      })
    },
    cambiarhora () {
      const body = {
        nuevahora: this.nuevahora,
        accion: this.idHora
      }
      axios.put(ENDPOINT_PATH_V2 + 'usuario/cambiohora/' + this.idUpd, body).then(async response => {
        this.modalactualizarhora = false
        this.listarusuarios()
        Notify.create('Hora cambiada en forma correcta')
      })
    },
    cambiaremail () {
      if (this.nuevoemail.length < 4) {
        Notify.create('Debe ingresar nuevo email ')
        return
      }
      const body = {
        nuevoemail: this.nuevoemail,
        accion: this.idCorreo
      }
      axios.put(ENDPOINT_PATH_V2 + 'usuario/cambioemail/' + this.idUpd, body).then(async response => {
        this.modalactualizaremail = false
        this.listarusuarios()
        Notify.create('Email cambiado en forma correcta')
      })
    },
    crearusuario () {
      this.modalcrear = false
      // console.log(this.usuario)
      // console.log(this.modelrol)
      const data = {
        usuario: this.usuario,
        clave: md5(this.clave),
        nombre: this.nombre,
        estatus: 1,
        idrol: Number(this.modelrol.cod),
        idserviciosmasivo: Number(this.modelsede?.cod) || null
      }
      axios.post(ENDPOINT_PATH_V2 + 'usuario', data).then(async response => {
        console.log(response.data)
        this.usuario = ''
        this.clave = ''
        this.nombre = ''
        this.modelrol = []
        this.modelsede = []
        this.listarusuarios()
      })
    },
    listarusuarios () {
      axios.get(ENDPOINT_PATH_V2 + 'usuario').then(async response => {
        const datos = response.data.resp
        this.rows = []
        for (const i in datos) {
          const obj = {}
          obj.id = datos[i].id
          obj.name = datos[i].nombre
          obj.razonsocial = datos[i].razonsocial
          obj.usuario = datos[i].usuario
          obj.clave = datos[i].clave
          obj.rol = datos[i].rol
          obj.idrol = datos[i].idrol
          obj.feultacceso = datos[i].feultacceso
          obj.emailbcc = datos[i].emailbcc
          obj.emailrecuperacion = datos[i].emailrecuperacion
          obj.horaentrada = datos[i].horaentrada
          obj.horasalida = datos[i].horasalida
          obj.fecharecuperacion = datos[i].fecharecuperacion ? moment(datos[i].fecharecuperacion).format('DD/MM/YYYY HH:mm:ss') : ''
          obj.estatus = datos[i].estatus === '1' ? 'Activo' : 'Inactivo'
          if (this.co_rol === '1') {
            this.rows.push(obj)
          } else {
            if (this.co_rol === '2' && (datos[i].idrol === '2' || datos[i].idrol === '4')) {
              this.rows.push(obj)
            }
          }
        }
      }).catch(error => {
        Notify.create('Problemas al listar Usuarios ' + error)
      })
    },
    listarroles () {
      axios.get(ENDPOINT_PATH_V2 + 'usuario/roles').then(async response => {
        const datos = response.data.resp
        this.optionsrol = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].rol
          if (datos[i].id === '1' || datos[i].id === '3' || datos[i].id === '2' || datos[i].id === '5') {
            if (this.co_rol === '1') {
              this.optionsrol.push(obj)
            }
          } else {
            this.optionsrol.push(obj)
          }
        }
      }).catch(error => {
        Notify.create('Problemas al listar Roles ' + error)
      })
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        const datos = response.data.data
        this.optionssede = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].razonsocial
          this.optionssede.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    }
  },
  mounted () {
    if (this.co_rol !== '1' && this.co_rol !== '2') {
      this.$router.push('/erroracceso')
    }
    this.listarusuarios()
    this.listarroles()
    this.listarsedes()
  }

}
</script>
