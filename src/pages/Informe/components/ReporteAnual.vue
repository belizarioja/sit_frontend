<template>
  <div style="width: 100%; display: flex; justify-content: center;">
    <q-table
    ref="table_anual"
    :rows="year"
    hide-bottom
    style="width: 400px;"
    >
      <template #header>
        <tr>
          <th style="font-weight: bolder; font-size: 18px; color: #65778D;">Mes</th>
          <th style="font-weight: bolder; font-size: 18px; color: #0999FF;">Total</th>
        </tr>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td align="center">{{ props.row.month }}</q-td>
          <q-td align="center">{{ props.row.total }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import XLSX from 'xlsx/dist/xlsx.full.min'
import autoTable from 'jspdf-autotable'
import { toRefs, computed } from 'vue'
import { getNameMonth } from '../utils/getNameMonth.js'
import { getNameCurrentMonth } from '../utils/getNameCurrentMonth.js'
import jsPDF from 'jspdf'

export default {
  props: ['meses'],
  setup (props) {
    const { meses } = toRefs(props)
    const calculateTotal = () => {
      return meses.value.reduce((acc, cur) => acc + Number(cur.cantidad), 0)
    }
    const year = computed(() => {
      const months = meses.value.map((mes) => {
        const month = getNameMonth(mes.mes)
        return {
          month,
          total: mes.cantidad
        }
      })
      const total = calculateTotal()
      return [...months, { month: 'Total', total }]
    })

    return { year }
  },
  methods: {
    getChildRefs () {
      return this.$refs.table_anual
    },
    exportExcel () {
      const currentMonth = getNameCurrentMonth()
      const content = this.year.map((el) => ({
        Mes: el.month,
        Total: el.total
      }))
      const data = XLSX.utils.json_to_sheet(content)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data')
      XLSX.writeFile(wb, `anual-${currentMonth}.xlsx`)
    },
    exportPDF () {
      const currentMonth = getNameCurrentMonth()
      const content = this.year.map((el) => ({
        Mes: el.month,
        Total: String(el.total)
      }))

      const content2 = this.year.map((el) => [el.month, String(el.total)])

      const headers = Object.keys(content[0])
      const marginTop = {
        title: 40,
        table: 50
      }
      const marginLeft = {
        title: 60,
        table: 60
      } // eslint-disable-next-line new-cap
      const pdfCreator = new jsPDF('p', 'pt')
      pdfCreator.text('Smart Reporte Anual', marginLeft.title, marginTop.title)
      autoTable(pdfCreator, {
        margin: { top: 60 },
        theme: 'grid',
        head: [headers],
        body: content2
      })
      pdfCreator.save(`smart-anual-${currentMonth}.pdf`)
    }
  }
}
</script>
