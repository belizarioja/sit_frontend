<template>
  <div id="radialbarchart2">
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import axios from 'axios'
import moment from 'moment'
const config = require('../../../../src/config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
export default {
  name: 'RadialBarChart2',
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
        colors: ['#0999FF'],
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '12px',
                color: '#98A7BA',
                offsetY: 50
              },
              value: {
                offsetY: 20,
                fontSize: '12px',
                color: '#0999FF',
                formatter: function (val) {
                  return val + '%'
                }
              }
            }
          }
        },
        labels: ['Notas de débito'],
        series: [],
        theme: {
          monochrome: {
            enabled: true
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
        const porcentaje = Number(datos[1].total) > 0 ? (datos[1].totaldoc / datos[0].total) : 0
        datagrafica.push(Number(porcentaje * 100).toFixed(2))
        this.options.series = datagrafica
        this.options.chart.height = 130
        this.options.chart.width = 130
        new ApexCharts(document.querySelector('#radialbarchart2'), this.options).render()
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
