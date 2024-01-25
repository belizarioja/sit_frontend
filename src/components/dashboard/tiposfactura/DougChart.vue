<template>
  <div id="donutchart">
    <div v-if="options.series.length === 0" class="text-center">
      <img src="estatusgrafica.png" alt="Sin datos" style="width: 250px;">
      <div class="dash_welcome_small">No hay datos que mostrar para esta fecha</div>
    </div>
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
        series: [],
        labels: ['Factura', 'Nota de débito', 'Nota de crédito', 'Orden de entrega', 'Guía de despacho']
      }
    }
  },
  methods: {
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
        const estatus = (datagrafica[0] > 0 || datagrafica[1] > 0 || datagrafica[2] > 0 || datagrafica[3] > 0 || datagrafica[4] > 0) || false
        if (estatus) {
          const chart = new ApexCharts(document.querySelector('#donutchart'), this.options)
          chart.render()
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
