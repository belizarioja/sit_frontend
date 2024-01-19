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
        idserviciosmasivo: undefined,
        idcodigocomercial: undefined,
        estatus: 1
      }
      //  console.log('IP: ', this.term)
      const datagrafica = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      axios.post(ENDPOINT_PATH_V2 + 'reporte/grafica', body).then(async response => {
        console.log('response.data')
        console.log(response.data.data)
        const arreglo = response.data.data
        for (const i in arreglo) {
          const item = arreglo[i]
          console.log(item)
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
        /* const datagrafica = [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        const datagrafica2 = [39, 80, 40, 20, 12, 11, 40, 20, 12, 39, 10, 40]
        const datagrafica3 = [20, 10, 6, 30, 5, 20, 44, 70, 20, 80, 20, 4] */
        chartData.value.labels = labelgrafica
        chartData.value.datasets = [
          {
            label: 'Documentos procesados',
            backgroundColor: '#00C7DC',
            data: datagrafica
          }
        ]
        console.log('chartData.value')
        console.log(chartData.value)
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
      console.log('Component mounted!')
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
