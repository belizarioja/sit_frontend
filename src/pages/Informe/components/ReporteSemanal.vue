<template>
  <div ref="wrapper_table">
    <div>
      <span class="title">Control de Facturas Semanales</span>
    </div>
    <div v-for="emisor in dataTableOne" :key="emisor.id" class="column q-gutter-y-sm">
      <q-separator />
      <div>
        <span class="title">{{ emisor.name }}</span>
      </div>
      <q-table
       ref="table_one"
       :rows="makeOneRow()"
       hide-bottom
      >
        <template #header>
          <q-tr>
            <q-th rowspan="1" :colspan="emisor.mes.length" style="font-weight: bolder; font-size: 18px; color: #65778D;">
              {{ title }}
            </q-th>
            <q-th rowspan="2" style="font-weight: bolder; font-size: 18px; color: #0999FF;">Total</q-th>
          </q-tr>
          <q-tr>
            <q-th v-for="itemHeader in emisor.mes" :key="itemHeader">
              Semana {{ itemHeader.semana }}
            </q-th>
          </q-tr>
        </template>
        <template #body>
          <q-tr>
            <q-td align="center" v-for="itemBody in emisor.mes" :key="itemBody.semana">
              {{ itemBody.total }}
            </q-td>
            <q-td align="center">{{ emisor.total }}</q-td>
          </q-tr>
        </template>
      </q-table>

      <div class="row q-gutter-sm">
        <q-table
         ref="table_two"
         v-for="control in emisor.mes"
         :key="control.semana"
         :rows="makeOneRow()"
         hide-bottom
        >
          <template #header>
            <q-tr>
              <q-th rowspan="1" colspan="2" style="font-weight: bolder; font-size: 14px; color: #65778D;">
                Controles Asignados {{ getInitDate(control) }} al
                {{ getEndDate(control) }}
                {{ mesName }}
              </q-th>
              <q-th rowspan="2" style="font-weight: bolder; font-size: 14px; color: #0999FF;">Total</q-th>
            </q-tr>
            <q-tr>
              <q-th colspan="1" rowspan="1">Control Inicial</q-th>
              <q-th colspan="1" rowspan="1">Control Final</q-th>
            </q-tr>
          </template>
          <template #body>
            <tr>
              <td>{{ getControlInicial(control) }}</td>
              <td>{{ getControlFinal(control) }}</td>
              <td align="center">{{ control.total }}</td>
            </tr>
          </template>
        </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue'
import jsPDF from 'jspdf'

import autoTable from 'jspdf-autotable'
import XLSX from 'xlsx/dist/xlsx.full.min'
import { getNameMonth } from '../utils/getNameMonth'

