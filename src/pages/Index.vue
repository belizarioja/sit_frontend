<template>
  <q-page class="q-pa-sm my-fondo">
    <div class="row">
      <div class="col-md-5 col-sm-12 col-xs-12">
        <div class="row">
            <div class="col">
              <img src="dashboard.png" alt="" style="margin-bottom: -6px;">
            </div>
            <div class="col">
              <div class="dash_welcome_long">
                  Hola {{ displayName }},
              </div>
              <div class="dash_welcome_blue">
                  {{ saludo }}.
              </div>
              <div v-if="idserviciosmasivo" class="dash_welcome_small">
                Esto es lo que está pasando con la facturación de <br>{{ serviciosmasivo }}.
              </div>
              <div v-else class="dash_welcome_small">
                Esto es lo que está pasando con tu facturación en este momento.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <q-card class="my-card tarjetaMain">
                <q-card-section class="dash_card_main" style="padding-top: 40px;">
                  <div v-if="!idserviciosmasivo" style="display: flex;margin-bottom: 30px;">
                    <q-icon name="fact_check" class="text-secondary" style="font-size: xx-large;"/>
                    <span class="itemsCardMain">
                      Tiene <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ totalclientes }}</span> emisores con <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ totalAsignados }}</span> documentos asignados.
                    </span>
                  </div>
                  <div style="display: flex;margin-bottom: 30px;">
                    <q-icon name="format_list_bulleted" class="text-secondary" style="font-size: xx-large;"/>
                    <span class="itemsCardMain">
                      Se han procesado <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ totalUtilizados }}</span> documentos y quedan <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ totalDisponible }}</span> disponibles.
                    </span>
                  </div>
                  <div v-if="!estatusasignacion" style="display: flex;margin-bottom: 30px;">
                    <q-icon name="warning" class="text-secondary" style="font-size: xx-large;"/>
                    <span v-if="!idserviciosmasivo" class="itemsCardMain">
                      Existe(n) <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ clientesTerminando }}</span> emisores con cantidad crítica de asignación de lotes.
                    </span>
                    <span v-else class="itemsCardMain">
                      Presenta una cantidad crítica en la asignación actual.
                    </span>
                  </div>
                  <div v-else style="display: flex;margin-bottom: 30px;">
                    <q-icon name="done_all" class="text-secondary" style="font-size: xx-large;"/>
                    <span v-if="!idserviciosmasivo" class="itemsCardMain">
                      Todos los clientes emisores sin problemas de asignación.
                    </span>
                    <span v-else class="itemsCardMain">
                      Tiene una cantidad aceptable en la asignación actual.
                    </span>
                  </div>
                  <div v-if="idserviciosmasivo" style="display: flex;margin-bottom: 30px;">
                    <q-icon name="segment" class="text-secondary" style="font-size: xx-large;"/>
                    <span class="itemsCardMain">
                      Se usaron <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ totalAnulados }}</span> entre Anulados y Notas de Créditos.
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
      </div>
      <div class="col-7">
        <div style="padding: 5px;margin-left: 40px;width: 50%;height: 48px;">
          <q-select
            v-if="co_rol === '1' || co_rol === '2'"
            label="Buscar por Nombre o RIF del Emisor"
            dense
            rounded outlined
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
          />
        </div>
        <q-card style="margin: 10px 50px;">
          <q-card-section >
            <bar-chart/>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row">
      <q-card class="col-5" style="margin: 15px">
        <q-card-section >
          <q-list>
            <q-item>
              <q-item-section>
                <div style="margin: 5px;border: solid 1px #ccc;border-radius: 5px;padding: 12px;position: relative;">
                  <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Filtrado por:</span>
                  <span class="filtros">Desde: {{ dateFrom }}</span>
                  <span class="filtros">Hasta: {{ dateTo }}</span>
                  <q-icon name="date_range" style="color: #0999ff;font-size: x-large;cursor: pointer;" @click="openFechas"/>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <q-list>
            <q-item class="dash_welcome_long">
              <q-item-section>
                <q-item-label>Total gravado</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item class="dash_welcome_igtf">
              <q-item-section>
                <q-item-label>Bs. {{totalimp}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item class="dash_welcome_small">
              <q-item-section>
                <q-item-label>Monto obtenido de {{ totaldoc }} documentos procesados</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-6" style="margin: 20px;">
        <q-card-section >
          <q-list>
            <q-item-label class="dash_welcome_long">Impuestos por tipos</q-item-label>
            <q-item class="text-dark">
              <q-item-section avatar top>
                <q-avatar color="white"></q-avatar>
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Decripción</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Base</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Impuesto</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">% Proporción</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">&nbsp;</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="secondary"></q-avatar>
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">IVA 16%</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbaseg }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpg }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">70%</q-item-label>
              </q-item-section>
              <q-item-section top side style="width: 100px;display: block;" class="q-mt-sm">
                <div class="barraporc" style="width: 70%;">
                  &nbsp;
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="accent">
                </q-avatar>
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Reducido 8%</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbaser }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpr }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">80%</q-item-label>
              </q-item-section>
              <q-item-section top side style="width: 100px;display: block;" class="q-mt-sm">
                <div class="barraporc" style="width: 10%;">
                  &nbsp;
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="info">
                </q-avatar>
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Al lujo 30%</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbasea }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpa }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">0%</q-item-label>
              </q-item-section>
              <q-item-section top side style="width: 100px;display: block;" class="q-mt-sm">
                <div class="barraporc" style="width: 0%;">
                  &nbsp;
                </div>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="positive">
                </q-avatar>
              </q-item-section>
              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">IGTF 3%</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbaseigtf }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpigtf }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">20%</q-item-label>
              </q-item-section>
              <q-item-section top side style="width: 100px;display: block;" class="q-mt-sm">
                <div class="barraporc" style="width: 20%;">
                  &nbsp;
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- <div class="row">
      <q-card class="col-4" style="margin: 20px">
        <q-card-section >
          <img src="formasdepago.png" style="max-width: 375px;" />
        </q-card-section>
      </q-card>
      <q-card class="col-7" style="margin: 20px">
        <q-card-section >
          <q-table
            :rows="rowssemana"
            :columns="columnssemana"
            row-key="razonsocial"
            hide-bottom
          />
        </q-card-section>
      </q-card>
    </div> -->
    <q-dialog v-model="modalFechas" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-primary text-white" style="width: 480px;">
        <q-card-section>
          <div class="text-h6">Fechas</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="bg-white text-secondary">
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Rango de fecha:</span>
            <q-radio
              label="Hoy"
              v-model="fechacustom"
              val="1"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-radio
              label="Ayer"
              v-model="fechacustom"
              val="2"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-radio
              label="En 1 semana"
              v-model="fechacustom"
              val="3"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-radio
              label="En 1 mes"
              v-model="fechacustom"
              val="4"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-radio
              label="Escojer fechas"
              v-model="fechacustom"
              val="5"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <div style="width: 100%;display: flex;justify-content: space-around;">
              <input class="inputDate fecha1" :disabled="dsbFechas" type="date" name="desde" :value="dateFrom">
              <input class="inputDate fecha2" :disabled="dsbFechas" type="date" name="hasta" :value="dateTo">
              <q-btn color="primary" label="Ir" :disabled="dsbFechas" @click="changeFechas" />
            </div>

          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="secondary" label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

