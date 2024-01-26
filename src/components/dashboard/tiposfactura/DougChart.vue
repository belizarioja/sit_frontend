<template>
   <div v-if="estatus === '1'" class="text-center">
      <img src="estatusgrafica.png" alt="Sin datos" style="width: 250px;">
      <div class="dash_welcome_small">No hay datos que mostrar para esta fecha</div>
    </div>
  <div v-else id="donutchart">
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'
import axios from 'axios'
import moment from 'moment'

const config = require('../../../../src/config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
export default {
  name: 'DonutChart',
  data () {
    return {
      estatus: '3',
      options: {
        chart: {
          type: 'donut'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true
                },
                value: {
                  show: true
                }
              }
            }
          }
        },
        noData: {
          text: 'No data text',
          align: 'center',
          verticalAlign: 'middle'
        },
        series: [],
        labels: ['Factura', 'Nota de débito', 'Nota de crédito', 'Orden de entrega', 'Guía de despacho']
      }
    }
  },
  methods: {
    reset () {
      return this.options.series
    },
    createData (id, dateFrom, dateTo) {
      const datagrafica = []
      const body = {
        idserviciosmasivo: id,
        desde: moment(dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/totaldocumentos', body).then(async response => {
        const datos = response.data.data
        console.log(datos[0].totaldoc)
        datagrafica.push(Number(datos[0].totaldoc))
        datagrafica.push(Number(datos[1].totaldoc))
        datagrafica.push(Number(datos[2].totaldoc))
        datagrafica.push(Number(datos[3].totaldoc))
        datagrafica.push(Number(datos[4].totaldoc))
        // console.log(datagrafica)
        this.options.series = datagrafica
        console.log(this.options)
        console.log(this.options.series)
        // this.estatus = (datagrafica[0] > 0 || datagrafica[1] > 0 || datagrafica[2] > 0 || datagrafica[3] > 0 || datagrafica[4] > 0) ? '2' : '1'
        this.estatus = '2'
        if (this.estatus === '2') {
          const chart = new ApexCharts(document.querySelector('#donutchart'), this.options)
          chart.render()
          // chart.updateSeries(this.reset())
        }
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
