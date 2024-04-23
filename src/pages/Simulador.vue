<template>
  <div class="my-font my-fondo q-pa-md">
    <div class="row">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Crear documento</span>
    </div>
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
        <q-select
          dense
          class="col"
          filled
          options-dense
          v-model="modeltipo"
          :options="optionstipo"
          option-label="name"
          option-value="cod"
          @update:model-value="changeTipo()"
          label="Seleccione Tipo Documento"
          style="margin: 20px;" />
    </div>
    <div class="row">
      <q-card class="col q-pa-md" style="min-width: 350px">
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
            class="col-4 q-pa-md"
            dense
            v-model="rif"
            label="RIF"
            autofocus
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="numerointerno"
            label="Número interno"
            autofocus
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="relacionado"
            label="Factura relacionada"
            autofocus
          />
          <q-select
            dense
            class="col-2 q-pa-md"
            options-dense
            v-model="modelcedula"
            :options="optionscedula"
            option-label="name"
            option-value="cod"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="cedula"
            label="Cédula"
            autofocus
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="nombre"
            label="Nombre"
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="direccion"
            label="Dirección"
            autofocus
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="telefono"
            label="Teléfono"
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="email"
            label="Email"
          />
          <q-input
            class="col-6 q-pa-md"
            dense
            v-model="sucursal"
            label="Sucursal"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="tasag"
            label="Tasa IVA"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="baseg"
            label="Imponible IVA"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="impuestog"
            label="Impuesto IVA"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="tasar"
            label="Tasa Reducido"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="baser"
            label="Imponible Reducido"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="impuestor"
            label="Impuesto Reducido"
          />
          <!-- <q-input
            class="col-4 q-pa-md"
            dense
            v-model="tasaa"
            label="Tasa A"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="basea"
            label="Base A"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="impuestoa"
            label="Impuesto A"
          /> -->
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="tasaigtf"
            label="Tasa IGTF"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="baseigtf"
            label="Imponible IGTF"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="impuestoigtf"
            label="Impuesto IGTF"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="exento"
            label="Exento"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="subtotal"
            label="Sub total"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="total"
            label="Total"
          />
          <q-input
            class="col-4 q-pa-md"
            dense
            v-model="tasacambio"
            label="Tasa cambio"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="secondary" label="Generar" @click="selectCrear"/>
        </q-card-actions>
      </q-card>
      <q-card class="col q-pa-md">

        <q-card-section>
          <div class="q-pa-md" v-if="modeltipo.cod === '1'">
            <div class="q-gutter-sm">
              <q-radio v-model="sendlote" val="1" label="1" />
              <q-radio v-model="sendlote" val="10" label="10" />
              <q-radio v-model="sendlote" val="100" label="100" />
              <q-radio v-model="sendlote" val="200" label="200" />
            </div>
          </div>
          <div class="q-pa-md">
            <div class="q-gutter-sm">
              <q-radio v-model="sendmail" val="0" label="Sin enviar correo" />
              <q-radio v-model="sendmail" val="1" label="Enviar correo" />
            </div>
          </div>
          <div class="q-pa-md">
            <div class="q-gutter-sm">
              <q-radio v-model="shape" val="sincuerpo" label="Sin cuerpo" />
              <q-radio v-model="shape" val="concuerpo" label="Con cuerpo" />
            </div>
          </div>
          <div v-if="shape === 'concuerpo'" style="font-size: 12px;">
            <div class="row">
              <span class="col-2" style="margin-right: 5px;" >Código</span>
              <span class="col-3" >Descripción</span>
              <span class="col-1" >Precio</span>
              <span class="col-1" >Cant.</span>
              <span class="col-1" >Dcto.</span>
              <span class="col-1" >Tasa</span>
              <span class="col-1" >Exento</span>
              <span class="col-1" >Monto</span>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="cod1" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="9309"/>
              <input id="des1" class="col-4" style="width: 24%; margin-right: 5px;font-size: 11px;" value="Producto de prueba 1"/>
              <input id="pre1" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="3119.80"/>
              <input id="can1" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="2"/>
              <input id="desc1" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="tas1" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="exe1" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="true"/>
              <input id="mon1" class="col-1" style="width: 8%;font-size: 8px;" value="6239.6"/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="com1" class="col-10" style="font-size: 11px;" value=""/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="cod2" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="9309"/>
              <input id="des2" class="col-4" style="width: 24%; margin-right: 5px;font-size: 11px;" value="Producto de prueba 2"/>
              <input id="pre2" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="410.50"/>
              <input id="can2" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="1"/>
              <input id="desc2" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="tas2" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="exe2" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="true"/>
              <input id="mon2" class="col-1" style="width: 8%;font-size: 8px;" value="410.50"/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="com2" class="col-10" style="font-size: 11px;" value="Comentario Producto de prueba 2"/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="cod3" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="9309"/>
              <input id="des3" class="col-4" style="width: 24%; margin-right: 5px;font-size: 11px;" value="Producto de prueba 3"/>
              <input id="pre3" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="164.20"/>
              <input id="can3" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="2"/>
              <input id="desc3" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="tas3" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="16"/>
              <input id="exe3" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="false"/>
              <input id="mon3" class="col-1" style="width: 8%;font-size: 8px;" value="328.40"/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="com3" class="col-10" style="font-size: 11px;" value="Comentario Producto de prueba 3"/>
            </div>
            <div class="row" style="margin-bottom: 5px;margin-top: 20px;">
              <input id="observacion" class="col-10" style="font-size: 11px;" value="Observación de prueba"/>
            </div>
            <!--<div class="row" style="margin-bottom: 5px;">
              <input id="cod2" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="000002"/>
              <input id="des2" class="col-4" style="width: 24%; margin-right: 5px;font-size: 11px;" value="CAJA PROTECTORA METALICA P/BIOFACE XXX"/>
              <input id="pre2" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="273.02"/>
              <input id="can2" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="4"/>
              <input id="desc2" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="100"/>
              <input id="tas2" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="16"/>
              <input id="exe2" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="false"/>
              <input id="mon2" class="col-1" style="width: 8%;font-size: 8px;" value="992.08"/>
            </div>  -->
            <!-- <div class="row" style="margin-bottom: 5px;">
              <input id="cod2" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="000002"/>
              <input id="des2" class="col-3" style="width: 24%; margin-right: 5px;font-size: 11px;" value="Producto 2"/>
              <input id="pre2" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="300.00"/>
              <input id="can2" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="3"/>
              <input id="desc2" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="tas2" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="16"/>
              <input id="imp2" class="col-1" style="width: 7%; margin-right: 4px;font-size: 8px;" value="144.00"/>
              <input id="exe2" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="false"/>
              <input id="mon2" class="col-1" style="width: 8%;font-size: 8px;" value="1044.00"/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="cod3" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="000003"/>
              <input id="des3" class="col-3" style="width: 24%; margin-right: 5px;font-size: 11px;" value="Producto 3"/>
              <input id="pre3" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="300.00"/>
              <input id="can3" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="3"/>
              <input id="desc3" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="tas3" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="16"/>
              <input id="imp3" class="col-1" style="width: 7%; margin-right: 4px;font-size: 8px;" value="144.00"/>
              <input id="exe3" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="false"/>
              <input id="mon3" class="col-1" style="width: 8%;font-size: 8px;" value="1044.00"/>
            </div>
            <div class="row" style="margin-bottom: 5px;">
              <input id="cod4" class="col-2" style="width: 16%; margin-right: 5px;font-size: 11px;" value="000004"/>
              <input id="des4" class="col-3" style="width: 24%; margin-right: 5px;font-size: 11px;" value="Producto 4"/>
              <input id="pre4" class="col-1" style="width: 8%; margin-right: 4px;font-size: 8px;" value="300.00"/>
              <input id="can4" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="3"/>
              <input id="desc4" class="col-1" style="width: 8%; margin-right: 5px;font-size: 8px;" value="0"/>
              <input id="tas4" class="col-1" style="width: 7%; margin-right: 5px;font-size: 8px;" value="16"/>
              <input id="imp4" class="col-1" style="width: 7%; margin-right: 4px;font-size: 8px;" value="144.00"/>
              <input id="exe4" class="col-1" style="width: 8%; margin-right: 4px;font-size: 11px;" value="false"/>
              <input id="mon4" class="col-1" style="width: 8%;font-size: 8px;" value="1044.00"/>
            </div>-->
          </div>
          <div style="font-size: 12px;">
            Formas de pago
          </div>
          <div style="font-size: 12px;">
            <div class="row" style="margin-bottom: 5px;">
              <input id="forma1" class="col-6" style="margin-right: 5px;font-size: 11px;" value="Tranferencia"/>
              <input id="valor1" class="col-5" style="margin-right: 5px;font-size: 11px;" value="2926.04"/>
            </div>
          </div>
          <div style="font-size: 12px;">
            <div class="row" style="margin-bottom: 5px;">
              <input id="forma2" class="col-6" style="margin-right: 5px;font-size: 11px;" value="Efectivo"/>
              <input id="valor2" class="col-5" style="margin-right: 5px;font-size: 11px;" value="4105.00"/>
           </div>
          </div>
        </q-card-section>
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

