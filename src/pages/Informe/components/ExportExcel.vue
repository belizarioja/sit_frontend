<template>
  <section class="my-font my-fondo reports">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Reportes</span>
    </div>
    <div class="row q-pa-sm q-gutter-sm">
      <!-- <q-input dense filled label="Fecha" :disable="isDisabledMes()" mask="date" v-model="mes"
        class="col-md-3 col-sm-6 col-xs-6">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="mes" :locale="myLocale">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select label="Buscar por Nombre del Emisor" :disable="isDisabledEmisor()" dense filled v-model="emisor" use-input
        hide-selected fill-input options-dense option-label="label" option-value="value" input-debounce="0"
        :options="emisorOptions" /> -->

    </div>

    <q-tabs v-model="tab" dense class="text-grey" active-color="positive" indicator-color="positive" align="justify"
      narrow-indicator inline-label>
      <q-tab icon="date_range" name="semanal" label="Semanal" />
      <q-tab icon="storefront" name="emisor" label="Emisor" />
      <q-tab icon="policy" name="providencia" label="Providencia 0032" />
      <q-tab icon="calendar_month" name="anual" label="Anual" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="my-fondo">
      <q-tab-panel name="emisor" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn icon-right="filter_alt" color="secondary" label="Filtrar" @click="drawerFilters = true" />
          <q-btn icon-right="file_download" color="secondary" label="Exportar a Excel" @click="exportExcelEmisor" />
          <q-btn icon-right="picture_as_pdf" color="secondary" label="Exportar a PDF" @click="exportPDFEmisor" />
        </div>
        <div class="row">
          <reporte-emisor ref="reporte_emisor" v-show="true" :mesName="mes" :emisores="dataTableEmisor"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="semanal" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn icon-right="filter_alt" color="secondary" label="Filtrar" @click="drawerFilters = true" />
          <q-btn icon-right="file_download" color="secondary" label="Exportar a Excel" @click="exportExcelSemanal" />
          <q-btn icon-right="picture_as_pdf" color="secondary" label="Exportar a PDF" @click="exportPDFSemanal" />
          <!-- <q-btn color="primary" label="Excel" @click="exportExcelSemanal" />
          <q-btn color="info" label="PDF" @click="exportPDFSemanal" /> -->
        </div>
        <div class="row">
          <reporte-semanal ref="reporte_semanal" v-show="true" :date="mes" :semanales="dataTableSemanal"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 q-gutter-sm" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="providencia" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn icon-right="file_download" color="secondary" label="Exportar a Excel" @click="exportExcelProvidencia" />
          <q-btn icon-right="picture_as_pdf" color="secondary" label="Exportar a PDF" @click="exportPDFProvidencia" />
        </div>
        <div class="row">
          <reporte-providencia ref="reporte_providencia" v-show="true" :lotes="dataTableLotes"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="anual" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn icon-right="file_download" color="secondary" label="Exportar a Excel" @click="exportExcelAnual" />
          <q-btn icon-right="picture_as_pdf" color="secondary" label="Exportar a PDF" @click="exportPDFAnual" />
          <!-- <q-btn color="primary" label="Excel" @click="exportExcelAnual" />
          <q-btn color="info" label="PDF" @click="exportPDFAnual" /> -->
        </div>
        <div class="row">
          <reporte-anual ref="reporte_anual" v-show="true" :meses="dataTableAnual"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
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
              <!-- <input class="inputDate fecha1" type="date" id="desde" :value="dateFrom">
              <input class="inputDate fecha2" type="date" id="hasta" :value="dateTo"> -->
              <q-input
               dense filled
               label="Fecha"
               :disable="isDisabledMes()"
               mask="date"
               v-model="mes"
               class="col-md-3 col-sm-6 col-xs-6">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="mes" :locale="myLocale">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Cliente emisor:</span>
            <!-- <q-select label="Agregue Nombre o RIF" dense
              class="col-md-3 col-sm-12 col-xs-12" filled v-model="modelsede" :disable="disabledSede" use-input hide-selected
              fill-input clearable options-dense option-label="namerif" option-value="cod" input-debounce="0"
              :options="optionssede" @update:model-value="changeSede()" @input:="changeSede()" @filter="searchEmisor"
              style="padding: 5px" /> -->
            <q-select label="Buscar por Nombre del Emisor" :disable="isDisabledEmisor()" dense filled v-model="emisor" use-input
              hide-selected fill-input options-dense option-label="label" option-value="value" input-debounce="0"
              :options="emisorOptions" />
          </div>
          <div class="text-center">
            <q-btn label="Cerrar" color="negative" @click="drawerFilters = false" />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
  </section>
