<template>
  <div class="my-font q-pa-md">
    <div class="row">
        <q-select
          dense
          class="col"
          filled
          options-dense
          v-model="modelsede"
          :options="optionssede"
          option-label="name"
          option-value="cod"
          @update:model-value="changeSede()"
          label="Seleccione Cliente"
          style="margin: 20px;" />
    </div>
    <div class="row">
      <q-card class="col q-pa-md" style="min-width: 350px">
        <q-card-section class="row">
          <div class="text-h6">Asignar Cantidad de Correlativos</div>
        </q-card-section>

        <q-card-section class="row q-pt-none">
          <q-input
            class="col-12 q-pa-md"
            dense
            type="textarea"
            v-model="tokenservicios"
            label="Token"
            autofocus
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="rif"
            label="RIF"
            autofocus
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="factura"
            label="Factura asignación"
            autofocus
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="usuario"
            label="Usuario"
            autofocus
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="clave"
            label="Clave"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="cantidad"
            label="Cantidad"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="primary" label="Aceptar" @click="crear"/>
        </q-card-actions>
      </q-card>
      <q-card class="col q-pa-md">
        <q-card-section>
          <div class="text-h6 ">Resultado</div>
        </q-card-section>
        <q-card-section>
          <span :class="statusProcess ? 'text-positive' : 'text-negative'">{{dateInicioPrueba}}</span>
        </q-card-section>
        <q-card-section>
          <span :class="statusProcess ? 'text-positive' : 'text-negative'">{{resultProcess}}</span>
        </q-card-section>
        <q-card-section>
          <span :class="statusProcess ? 'text-positive' : 'text-negative'">{{messageProcess}}</span>
        </q-card-section>
        <q-card-section>
          <span :class="statusProcess ? 'text-positive' : 'text-negative'">{{fechaProcess}}</span>
        </q-card-section>
        <q-card-section>
          <span :class="statusProcess ? 'text-positive' : 'text-negative'">{{dateFinPrueba}}</span>
        </q-card-section>
      </q-card>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Notify } from 'quasar'
import axios from 'axios'
import moment from 'moment'
import md5 from 'md5'

const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  setup () {
    return {
      statusProcess: ref(true),
      resultProcess: ref(''),
      messageProcess: ref(''),
      fechaProcess: ref(''),
      tokenservicios: ref(''),
      rif: ref(''),
      factura: ref(''),
      usuario: ref(''),
      clave: ref(''),
      cantidad: ref(0),
      loading: ref(false),
      dateInicioPrueba: ref(''),
      dateFinPrueba: ref('')
    }
  },
  data () {
    return {
      modelsede: [],
      optionssede: [],
      pagination: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
      }
    }
  },
  methods: {
    changeSede () {
      console.log(this.modelsede.cod)
      this.rif = this.modelsede.rif
      this.tokenservicios = this.modelsede.tokenservicios
      // this.listarfacturas()
    },
    crear () {
      if (!this.modelsede.cod) {
        Notify.create('Debe seleccionar Cliente Emisor ')
        return
      }
      if (!this.factura) {
        Notify.create('Debe agregar soporte de factura')
        return
      }
      this.dateInicioPrueba = moment().format('YYYY-MM-DD HH:mm:ss')
      for (let i = 1; i <= 1; i++) {
        this.statusProcess = false
        this.resultProcess = ''
        this.messageProcess = ''
        this.fechaProcess = ''
        const headersjwt = {
          headers: {
            Authorization: 'Bearer ' + this.tokenservicios
          }
        }
        const body = {
          rif: this.rif,
          usuario: this.usuario,
          clave: md5(this.clave),
          soportefactura: this.factura,
          cantidad: Number(this.cantidad)
        }
        console.log(body)
        axios.post(ENDPOINT_PATH_V2 + 'asignaciones', body, headersjwt).then(async response => {
          // console.log(response.data)
          if (response.status === 200) {
            this.statusProcess = response.data.success
            this.resultProcess = 'Transmisión EXITOSA!'
            this.messageProcess = response.data.data.message
            this.fechaProcess = ''
            // console.log(response.status)
            // this.limpiar()
          }
          if (response.status === 202) {
            this.statusProcess = response.data.success
            this.resultProcess = 'Transmisión FALLIDA!'
            this.messageProcess = response.data.error.message
            this.fechaProcess = ''
            // console.log(response.status)
          }
        })
      }

      this.dateFinPrueba = moment().format('YYYY-MM-DD HH:mm:ss')
    },
    limpiar () {
      this.usuario = ''
      this.clave = ''
      this.cantidad = 0
      // this.modelsede = []
      // this.modeltipo = []
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionssede = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].razonsocial
          obj.rif = datos[i].rif
          obj.tokenservicios = datos[i].tokenservicios
          this.optionssede.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    }
  },
  mounted () {
    this.listarsedes()
    // this.listarsedes()
  }

}
</script>
