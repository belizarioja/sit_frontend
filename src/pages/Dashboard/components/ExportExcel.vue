<template>
  <section class="reports">
    <div class="col-md-3 col-sm-12 col-xs-12">
      <span style="margin: 20px; font-size: 20px; font-weight: bolder">Reportes</span>
    </div>
    <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
      narrow-indicator>
      <q-tab name="emisor" label="Emisor" />
      <q-tab name="semanal" label="Semanal" />
      <q-tab name="anual" label="Anual" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="emisor" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn color="primary" label="Excel" @click="exportExcelEmisor" />
          <q-btn color="info" label="PDF" @click="exportPDFEmisor" />
        </div>
        <div class="row">
          <reporte-emisor ref="reporte_emisor" v-show="true" :emisores="dataTableEmisor"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="semanal" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn color="primary" label="Excel" @click="exportExcelSemanal" />
          <q-btn color="info" label="PDF" @click="exportPDFSemanal" />
        </div>
        <div class="row">
          <reporte-semanal ref="reporte_semanal" v-show="true" :semanales="dataTableSemanal"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 q-gutter-sm" />
        </div>
      </q-tab-panel>
      <q-tab-panel name="anual" class="q-gutter-md">
        <div class="row justify-end q-gutter-sm">
          <q-btn color="primary" label="Excel" @click="exportExcelAnual" />
          <q-btn color="info" label="PDF" @click="exportPDFAnual" />
        </div>
        <div class="row">
          <reporte-anual ref="reporte_anual" v-show="true" :meses="dataTableAnual"
            class="col-xs-12 col-sm-10 col-md-12 col-lg-12" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </section>
</template>

<script>
import ReporteSemanal from './ReporteSemanal.vue'
import ReporteAnual from './ReporteAnual.vue'
import ReporteEmisor from './ReporteEmisor.vue'
import { getDataGraficaAdapter } from '../adapter/getDataGraficaAdapter.adapter.js'
import { getReporteSemanalAdapter } from '../adapter/getReporteSemanalAdapter.adapter'

export default {
  components: {
    ReporteSemanal,
    ReporteAnual,
    ReporteEmisor
  },
  data () {
    return {
      tab: 'semanal',
      dataTableAnual: [],
      dataTableEmisor: [],
      dataTableSemanal: []
    }
  },
  methods: {
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
    async getReporte () {
      const reporte = await getReporteSemanalAdapter()
      console.log('reporte', reporte)
      this.dataTableEmisor = reporte
      this.dataTableSemanal = reporte
    }
  },
  mounted () {
    this.getDataGrafica()
    this.getReporte()
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
  padding-bottom: 1rem;
}
</style>
