<template>
  <div id="radialbarchart">
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import axios from 'axios'
import moment from 'moment'
const config = require('../../../../src/config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
export default {
  name: 'RadialBarChart',
  data () {
    return {
      estatus: '3',
      idtipodocumento: 0,
      options: {
        chart: {
          type: 'radialBar',
          zoom: {
            enabled: false
          },
          offsetY: 20
        },
        colors: ['#E91E63'],
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: 0
              }
            }
          }
        },
        series: [65],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        },
        noData: {
          text: 'No data text',
          align: 'center',
          verticalAlign: 'middle'
        }
      }
    }
  },
  methods: {
    reset () {
      return this.options.series
    },
    createData (id, dateFrom, dateTo, idtipodocumento, altura) {
      const datagrafica = []
      this.idtipodocumento = idtipodocumento
      const body = {
        idserviciosmasivo: id,
        desde: moment(dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/totaldocumentos', body).then(async response => {
        const datos = response.data.data
        datagrafica.push(Number(datos[idtipodocumento - 1].totaldoc))
        this.options.series = datagrafica
        this.options.chart.height = altura
        const chart = new ApexCharts(document.querySelector('#radialbarchart'), this.options)
        chart.render()
      }).catch(error => {
        console.log('Problemas al listar Documentos ' + error)
      })
    }
  }
}
</script>
<style>
  .dash_welcome_small {
    margin: 0px 20px 20px 0px;
    color: #98A7BA;
    font-weight: bold;
    font-size: 12px;
    height: 50px;
  }
</style>
