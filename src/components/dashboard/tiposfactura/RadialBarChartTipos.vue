<template>
  <div id="radialbarchart1">
  </div>
  <div id="radialbarchart2">
  </div>
  <div id="radialbarchart3">
  </div>
  <div id="radialbarchart4">
  </div>
  <div id="radialbarchart5">
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
      idtipodocumento: 2,
      options1: {
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
        series: [],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        }
      },
      options2: {
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
        series: [],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        }
      },
      options3: {
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
        series: [],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        }
      },
      options4: {
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
        series: [],
        theme: {
          monochrome: {
            enabled: false
          }
        },
        legend: {
          show: false
        }
      },
      options5: {
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
        datagrafica.push(Number(datos[4].totaldoc))
        this.options1.series = datagrafica
        this.options1.chart.height = 250
        datagrafica.push(Number(datos[3].totaldoc))
        this.options2.series = datagrafica
        this.options2.chart.height = 80
        datagrafica.push(Number(datos[3].totaldoc))
        this.options3.series = datagrafica
        this.options3.chart.height = 80
        datagrafica.push(Number(datos[3].totaldoc))
        this.options4.series = datagrafica
        this.options4.chart.height = 80
        datagrafica.push(Number(datos[3].totaldoc))
        this.options5.series = datagrafica
        this.options5.chart.height = 80
        new ApexCharts(document.querySelector('#radialbarchart1'), this.options1).render()
        new ApexCharts(document.querySelector('#radialbarchart2'), this.options2).render()
        new ApexCharts(document.querySelector('#radialbarchart3'), this.options3).render()
        new ApexCharts(document.querySelector('#radialbarchart4'), this.options4).render()
        new ApexCharts(document.querySelector('#radialbarchart5'), this.options5).render()
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