export default {
  props: ['semanales', 'date'],
  setup (props) {
    const { semanales, date } = toRefs(props)

    const dataTableOne = computed(() => {
      return semanales.value
    })

    const totalTableOne = computed(() => {
      const sum = dataTableOne.value.reduce((prev, cur) => prev + cur.total, 0)
      return sum
    })

    const getInitDate = (control) => {
      return control?.semana.split('-')[0]
    }

    const getEndDate = (control) => {
      return control?.semana.split('-')[1]
    }

    const getControlInicial = (control) => {
      return control?.controlInicial || 'N/A'
    }

    const getControlFinal = (control) => {
      return control?.controlFinal || 'N/A'
    }

    const title = computed(() => {
      let [year, month] = date.value.split('-')
      if (!month) {
        month = date.value.split('/')[1]
        year = date.value.split('/')[0]
      }
      return `${getNameMonth(month)}-${year}`
    })

    const mesName = computed(() => {
      let [, month] = date.value.split('-')
      if (!month) {
        month = date.value.split('/')[1]
      }
      const mesName = getNameMonth(month)
      return mesName
    })

    const dataTableTwo = computed(() => {
      return [
        {
          id: 1,
          initDate: '01',
          endDate: '03',
          controlInicial: 'inicial 1',
          controlFinal: 'final 1',
          total: '12'
        }
      ]
    })
    const makeOneRow = () => [{}]

    const getInitTab = () => {
      return dataTableOne.value[0]?.name
    }
    return {
      tab: getInitTab(),
      title,
      mesName,
      dataTableOne,
      dataTableTwo,
      totalTableOne,
      getInitDate,
      getEndDate,
      getControlInicial,
      getControlFinal,
      makeOneRow
    }
  },
  methods: {
    nameCurrentMonth () {
      const month = new Date().getMonth() + 1
      return `${getNameMonth(month)}`
    },
    makeDataExcel (emisor) {
      const { name, mes, total } = emisor
      const nameSheet = name.slice(0, 20)

      const mainTitle = [`Control de Facturas Semanales ${name}`]
      const title1 = [this.title]

      // upper table
      const title2 = mes.reduce((acc, c) => {
        const [from, till] = c.semana.split('-')
        return [...acc, `Controles Asignados ${from} al ${till}`, '', '']
      }, [])
      const headers = mes.map((el) => el.semana)
      const content = mes.map((el) => el.total)

      // lower table
      const header2 = mes.reduce((acc) => {
        return [...acc, 'Control Inicial', 'Control Final', 'Total']
      }, [])
      const content2 = mes.reduce((acc, c) => {
        const controlInicial = c.controlInicial || 'N/A'
        const controlFinal = c.controlFinal || 'N/A'
        return [...acc, controlInicial, controlFinal, c.total]
      }, [])
      return {
        nameSheet,
        mainTitle,
        title1,
        title2,
        headers,
        content,
        header2,
        content2,
        total
      }
    },
    formatExcel ({
      mainTitle,
      title1,
      title2,
      headers,
      content,
      header2,
      content2,
      total
    } = {}) {
      return [
        mainTitle,
        [],
        title1,
        [...headers, 'Total'],
        [...content, total],
        [],
        [],
        title2,
        [...header2, `Total ${this.nameCurrentMonth()}`],
        [...content2, total]
      ]
    },
    exportExcel () {
      // eslint-disable-next-line no-unused-vars
      const wb = XLSX.utils.book_new()

      this.dataTableOne.forEach((emisor) => {
        const {
          nameSheet,
          mainTitle,
          title1,
          title2,
          headers,
          content,
          header2,
          content2,
          total
        } = this.makeDataExcel(emisor)
        const data = this.formatExcel({
          mainTitle,
          title1,
          title2,
          headers,
          content,
          header2,
          content2,
          total
        })
        const sheet = XLSX.utils.aoa_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, sheet, nameSheet)
      })

      XLSX.writeFile(wb, `smart-semanal-${this.title}.xlsx`)
    },
    isLastItem (array, index) {
      return index < array.length - 1
    },
    getPositionX (index, space = 100) {
      return index * space
    },
    getPositionY () {
      return 100
    },
    exportPDF () {
      // eslint-disable-next-line new-cap, no-unused-vars
      const pdfCreator = new jsPDF('p', 'pt')

      this.dataTableOne.forEach((emisor, i) => {
        const colorWhite = [255, 255, 255]
        const colorBlack = [6, 6, 6]
        const columns = emisor.mes.map((el) => el.semana)
        const content = emisor.mes.map((el) => el.total)

        pdfCreator.text(
          `Control de Facturas Semanales ${emisor.name}`,
          40, // x
          50 // y
        )
        autoTable(pdfCreator, {
          // margin: { top: 70 },
          startY: 60,
          head: [[this.nameCurrentMonth()]],
          headStyles: {
            fillColor: colorWhite,
            fontSize: 16,
            textColor: colorBlack
          }
        })
        autoTable(pdfCreator, {
          // margin: { top: 70 },
          startY: 90,
          theme: 'grid',
          head: [columns],
          body: [content]
        })

        emisor.mes.forEach((el, i) => {
          const header = ['Control Inicial', 'Control Final', 'Total']
          const controlInicial = el.controlInicial || 'N/A'
          const controlFinal = el.controlFinal || 'N/A'
          const content = [controlInicial, controlFinal, el.total]
          const [desde, hasta] = el.semana.split('-')
          // const tam1 = i > 0 ? i * 120 : 140
          // const tam2 = i > 0 ? i * 140 : 165
          autoTable(pdfCreator, {
            // startY: tam1,
            head: [[`Controles Asignados ${desde} al ${hasta}`]],
            headStyles: {
              fillColor: colorWhite,
              textColor: colorBlack
            }
          })
          // pdfCreator.setLineWidth(2)
          autoTable(pdfCreator, {
            // startY: tam2,
            theme: 'grid',
            head: [header],
            body: [content],
            headStyles: {},
            bodyStyles: {},
            footStyles: {}
          })
        })

        if (this.isLastItem(this.dataTableOne, i)) {
          pdfCreator.addPage()
        }
      })
      pdfCreator.save('smart_reporte_semanal.pdf')
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #65778D;
}

.cell {
  border: 1px solid black;
}
</style>