const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  setup () {
    return {
      shape: ref('sincuerpo'),
      shapepago: ref('conforma'),
      sendmail: ref('0'),
      sendlote: ref('1'),
      statusProcess: ref(true),
      resultProcess: ref(''),
      messageProcess: ref(''),
      fechaProcess: ref(''),
      tokenservicios: ref(''),
      rif: ref(''),
      numerointerno: ref(''),
      relacionado: ref(''),
      cedula: ref('11222333'),
      direccion: ref('Cumana Estado Sucre, Venezuela'),
      email: ref('belizarioja@gmail.com'),
      sucursal: ref('cum00123'),
      telefono: ref('+5804125558877'),
      subtotal: ref(6978.50),
      nombre: ref('Jesus Ramos'),
      total: ref(7034.73),
      exento: ref(6650.10),
      tasag: ref(16),
      baseg: ref(328.40),
      impuestog: ref(52.54),
      tasar: ref(0),
      baser: ref(0),
      impuestor: ref(0),
      tasaa: ref(0),
      basea: ref(0),
      impuestoa: ref(0),
      tasaigtf: ref(3),
      baseigtf: ref(123.15),
      impuestoigtf: ref(3.69),
      tasacambio: ref(0),
      loading: ref(false),
      dateInicioPrueba: ref(''),
      dateFinPrueba: ref(''),
      modelcedula: ref('CI')
    }
  },
  data () {
    return {
      modeltipo: [],
      co_rol: sessionStorage.getItem('co_rol'),
      optionstipo: [],
      optionscedula: [],
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
      // console.log(this.modelsede)
      console.log(this.modelsede.cod)
      console.log(this.modelsede.validarinterno)
      this.rif = this.modelsede.rif
      this.tokenservicios = this.modelsede.tokenservicios
      if (this.modelsede.validarinterno === '0') {
        this.numerointerno = ''
      }
      // this.listarfacturas()
    },
    obtenerNumeroInterno () {
      const headersjwt = {
        headers: {
          Authorization: 'Bearer ' + this.tokenservicios
        }
      }
      const body = {
        rif: this.rif,
        idtipodocumento: Number(this.modeltipo.cod)
      }
      axios.post(ENDPOINT_PATH_V2 + 'facturacion/numerointerno', body, headersjwt).then(async response => {
        console.log(response.data.data)
        if (response.status === 200) {
          this.numerointerno = response.data.data.numerointerno
        }
      })
    },
    changeTipo () {
      console.log(this.modeltipo.cod)
      console.log(this.modelsede.validarinterno)
      if (this.modelsede.validarinterno === '0') {
        this.numerointerno = ''
      } else {
        this.obtenerNumeroInterno()
      }
    },
    generateRandomString () {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result1 = ''
      const charactersLength = characters.length
      for (let i = 0; i < 9; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      return result1
    },
    selectCrear () {
      // console.log(this.sendlote, this.modeltipo.cod)
      if (this.sendlote === '1' && this.modeltipo.cod === '1') {
        this.crear()
      } else {
        // console.log(this.sendlote)
        this.crearLote(this.sendlote)
      }
    },
    async crearLote (lote) {
      if (!this.modelsede.cod) {
        Notify.create('Debe seleccionar Servicio Masivo ')
        return
      }
      if (!this.modeltipo.cod) {
        Notify.create('Debe seleccionar tipo de Documento ')
        return
      }
      if (Number(this.modeltipo.cod) !== 2 && Number(this.modeltipo.cod) !== 3) {
        this.relacionado = undefined
      }
      this.dateInicioPrueba = moment().format('YYYY-MM-DD HH:mm:ss')
      for (let i = 1; i <= lote; i++) {
        this.statusProcess = false
        this.resultProcess = ''
        this.messageProcess = ''
        this.fechaProcess = ''
        const trackingid = this.generateRandomString()
        const headersjwt = {
          headers: {
            Authorization: 'Bearer ' + this.tokenservicios
          }
        }
        const cuerpofactura = []
        const formasdepago = []
        if (this.shape === 'concuerpo') {
          for (let j = 1; j <= 3; ++j) {
            const cod = document.getElementById('cod' + j).value
            const des = document.getElementById('des' + j).value
            const pre = document.getElementById('pre' + j).value
            const can = document.getElementById('can' + j).value
            const tas = document.getElementById('tas' + j).value
            const desc = document.getElementById('desc' + j).value
            const exe = document.getElementById('exe' + j).value
            const mon = document.getElementById('mon' + j).value
            const com = document.getElementById('com' + j).value
            // console.log(cod)
            const obj = {
              codigo: cod,
              descripcion: des,
              comentario: com,
              precio: Number(pre), // base
              cantidad: Number(can),
              tasa: Number(tas),
              descuento: Number(desc),
              exento: exe, // true o false
              monto: Number(mon)
            }
            cuerpofactura.push(obj)
          }
        }
        if (this.shapepago === 'conforma') {
          for (let j = 1; j <= 2; ++j) {
            const forma = document.getElementById('forma' + j).value
            const valor = document.getElementById('valor' + j).value
            const obj2 = {
              forma: forma,
              valor: Number(valor)
            }
            formasdepago.push(obj2)
          }
        }
        const obs = document.getElementById('observacion').value
        console.log('obs')
        console.log(obs)
        const body = {
          rif: this.rif,
          trackingid: trackingid,
          nombrecliente: this.nombre,
          rifcedulacliente: this.cedula,
          direccioncliente: this.direccion,
          telefonocliente: this.telefono,
          emailcliente: this.email,
          sucursal: this.sucursal,
          numerointerno: this.numerointerno,
          relacionado: this.relacionado,
          idtipodocumento: Number(this.modeltipo.cod),
          subtotal: Number(this.subtotal),
          exento: Number(this.exento),
          tasag: Number(this.tasag),
          baseg: Number(this.baseg),
          impuestog: Number(this.impuestog),
          tasar: Number(this.tasar),
          baser: Number(this.baser),
          impuestor: Number(this.impuestor),
          tasaigtf: Number(this.tasaigtf),
          baseigtf: Number(this.baseigtf),
          impuestoigtf: Number(this.impuestoigtf),
          total: Number(this.total),
          tasacambio: this.tasacambio > 0 ? Number(this.tasacambio) : undefined,
          idtipocedulacliente: Number(this.modelcedula.cod) || 1,
          sendmail: (cuerpofactura.length > 0 && this.sendmail === '1') ? 1 : 0,
          cuerpofactura: cuerpofactura,
          formasdepago: formasdepago,
          observacion: obs.length > 0 ? obs : undefined
        }
        console.log(this.numerointerno)
        const numeronext = Number(this.numerointerno) + 1
        this.numerointerno = numeronext.toString().padStart(8, '0')
        await axios.post(ENDPOINT_PATH_V2 + 'facturacion', body, headersjwt).then(async response => {
          // console.log(response.data)
          if (response.status === 200) {
            this.statusProcess = response.data.success
            this.resultProcess = 'Transmisión EXITOSA!'
            this.messageProcess = response.data.data.numerodocumento
            this.fechaProcess = response.data.data.fecha + ' ' + response.data.data.hora
            // console.log(response.status)
            // this.limpiar()
            // this.obtenerNumeroInterno()
          }
          if (response.status === 202) {
            this.statusProcess = response.data.success
            this.resultProcess = 'Transmisión FALLIDA!'
            this.messageProcess = response.data.error.message
            this.fechaProcess = ''
            // console.log(response.status)
          }
        })
        // }
      }

      this.dateFinPrueba = moment().format('YYYY-MM-DD HH:mm:ss')
    },
    crear () {
      if (!this.modelsede.cod) {
        Notify.create('Debe seleccionar Servicio Masivo ')
        return
      }
      if (!this.modeltipo.cod) {
        Notify.create('Debe seleccionar tipo de Documento ')
        return
      }
      if (Number(this.modeltipo.cod) !== 2 && Number(this.modeltipo.cod) !== 3) {
        this.relacionado = undefined
      }
      this.dateInicioPrueba = moment().format('YYYY-MM-DD HH:mm:ss')
      for (let i = 1; i <= 1; i++) {
        // for (const j in this.optionssede) {
        // const sede = this.optionssede[j]
        // this.rif = sede.rif
        // this.tokenservicios = sede.tokenservicios
        this.statusProcess = false
        this.resultProcess = ''
        this.messageProcess = ''
        this.fechaProcess = ''
        const trackingid = this.generateRandomString()
        const headersjwt = {
          headers: {
            Authorization: 'Bearer ' + this.tokenservicios
          }
        }
        const cuerpofactura = []
        const formasdepago = []
        if (this.shape === 'concuerpo') {
          for (let j = 1; j <= 3; ++j) {
            const cod = document.getElementById('cod' + j).value
            const des = document.getElementById('des' + j).value
            const pre = document.getElementById('pre' + j).value
            const can = document.getElementById('can' + j).value
            const tas = document.getElementById('tas' + j).value
            const desc = document.getElementById('desc' + j).value
            const exe = document.getElementById('exe' + j).value
            const mon = document.getElementById('mon' + j).value
            const com = document.getElementById('com' + j).value
            console.log(cod)
            const obj = {
              codigo: cod,
              descripcion: des,
              comentario: com,
              precio: Number(pre), // base
              cantidad: Number(can),
              tasa: Number(tas),
              descuento: Number(desc),
              exento: exe, // true o false
              monto: Number(mon)
            }
            cuerpofactura.push(obj)
          }
        }
        if (this.shapepago === 'conforma') {
          for (let j = 1; j <= 2; ++j) {
            const forma = document.getElementById('forma' + j).value
            const valor = document.getElementById('valor' + j).value
            const obj2 = {
              forma: forma,
              valor: Number(valor)
            }
            formasdepago.push(obj2)
          }
        }
        console.log('this.tasacambio')
        console.log(this.tasacambio)
        const obs = document.getElementById('observacion').value
        console.log('obs')
        console.log(obs)
        const body = {
          rif: this.rif,
          trackingid: trackingid,
          nombrecliente: this.nombre,
          rifcedulacliente: this.cedula,
          direccioncliente: this.direccion,
          telefonocliente: this.telefono,
          emailcliente: this.email,
          sucursal: this.sucursal,
          numerointerno: this.numerointerno,
          relacionado: this.relacionado,
          idtipodocumento: Number(this.modeltipo.cod),
          subtotal: Number(this.subtotal),
          exento: Number(this.exento),
          tasag: Number(this.tasag),
          baseg: Number(this.baseg),
          impuestog: Number(this.impuestog),
          tasar: Number(this.tasar),
          baser: Number(this.baser),
          impuestor: Number(this.impuestor),
          tasaigtf: Number(this.tasaigtf),
          baseigtf: Number(this.baseigtf),
          impuestoigtf: Number(this.impuestoigtf),
          total: Number(this.total),
          tasacambio: this.tasacambio > 0 ? Number(this.tasacambio) : undefined,
          idtipocedulacliente: Number(this.modelcedula.cod) || 1,
          sendmail: (cuerpofactura.length > 0 && this.sendmail === '1') ? 1 : 0,
          cuerpofactura: cuerpofactura,
          formasdepago: formasdepago,
          observacion: obs.length > 0 ? obs : undefined
        }
        // console.log(body)
        axios.post(ENDPOINT_PATH_V2 + 'facturacion', body, headersjwt).then(async response => {
          // console.log(response.data)
          if (response.status === 200) {
            this.statusProcess = response.data.success
            this.resultProcess = 'Transmisión EXITOSA!'
            this.messageProcess = response.data.data.numerodocumento
            this.fechaProcess = response.data.data.fecha + ' ' + response.data.data.hora
            // console.log(response.status)
            // this.limpiar()
            this.obtenerNumeroInterno()
          }
          if (response.status === 202) {
            this.statusProcess = response.data.success
            this.resultProcess = 'Transmisión FALLIDA!'
            this.messageProcess = response.data.error.message
            this.fechaProcess = ''
            // console.log(response.status)
          }
        })
        // }
      }

      this.dateFinPrueba = moment().format('YYYY-MM-DD HH:mm:ss')
    },
    limpiar () {
      this.cedula = ''
      this.subtotal = 0
      this.nombre = ''
      this.total = 0
      this.exento = 0
      this.tasag = 0
      this.baseg = 0
      this.impuestog = 0
      this.tasar = 0
      this.baser = 0
      this.impuestor = 0
      this.tasaa = 0
      this.basea = 0
      this.impuestoa = 0
      this.tasaigtf = 0
      this.baseigtf = 0
      this.impuestoigtf = 0
      // this.modelsede = []
      // this.modeltipo = []
    },
    listartipos () {
      axios.get(ENDPOINT_PATH_V2 + 'tipodocumento').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionstipo = []
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
    listartiposcedulas () {
      axios.get(ENDPOINT_PATH_V2 + 'tipodocumento/tipocedula').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.optionscedula = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.name = datos[i].abrev
          this.optionscedula.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Tipos de identificación ' + error)
      })
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
          obj.validarinterno = datos[i].validarinterno
          this.optionssede.push(obj)
        }
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    }
  },
  mounted () {
    if (this.co_rol !== '1') {
      this.$router.push('/erroracceso')
    }
    this.listarsedes()
    this.listartipos()
    this.listartiposcedulas()
    // this.listarsedes()
  }

}
</script>
