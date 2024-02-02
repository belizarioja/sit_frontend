<template>
 <div class="my-font my-fondo" style="display: flex; justify-content: center;">
    <q-card style="width: 650px;">
      <div v-if="haydata" id="detailid">
        <q-item>
          <q-item-section style="flex: auto">
            <img width="100" :src="registro.logo" onerror="this.src='logo_nophoto.png'" />
          </q-item-section>

          <q-item-section>
            <table>
              <tr>
                <td style="width: 250px">
                  <span>{{ registro.razonsocialdetail }}</span>
                  <br /><span style="font-size: 10px">
                    {{ registro.direcciondetail }}
                  </span>
                  <br /><span style="font-size: 10px">
                    RIF: {{ registro.rifdetail }}
                  </span>
                </td>
                <td style="display: grid">
                  <span>N° DE CONTROL:
                    <span style="
                        font-size: 18px;
                        color: #e00303;
                        font-weight: bolder;
                      ">{{ registro.numerodocumento }}</span></span>
                  <span>{{ registro.tipodocumentodetail }}:
                    {{ registro.numerointerno }}</span>
                  <span v-if="numeroafectadoDet.length > 0" style="font-size: 10px">Afecta a: {{ tipodocafectadoDet }}
                    <span style="color: #e00303; font-weight: bolder">{{
                      numeroafectadoDet
                    }}</span></span>
                  <span v-if="numeroafectadoDet.length > 0" style="font-size: 10px">Fecha: {{ fechaafectadoDet }}</span>
                </td>
              </tr>
            </table>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section style="font-size: 11px;">
            <table>
              <tr>
                <td style="width: 409px">
                  Cliente: {{ registro.nombreclientedetail }}
                </td>
                <td>Fecha de Emisión: {{ registro.fechadetail }}</td>
              </tr>
              <tr>
                <td>
                  {{ " " + registro.abrevdetail }}:
                  {{ registro.cedulaclientedetail }}
                </td>
                <td>Hora de Emisión: {{ registro.horadetail }}</td>
              </tr>
              <tr>
                <td>Teléfono: {{ registro.telefonoclientedetail }}</td>
                <td></td>
              </tr>
              <tr>
                <td>Dirección: {{ registro.direccionclientedetail }}</td>
                <td></td>
              </tr>
            </table>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item >
          <q-table :rows="detallesDoc" :columns="columnsDetallesDoc" row-key="codigo" hide-pagination dense
            style="width: 100%">
            <template v-slot:body-cell-codigo="props">
              <q-td :props="props" style="font-size: 11px;">
                {{ props.row.codigo }}
              </q-td>
            </template>
            <template v-slot:body-cell-descripcion="props">
              <q-td :props="props" style="
                  display: grid;
                  height: fit-content;
                  white-space: pre-wrap;
                  width: 250px;
                  font-size: 11px;
                ">
                <span>{{ props.row.descripcion }}</span>
                <span>{{ props.row.comentario }}</span>
              </q-td>
            </template>
            <template v-slot:body-cell-precio="props">
              <q-td :props="props" style="font-size: 11px;">
                {{ props.row.precio }}
              </q-td>
            </template>
            <template v-slot:body-cell-cantidad="props">
              <q-td :props="props" style="font-size: 11px;">
                {{ props.row.cantidad }}
              </q-td>
            </template>
            <template v-slot:body-cell-tasa="props">
              <q-td :props="props" style="font-size: 11px;">
                {{ props.row.tasa }}
              </q-td>
            </template>
            <template v-slot:body-cell-descuento="props">
              <q-td :props="props" style="font-size: 11px;">
                {{ props.row.descuento }}
              </q-td>
            </template>
            <template v-slot:body-cell-monto="props">
              <q-td :props="props" style="font-size: 11px;">
                {{ props.row.monto }}
              </q-td>
            </template>
          </q-table>
        </q-item>
        <q-separator />

        <q-item>
          <q-item-section side top style="font-size: 11px; width: -webkit-fill-available;">
            <table style="width: 100%;">
              <tr>
                <td style="width: 80%; text-align: right">
                  Subtotal Bs.:
                </td>
                <td style="text-align: right">
                  {{ registro.subtotaldetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestogdetail !== '0,00'">
                <td style="text-align: right">IVA 16% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.impuestogdetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestordetail !== '0,00'">
                <td style="text-align: right">IVA 8% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.impuestordetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestoigtfdetail !== '0,00'">
                <td style="text-align: right">IGTF 3% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.impuestoigtfdetail }}
                </td>
              </tr>
              <tr>
                <td style="text-align: right">Total Bs.:</td>
                <td style="text-align: right">
                  {{ registro.totaldetail }}
                </td>
              </tr>
            </table>
          </q-item-section>
        </q-item>
        <q-item style="display: grid; justify-content: center">
          <div style="
              font-size: 8px;
              max-width: 458px;
              text-align: center;
              min-width: 458px;
            ">
            {{ registro.piedepagina }}
          </div>
          <div style="text-align: center; font-size: 8px; color: red">
            ORIGINAL
          </div>
        </q-item>
      </div>
      <div v-else class="text-center">
        <div class="dash_welcome_blue">Oops!</div>
        <img src="estatusgrafica.png" alt="Sin datos" style="width: 250px;">
      <div class="dash_welcome_small">No hay datos que mostrar para esta CodeQR</div>
      </div>
      <q-separator spaced inset="item" />
      <!-- <q-card-actions align="right">
        <q-btn label="Cerrar" color="negative" v-close-popup />
      </q-card-actions> -->
    </q-card>
