<template>
  <q-page class="q-pa-sm">
    <q-card class="bg-transparent no-shadow no-border" style="margin-top: 10px; width: auto">
      <q-card-section class="q-pa-none">
        <div class="row">
          <div class="col-md-3 col-sm-12 col-xs-12">
            <span style="margin: 20px; font-size: 20px; font-weight: bolder">Indicadores Principales</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <q-select v-if="co_rol === '1' || co_rol === '2'" label="Buscar por Nombre o RIF del Emisor"
              :disable="disabledSede" dense filled v-model="modelsede" use-input hide-selected fill-input clearable
              options-dense option-label="namerif" option-value="cod" input-debounce="0" :options="optionssede"
              @update:model-value="changeSede()" @input:="changeSede()" @filter="searchEmisor" style="padding: 5px" />
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <q-select v-if="(co_rol === '1' || co_rol === '2' || co_rol === '4') &&
              !co_sede_seleted
              " label="Buscar Código de Operación" dense filled v-model="modelcodes" use-input hide-selected fill-input
              clearable options-dense option-label="namecode" option-value="cod" input-debounce="0"
              :options="optionscodes" @update:model-value="changeCodes()" @input:="changeCodes()" @filter="searchCodes"
              style="padding: 5px" />
          </div>
          <!-- <q-input
            dense
            filled
            label="Desde"
            v-model="dateFrom"
            class="col-2"
            mask="date"
            style="padding: 5px;"
            :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateFrom">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input> -->
          <q-select dense class="col-md-3 col-sm-3 col-xs-6" filled options-dense v-model="modelfechas"
            :options="optionsfechas" option-label="name" option-value="cod" label="Seleccione fecha" style="padding: 5px"
            @update:model-value="changeFechas()" />
          <q-select dense class="col-md-3 col-sm-3 col-xs-6" filled options-dense v-model="modeltipo"
            :options="optionstipo" option-label="name" option-value="cod" label="Tipo documento" style="padding: 5px"
            @update:model-value="changeTipo()" />
        </div>
      </q-card-section>
    </q-card>
    <card-social v-bind:idserviciohijo="idserviciosmasivo" v-bind:dateFrom="dateFrom" v-bind:dateTo="dateTo"
      v-bind:idtipodochijo="idtipodocumento" v-bind:tipodochijo="tipodocumento"
      v-bind:idcodecomercialhijo="idcodigocomercial" />
    <q-card class="bg-transparent no-shadow no-border" style="width: auto">
      <q-card-section class="row">
        <div :class="co_rol === '1' ? 'col-md-8 col-sm-7 col-xs-12' : 'col-12'">
          <line-chart />
        </div>
        <div v-if="co_rol === '1'" class="col-md-4 col-sm-5 col-xs-12">
          <q-card class="bg-transparent no-shadow no-border" style="width: auto; margin-left: 8px">
            <q-card-section class="q-pa-none">
              <table-top :changesede="changeSedeChild" v-bind:idserviciohijo="idserviciosmasivo"
                v-bind:dateFrom="dateFrom" v-bind:dateTo="dateTo" v-bind:idtipodochijo="idtipodocumento"
                v-bind:idcodecomercialhijo="idcodigocomercial" />
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="bg-transparent no-shadow no-border" style="width: auto">
      <q-card-section class="row">
        <table-register v-bind:idserviciohijo="idserviciosmasivo" v-bind:serviciohijo="serviciosmasivo"
          v-bind:dateFrom="dateFrom" v-bind:dateTo="dateTo" v-bind:idtipodochijo="idtipodocumento"
          v-bind:tipodochijo="tipodocumento" v-bind:idcodecomercialhijo="idcodigocomercial" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent, ref } from 'vue'
import LineChart from '../../components/charts/LineChart.ts'

import { Notify } from 'quasar'
import axios from 'axios'

import moment from 'moment'
const config = require('../../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default defineComponent({
  name: 'Dashboard',
  components: {
    CardSocial: defineAsyncComponent(() =>
      import('components/cards/CardSocial')
    ),
    TableTop: defineAsyncComponent(() => import('components/tables/TableTop')),
    TableRegister: defineAsyncComponent(() =>
      import('components/tables/TableRegister')
    ),
    LineChart
  },
  setup () {
    return {
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
      optionsfechas: ref([
        { cod: 1, name: 'Hoy' },
        { cod: 4, name: 'Ayer' },
        { cod: 2, name: 'En 1 semana' },
        { cod: 3, name: 'En 1 mes' }
      ]),
      co_rol: sessionStorage.getItem('co_rol'),
      co_sede: sessionStorage.getItem('co_sede'),
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted')
    }
  },
  methods: {
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
          this.optionssede = this.emisores.filter(
            (v) => v.namerif.toLowerCase().indexOf(needle) > -1
          )
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
          this.optionscodes = this.codes.filter(
            (v) => v.namecode.toLowerCase().indexOf(needle) > -1
          )
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
      // console.log(this.modelcodes?.cod)
      this.idcodigocomercial = this.modelcodes?.cod
      this.codigocomercial = this.modelcodes?.namecode
      // console.log(this.idcodigocomercial)
      // console.log(this.codigocomercial)
      // this.listarfacturas()
    },
    getCodes () {
      axios
        .get(ENDPOINT_PATH_V2 + 'sede/codes')
        .then(async (response) => {
          const datos = response.data.data
          this.optionscodes = []
          for (const i in datos) {
            const obj = {}
            obj.cod = datos[i].id
            obj.namecode =
              datos[i].codigocomercial + '-' + datos[i].descripcion
            this.optionscodes.push(obj)
          }
          this.codes = this.optionscodes
          // console.log(this.optionscodes)
        })
        .catch((error) => {
          Notify.create('Problemas al listar Codigos comerciales ' + error)
        })
    },
    listartipos () {
      axios
        .get(ENDPOINT_PATH_V2 + 'tipodocumento')
        .then(async (response) => {
          // console.log(response.data)
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
        })
        .catch((error) => {
          Notify.create('Problemas al listar Tipos de documentos ' + error)
        })
    },
    listarsedes () {
      axios
        .get(ENDPOINT_PATH_V2 + 'sede')
        .then(async (response) => {
          // console.log(response.data)
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
        })
        .catch((error) => {
          Notify.create('Problemas al listar Sedes ' + error)
        })
    }
  },
  mounted () {
    this.listartipos()
    this.listarsedes()
    this.getCodes()
    this.idserviciosmasivo = this.co_rol === '3' ? this.co_sede : undefined

    // console.log('Mounted')
    // console.log(this.tx_sede_seleted)
    // console.log(this.co_sede_seleted)
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
