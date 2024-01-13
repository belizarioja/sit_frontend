<template>
  <div class="my-font q-pa-md">
    <div class="row">
      <span style="margin: 0 20px;font-size: 25px;font-weight: bolder;">Asignaciones</span>
    </div>
    <div class="row">
      <q-select
          v-if="co_rol === '1' || co_rol === '2'"
          label="Buscar por Nombre o RIF del Emisor"
          dense
          class="col-md-4 col-sm-6 col-xs-12"
          filled
          v-model="modelsede"
          :disable="disabledSede"
          use-input
          hide-selected
          fill-input
          clearable
          options-dense
          option-label="namerif"
          option-value="cod"
          input-debounce="0"
          :options="optionssede"
          @update:model-value="changeSede()"
          @input:="changeSede()"
          @filter="searchEmisor"
          style="padding: 5px;"
        />
      <q-select
        label="Buscar por Nombre o Username del usuario"
        dense
        class="col-md-4 col-sm-6 col-xs-12"
        filled
        v-model="modelusuario"
        use-input
        hide-selected
        fill-input
        clearable
        options-dense
        option-label="nameuser"
        option-value="cod"
        input-debounce="0"
        :options="optionsusuarios"
        @update:model-value="listar()"
        @input:="listar()"
        @filter="searchUsuario"
        style="padding: 5px;"
      />
      <q-input
        dense
        filled
        label="Desde"
        mask="date"
        v-model="dateFrom"
        class="col-md-2 col-sm-6 col-xs-6"
        style="padding: 5px;">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dateFrom" :locale="myLocale">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        dense
        filled
        label="Hasta"
        v-model="dateTo"
        class="col-md-2 col-sm-6 col-xs-6"
        style="padding: 5px;"
        mask="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dateTo" :locale="myLocale">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-table
        dense
        :rows="rowstodos"
        title="Tranzas"
        :columns="columnsdetails"
        row-key="num"
        :pagination="pagination"
        style="width: 100%; margin-top: 40px;"
      >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <div>
            <q-btn color="secondary" icon="edit" @click.stop="btnOpenUpd(props.row)" dense/>
          </div>
        </q-td>
      </template>
      </q-table>
      <q-dialog v-model="modalactualizar" persistent>
        <q-card >
          <q-card-section>
            <div class="text-h6" style="text-align: center;">Actualizar Fecha Inicio</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div>
              <q-input
                dense
                filled
                label="Fecha"
                mask="date"
                v-model="dateProd"
                style="padding: 5px;">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="dateProd" :locale="myLocale">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div  style="text-align: center;">
              <q-btn flat label="Cancel" v-close-popup />
              <q-btn
                color="primary"
                label="Aceptar"
                @click="actualizar"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar'
import axios from 'axios'
import moment from 'moment'
// import M from 'minimatch'