</div>
</template>

<script>
import axios from 'axios'
import { Notify } from 'quasar'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
import moment from 'moment'

export default {
  name: 'ViewInvoiceLayout',
  data () {
    return {
      haydata: false,
      registro: {},
      numeroafectadoDet: '',
      columnsDetallesDoc: [
        {
          name: 'codigo',
          label: 'Código',
          align: 'left',
          field: 'codigo'
        },
        {
          name: 'descripcion',
          align: 'left',
          label: 'Descripción',
          field: 'descripcion'
        },
        { name: 'precio', align: 'left', label: 'Precio', field: 'precio' },
        {
          name: 'cantidad',
          align: 'left',
          label: 'Cantidad',
          field: 'cantidad'
        },
        { name: 'tasa', align: 'left', label: 'Tasa', field: 'tasa' },
        { name: 'descuento', label: 'Descuento', field: 'descuento' },
        { name: 'monto', label: 'Monto', field: 'monto' }
      ],
      detallesDoc: []

    }
  },
  methods: {
    listarfacturas () {
      const body = {
        idserviciosmasivo: this.idserviciosmasivo,
        numerodocumento: this.numerodocumento,
        estatus: 4
      }
      // this.crearbitacora(desde, hasta, 3)
      this.loading = true
      axios
        .post(ENDPOINT_PATH_V2 + 'reporte/facturas', body)
        .then(async (response) => {
          const datos = response.data.data
          for (const i in datos) {
            const obj = {}
            obj.cod = datos[i].id
            obj.logo = ENDPOINT_PATH_V2 + 'imagen/' + datos[i].rif + '.png'
            obj.idserviciosmasivo = datos[i].idserviciosmasivo
            obj.razonsocial = datos[i].razonsocial
            obj.rif = datos[i].rif
            obj.piedepagina = datos[i].piedepagina
            obj.relacionado = datos[i].relacionado
            obj.notadebito = datos[i].notadebito
            obj.notacredito = datos[i].notacredito
            obj.direccion = datos[i].direccion
            obj.telefono = datos[i].telefono
            obj.trackingid = datos[i].trackingid
            obj.numerodocumento = datos[i].numerodocumento
            obj.numerointerno = datos[i].numerointerno
            obj.tipodocumento = datos[i].tipodocumento
            obj.abrev = datos[i].abrev
            obj.cedulacliente = datos[i].cedulacliente
            obj.nombrecliente = datos[i].nombrecliente
            obj.direccioncliente = datos[i].direccioncliente
            obj.emailcliente = datos[i].emailcliente
            obj.telefonocliente = datos[i].telefonocliente
            obj.estatus = datos[i].estatus

            obj.observacion = datos[i].observacion
            obj.fecha = moment(datos[i].fecha).format('DD/MM/YYYY hh:mm:ss a')
            obj.fechasolo = moment(datos[i].fecha).format('DD/MM/YYYY')
            obj.hora = moment(datos[i].fecha).format('hh:mm:ss a')
            datos[i].fecha = obj.fecha
            obj.subtotal = datos[i].subtotal
            obj.total = datos[i].total

            obj.tasag = datos[i].tasag ? datos[i].tasag + '%' : '0%'
            obj.tasar = datos[i].tasar ? datos[i].tasar + '%' : '0%'
            obj.tasaigtf = datos[i].tasaigtf ? datos[i].tasaigtf + '%' : '0%'

            obj.exento = datos[i].exento || 0
            obj.exentoN = datos[i].exento || 0
            obj.baseg = datos[i].baseg || 0
            obj.basegN = datos[i].baseg || 0
            obj.impuestogN = datos[i].impuestog || 0
            obj.baser = datos[i].baser || 0
            obj.baserN = datos[i].baser || 0
            obj.impuestorN = datos[i].impuestor || 0
            obj.baseigtf = datos[i].baseigtf || 0
            obj.baseigtfN = datos[i].baseigtf || 0
            obj.impuestoigtfN = datos[i].impuestoigtf || 0

            obj.totalimpuestos = Number(obj.impuestogN) + Number(obj.impuestorN) + Number(obj.impuestoigtfN)

            obj.exento = this.completarDecimales(obj.exento)
            obj.baseg = this.completarDecimales(obj.baseg)
            obj.impuestog = this.completarDecimales(obj.impuestogN)
            obj.baser = this.completarDecimales(obj.baser)
            obj.impuestor = this.completarDecimales(obj.impuestorN)
            obj.baseigtf = this.completarDecimales(obj.baseigtf)
            obj.impuestoigtf = this.completarDecimales(obj.impuestoigtfN)
            this.buscarDetalles(obj)
          }
          this.loading = false
        })
        .catch((error) => {
          Notify.create('Problemas al listar Factura ' + error)
        })
    },
    completarDecimales (cadena) {
      cadena = Intl.NumberFormat('de-DE').format(cadena.toFixed(2))
      const arreglo = cadena.split(',')
      cadena =
        arreglo.length === 1
          ? cadena + ',00'
          : arreglo[1].length === 1
            ? cadena + '0'
            : cadena
      return cadena
    },
    async buscarDetalles (reg) {
      this.detallesDoc = []
      if (reg.cod) {
        const detalles = await axios.get(ENDPOINT_PATH_V2 + 'reporte/facturas/detalles/' + reg.cod)
        let subtotaldetalle = 0
        for (const i in detalles.data.data) {
          const dato = detalles.data.data[i]
          const obj = {}
          obj.codigo = dato.codigo
          obj.descripcion = dato.descripcion
          obj.comentario = dato.comentario
          obj.cantidad = dato.cantidad.toFixed(2)
          obj.precio = dato.precio.toFixed(2)
          obj.tasa = dato.tasa.toFixed(2)
          obj.exento = dato.exento
          const descuento = (dato.precio * dato.cantidad) - dato.monto
          obj.descuento = Math.abs(descuento).toFixed(2)
          obj.monto = dato.monto.toFixed(2)
          subtotaldetalle += Number(obj.monto)
          this.detallesDoc.push(obj)
        }
        // const $this = this
        this.tipodocafectado = ''
        this.fechaafectado = ''
        this.numeroafectado = ''
        if (reg.relacionado.length > 0) {
          const body = {
            idserviciosmasivo: reg.idserviciosmasivo,
            numerodocumento: reg.relacionado
          }
          await axios.post(ENDPOINT_PATH_V2 + 'reporte/facturas/relacionado', body).then(async response => {
            const datosafectado = response.data.data
            this.tipodocafectado = datosafectado[0].tipodocumento
            this.fechaafectado = moment(datosafectado[0].fecha).format('DD/MM/YYYY hh:mm:ss a')
            this.numeroafectado = datosafectado[0].numerointerno.length > 0 ? datosafectado[0].numerointerno : reg.relacionado
          })
        }
        reg.subtotal = detalles.data.data.length > 0 ? subtotaldetalle : reg.subtotal
      }
      reg.fecha = moment(reg.fecha, 'DD/MM/YYYY hh:mm:ss a')
      this.registro.logo = reg.logo
      this.registro.razonsocialdetail = reg.razonsocial
      this.registro.rifdetail = reg.rif
      this.registro.direcciondetail = reg.direccion
      this.registro.tipodocumentodetail = reg.tipodocumento
      this.registro.numerodocumento = reg.numerodocumento
      this.registro.numerointerno = reg.numerointerno
      this.registro.nombreclientedetail = reg.nombrecliente
      this.registro.piedepagina = reg.piedepagina
      this.registro.abrevdetail = reg.abrev
      this.registro.cedulaclientedetail = reg.cedulacliente
      this.registro.direccionclientedetail = reg.direccioncliente
      this.registro.telefonoclientedetail = reg.telefonocliente
      this.registro.emailclientedetail = reg.emailcliente
      this.registro.fechadetail = reg.fechasolo
      this.registro.horadetail = reg.hora
      this.registro.exentodetail = reg.exento

      this.registro.basegdetail = reg.baseg
      this.registro.baserdetail = reg.baser
      this.registro.baseigtfdetail = reg.baseigtf

      this.registro.impuestogdetail = reg.impuestog
      this.registro.impuestordetail = reg.impuestor
      this.registro.impuestoigtfdetail = reg.impuestoigtf

      this.registro.totalimpuestodetail = Number(reg.impuestogN) + Number(reg.impuestorN) + Number(reg.impuestoigtfN)
      reg.total = reg.subtotal + this.registro.totalimpuestodetail
      this.registro.totalimpuestodetail = this.completarDecimales(this.registro.totalimpuestodetail)
      this.registro.subtotaldetail = this.completarDecimales(reg.subtotal)
      this.registro.totaldetail = this.completarDecimales(reg.total)
      this.haydata = true
    },
    async getIdClienteEmisor (rif) {
      const body = {
        rif
      }
      return await axios.post(ENDPOINT_PATH_V2 + 'sede/buscarid', body)
    }
  },
  async mounted () {
    this.qrinvoice = this.$route.params.qrinvoice
    this.rif = this.qrinvoice.split('SM')[0]
    this.numerodocumento = this.qrinvoice.split('SM')[1]
    const resp = await (await this.getIdClienteEmisor(this.rif)).data.data
    if (resp) {
      this.idserviciosmasivo = resp.id
      this.listarfacturas()
    } else {
      console.log('Cliente emisor no encontrado')
    }
  }
}
</script>
<style>
.dash_welcome_small {
  margin: 0px 20px 20px 0px;
  color: #98A7BA;
  font-weight: bold;
  font-size: 18px;
  height: 50px;
}
.dash_welcome_blue {
  font-size: 30px;
  margin: 40px 0px 7px 0px;
  color: #0999FF;
}
</style>
