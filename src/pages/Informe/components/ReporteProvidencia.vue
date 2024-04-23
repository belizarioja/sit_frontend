<template>
  <div style="width: 100%; display: flex; justify-content: center;">
    <q-table
    ref="table_providencia"
    :rows="lotes"
    hide-pagination
    :rows-per-page-options="[0]"
    >
      <template #header>
        <tr>
          <th>Contribuyente</th>
          <th>RIF</th>
          <th>Fecha asig. Nro Control</th>
          <th>Nro Control Inicial</th>
          <th>Nro Control Final</th>
          <th>Cantidad</th>
          <th>Nro Factura Venta</th>
          <th>Detalles</th>
        </tr>
      </template>
      <template #body="props">
        <q-tr :props="props">
          <q-td align="left">{{ props.row.razonsocial }}</q-td>
          <q-td align="center">{{ props.row.rif }}</q-td>
          <q-td align="center">{{ props.row.fecha }}</q-td>
          <q-td align="center">{{ props.row.inicial }}</q-td>
          <q-td align="center">{{ props.row.termina }}</q-td>
          <q-td align="center">{{ props.row.cantidad }}</q-td>
          <q-td align="center">{{ props.row.soportefactura }}</q-td>
          <q-td align="center">
            <q-btn color="secondary" icon="view_list" @click="openDetalles(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="viewdetail" persistent>
        <q-card style="max-width: inherit; width: auto">
          <q-separator />
          <q-item>
            <q-table
             :rows="detallesDoc"
             row-key="numerodocumento"
             :pagination="initialPagination"
             class="my-sticky-header-table"
             style="width: 100%">
              <template #header>
                <tr>
                  <th>Nombre Cliente</th>
                  <th>Documento Cliente</th>
                  <th>Tipo Documento</th>
                  <th>Nro Control</th>
                  <th>Nro Interno</th>
                </tr>
              </template>
              <template #body="props">
                <q-tr :props="props">
                  <q-td align="left">{{ props.row.nombrecliente }}</q-td>
                  <q-td align="center">{{ props.row.abrev }}-{{ props.row.cedulacliente }}</q-td>
                  <q-td align="center">{{ props.row.tipodocumento }}</q-td>
                  <q-td align="center">{{ props.row.numerodocumento }}</q-td>
                  <q-td align="center">{{ props.row.numerointerno }}</q-td>
                </q-tr>
              </template>
            </q-table>
          </q-item>
          <q-separator />
          <q-card-actions align="right">
            <q-btn label="Cerrar" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx/dist/xlsx.full.min'
import autoTable from 'jspdf-autotable'
// import { toRefs, computed } from 'vue'
import { toRefs, ref } from 'vue'
import moment from 'moment'
// import { getNameMonth } from '../utils/getNameMonth.js'
import { getNameCurrentMonth } from '../utils/getNameCurrentMonth.js'
import { getDataFacturasNumAdapter } from '../adapter/getDataFacturasNumAdapter.adapter.js'

import jsPDF from 'jspdf'

export default {
  props: ['lotes'],
  setup (props) {
    const { lotes } = toRefs(props)
    /* const calculateTotal = () => {
      return lotes.value.reduce((acc, cur) => acc + Number(cur.cantidad), 0)
    } */
    /* const providencia = computed(() => {
      const prov = lotes.value.map((item) => {
        const fecha = moment(item.fecha).format('DD/MM/YYYY')
        item.fecha = fecha
        return {
          item
        }
      })
      return prov
    }) */
    const getNumControl = (val, val2) => {
      const iden = val.toString().padStart(2, '0')
      const core = val2.toString().padStart(8, '0')
      return iden + '-' + core
    }
    const providencia = lotes.value.map((item) => {
      // console.log(item)
      const fecha = moment(item.fecha, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
      item.fecha = fecha
      const inicia = getNumControl(item.identificador, item.inicia)
      item.inicial = inicia
      const termina = item.cantidad > 0 ? getNumControl(item.identificador, item.termina) : item.inicial
      item.termina = termina

      return item
    })
    return {
      providencia,
      detallesDoc: ref([]),
      viewdetail: ref(false),
      initialPagination: {
        page: 1,
        rowsPerPage: 10 // 0 means all rows
      }
    }
  },
  methods: {
    async openDetalles (reg) {
      // console.log(reg)
      const body = {
        idserviciosmasivo: reg.idserviciosmasivo,
        numerodocumento: reg.inicial,
        numerodocumentofin: reg.termina
      }
      this.detallesDoc = await getDataFacturasNumAdapter(body)
      console.log(this.detallesDoc)
      this.viewdetail = true
    },
    getChildRefs () {
      return this.$refs.table_providencia
    },
    exportExcel () {
      // console.log(this.lotes)
      const content = this.lotes.map((el) => ({
        Contribuyente: el.razonsocial,
        Rif: el.rif,
        'Fecha Asig. Nro Control': el.fecha,
        'Nro Control Inicial': el.inicial,
        'Nro Control Final': el.termina,
        Cantidad: el.cantidad,
        'Nro Factura Venta': el.soportefactura
      }))
      const currentMonth = getNameCurrentMonth()
      const data = XLSX.utils.json_to_sheet(content)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, data, 'data')
      XLSX.writeFile(wb, `providencia-${currentMonth}.xlsx`)
    },
    exportPDF () {
      // console.log(this.lotes)
      const currentMonth = getNameCurrentMonth()
      const content = this.lotes.map((el) => ({
        Contribuyente: el.razonsocial,
        Rif: el.rif,
        'Fecha Asig. Nro Control': el.fecha,
        'Nro Control Inicial': el.inicial,
        'Nro Control Final': el.termina,
        Cantidad: el.cantidad,
        'Nro Factura Venta': el.soportefactura
      }))

      const content2 = this.lotes.map((el) => [el.razonsocial, el.rif, el.fecha, el.inicial, el.termina, el.utilizado, el.soportefactura])

      const headers = Object.keys(content[0])
      const marginTop = {
        title: 40,
        table: 50
      }
      const marginLeft = {
        title: 60,
        table: 60
      } // eslint-disable-next-line new-cap
      const pdfCreator = new jsPDF('l', 'pt')
      pdfCreator.text('Smart Reporte Providencia 0032', marginLeft.title, marginTop.title)
      autoTable(pdfCreator, {
        margin: { top: 60 },
        theme: 'grid',
        head: [headers],
        body: content2
      })
      pdfCreator.save(`smart-providencia-0032-${currentMonth}.pdf`)
    }
  }
}
</script>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  height: 580px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #dfedf3

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
