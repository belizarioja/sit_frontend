<template>
  <div id="radialbarchart1">
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import axios from 'axios'
import moment from 'moment'
const config = require('../../../../src/config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
export default {
  name: 'RadialBarChart1',
  data () {
    return {
      options: {
        chart: {
          type: 'radialBar',
          fontFamily: 'avenir',
          zoom: {
            enabled: false
          },
          offsetY: 20
        },
        colors: ['#17d5a2'],
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '24px',
                color: '#17d5a2'
              },
              value: {
                fontSize: '18px',
                color: '#98A7BA',
                formatter: function (val) {
                  return val + '%'
                }
              }
            }
          }
        },
        labels: ['Facturas'],
        series: [],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        }
      }
    }
  },
  methods: {
    createData (id, dateFrom, dateTo) {
      const body = {
        idserviciosmasivo: id,
        desde: moment(dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/totaldocumentos', body).then(async response => {
        const datos = response.data.data
        const datagrafica = []
        const porcentaje = datos[0].totaldoc / datos[0].total * 100 || 0
        datagrafica.push(porcentaje.toFixed(2))
        this.options.series = datagrafica
        this.options.chart.height = 250
        this.options.chart.width = 200
        new ApexCharts(document.querySelector('#radialbarchart1'), this.options).render()
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
