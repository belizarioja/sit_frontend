<template>
  <div ref="wrapper_table">
    <div
      v-for="emisor in dataTableOne"
      :key="emisor.id"
      class="column q-gutter-y-sm"
    >
      <div>
        <span class="title"
          >Control de Facturas Semanales {{ emisor.name }}</span
        >
      </div>
      <q-table ref="table_one" :rows="makeOneRow()">
        <template #header>
          <q-tr>
            <q-th rowspan="1" :colspan="emisor.mes.length">
              {{ title }}
            </q-th>
            <q-th rowspan="2">Total</q-th>
          </q-tr>
          <q-tr>
            <q-th v-for="itemHeader in emisor.mes" :key="itemHeader">
              Semana {{ itemHeader.semana }}
            </q-th>
          </q-tr>
        </template>
        <template #body>
          <q-tr>
            <q-td
              align="center"
              v-for="itemBody in emisor.mes"
              :key="itemBody.semana"
            >
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
        >
          <template #header>
            <q-tr>
              <q-th rowspan="1" colspan="2">
                Controles Asignados {{ getInitDate(control) }} al
                {{ getEndDate(control) }}
                {{ mesName }}
              </q-th>
              <q-th rowspan="2">Total</q-th>
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
import XLSX from 'xlsx/dist/xlsx.full.min'
import { getNameMonth } from '../utils/getNameMonth'
import { getNameCurrentMonth } from '../utils/getNameCurrentMonth'

export default {
  props: ['semanales'],
  setup (props) {
    const { semanales } = toRefs(props)

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
      const month = new Date().getMonth() + 1
      const year = new Date().getFullYear()
      return `${getNameMonth(month)}-${year}`
    })

    const mesName = getNameCurrentMonth()

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

      XLSX.writeFile(wb, `semanal-${this.title}.xlsx`)
    },
    exportPDF () {
      const content = [{ mes: '1' }]
      const headers = Object.keys(content[0])
      const marginTop = {
        title: 20,
        table: 50
      }
      const marginLeft = {
        title: 60,
        table: 60
      }
      // eslint-disable-next-line new-cap
      const pdfCreator = new jsPDF('p', 'pt')
      pdfCreator.text('Reporte Semanal', marginLeft.title, marginTop.title)
      pdfCreator.table(marginLeft.table, marginTop.table, content, headers)
      pdfCreator.save('reporte_semanal.pdf')
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 1.2rem;
  font-weight: bold;
}

.cell {
  border: 1px solid black;
}
</style>
