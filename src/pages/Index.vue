<template>
  <q-page class="q-pa-sm my-fondo">
    <div class="row">
      <div class="col-md-5 col-sm-12 col-xs-12">
        <div class="row">
            <!-- <div class="col">
              <img src="dashboard.png" alt="" style="margin-bottom: -6px;">
            </div> -->
            <div class="col" style="margin-left: 20px;">
              <div class="dash_welcome_long">
                  Hola {{ displayName }}
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
                <q-card-section horizontal>
                  <q-card-section class="dash_card_main" style="width: 250px;">
                    <div v-if="!idserviciosmasivo" style="display: flex;margin-bottom: 30px;">
                      <q-icon name="people_alt" class="text-primary" style="font-size: 50px;"/>
                      <div style="display: grid; margin-left: 10px;">
                        <span class="dash_welcome_count">
                          <span class="text-primary" style="font-weight: bold;padding: 3px;">{{ totalclientes }}</span>
                        </span>
                        <span style="margin-top: -8px; margin-left: 4px;">
                          Clientes emisores
                        </span>
                      </div>
                    </div>
                    <div style="display: flex;margin-bottom: 30px;">
                      <q-icon name="verified" class="text-positive" style="font-size: 50px;"/>
                      <div style="display: grid; margin-left: 10px;">
                        <span class="dash_welcome_count">
                          <span class="text-positive" style="font-weight: bold;padding: 3px;">{{ totalUtilizados }}</span>
                        </span>
                        <span style="margin-top: -8px; margin-left: 4px;">
                          Procesados
                        </span>
                      </div>
                    </div>
                    <div style="display: flex;margin-bottom: 30px;">
                      <q-icon name="assignment" class="text-info" style="font-size: 50px;"/>
                      <div style="display: grid; margin-left: 10px;">
                        <span class="dash_welcome_count">
                          <span class="text-info" style="font-weight: bold;padding: 3px;">{{ totalDisponible }}</span>
                        </span>
                        <span style="margin-top: -8px; margin-left: 4px;">
                          Disponibles
                        </span>
                      </div>
                    </div>
                    <!-- <div v-if="!estatusasignacion" style="display: flex;margin-bottom: 30px;">
                      <q-icon name="warning" class="text-positive" style="font-size: xx-large;"/>
                      <span v-if="!idserviciosmasivo" class="itemsCardMain">
                        Existe(n) <span class="text-secondary" style="font-weight: bold;padding: 3px;">{{ clientesTerminando }}</span> emisores con cantidad crítica de asignación de lotes.
                      </span>
                      <span v-else class="itemsCardMain">
                        Presenta una cantidad crítica en la asignación actual.
                      </span>
                    </div>
                    <div v-else style="display: flex;margin-bottom: 30px;">
                      <q-icon name="done_all" class="text-positive" style="font-size: 50px;"/>
                      <div style="display: grid; margin-left: 10px;">
                        <span class="dash_welcome_count">
                          <span v-if="!idserviciosmasivo" class="text-secondary" style="font-weight: bold;padding: 3px;">0</span>
                          <span v-else class="text-secondary" style="font-weight: bold;padding: 3px;">Bien</span>
                        </span>
                        <span v-if="!idserviciosmasivo" style="margin-top: -8px;">
                          Total clientes con alerta
                        </span>
                        <span v-else style="margin-top: -8px;">
                          Estatus asignación
                        </span>
                      </div>
                    </div> -->
                    <div v-if="idserviciosmasivo" style="display: flex;margin-bottom: 30px;">
                      <q-icon name="folder_delete" class="text-negative" style="font-size: 50px;"/>
                      <div style="display: grid; margin-left: 10px;">
                        <span class="dash_welcome_count">
                          <span class="text-negative" style="font-weight: bold;padding: 3px;">{{ totalAnulados }}</span>
                        </span>
                        <span style="margin-top: -8px; margin-left: 4px;">
                          Anulados
                        </span>
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator vertical style="height: 260px;"/>
                  <q-card-section>
                    <div style="display: grid;">
                      <radial-asignados ref="radialasignados" style="text-align: center; margin-right: 20px;margin-top: -50px;" />
                      <div class="dash_asignados_main" style="text-align: center;margin-right: 20px;margin-top: 30px;">Total asignados</div>
                      <div class="dash_tipos_second" style="text-align: center;margin-right: 20px;">{{ totalAsignados }}</div>
                    </div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </div>
          </div>
      </div>
      <div class="col-7">
        <div style="padding: 5px;margin-left: 40px;width: 75%;height:48px;">
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
        <q-card style="margin: 27px 40px 0 60px;">
          <q-card-section >
            <bar-chart ref="barmeses" />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row">
      <q-card class="col-5" style="margin: 20px">
        <q-card-section >
          <q-list>
            <q-item>
              <q-item-section>
                <div style="margin: 5px;border: solid 1px #ccc;border-radius: 5px;padding: 12px;position: relative;">
                  <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Filtrado por:</span>
                  <div style="display: flex; justify-content: space-around; align-items: center;">
                    <span class="filtros">Desde: {{ dateFrom }}</span>
                    <span class="filtros">Hasta: {{ dateTo }}</span>
                    <q-icon name="date_range" style="color: #0999ff;font-size: x-large;cursor: pointer;" @click="openFechas"/>
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <q-item class="dash_welcome_long">
              <q-item-section>
                <q-item-label>Total gravado</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="dash_welcome_igtf">
              <q-item-section>
                <q-item-label>Bs. {{totalimp}}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="dash_welcome_small">
              <q-item-section>
                <q-item-label>Monto obtenido de {{ totaldoc }} documentos procesados</q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="dash_welcome_long">
              <q-item-section>
                <q-item-label>Total base exento Bs. {{totalexento}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-6" style="margin: 20px;">
        <q-card-section >
          <q-list style="color: #98A7BA;">
            <q-item-label class="dash_welcome_long">Tipo de Impuestos</q-item-label>
            <q-item class="text-secondary" style="font-weight: bold;">
              <q-item-section avatar top>
                <q-avatar color="white"></q-avatar>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Descripción</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Base</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Impuesto</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="secondary"></q-avatar>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">IVA 16%</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbaseg }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpg }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="accent">
                </q-avatar>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Reducido 8%</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbaser }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpr }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="info">
                </q-avatar>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Al lujo 30%</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbasea }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpa }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar top>
                <q-avatar color="positive">
                </q-avatar>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">IGTF 3%</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalbaseigtf }}</q-item-label>
              </q-item-section>
              <q-item-section top>
                <q-item-label class="q-mt-sm">Bs {{ totalimpigtf }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <div class="row">
      <q-card class="col-5" style="margin: 20px; display: grid;">
        <div style="display: flex; justify-content: space-between;">
          <div style="display: grid;">
            <div class="dash_welcome_long" style="margin-left: 20px">Tipos de documento</div>
            <img src="dashboard2.png" alt="" style="margin-bottom: -6px;">
            <div class="dash_welcome_small" style="margin-left: 20px">Información sobre el uso del principal tipo de documento, por parte de los clientes</div>
          </div>
          <div style="display: grid;">
            <radial-chart1 ref="radialtipos1" style="text-align: center; margin-right: 20px;" />
            <div class="dash_tipos_main" style="text-align: center;margin-right: 20px;">{{totalfacturas}} procesada(s)</div>
            <div class="dash_tipos_second" style="text-align: center;margin-right: 20px;">Bs. {{sumafacturas}}</div>
          </div>
        </div>
        <div style="margin: 10px;border: solid 1px #ccc;border-radius: 5px;padding: 5px;position: relative;display: grid;">
          <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Otros tipos de documentos:</span>
          <div style="display: flex;">
            <radial-chart2 ref="radialtipos2" style="margin-left: 0px; margin-bottom: 20px; margin-top: -20px;" />
            <radial-chart3 ref="radialtipos3" style="margin-left: -18px; margin-bottom: 20px; margin-top: -20px;" />
            <radial-chart4 ref="radialtipos4" style="margin-left: -18px; margin-bottom: 20px; margin-top: -20px;" />
            <radial-chart5 ref="radialtipos5" style="margin-left: -18px; margin-bottom: 20px; margin-top: -20px;" />
          </div>
        </div>
      </q-card>
      <q-card class="col-6" style="margin: 20px;">
        <q-card-section ><div class="dash_welcome_long" style="margin-bottom: -20px; margin-top: 8px;">Última semana</div></q-card-section>
        <q-card-section >
          <q-table
            dense
            :rows="rowssemana"
            :columns="columnssemana"
            row-key="razonsocial"
            hide-pagination
            :rows-per-page-options="[0]"
          >
            <template v-slot:body-cell-total="props">
              <q-td :props="props">
                <q-badge color="primary">
                  {{ props.row.total }}
                </q-badge>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
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

import BarChart from '../components/dashboard/graficameses/BarChart.vue'
// import DonutChart from '../components/dashboard/tiposfactura/DougChart.vue'
import RadialChart1 from '../components/dashboard/tiposfactura/RadialBarChart1.vue'
import RadialChart2 from '../components/dashboard/tiposfactura/RadialBarChart2.vue'
import RadialChart3 from '../components/dashboard/tiposfactura/RadialBarChart3.vue'
import RadialChart4 from '../components/dashboard/tiposfactura/RadialBarChart4.vue'
import RadialChart5 from '../components/dashboard/tiposfactura/RadialBarChart5.vue'
import RadialAsignados from '../components/dashboard/asignados/RadialAsignados.vue'

import { Notify } from 'quasar'
import axios from 'axios'

import moment from 'moment'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default defineComponent({
  name: 'Dashboard',
  components: {
    RadialChart1,
    RadialChart2,
    RadialChart3,
    RadialChart4,
    RadialChart5,
    RadialAsignados,
    BarChart
  },
  setup () {
    return {
      estatusasignacion: ref(false),
      totalAsignados: ref(0),
      clientesTerminando: ref(0),
      totalUtilizados: ref(0),
      avg7Days: ref(22.8),
      totaldoc: ref(0),
      totalAnulados: ref(0),
      totalexento: ref(0),
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
        { name: 'lunes', label: 'Lun ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).format('DD'), field: 'lunes' },
        { name: 'martes', label: 'Mar ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).add(1, 'days').format('DD'), field: 'martes' },
        { name: 'miercoles', label: 'Mie ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).add(2, 'days').format('DD'), field: 'miercoles' },
        { name: 'jueves', label: 'Jue ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).add(3, 'days').format('DD'), field: 'jueves' },
        { name: 'viernes', label: 'Vie ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).add(4, 'days').format('DD'), field: 'viernes' },
        { name: 'sabado', label: 'Sab ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).add(5, 'days').format('DD'), field: 'sabado' },
        { name: 'domingo', label: 'Dom ' + moment(moment().subtract(moment().isoWeekday() - 1, 'days')).add(6, 'days').format('DD'), field: 'domingo' },
        { name: 'total', label: 'Total', field: 'total' }
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
      term: ref(''),
      idusuario: sessionStorage.getItem('id_usuario'),
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
        idserviciosmasivo: this.idserviciosmasivo,
        desde: moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
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
        // console.log(datos)
        this.rowssemana = []
        for (const i in datos) {
          const obj = {}
          obj.razonsocial = datos[i].razonsocial
          obj.lunes = datos[i].lunes
          obj.martes = datos[i].martes
          obj.miercoles = datos[i].miercoles
          obj.jueves = datos[i].jueves
          obj.viernes = datos[i].viernes
          obj.sabado = datos[i].sabado
          obj.domingo = datos[i].domingo
          obj.total = Number(datos[i].lunes) + Number(datos[i].martes) + Number(datos[i].miercoles) + Number(datos[i].jueves) + Number(datos[i].viernes) + Number(datos[i].sabado) + Number(datos[i].domingo)
          this.rowssemana.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Ultima semana ' + error)
      })
    },
    calcularTotalImp () {
      const body = {
        idserviciosmasivo: this.idserviciosmasivo,
        desde: moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/impprocesados', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totaldoc = datos[0].total
        this.totalexento = datos[0].totalexento || 0
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
        this.totalexento = this.completarDecimales(this.totalexento)
      }).catch(error => {
        Notify.create('Problemas al procesar ' + error)
      })
      axios.post(ENDPOINT_PATH_V2 + 'reporte/anulados', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totalAnulados = datos[0].totalanu
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
    changeSede () {
      this.idserviciosmasivo = this.modelsede?.cod
      this.serviciosmasivo = this.modelsede?.namerif
      this.listarReportes()
      this.crearbitacora(this.dateFrom, this.dateTo, 2)
    },
    getLotes () {
      this.$refs.radialasignados.createData(this.idserviciosmasivo)
      const body = {
        id: this.idserviciosmasivo
      }
      axios.post(ENDPOINT_PATH_V2 + 'sede/lotes', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totalAsignados = 0
        this.totalUtilizados = 0
        this.estatusasignacion = true
        // this.totaldoc = 0
        for (const i in datos) {
          this.totalAsignados += Number(datos[i].cantidad)
          this.totalUtilizados += Number(datos[i].utilizado)
          // console.log(this.totalUtilizados / this.totalAsignados)
          this.estatusasignacion = (this.totalUtilizados / this.totalAsignados) < 0.80 || false
        }
        this.totalDisponible = this.totalAsignados - this.totalUtilizados
      }).catch(error => {
        Notify.create('Problemas al listar Lotes ' + error)
      })
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        // console.log(response.data)
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
            if (datos[i].estatus === '1') {
              this.optionssede.push(obj)
            }
          }
        }
        this.emisores = this.optionssede
        this.rifs = this.optionssede
        this.totalclientes = this.optionssede.length - 1
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    },
    listarReportes () {
      this.calcularTotalImp()
      this.getDocProcesados()
      this.getUltimaSemana()
      this.getLotes()
      this.$refs.barmeses.createData(this.idserviciosmasivo)
      this.$refs.radialtipos1.createData(this.idserviciosmasivo, this.dateFrom, this.dateTo)
      this.$refs.radialtipos2.createData(this.idserviciosmasivo, this.dateFrom, this.dateTo)
      this.$refs.radialtipos3.createData(this.idserviciosmasivo, this.dateFrom, this.dateTo)
      this.$refs.radialtipos4.createData(this.idserviciosmasivo, this.dateFrom, this.dateTo)
      this.$refs.radialtipos5.createData(this.idserviciosmasivo, this.dateFrom, this.dateTo)
    },
    changeFechas () {
      const selectElementDesde = document.querySelector('.fecha1')
      const selectElementHasta = document.querySelector('.fecha2')
      this.dateFrom = selectElementDesde.value
      this.dateTo = selectElementHasta.value
      this.crearbitacora(this.dateFrom, this.dateTo, 2)
    },
    crearbitacora (desde, hasta, idevento) {
      let observacion = ''
      const fechas = ' desde el ' + desde + ' hasta el ' + hasta
      const cliente = this.modelsede?.name
        ? 'Cliente emisor ' + this.modelsede.namerif
        : ''
      observacion += cliente
      observacion += fechas
      axios.post(ENDPOINT_PATH_V2 + 'bitacora', {
        idusuario: this.idusuario,
        idevento: idevento,
        ip: this.term,
        observacion: observacion,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    }
  },
  watch: {
    fechacustom: function (val) {
      // console.log(val)
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
      this.crearbitacora(this.dateFrom, this.dateTo, 2)
    }
  },
  mounted () {
    if (this.co_rol === '4') {
      this.$router.push('/erroracceso')
    }
    fetch('https://api.ipify.org?format=json')
      .then((x) => x.json())
      .then(({ ip }) => {
        this.term = ip
        this.listarsedes()
        // console.log(moment().format('HH'))
        const horadia = moment().format('HH')
        this.saludo = horadia < 24 && horadia >= 18 ? 'Buenas noches' : horadia < 18 && horadia >= 12 ? 'Buenas tardes' : 'Buenos días'
        this.idserviciosmasivo = this.co_rol === '3' ? this.co_sede : undefined
        this.serviciosmasivo = this.co_rol === '3' ? this.tx_sede : undefined

        // console.log('Mounted')
        // console.log(this.tx_sede_seleted)
        // console.log(this.co_sede_seleted)
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
        // console.log(this.serviciosmasivo)
        this.listarReportes()
      })
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
  font-size: 23px;
  margin: 20px 0px;
  color: #65778D;
  font-weight: bold;
}
.dash_welcome_count {
  font-size: 24px;
  color: #65778D;
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
  font-size: 28px;
  margin: -20px 0px 7px 0px;
  color: #0999FF;
}
.dash_card_main {
  color: #98A7BA;
}
.dash_welcome_igtf {
  font-size: 50px;
  margin: 0px 0px -20px;
  color: #0999FF;
  font-weight: bold;
}
.dash_tipos_main {
  font-size: 20px;
  color: #38daae;
  font-weight: bold;
}
.dash_asignados_main {
  font-size: 20px;
  color: #775dd0;
  font-weight: bold;
}
.tarjetaMain {
  margin: -8px 0 0 20px;
  width: 100%;
  height: 260px;
  background: radial-gradient(circle, rgb(250 250 250) 0%, rgb(250 250 250) 100%);
}
.dash_tipos_second {
  font-size: 20px;
  color: #98A7BA;
}
.itemsCardMain {
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.barraporc {
  background: #0999FF;
  border-radius: 5px;
  height: 12px;
}
.fondocolorupimg {
    background: url("../assets/fondo_emisores.png") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
