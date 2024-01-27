<template>
  <div class="my-font my-fondo q-pa-md">
    <div class="row">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Auditoría</span>
    </div>
    <div class="row">
      <div class="col" style="position: relative;">
        <div style="margin-top: 20px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;">
          <span class="filtros">Desde: {{ dateFrom }}</span>
          <span class="filtros">Hasta: {{ dateTo }}</span>
          <span class="filtros">Usuario: {{ usuariofilter }}</span>
          <span class="filtros">Acción: {{ accionfilter }}</span>
        </div>
        <span class="my-fondo" style="position: absolute;top: 9px; left: 20px; color: #ccc;">Filtrado por:</span>
      </div>
    </div>
    <q-table
      dense
      :rows="rowstodos"
      title="Bitácora"
      :columns="columnsdetails"
      row-key="num"
      :pagination="pagination"
      style="width: 100%; margin-top: 40px;"
      :loading="loading"
      :filter="filterTable"
      no-data-label="No hay registros!"
      >
        <template v-slot:top-left>
          <q-input dense debounce="300" color="primary" v-model="filterTable" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <div style="display: inline;">
            <q-btn icon-right="filter_alt" class="q-ml-sm col-md-4 col-sm-3 col-xs-3" color="secondary" label="Filtrar" @click="drawerFilters = true" />
          </div>
        </template>
    </q-table>
    <q-drawer
      v-model="drawerFilters"
      side="right"
      :width="300"
      :breakpoint="700"
      overlay
      elevated
      class="bg-white text-secondary"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div class="tituloDrawer">
            <div style="margin: 0 20px; font-size: 25px; font-weight: bolder">Filtros</div>
            <q-icon color="red" name="close" @click="drawerFilters = false" class="cursor-pointer" style="font-size: x-large;" />
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Fechas:</span>
            <div style="display: flex;justify-content: space-around;">
              <input class="inputDate fecha1" type="date" id="desde" :value="dateFrom">
              <input class="inputDate fecha2" type="date" id="hasta" :value="dateTo">
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Cliente emisor:</span>
            <q-select
              label="Username del usuario"
              dense
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
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">N° Control:</span>
            <q-select
              dense
              class="col-md-4 col-sm-6 col-xs-12"
              filled
              options-dense
              v-model="modelevento"
              :options="optionsevento"
              option-label="name"
              option-value="cod"
              label="Tipo de Evento"
              @update:model-value="listar()"
              style="padding: 5px;"
            />
          </div>
          <div class="text-center">
            <q-btn label="Cerrar" color="negative" @click="drawerFilters = false" />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
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
      filterTable: ref(''),
      usuariofilter: ref('Todos'),
      accionfilter: ref('Todos'),
      drawerFilters: ref(false),
      co_rol: sessionStorage.getItem('co_rol'),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
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
        { name: 'evento', align: 'left', label: 'Evento', field: 'evento' },
        { name: 'observacion', align: 'left', label: 'Descripción', field: 'observacion' },
        { name: 'ip', align: 'center', label: 'IP', field: 'ip' },
        { name: 'idusuario', align: 'center', label: 'Id Usuario', field: 'idusuario' },
        { name: 'nombre', align: 'left', label: 'Nombre Usuario', field: 'nombre' }
      ],
      rowstodos: [],
      modelevento: [],
      optionsevento: [],
      modelusuario: [],
      optionsusuarios: []
    }
  },
  methods: {
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
    listareventos () {
      axios.get(ENDPOINT_PATH_V2 + 'bitacora/eventos').then(async response => {
        const datos = response.data.data
        this.optionsevento = []
        const obj = {}
        obj.cod = undefined
        obj.name = 'Todos'
        this.optionsevento.push(obj)
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].evento
          this.optionsevento.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Eventos ' + error)
      })
    },
    listar () {
      this.usuariofilter = 'Todos'
      this.accionfilter = 'Todos'
      if (this.modelusuario?.cod) {
        this.usuariofilter = this.modelusuario?.name
      }
      if (this.modelevento?.cod) {
        this.accionfilter = this.modelevento?.name
      }
      const desde = moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const hasta = moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const body = {
        idevento: this.modelevento?.cod,
        idusuario: this.modelusuario?.cod,
        desde: desde,
        hasta: hasta
      }
      axios.post(ENDPOINT_PATH_V2 + 'bitacora/listar', body).then(async response => {
        const datos = response.data.data
        console.log(datos)
        this.rowstodos = []
        let cont = 0
        for (const i in datos.reverse()) {
          const obj = {}
          cont = Number(cont) + Number(1)
          obj.num = cont
          obj.evento = datos[i].evento
          obj.idevento = datos[i].idevento
          obj.idusuario = datos[i].idusuario
          obj.usuario = datos[i].usuario
          obj.nombre = datos[i].nombre
          obj.ip = datos[i].ip
          obj.observacion = datos[i].observacion
          obj.fecha = moment(datos[i].fecha).format('DD/MM/YYYY HH:mm:ss')
          this.rowstodos.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Detalles bitacora ' + error)
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
    this.listareventos()
    this.listarusuarios()
    const selectElementDesde = document.querySelector('.fecha1')
    const selectElementHasta = document.querySelector('.fecha2')

    selectElementDesde.addEventListener('change', (event) => {
      this.dateFrom = selectElementDesde.value
      this.listarfacturas()
    })
    selectElementHasta.addEventListener('change', (event) => {
      this.dateTo = selectElementHasta.value
      this.listarfacturas()
    })
  }
}
</script>
<style>
.inputDate {
  font-family: 'avenir';
  width: 116px;
  padding: 7px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #f2f2f2;
}
.tituloDrawer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
