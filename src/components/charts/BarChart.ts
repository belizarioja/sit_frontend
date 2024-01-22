import { defineComponent, ref, h, onMounted } from 'vue'
import axios from 'axios'
// import { Notify } from 'quasar'
const config = require('../../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'BarChart',
  components: {
    Bar
  },

  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    width: {
      type: Number,
      default: 650
    },
    height: {
      type: Number,
      default: 330
    },
    cssClasses: {
      default: '',
      type: String
    }
  },
  setup (props) {
    const chartData = ref({
      labels: [],
      datasets: []
    })
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }
    function fillData () {
      const body = {
        idtipodocumento: undefined,
        idserviciosmasivo: sessionStorage.getItem('co_sede_seleted') ? sessionStorage.getItem('co_sede_seleted') : sessionStorage.getItem('co_sede'),
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
        chartData.value.labels = labelgrafica
        chartData.value.datasets = [
          {
            label: 'Documentos procesados',
            backgroundColor: '#0999FF',
            borderRadius: 10,
            data: datagrafica
          }
        ]
        // console.log('chartData.value')
        // console.log(chartData.value)
      })
      /* const updatedChartData = {
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
      chartData.value = { ...updatedChartData } */
    }
    onMounted(() => {
      // console.log('Component mounted!')
      fillData()
    })
    return () =>
      h(Bar, {
        chartData: chartData.value,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses
      })
  }
})
