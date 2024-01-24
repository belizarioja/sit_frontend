<template>
  <div id="chart"></div>
</template>

<script>
import ApexCharts from 'apexcharts'
import axios from 'axios'
const config = require('../../../../src/config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
export default {
  name: 'BarChart',
  data () {
    return {
      options: {
        chart: {
          type: 'bar',
          height: 300,
          width: '100%'
        },
        series: [{
          name: 'Cantidad de documentos',
          data: []
        }],
        xaxis: {
          categories: []
        }
      }
    }
  },
  methods: {
    createData (id) {
      const body = {
        idtipodocumento: undefined,
        idserviciosmasivo: id,
        idcodigocomercial: undefined,
        estatus: 1
      }
      const datagrafica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      axios.post(ENDPOINT_PATH_V2 + 'reporte/grafica', body).then(async response => {
        const arreglo = response.data.data
        for (const i in arreglo) {
          const item = arreglo[i]
          // console.log(item)
          datagrafica[item.mes - 1] = item.total
        }
        const labelgrafica = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ]
        this.options.xaxis.categories = labelgrafica
        this.options.series[0].data = datagrafica
        const chart = new ApexCharts(document.querySelector('#chart'), this.options)
        chart.render()
      })
    }
  }
}
</script>
