<template>
  <div class="my-font my-fondo q-pa-md">
    <div class="row">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Asignaciones</span>
    </div>
    <div class="row">
      <div class="col" style="position: relative;">
        <div style="margin-top: 20px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;">
          <span class="filtros">Desde: {{ dateFrom }}</span>
          <span class="filtros">Hasta: {{ dateTo }}</span>
          <span class="filtros">Cliente emisor: {{ clienteEmisorfilter }}</span>
        </div>
        <span class="my-fondo" style="position: absolute;top: 9px; left: 20px; color: #ccc;">Filtrado por:</span>
      </div>
    </div>
    <div class="row">
      <q-table
        dense
        :rows="rowstodos"
        :columns="columnsdetails"
        row-key="num"
        :pagination="pagination"
        :filter="filterTable"
        style="width: 100%; margin-top: 40px;"
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
            <div class="text-h6" style="text-align: center;">Actualizar fecha inicio</div>
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
            <div style="display: flex; justify-content: space-around;">
              <q-btn color="negative" label="Cancelar" v-close-popup />
              <q-btn
                color="secondary"
                label="Aceptar"
                @click="actualizar"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
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
            <q-select v-if="(co_rol === '1' || co_rol === '2')" label="Agregue Nombre o RIF" dense
              class="col-md-3 col-sm-12 col-xs-12" filled v-model="modelsede" :disable="disabledSede" use-input hide-selected
              fill-input clearable options-dense option-label="namerif" option-value="cod" input-debounce="0"
              :options="optionssede" @update:model-value="changeSede()" @input:="changeSede()" @filter="searchEmisor"
              style="padding: 5px" />
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
      drawerFilters: ref(false),
      co_rol: sessionStorage.getItem('co_rol'),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
      dateProd: ref(moment().format('YYYY-MM-DD')),
      loading: ref(false),
      clienteEmisorfilter: ref('Todos'),
      filterTable: ref(''),
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
      this.clienteEmisorfilter = 'Todos'
      if (this.modelsede?.cod) {
        this.disable = false
        this.clienteEmisorfilter = this.modelsede?.name
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
    if (this.co_rol !== '1' && this.co_rol !== '2') {
      this.$router.push('/erroracceso')
    }
    this.listar()
    this.listarsedes()
    // this.listarusuarios()
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
