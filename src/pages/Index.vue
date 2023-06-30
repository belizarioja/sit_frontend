<template>
  <q-page class="q-pa-sm bg-grey-3">
    <div class="row">
      <div class="col-md-3 col-sm-12 col-xs-12">
         <span style="margin: 20px;font-size: 20px;font-weight: bolder;">Dashboard</span>
       </div>
    </div>
    <div class="row">
      <q-card class="col-4" style="margin: 20px;">
        <q-card-section >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label style="color: #03df5e;font-weight: bolder;">Procesados</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{totaldoc}}</q-item-label>
                <q-icon name="trending_up" color="orange" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label style="color: #f70202;font-weight: bolder;">Anulados</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{totalanu}}</q-item-label>
                <q-icon name="trending_down" color="orange" />
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label style="color: #0263f7;font-weight: bolder;">Periodo</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Hoy</q-item-label>
                <q-item-label caption>{{dateTo}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-3" style="margin: 20px;">
        <q-card-section >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>IVA 16%</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Impuesto</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Bs. {{totalimpg}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Base</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Bs. {{totalbaseg}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-3" style="margin: 20px">
        <q-card-section >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>IGTF 3%</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Impuesto</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Bs. {{totalimpigtf}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Base</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>Bs. {{totalbaseigtf}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <div class="row">
      <q-card class="col-4" style="margin: 20px">
        <q-card-section >
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Facturas</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>{{totalfacturas}}</q-item-label>
                <q-item-label caption>Bs. {{sumafacturas}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Notas de Credito</q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-item-label caption>{{totalcreditos}}</q-item-label>
                <q-item-label caption>Bs. {{sumacreditos}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-separator spaced inset />
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Notas de Debitos</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{totaldebitos}}</q-item-label>
                <q-item-label caption>Bs. {{sumadebitos}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-7" style="margin: 20px">
        <q-card-section >
          <q-table
            title="Ultima semana"
            :rows="rowssemana"
            :columns="columnssemana"
            row-key="razonsocial"
            hide-bottom
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import BarChart from '../components/charts/BarChart.ts'

import { Notify } from 'quasar'
import axios from 'axios'

import moment from 'moment'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default defineComponent({
  name: 'Dashboard',
  components: {
  },
  setup () {
    return {
      totaldoc: ref(0),
      totalanu: ref(0),
      totalimpg: ref(0),
      totalimpr: ref(0),
      totalimpigtf: ref(0),
      totalbaseg: ref(0),
      totalbaser: ref(0),
      totalbaseigtf: ref(0),
      totalfacturas: ref(0),
      sumafacturas: ref(0),
      totalcreditos: ref(0),
      sumacreditos: ref(0),
      totaldebitos: ref(0),
      sumadebitos: ref(0),
      columnssemana: [
        {
          name: 'razonsocial',
          label: 'Cliente emisor',
          field: 'razonsocial',
          align: 'left'
        },
        { name: 'hoy', label: 'Hoy', field: 'hoy' },
        { name: 'hace1dia', label: 'Hace 1 día', field: 'hace1dia' },
        { name: 'hace2dia', label: 'Hace 2 día', field: 'hace2dia' },
        { name: 'hace3dia', label: 'Hace 3 día', field: 'hace3dia' },
        { name: 'hace4dia', label: 'Hace 4 día', field: 'hace4dia' },
        { name: 'hace5dia', label: 'Hace 5 día', field: 'hace5dia' },
        { name: 'hace6dia', label: 'Hace 6 día', field: 'hace6dia' }
      ],
      disabledSede: ref(false),
      disabledCodes: ref(false),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
      totalclientes: ref(0),
      modeltipo: ref([]),
      modelsede: ref([]),
      modelcodes: ref([]),
      modelfechas: ref('Hoy'),
      optionstipo: ref([]),
      optionssede: ref([]),
      optionscodes: ref([]),
      idtipodocumento: ref(null),
      idcodigocomercial: ref(null),
      idserviciosmasivo: ref(null),
      serviciosmasivo: ref(null),
      tipodocumento: ref('Todos'),
      codigocomercial: ref('Todos'),
      optionsfechas: ref([{ cod: 1, name: 'Hoy' }, { cod: 4, name: 'Ayer' }, { cod: 2, name: 'En 1 semana' }, { cod: 3, name: 'En 1 mes' }]),
      co_rol: sessionStorage.getItem('co_rol'),
      co_sede: sessionStorage.getItem('co_sede'),
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted')
    }
  },
  data () {
    return {
      docproc: [],
      rowssemana: []
    }
  },
  methods: {
    getDocProcesados () {
      axios.post(ENDPOINT_PATH_V2 + 'reporte/totaldocumentos').then(async response => {
        const datos = response.data.data
        this.totalfacturas = datos[0].totaldoc
        this.sumafacturas = this.completarDecimales(Number(datos[0].sumadocg) + Number(datos[0].sumadocigtf))
        this.totalcreditos = datos[1].totaldoc
        this.sumacreditos = this.completarDecimales(Number(datos[1].sumadocg) + Number(datos[1].sumadocigtf))
        this.totaldebitos = datos[2].totaldoc
        this.sumadebitos = this.completarDecimales(Number(datos[2].sumadocg) + Number(datos[2].sumadocigtf))
      }).catch(error => {
        Notify.create('Problemas al listar Documentos ' + error)
      })
    },
    getUltimaSemana () {
      axios.post(ENDPOINT_PATH_V2 + 'reporte/ultimasemana').then(async response => {
        const datos = response.data.data
        console.log(datos)
        this.rowssemana = []
        for (const i in datos) {
          const obj = {}
          obj.razonsocial = datos[i].razonsocial
          obj.hoy = datos[i].hoy
          obj.hace1dia = datos[i].hace1dia
          obj.hace2dia = datos[i].hace2dia
          obj.hace3dia = datos[i].hace3dia
          obj.hace4dia = datos[i].hace4dia
          obj.hace5dia = datos[i].hace5dia
          obj.hace6dia = datos[i].hace6dia
          this.rowssemana.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Ultima semana ' + error)
      })
    },
    totalImp () {
      const body = {
        idtipodocumento: this.idtipodochijo || undefined,
        idserviciosmasivo: this.idserviciohijo || undefined,
        idcodigocomercial: this.idcodecomercialhijo || undefined,
        desde: moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD'),
        hasta: moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      }
      axios.post(ENDPOINT_PATH_V2 + 'reporte/impprocesados', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totaldoc = datos[0].total
        this.exento = datos[0].totalexento || 0
        this.totalimpg = datos[0].totalg || 0
        this.totalimpr = datos[0].totalr || 0
        // this.totalbase = Number(this.totalimpg) + Number(this.totalimpr) + Number(this.exento)
        this.totalimpigtf = datos[0].totaligtf || 0
        this.totalimp = Number(this.totalimpg) + Number(this.totalimpr) + Number(this.totalimpigtf)
        this.totalbaseg = datos[0].totalbaseg || 0
        this.totalbaser = datos[0].totalbaser || 0
        this.totalbaseigtf = datos[0].totalbaseigtf || 0

        this.totalbaseg = this.completarDecimales(this.totalbaseg)
        this.totalbaser = this.completarDecimales(this.totalbaser)
        this.totalbaseigtf = this.completarDecimales(this.totalbaseigtf)
        this.totalimpg = this.completarDecimales(this.totalimpg)
        this.totalimpr = this.completarDecimales(this.totalimpr)
        this.totalimpigtf = this.completarDecimales(this.totalimpigtf)
        this.totalimp = this.completarDecimales(this.totalimp)
      }).catch(error => {
        Notify.create('Problemas al procesar ' + error)
      })
      axios.post(ENDPOINT_PATH_V2 + 'reporte/anulados', body).then(async response => {
        const datos = response.data.data
        // console.log(datos)
        this.totalanu = datos[0].totalanu
      }).catch(error => {
        Notify.create('Problemas al procesar  anulados' + error)
      })
    },
    completarDecimales (cadena) {
      cadena = Intl.NumberFormat('de-DE').format(cadena.toFixed(2))
      const arreglo = cadena.split(',')

      cadena = arreglo.length === 1 ? cadena + ',00' : arreglo[1].length === 1 ? cadena + '0' : cadena
      return cadena
    },
    searchEmisor (val, update, abort) {
      if (val.length < 3) {
        abort()
        return
      }
      update(() => {
        if (val === '') {
          this.optionssede = this.emisores
        } else {
          const needle = val.toLowerCase()
          this.optionssede = this.emisores.filter(v => v.namerif.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    searchCodes (val, update, abort) {
      if (val.length < 3) {
        abort()
        return
      }
      update(() => {
        if (val === '') {
          this.optionscodes = this.codes
        } else {
          const needle = val.toLowerCase()
          this.optionscodes = this.codes.filter(v => v.namecode.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    changeFechas () {
      console.log(this.modelfechas?.cod)
      this.dateTo = moment().format('YYYY/MM/DD')
      switch (this.modelfechas.cod) {
        case 1:
          this.dateFrom = moment().format('YYYY/MM/DD')
          break
        case 2:
          this.dateFrom = moment().subtract(1, 'w').format('YYYY/MM/DD')
          break
        case 3:
          this.dateFrom = moment().subtract(1, 'M').format('YYYY/MM/DD')
          break
        case 4:
          this.dateFrom = moment().subtract(1, 'd').format('YYYY/MM/DD')
          this.dateTo = moment().subtract(1, 'd').format('YYYY/MM/DD')
          break
        default:
          console.log('Sorry, we are out of.')
      }
      // this.listarfacturas()
    },
    changeSedeChild (reg) {
      console.log('changeSedeChild')
      this.idserviciosmasivo = reg.cod
      reg.namerif = reg.razonsocial + ' ' + reg.rif
      this.serviciosmasivo = reg.namerif
      this.modelsede = reg
    },
    changeSede () {
      this.idserviciosmasivo = this.modelsede?.cod
      this.serviciosmasivo = this.modelsede?.namerif
      // this.listarfacturas()
    },
    changeTipo () {
      this.idtipodocumento = this.modeltipo.cod
      this.tipodocumento = this.modeltipo.name
    },
    changeCodes () {
      console.log(this.modelcodes?.cod)
      this.idcodigocomercial = this.modelcodes?.cod
      this.codigocomercial = this.modelcodes?.namecode
      console.log(this.idcodigocomercial)
      console.log(this.codigocomercial)
      // this.listarfacturas()
    },
    getCodes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede/codes').then(async response => {
        const datos = response.data.data
        this.optionscodes = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.namecode = datos[i].codigocomercial + '-' + datos[i].descripcion
          this.optionscodes.push(obj)
        }
        this.codes = this.optionscodes
        console.log(this.optionscodes)
      }).catch(error => {
        Notify.create('Problemas al listar Codigos comerciales ' + error)
      })
    },
    listartipos () {
      axios.get(ENDPOINT_PATH_V2 + 'tipodocumento').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionstipo = []
        const obj = {}
        obj.cod = null
        obj.name = 'Todos'
        this.optionstipo.push(obj)
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].tipodocumento
          this.optionstipo.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Tipos de documentos ' + error)
      })
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionssede = []
        const obj = {}
        obj.cod = null
        obj.name = 'Todos'
        obj.rif = null
        obj.namerif = ''
        this.optionssede.push(obj)
        for (const i in datos) {
          if (datos[i].razonsocial.length > 0) {
            const obj = {}
            obj.cod = datos[i].id
            obj.name = datos[i].razonsocial
            obj.rif = datos[i].rif
            obj.namerif = datos[i].razonsocial + ' ' + datos[i].rif
            obj.tokenservicios = datos[i].tokenservicios
            this.optionssede.push(obj)
          }
        }
        this.emisores = this.optionssede
        this.rifs = this.optionssede
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    }
  },
  mounted () {
    // this.listartipos()
    // this.listarsedes()
    // this.getCodes()
    this.totalImp()
    this.getDocProcesados()
    this.getUltimaSemana()
    this.idserviciosmasivo = this.co_rol === '3' ? this.co_sede : undefined

    console.log('Mounted')
    console.log(this.tx_sede_seleted)
    console.log(this.co_sede_seleted)
    if (this.co_sede_seleted) {
      const obj = {}
      obj.cod = this.co_sede_seleted
      obj.rif = this.rif_sede_seleted
      obj.razonsocial = this.tx_sede_seleted
      this.idserviciosmasivo = this.co_sede_seleted
      obj.namerif = obj.razonsocial + ' ' + obj.rif
      this.serviciosmasivo = obj.namerif
      this.modelsede = obj
      this.disabledSede = true
    }
  }
})
</script>
