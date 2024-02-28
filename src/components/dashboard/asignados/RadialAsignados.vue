<template>
  <div id="radialasignados">
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import axios from 'axios'
const config = require('../../../../src/config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
export default {
  name: 'RadialBarChart5',
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
        colors: ['#775dd0'],
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '12px',
                color: '#98A7BA',
                offsetY: 5
              },
              value: {
                offsetY: 10,
                fontSize: '12px',
                color: '#775dd0',
                formatter: function (val) {
                  return val + '%'
                }
              }
            }
          }
        },
        labels: ['Relación de uso'],
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
    createData (id) {
      const body = {
        id
      }
      axios.post(ENDPOINT_PATH_V2 + 'sede/lotes', body).then(async response => {
        const datos = response.data.data
        const datagrafica = []
        this.totalAsignados = 0
        this.totalUtilizados = 0
        this.porcUsados = true
        for (const i in datos) {
          this.totalAsignados += Number(datos[i].cantidad)
          this.totalUtilizados += Number(datos[i].utilizado)
        }
        this.porcUsados = this.totalUtilizados / this.totalAsignados
        // console.log(Number(this.porcUsados * 100).toFixed(2))
        datagrafica.push(Number(this.porcUsados * 100).toFixed(2))
        this.options.series = datagrafica
        this.options.chart.height = 250
        this.options.chart.width = 200
        new ApexCharts(document.querySelector('#radialasignados'), this.options).render()
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