import BarChart from '../components/charts/BarChart.ts'

import { Notify } from 'quasar'
import axios from 'axios'

import moment from 'moment'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default defineComponent({
  name: 'Dashboard',
  components: {
    // LineChart,
    BarChart
  },
  setup () {
    return {
      totalAnulados: ref(34),
      estatusasignacion: ref(false),
      totalAsignados: ref(0),
      clientesTerminando: ref(0),
      totalUtilizados: ref(0),
      avg7Days: ref(22.8),
      totaldoc: ref(0),
      totalanu: ref(0),
      totalimpg: ref(0),
      totalimpr: ref(0),
      totalimpa: ref(0),
      totalimpigtf: ref(0),
      totalimp: ref(0),
      totalbaseg: ref(0),
      totalbaser: ref(0),
      totalbasea: ref(0),
      totalbaseigtf: ref(0),
      totalfacturas: ref(0),
      sumafacturas: ref(0),
      totalcreditos: ref(0),
      sumacreditos: ref(0),
      totaldebitos: ref(0),
      sumadebitos: ref(0),
      columnssemana: [
        {
          name: 'razonsocial',
          label: 'Cliente emisor',
          field: 'razonsocial',
          align: 'left'
        },
        { name: 'hoy', label: 'Hoy', field: 'hoy' },
        { name: 'hace1dia', label: 'Hace 1 día', field: 'hace1dia' },
        { name: 'hace2dia', label: 'Hace 2 día', field: 'hace2dia' },
        { name: 'hace3dia', label: 'Hace 3 día', field: 'hace3dia' },
        { name: 'hace4dia', label: 'Hace 4 día', field: 'hace4dia' },
        { name: 'hace5dia', label: 'Hace 5 día', field: 'hace5dia' },
        { name: 'hace6dia', label: 'Hace 6 día', field: 'hace6dia' }
      ],
      fechacustom: ref('1'),
      disabledSede: ref(false),
      disabledCodes: ref(false),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
      modeltipo: ref([]),
      modelsede: ref([]),
      modelcodes: ref([]),
      modelfechas: ref('Hoy'),
      optionstipo: ref([]),
      optionssede: ref([]),
      optionscodes: ref([]),
      idtipodocumento: ref(null),
      idcodigocomercial: ref(null),
      idserviciosmasivo: ref(null),
      serviciosmasivo: ref(null),
      tipodocumento: ref('Todos'),
      codigocomercial: ref('Todos'),
      optionsfechas: ref([{ cod: 1, name: 'Hoy' }, { cod: 4, name: 'Ayer' }, { cod: 2, name: 'En 1 semana' }, { cod: 3, name: 'En 1 mes' }]),
      co_rol: sessionStorage.getItem('co_rol'),
      co_sede: sessionStorage.getItem('co_sede'),
      tx_sede: sessionStorage.getItem('tx_sede'),
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted')
    }
  },
  data () {
    return {
      docproc: [],
      tab: 'grafica',
      saludo: 'Buenos días',
      totalclientes: 0,
      totalDisponible: 0,
      modalFechas: false,
      dsbFechas: true,
      displayName: sessionStorage.getItem('tx_nombre'),
      rowssemana: []
    }
  },
  methods: {
    openFechas () {
      this.modalFechas = true
    },
    getDocProcesados () {
      const body = {
        idserviciosmasivo: this.idserviciosmasivo
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/totaldocumentos', body).then(async response => {
        const datos = response.data.data
        this.totalfacturas = datos[0].totaldoc
        this.sumafacturas = this.completarDecimales(Number(datos[0].sumadocg) + Number(datos[0].sumadocigtf))
        this.totalcreditos = datos[1].totaldoc
        this.sumacreditos = this.completarDecimales(Number(datos[1].sumadocg) + Number(datos[1].sumadocigtf))
        this.totaldebitos = datos[2].totaldoc
        this.sumadebitos = this.completarDecimales(Number(datos[2].sumadocg) + Number(datos[2].sumadocigtf))
      }).catch(error => {
        Notify.create('Problemas al listar Documentos ' + error)
      })
    },
    getUltimaSemana () {
      const body = {
        idserviciosmasivo: this.idserviciosmasivo
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/ultimasemana', body).then(async response => {
        const datos = response.data.data
        console.log(datos)
        this.rowssemana = []
        for (const i in datos) {
          const obj = {}
          obj.razonsocial = datos[i].razonsocial
          obj.hoy = datos[i].hoy
          obj.hace1dia = datos[i].hace1dia
          obj.hace2dia = datos[i].hace2dia
          obj.hace3dia = datos[i].hace3dia
          obj.hace4dia = datos[i].hace4dia
          obj.hace5dia = datos[i].hace5dia
          obj.hace6dia = datos[i].hace6dia
          this.rowssemana.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Ultima semana ' + error)
      })
    },
    totalImp () {
      const body = {
        idserviciosmasivo: this.idserviciosmasivo,
        desde: moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/impprocesados', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totaldoc = datos[0].total
        this.exento = datos[0].totalexento || 0
        this.totalimpg = datos[0].totalg || 0
        this.totalimpr = datos[0].totalr || 0
        // this.totalbase = Number(this.totalimpg) + Number(this.totalimpr) + Number(this.exento)
        this.totalimpigtf = datos[0].totaligtf || 0
        this.totalimp = Number(this.totalimpg) + Number(this.totalimpr) + Number(this.totalimpigtf)
        this.totalbaseg = datos[0].totalbaseg || 0
        this.totalbaser = datos[0].totalbaser || 0
        this.totalbaseigtf = datos[0].totalbaseigtf || 0

        this.totalbaseg = this.completarDecimales(this.totalbaseg)
        this.totalbaser = this.completarDecimales(this.totalbaser)
        this.totalbaseigtf = this.completarDecimales(this.totalbaseigtf)
        this.totalimpg = this.completarDecimales(this.totalimpg)
        this.totalimpr = this.completarDecimales(this.totalimpr)
        this.totalimpigtf = this.completarDecimales(this.totalimpigtf)
        this.totalimp = this.completarDecimales(this.totalimp)
      }).catch(error => {
        Notify.create('Problemas al procesar ' + error)
      })
      axios.post(ENDPOINT_PATH_V2 + 'reporte/anulados', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totalanu = datos[0].totalanu
      }).catch(error => {
        Notify.create('Problemas al procesar  anulados' + error)
      })
    },
    completarDecimales (cadena) {
      cadena = Intl.NumberFormat('de-DE').format(cadena.toFixed(2))
      const arreglo = cadena.split(',')

      cadena = arreglo.length === 1 ? cadena + ',00' : arreglo[1].length === 1 ? cadena + '0' : cadena
      return cadena
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
    searchCodes (val, update, abort) {
      if (val.length < 3) {
        abort()
        return
      }
      update(() => {
        if (val === '') {
          this.optionscodes = this.codes
        } else {
          const needle = val.toLowerCase()
          this.optionscodes = this.codes.filter(v => v.namecode.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    changeSedeChild (reg) {
      console.log('changeSedeChild')
      this.idserviciosmasivo = reg.cod
      reg.namerif = reg.razonsocial + ' ' + reg.rif
      this.serviciosmasivo = reg.namerif
      this.modelsede = reg
    },
    changeSede () {
      this.idserviciosmasivo = this.modelsede?.cod
      this.serviciosmasivo = this.modelsede?.namerif
      this.listarReportes()
      // this.listarfacturas()
    },
    changeTipo () {
      this.idtipodocumento = this.modeltipo.cod
      this.tipodocumento = this.modeltipo.name
    },
    changeCodes () {
      console.log(this.modelcodes?.cod)
      this.idcodigocomercial = this.modelcodes?.cod
      this.codigocomercial = this.modelcodes?.namecode
      console.log(this.idcodigocomercial)
      console.log(this.codigocomercial)
      // this.listarfacturas()
    },
    getCodes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede/codes').then(async response => {
        const datos = response.data.data
        this.optionscodes = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.namecode = datos[i].codigocomercial + '-' + datos[i].descripcion
          this.optionscodes.push(obj)
        }
        this.codes = this.optionscodes
        console.log(this.optionscodes)
      }).catch(error => {
        Notify.create('Problemas al listar Codigos comerciales ' + error)
      })
    },
    getLotes () {
      const body = {
        id: this.idserviciosmasivo
      }
      axios.post(ENDPOINT_PATH_V2 + 'sede/lotes', body).then(async response => {
        const datos = response.data.data
        console.log(datos)
        this.totalAsignados = 0
        this.totalUtilizados = 0
        this.estatusasignacion = true
        // this.totaldoc = 0
        for (const i in datos) {
          this.totalAsignados += Number(datos[i].cantidad)
          this.totalUtilizados += Number(datos[i].utilizado)
          console.log(this.totalUtilizados / this.totalAsignados)
          this.estatusasignacion = (this.totalUtilizados / this.totalAsignados) < 0.80 || false
        }
        this.totalDisponible = this.totalAsignados - this.totalUtilizados
      }).catch(error => {
        Notify.create('Problemas al listar Lotes ' + error)
      })
    },
    listartipos () {
      axios.get(ENDPOINT_PATH_V2 + 'tipodocumento').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionstipo = []
        const obj = {}
        obj.cod = null
        obj.name = 'Todos'
        this.optionstipo.push(obj)
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].tipodocumento
          this.optionstipo.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Tipos de documentos ' + error)
      })
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionssede = []
        const obj = {}
        obj.cod = null
        obj.name = 'Todos'
        obj.rif = null
        obj.namerif = ''
        this.optionssede.push(obj)
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
        this.rifs = this.optionssede
        this.totalclientes = datos.length
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    },
    listarReportes () {
      this.totalImp()
      this.getDocProcesados()
      this.getUltimaSemana()
      this.getLotes()
    },
    changeFechas () {
      const selectElementDesde = document.querySelector('.fecha1')
      const selectElementHasta = document.querySelector('.fecha2')
      this.dateFrom = selectElementDesde.value
      this.dateTo = selectElementHasta.value
    }
  },
  watch: {
    fechacustom: function (val) {
      console.log(val)
      switch (val) {
        case '1':
          this.dateFrom = moment().format('YYYY-MM-DD')
          this.dateTo = moment().format('YYYY-MM-DD')
          this.dsbFechas = true
          break
        case '2':
          this.dateFrom = moment().subtract(1, 'days').format('YYYY-MM-DD')
          this.dateTo = moment().subtract(1, 'days').format('YYYY-MM-DD')
          this.dsbFechas = true
          break
        case '3':
          this.dateFrom = moment().subtract(7, 'days').format('YYYY-MM-DD')
          this.dateTo = moment().format('YYYY-MM-DD')
          this.dsbFechas = true
          break
        case '4':
          this.dateFrom = moment().subtract(30, 'days').format('YYYY-MM-DD')
          this.dateto = moment().format('YYYY-MM-DD')
          this.dsbFechas = true
          break
        case '5':
          this.dsbFechas = false
          break
      }

      this.listarReportes()
    }
  },
  mounted () {
    // this.listartipos()
    this.listarsedes()
    console.log(this.co_rol)
    this.idserviciosmasivo = this.co_rol === '3' ? this.co_sede : undefined
    this.serviciosmasivo = this.co_rol === '3' ? this.tx_sede : undefined

    console.log('Mounted')
    console.log(this.tx_sede_seleted)
    console.log(this.co_sede_seleted)
    if (this.co_sede_seleted) {
      const obj = {}
      obj.cod = this.co_sede_seleted
      obj.rif = this.rif_sede_seleted
      obj.razonsocial = this.tx_sede_seleted
      this.idserviciosmasivo = this.co_sede_seleted
      obj.namerif = obj.razonsocial + ' ' + obj.rif
      this.serviciosmasivo = obj.namerif
      this.modelsede = obj
      this.disabledSede = true
    }
    console.log(this.serviciosmasivo)
    this.listarReportes()
  }
})
</script>

