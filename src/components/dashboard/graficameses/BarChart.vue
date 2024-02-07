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
          fontFamily: 'avenir',
          foreColor: '#98A7BA',
          height: 304,
          width: '100%'
        },
        title: {
          text: 'Documentos procesados tipo/mes',
          fontSize: '40px',
          align: 'left'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '75%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        series: [
          {
            name: 'Facturas',
            data: []
          },
          {
            name: 'Notas de débito',
            data: []
          },
          {
            name: 'Notas de créditos',
            data: []
          },
          {
            name: 'Orden de entrega',
            data: []
          },
          {
            name: 'Guía de despacho',
            data: []
          }
        ],
        yaxis: {
          title: {
            text: 'Cantidad de documentos'
          }
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
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
      const datagrafica2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const datagrafica3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const datagrafica4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      const datagrafica5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      axios.post(ENDPOINT_PATH_V2 + 'reporte/grafica', body).then(async response => {
        const arreglo = response.data.data
        for (const i in arreglo) {
          const item = arreglo[i]
          // console.log(item)
          // datagrafica[item.mes - 1] = item.total
          datagrafica[item.mes - 1] = item.totalfacturas
          datagrafica2[item.mes - 1] = item.totaldebitos
          datagrafica3[item.mes - 1] = item.totalcreditos
          datagrafica4[item.mes - 1] = item.totalentregas
          datagrafica5[item.mes - 1] = item.totaldespachos
        }
        const labelgrafica = [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic'
        ]
        /* const labelgrafica = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agostio',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ] */
        this.options.xaxis.categories = labelgrafica
        this.options.series[0].data = datagrafica
        this.options.series[1].data = datagrafica2
        this.options.series[2].data = datagrafica3
        this.options.series[3].data = datagrafica4
        this.options.series[4].data = datagrafica5
        const chart = new ApexCharts(document.querySelector('#chart'), this.options)
        chart.render()
      })
    }
  }
}
</script>