</template>

<script>
import moment from 'moment'
import ReporteSemanal from './ReporteSemanal.vue'
import ReporteAnual from './ReporteAnual.vue'
import ReporteProvidencia from './ReporteProvidencia.vue'
import ReporteEmisor from './ReporteEmisor.vue'
import { getDataLotesAdapter } from '../adapter/getDataLotesAdapter.adapter.js'
import { getDataGraficaAdapter } from '../adapter/getDataGraficaAdapter.adapter.js'
import { getReporteSemanalAdapter } from '../adapter/getReporteSemanalAdapter.adapter'
import { monthsOfYearJSON as monthsOfYear } from '../utils/MonthsOfYear.js'
import { getNameCurrentMonth } from 'src/pages/Dashboard/utils/getNameCurrentMonth'
import { myLocale } from '../utils/myLocale.js'
export default {
  components: {
    ReporteSemanal,
    ReporteAnual,
    ReporteProvidencia,
    ReporteEmisor
  },
  data () {
    const currentDate = moment().format('YYYY-MM-DD')
    const emisor = 'Todos'
    const emisorOptions = []
    return {
      myLocale,
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted'),
      drawerFilters: false,
      disabledSede: false,
      tab: 'semanal',
      mes: currentDate,
      mesbk: null,
      emisor,
      emisorOptions,
      mesOptions: monthsOfYear,
      dataTableLotes: [],
      dataTableAnual: [],
      dataTableEmisor: [],
      dataTableSemanal: []
    }
  },
  methods: {
    getNameEmisores (emisores) {
      const nameEmisores = emisores.map((emisor) => ({
        label: emisor.name,
        value: emisor.name
      }))
      return nameEmisores
    },
    isDisabledEmisor () {
      // console.log(this.tab, this.disabledSede)
      if ((this.tab === 'semanal' || this.tab === 'emisor') && !this.disabledSede) {
        return false
      }
      return true
    },
    isDisabledMes () {
      if (this.tab !== 'anual') {
        return false
      }
      return true
    },
    exportExcelProvidencia () {
      this.$refs.reporte_providencia.exportExcel()
    },
    exportPDFProvidencia () {
      this.$refs.reporte_providencia.exportPDF()
    },
    exportExcelAnual () {
      this.$refs.reporte_anual.exportExcel()
    },
    exportPDFAnual () {
      this.$refs.reporte_anual.exportPDF()
    },
    exportExcelEmisor () {
      this.$refs.reporte_emisor.exportExcel()
    },
    exportPDFEmisor () {
      this.$refs.reporte_emisor.exportPDF()
    },
    exportExcelSemanal () {
      this.$refs.reporte_semanal.exportExcel()
    },
    exportPDFSemanal () {
      this.$refs.reporte_semanal.exportPDF()
    },
    async getDataGrafica () {
      const grafica = await getDataGraficaAdapter()
      this.dataTableAnual = grafica
    },
    async getDataLotes (emisor) {
      const reporte = await getDataLotesAdapter()
      // console.log(reporte)
      // console.log(emisor)
      if (emisor.label === 'Todos' || emisor === 'Todos') {
        this.dataTableLotes = reporte
        this.$q.loading.hide()
        return
      }
      const emisorFiltered = reporte.filter(
        (item) => item.razonsocial === emisor.label
      )
      this.dataTableLotes = emisorFiltered
    },
    async getReporte (month, year) {
      this.$q.loading.show()
      const currentMonth = getNameCurrentMonth()
      const mesToSearch = month ?? currentMonth
      const body = {
        month: mesToSearch,
        year
      }
      const reporte = await getReporteSemanalAdapter(body)
      this.dataTableEmisor = reporte
      this.dataTableSemanal = reporte
      const nameEmisores = [
        { label: 'Todos', value: 'Todos' },
        ...this.getNameEmisores(reporte)
      ]
      this.emisorOptions = nameEmisores
      this.$q.loading.hide()
    },
    async getReporteByEmisor (emisor) {
      this.$q.loading.show()
      let [year, month] = this.mes.split('-')
      if (!month) {
        const date = this.mes.split('/')
        year = date[0]
        month = date[1]
      }
      const body = {
        month,
        year
      }
      const reporte = await getReporteSemanalAdapter(body)

      if (emisor.label === 'Todos') {
        this.dataTableSemanal = reporte
        this.$q.loading.hide()
        return
      }
      // const reporte = await getReporteSemanalAdapter(body)
      const emisorFiltered = reporte.filter(
        (item) => item.name === emisor.label
      )
      this.dataTableSemanal = emisorFiltered
      this.$q.loading.hide()
    },
    async filterByEmisor (lookingFor) {
      this.$q.loading.show()
      let [year, month] = this.mes.split('/')

      if (!month) {
        const date = this.mes.split('-')
        year = date[0]
        month = date[1]
      }

      const body = { month, year }
      const listEmisores = await getReporteSemanalAdapter(body)
      const sem1 = {}
      sem1.total = 0
      const sem2 = {}
      sem2.total = 0
      const sem3 = {}
      sem3.total = 0
      const sem4 = {}
      sem4.total = 0
      const sem5 = {}
      sem5.total = 0
      for (const i in listEmisores) {
        // console.log(i)
        // console.log(listEmisores[i])
        // console.log(listEmisores[i].mes[0].total)
        sem1.total += Number(listEmisores[i].mes[0].total)
        sem1.sem = listEmisores[i].mes[0].semana
        sem2.total += Number(listEmisores[i].mes[1].total)
        sem2.sem = listEmisores[i].mes[1].semana
        sem3.total += Number(listEmisores[i].mes[2].total)
        sem3.sem = listEmisores[i].mes[2].semana
        sem4.total += Number(listEmisores[i].mes[3].total)
        sem4.sem = listEmisores[i].mes[3].semana
        sem5.total += Number(listEmisores[i].mes[4].total)
        sem5.sem = listEmisores[i].mes[4].semana
        // console.log(i)
      }
      // console.log(sem1, sem2, sem3, sem4, sem5)

      const obj = {}
      obj.id = '00'
      obj.name = 'Total'
      obj.mes = []
      obj.mes.push(sem1)
      obj.mes.push(sem2)
      obj.mes.push(sem3)
      obj.mes.push(sem4)
      obj.mes.push(sem5)
      obj.total = sem1.total + sem2.total + sem3.total + sem4.total + sem5.total
      listEmisores.push(obj)
      // console.log(listEmisores)
      if (lookingFor === 'Todos') {
        this.dataTableEmisor = listEmisores
        this.$q.loading.hide()
        return
      }
      // const listEmisores = await getReporteSemanalAdapter(body)
      const filtered = listEmisores.filter(
        (emisor) => emisor.name === lookingFor
      )
      this.dataTableEmisor = filtered
      this.$q.loading.hide()
    }
  },
  watch: {
    tab (value, oldValue) {
      if (value !== oldValue) {
        this.emisor = { label: 'Todos', value: 'Todos' }
      }
    },
    mes (value, oldValue) {
      if (value !== oldValue) {
        const [year, month] = value.split('/')
        this.getReporte(month, year)
      }
    },
    emisor (value, oldValue) {
      // console.log(value, oldValue)
      if (this.co_sede_seleted) {
        oldValue = 'Todos'
        value = this.emisorselected
        this.disabledSede = true
      }
      if (value !== oldValue) {
        if (this.tab === 'semanal') {
          this.getReporteByEmisor(value)
          return
        }
        if (this.tab === 'emisor') {
          this.filterByEmisor(value.label)
        }
      }
    }
  },
  mounted () {
    const mes = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    this.getDataGrafica()
    this.getReporte(mes, year)
    if (this.co_sede_seleted) {
      const obj = {}
      obj.label = this.tx_sede_seleted
      obj.value = this.tx_sede_seleted
      this.emisor = obj
      this.emisorselected = obj
      this.disabledSede = true
    }
    this.getDataLotes(this.emisor)
  }
}
</script>
<style>
.wrapper-export-btns {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  height: 1rem;
}

.reports {
  padding: 1rem;
}
.tituloDrawer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
</style>