<style>

.inputDate {
  font-family: 'avenir';
  width: 130px;
  padding: 7px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #f2f2f2;
}
.dash_welcome_long {
  font-size: 24px;
  margin: 20px 0px;
  color: #6283AE;
  font-weight: bold;
}
.dash_welcome_small {
  margin: 0px 20px 20px 0px;
  color: #98A7BA;
  font-weight: bold;
  font-size: 12px;
  height: 50px;
}
.dash_welcome_blue {
  font-size: 22px;
  margin: 0px 0px 20px;
  color: #0999FF;
  font-weight: bold;
}
.dash_card_main {
  color: #98A7BA;
}
.dash_welcome_igtf {
  font-size: 50px;
  margin: 0px 0px 20px;
  color: #0999FF;
  font-weight: bold;
}
.dash_welcome_exentos {
  font-size: 40px;
  margin: 0px 0px 20px;
  color: #71CCB5;
  font-weight: bold;
}
.tarjetaMain {
  margin: -8px 0 0 20px;
  width: 100%;
  height: 230px;
  background: radial-gradient(circle, rgb(250 250 250) 0%, rgb(250 250 250) 100%);
}
.itemsCardMain {
  font-size: 11px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.barraporc {
  background: #0999FF;
  border-radius: 5px;
  height: 12px;
}

.filtros {
  padding: 3px 7px;
  background: #ECF6FF;
  border: solid 1px #5a8f89;
  margin: 5px;
  border-radius: 8px;
  font-size: 13px;
}
</style>