const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  setup () {
    return {
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      },
      filter: ref(''),
      co_rol: sessionStorage.getItem('co_rol'),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
      dateProd: ref(moment().format('YYYY-MM-DD')),
      loading: ref(false),
      pagination: {
        page: 1,
        rowsPerPage: 20 // 0 means all rows
      }
    }
  },
  data () {
    return {
      columnsdetails: [
        { name: 'num', align: 'center', label: '#', field: 'num' },
        { name: 'fecha', align: 'center', label: 'Fecha', field: 'fecha' },
        { name: 'usuario', align: 'left', label: 'Usuario', field: 'usuario' },
        { name: 'razonsocial', align: 'left', label: 'Cliente Emisor', field: 'razonsocial' },
        { name: 'cantidad', align: 'left', label: 'Cantidad', field: 'cantidad' },
        { name: 'soportefactura', align: 'center', label: 'N° Factura', field: 'soportefactura' },
        { name: 'fechaproduccion', align: 'center', label: 'Fecha inicio', field: 'fechaproduccion' },
        { name: 'inicia', align: 'center', label: 'Inicia', field: 'inicia' },
        { name: 'termina', align: 'center', label: 'Termina', field: 'termina' },
        { name: 'estatus', align: 'center', label: 'Estatus', field: 'estatus' },
        { name: 'edit', label: 'Editar', field: 'edit' }

      ],
      rowstodos: [],
      modelusuario: [],
      optionsusuarios: [],
      optionssede: [],
      modalactualizar: false
    }
  },
  methods: {
    btnOpenUpd (reg) {
      this.idUpd = reg.id
      this.modalactualizar = true
    },
    actualizar () {
      const body = {
        fechaproduccion: this.dateProd
      }
      axios.put(ENDPOINT_PATH_V2 + 'asignaciones/' + this.idUpd, body)
      this.modalactualizar = false
      this.listar()
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        const datos = response.data.data
        this.optionssede = []
        for (const i in datos) {
          if (datos[i].razonsocial.length > 0) {
            const obj = {}
            obj.cod = datos[i].id
            obj.name = datos[i].razonsocial
            obj.rif = datos[i].rif
            obj.namerif = datos[i].razonsocial + ' ' + datos[i].rif
            obj.tokenservicios = datos[i].tokenservicios
            this.optionssede.push(obj)
          }
        }
        this.emisores = this.optionssede
        // this.rifs = this.optionssede
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    },
    searchEmisor (val, update, abort) {
      if (val.length < 3) {
        abort()
        return
      }
      update(() => {
        if (val === '') {
          this.optionssede = this.emisores
        } else {
          const needle = val.toLowerCase()
          this.optionssede = this.emisores.filter(v => v.namerif.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    searchUsuario (val, update, abort) {
      /* if (val.length < 3) {
        abort()
        return
      } */
      update(() => {
        if (val === '') {
          this.optionsusuarios = this.usuarios
        } else {
          const needle = val.toLowerCase()
          this.optionsusuarios = this.usuarios.filter(v => v.nameuser.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    listarusuarios () {
      axios.get(ENDPOINT_PATH_V2 + 'usuario').then(async response => {
        const datos = response.data.resp
        this.optionsusuarios = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].nombre
          obj.usuario = datos[i].usuario
          obj.nameuser = datos[i].usuario + ' ' + datos[i].nombre
          this.optionsusuarios.push(obj)
          this.usuarios = this.optionsusuarios
        }
      }).catch(error => {
        Notify.create('Problemas al listar Usuarios ' + error)
      })
    },
    changeSede () {
      this.disable = true
      this.idserviciosmasivo = this.modelsede?.cod
      this.serviciosmasivo = this.modelsede?.namerif
      if (this.modelsede?.cod) {
        this.disable = false
      }
      this.listar()
    },
    listar () {
      const desde = moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const hasta = moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const body = {
        idserviciosmasivo: this.modelsede?.cod,
        idusuario: this.modelusuario?.cod,
        desde: desde,
        hasta: hasta
      }
      axios.post(ENDPOINT_PATH_V2 + 'asignaciones/listar', body).then(async response => {
        const datos = response.data.data
        console.log(datos)
        this.rowstodos = []
        let cont = 0
        for (const i in datos.reverse()) {
          const obj = {}
          cont = Number(cont) + Number(1)
          obj.num = cont
          obj.id = datos[i].id
          obj.idserviciosmasivo = datos[i].idserviciosmasivo
          obj.razonsocial = datos[i].razonsocial
          obj.idusuario = datos[i].idusuario
          obj.usuario = datos[i].usuario
          obj.cantidad = datos[i].cantidad
          obj.inicia = datos[i].inicia
          obj.termina = datos[i].termina
          obj.estatus = datos[i].estatus
          obj.fechaproduccion = datos[i].fechaproduccion ? moment(datos[i].fechaproduccion).format('DD/MM/YYYY') : 'S/Inf'
          obj.soportefactura = datos[i].soportefactura
          obj.fecha = moment(datos[i].fecha).format('DD/MM/YYYY HH:mm:ss')
          this.rowstodos.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Tranzas Asignaciones ' + error)
      })
    }
  },
  watch: {
    dateFrom: function (val) {
      console.log(val)
      this.listar()
    },
    dateTo: function (val) {
      console.log(val)
      this.listar()
    }
  },
  mounted () {
    this.listar()
    this.listarsedes()
    this.listarusuarios()
  }
}
</script>
