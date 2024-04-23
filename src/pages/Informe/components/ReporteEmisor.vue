<template>
  <q-table
   ref="table_emisor"
   :rows="mes"
   hide-pagination
   :rows-per-page-options="[0]"
  >
    <template #header>
      <q-tr>
        <th colspan="1" rowspan="2" style="font-weight: bolder; font-size: 18px; color: #65778D;">Cliente Emisor</th>
        <th :colspan="semanas?.length" rowspan="1" style="font-weight: bolder; font-size: 18px; color: #65778D;">{{ title }}</th>
        <th colspan="1" rowspan="2" style="font-weight: bolder; font-size: 18px; color: #0999FF;">Total</th>
      </q-tr>
      <q-tr>
        <th colspan="1" rowspan="1" v-for="semana in semanas" :key="semana.semana">
          {{ semana.semana }}
        </th>
      </q-tr>
    </template>
    <template #body="props">
      <q-tr :props="props">
        <q-td align="center">{{ props.row.name }}</q-td>
        <q-td v-for="semana in props.row.mes" :key="semana.semana" align="center">
          {{ semana.total }}
        </q-td>
        <q-td align="center">{{ props.row.total }}</q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import XLSX from 'xlsx/dist/xlsx.full.min'
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import { toRefs, computed } from 'vue'
import { getNameMonth } from '../utils/getNameMonth'
export default {
  props: ['emisores', 'mesName'],
  setup (props) {
    const { emisores, mesName } = toRefs(props)

    const mes = computed(() => {
      return emisores.value
    })
    const semanas = computed(() => {
      return mes.value[0]?.mes
    })

    const title = computed(() => {
      let [year2, month2] = mesName.value.split('-')
      if (!month2) {
        month2 = mesName.value.split('/')[1]
        year2 = mesName.value.split('/')[0]
      }
      return `${getNameMonth(month2)}-${year2}`
    })

    return { mes, semanas, title }
  },
  methods: {
    nameCurrentMonth () {
      const month = new Date().getMonth() + 1
      return `${getNameMonth(month)}`
    },
    getChildRefs () {
      return this.$refs.table_emisor
    },
    getWeekHeader (week) {
      const entries = Object.entries(week).map(([k, v]) => [v.semana, v.total])
      const getWeekHeader = Object.fromEntries(entries)
      return getWeekHeader
    },
    getArrayWeekHeader (week) {
      const getWeekHeader = Object.entries(week).map(([k, v]) => [
        v.semana,
        v.total
      ])
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
      XLSX.writeFile(wb, `smart-emisor-${this.title}.xlsx`)
    },
    exportPDF () {
      const [first] = this.mes
      const { mes } = first
      const mesEntries = Object.entries(mes)
      const semanas = mesEntries.map(([k, v]) => v.semana)
      const header = ['Emisor', ...semanas, 'Total']

      const content = this.mes.map((el) => {
        const semana = el.mes.map((v) => v.total)
        const total = el.mes.reduce((acc, c) => acc + Number(c.total), 0)
        const nameEmisores = el.name
        return [nameEmisores, ...semana, total]
      })
      const colorWhite = [255, 255, 255]
      const colorBlack = [6, 6, 6]
      const marginTop = {
        title: 30
      }
      const marginLeft = {
        title: 60
      }
      // eslint-disable-next-line new-cap
      const pdfCreator = new jsPDF('p', 'pt')
      pdfCreator.text('Reporte Smart Semanal de Emisores', marginLeft.title, marginTop.title)

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
        margin: { top: 70 },
        theme: 'grid',
        head: [header],
        body: content
      })

      // pdfCreator.table(marginLeft.table, marginTop.table, content, headers)
      pdfCreator.save('smart_reporte_emisores.pdf')
    }
  }
}
</script>
