<template>
  <q-table ref="table_emisor" :rows="mes">
    <template #header>
      <q-tr>
        <th colspan="1" rowspan="2">Emisor</th>
        <th :colspan="semanas?.length" rowspan="1">{{ title }}</th>
        <th colspan="1" rowspan="2">Total</th>
      </q-tr>
      <q-tr>
        <th colspan="1" rowspan="1" v-for="semana in semanas" :key="semana.semana">
          {{ semana.semana }}
        </th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td align="left">{{ props.row.name }}</q-td>
        <q-td v-for="semana in props.row.mes" :key="semana.semana" align="right">
          {{ semana.total }}
        </q-td>
        <q-td align="right">{{ props.row.total }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import XLSX from 'xlsx/dist/xlsx.full.min'
import jsPDF from 'jspdf'
import { toRefs, computed } from 'vue'
import { getNameMonth } from '../utils/getNameMonth'
export default {
  props: ['emisores'],
  setup (props) {
    const { emisores } = toRefs(props)

    const mes = computed(() => {
      return emisores.value
    })
    const semanas = computed(() => {
      return mes.value[0]?.mes
    })

    const title = computed(() => {
      const today = new Date()
      const month = today.getMonth() + 1
      const year = new Date().getFullYear()
      return `${getNameMonth(month)}-${year}`
    })

    return { mes, semanas, title }
  },
  methods: {
    getChildRefs () {
      return this.$refs.table_emisor
    },
    getWeekHeader (week) {
      const entries = Object.entries(week).map(([k, v]) => [v.semana, v.total])
      const getWeekHeader = Object.fromEntries(entries)
      return getWeekHeader
    },
    exportExcel () {
      const content = this.mes.map((el) => ({
        Emisor: el.name,
        ...this.getWeekHeader(el.mes),
        Total: el.total
      }))
      const data = XLSX.utils.json_to_sheet(content)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data')
      XLSX.writeFile(wb, `emisor-${this.title}.xlsx`)
    },
    exportPDF () {
      const content = this.mes.map((el) => ({
        Emisor: el.name,
        ...this.getWeekHeader(el.mes),
        Total: `${el.total}`
      }))

      const headers = Object.keys(content[0])
      const marginTop = {
        title: 20,
        table: 50
      }
      const marginLeft = {
        title: 60,
        table: 60
      } // eslint-disable-next-line new-cap
      const pdfCreator = new jsPDF('p', 'pt')
      pdfCreator.text('Reporte Semanal', marginLeft.title, marginTop.title)
      pdfCreator.table(marginLeft.table, marginTop.table, content, headers)
      pdfCreator.save('reporte_semanal.pdf')
    }
  }
}
</script>
