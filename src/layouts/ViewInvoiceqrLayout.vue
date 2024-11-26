<template>
 <div class="my-font my-fondo row" >
    <q-card class="col-md-6 col-sm-12 col-xs-12">
      <div v-if="loading" style="position: relative; height: 500px;">
        <q-spinner
          color="primary"
          size="8em"
          style="position: absolute; top: 50%;left: 40%;"
        />
          <div style="position: absolute; top: 30%;left: 25%; right: 25%; font-size: 20px;">Por favor espere... Procesando!</div>
      </div>
      <div v-else-if="haydata" id="detailid" class="row"  style="padding-top: 10px;">
        <div class="col">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="row">
                <div class="col-6  text-center">
                  <img width="100" :src="registro.logo" onerror="this.src='logo_nophoto.png'" />
                </div>
                <table class="col-6">
                  <tr>
                    <td>
                      <span>{{ registro.razonsocialdetail }}</span>
                      <br /><span style="font-size: 10px">
                        {{ registro.direcciondetail }}
                      </span>
                      <br /><span style="font-size: 10px">
                        RIF: {{ registro.rifdetail }}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12 text-center">
              <table style="width: 100%;">
                <tr>
                  <td style="display: grid">
                    <span>N° DE CONTROL:
                      <span style="
                          font-size: 18px;
                          color: #e00303;
                          font-weight: bolder;
                        ">{{ registro.numerodocumento }}</span></span>
                    <span>{{ registro.tipodocumentodetail }}:
                      {{ registro.serial }}{{ registro.numerointerno }}</span>
                    <span v-if="numeroafectadoDet.length > 0" style="font-size: 10px">Afecta a: {{ tipodocafectadoDet }}
                      <span style="color: #e00303; font-weight: bolder">{{
                        numeroafectadoDet
                      }}</span></span>
                    <span v-if="numeroafectadoDet.length > 0" style="font-size: 10px">Fecha: {{ fechaafectadoDet }}</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <q-separator />
          <div class="row">
            <table class="col-md-7 col-sm-7 col-xs-12" style="margin-left: 20px;">
              <tr>
                <td>
                  Cliente: {{ registro.nombreclientedetail }}
                </td>
              </tr>
              <tr>
                <td>
                  {{ " " + registro.abrevdetail }}:
                  {{ registro.cedulaclientedetail }}
                </td>
              </tr>
              <tr>
                <td>Teléfono: {{ registro.telefonoclientedetail }}</td>
              </tr>
              <tr>
                <td>Dirección: {{ registro.direccionclientedetail }}</td>
              </tr>
            </table>
            <table class="col-md-4 col-sm-4 col-xs-12" style="margin-left: 20px;">
              <tr>
                <td>Fecha de Emisión: {{ registro.fechadetail }}</td>
              </tr>
              <tr>
                <td>Hora de Emisión: {{ registro.horadetail }}</td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="row">
            <q-table class="col"
             :rows="detallesDoc"
             :columns="columnsDetallesDoc"
             row-key="codigo"
             hide-pagination
             :rows-per-page-options="[0]"
             dense
             style="width: 100%; margin: 10px;">
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
                  {{ props.row.tdunidaditem }}
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
          </div>
          <div class="row" style="font-size: 10px;">
            <table  class="col" style="margin-right: 20px;">
              <tr>
                <td style="text-align: left; vertical-align: baseline; padding-left: 10px; height: 30px;">
                  Observacion
                </td>
              </tr>
              <tr>
                <td style="text-align: left; vertical-align: baseline; padding-left: 10px;">
                  {{ registro.observacion }}
                </td>
              </tr>
            </table>
            <table class="col" style="margin-right: 20px;">
              <tr v-if="registro.exentodetail !== '0,00' && registro.exentodetail !== '0,0000'">
                <td style="text-align: right">Exentos Bs.:</td>
                <td style="text-align: right">
                  {{ registro.exentodetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestogdetail !== '0,00'">
                <td style="text-align: right">Base imponible IVA 16% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.basegdetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestogdetail !== '0,00'">
                <td style="text-align: right">IVA 16% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.impuestogdetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestordetail !== '0,00'">
                <td style="text-align: right">Base imponible IVA 8% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.baserdetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestordetail !== '0,00'">
                <td style="text-align: right">IVA 8% Bs.:</td>
                <td style="text-align: right">
                  {{ registro.impuestordetail }}
                </td>
              </tr>
              <tr v-if="registro.impuestoigtfdetail !== '0,00'">
                <td style="text-align: right">IGTF 3% (${{ registro.baseigtfdetaildiv }}) Bs.:</td>
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
            <table v-if="registro.tipomonedadetail !== '1'" class="col" style="margin-right: 20px;">
              <tr v-if="registro.exentodetail !== '0,00'">
                <td style="text-align: right">Exentos $:</td>
                <td style="text-align: right">
                  {{ registro.exentodetaildiv }}
                </td>
              </tr>
              <tr v-if="registro.impuestogdetail !== '0,00'">
                <td style="text-align: right">Base imponible IVA 16% $:</td>
                <td style="text-align: right">
                  {{ registro.basegdetaildiv }}
                </td>
              </tr>
              <tr v-if="registro.impuestogdetail !== '0,00'">
                <td style="text-align: right">IVA 16% $:</td>
                <td style="text-align: right">
                  {{ registro.impuestogdetaildiv }}
                </td>
              </tr>
              <tr v-if="registro.impuestordetail !== '0,00'">
                <td style="text-align: right">Base imponible IVA 8% $:</td>
                <td style="text-align: right">
                  {{ registro.baserdetaildiv }}
                </td>
              </tr>
              <tr v-if="registro.impuestordetail !== '0,00'">
                <td style="text-align: right">IVA 8% $:</td>
                <td style="text-align: right">
                  {{ registro.impuestordetaildiv }}
                </td>
              </tr>
              <tr v-if="registro.impuestoigtfdetail !== '0,00'">
                <td style="text-align: right">IGTF 3% (${{ registro.baseigtfdetaildiv }}) $:</td>
                <td style="text-align: right">
                  {{ registro.impuestoigtfdetaildiv }}
                </td>
              </tr>
              <tr>
                <td style="text-align: right">Total $:</td>
                <td style="text-align: right">
                  {{ registro.totaldetaildiv }}
                </td>
              </tr>
            </table>
          </div>
          <q-separator />
          <div class="row">
            <div class="col" style="display: grid; justify-content: center; margin: 10px;">
              <div style="
                  font-size: 8px;
                  text-align: center;
                ">
                {{ registro.piedepagina }}
              </div>
            </div>
          </div>
        </div>
        <!-- <q-separator  class="col-12" />
        <q-item class="col-12">
          <q-item-section side top style="font-size: 11px; width: -webkit-fill-available;"  class="row">
          </q-item-section>
        </q-item>
        <q-item  class="col-12" style="display: grid; justify-content: center">
          <div style="
              font-size: 8px;
              text-align: center;
            ">
            {{ registro.piedepagina }}
          </div>
          <div style="text-align: center; font-size: 8px; color: red">
            ORIGINAL
          </div>
        </q-item> -->
      </div>
      <div v-else class="text-center">
        <div class="dash_welcome_blue">Oops!</div>
        <img src="estatusgrafica.png" alt="Sin datos" style="width: 250px;">
      <div class="dash_welcome_small text-center">No hay datos que mostrar para esta CodeQR</div>
      </div>
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
      loading: true,
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
        {
          name: 'cantidad',
          align: 'left',
          label: 'Cantidad',
          field: 'cantidad'
        },
        { name: 'precio', align: 'left', label: 'Precio Unit.', field: 'precio' },
        { name: 'tasa', align: 'left', label: '%IVA', field: 'tasa' },
        { name: 'descuento', label: 'Monto Desc.', field: 'descuento' },
        { name: 'monto', label: 'Total', field: 'monto' }
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10 // 0 means all rows
      },
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
            obj.serial = datos[i].serial
            obj.tipomoneda = datos[i].tipomoneda
            obj.tasacambio = datos[i].tasacambio
            const DECIMALES = datos[i].tipomoneda > 1 ? 4 : 2

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

            obj.exento = this.completarDecimales(obj.exento, 2)
            obj.exentodiv = this.completarDecimales(datos[i].exento / obj.tasacambio, DECIMALES)
            obj.baseg = this.completarDecimales(obj.baseg, 2)
            obj.basegdiv = this.completarDecimales(datos[i].baseg / obj.tasacambio, DECIMALES)
            obj.impuestog = this.completarDecimales(obj.impuestogN, 2)
            obj.impuestogdiv = this.completarDecimales(datos[i].impuestog / obj.tasacambio, DECIMALES)
            obj.baser = this.completarDecimales(obj.baser, 2)
            obj.baserdiv = this.completarDecimales(datos[i].baser / obj.tasacambio, DECIMALES)
            obj.impuestor = this.completarDecimales(obj.impuestorN, 2)
            obj.impuestordiv = this.completarDecimales(datos[i].impuestor / obj.tasacambio, DECIMALES)
            obj.baseigtf = this.completarDecimales(obj.baseigtf, 2)
            obj.baseigtfdiv = this.completarDecimales(datos[i].baseigtf / obj.tasacambio, DECIMALES)
            obj.impuestoigtf = this.completarDecimales(obj.impuestoigtfN, 2)
            obj.impuestoigtfdiv = this.completarDecimales(datos[i].impuestoigtf / obj.tasacambio, DECIMALES)
            this.buscarDetalles(obj, DECIMALES)
          }
          this.loading = false
        })
        .catch((error) => {
          Notify.create('Problemas al listar Factura ' + error)
        })
    },
    completarDecimales (cadena, decimales) {
      /* cadena = Intl.NumberFormat('de-DE').format(cadena.toFixed(2))
      const arreglo = cadena.split(',')
      cadena =
        arreglo.length === 1
          ? cadena + ',00'
          : arreglo[1].length === 1
            ? cadena + '0'
            : cadena
      return cadena */
      const cadena2 = cadena.toFixed(decimales).toString().replace('.', ',')
      // const decimal = DECIMALES > 1 ? ',0000' : ',00'
      const arreglo = cadena2.split(',')
      let cadenafinal = ''
      if (decimales > 2) {
        cadenafinal = arreglo.length === 1 ? cadena2 + ',0000' : arreglo[1].length === 1 ? cadena2 + '000' : arreglo[1].length === 2 ? cadena2 + '00' : arreglo[1].length === 3 ? cadena2 + '0' : cadena2
      } else {
        cadenafinal = arreglo.length === 1 ? cadena2 + ',00' : arreglo[1].length === 1 ? cadena2 + '0' : cadena2
      }
      console.log('cadenafinal', cadenafinal)
      const arreglo2 = cadena2.split(',')

      const str = arreglo2[0]
      // Aquí almacenaremos los resultados.
      let resultado = ''

      // Recorremos el string con for "str.length" veces.
      for (let i = 0; i < str.length; i++) {
        // Cada número, lo concatenamos a "resultado".
        resultado += str[i]

        // y luego de concatenar el número, verifico si el iterador es un múltiplo de 3.
        // ponemos "i < str.length - 1" para evitar que el punto se agregue al final del string.
        if ((str.length - i - 1) % 3 === 0 && i < str.length - 1) {
          resultado += '.'
        }
      }
      const cadenafinal2 = resultado + ',' + arreglo2[1]
      // console.log('cadenafinal2', cadenafinal2)
      return cadenafinal2
    },
    async buscarDetalles (reg, DECIMALES) {
      this.detallesDoc = []
      if (reg.cod) {
        const detalles = await axios.get(ENDPOINT_PATH_V2 + 'reporte/facturas/detalles/' + reg.cod)
        // let subtotaldetalle = 0
        for (const i in detalles.data.data) {
          const dato = detalles.data.data[i]
          const obj = {}
          obj.codigo = dato.codigo
          obj.descripcion = dato.descripcion
          obj.comentario = dato.comentario
          obj.cantidad = dato.cantidad.toFixed(2)
          obj.precio = reg.tipomoneda === '1' ? dato.precio.toFixed(2) : (dato.precio / reg.tasacambio).toFixed(4)
          obj.tasa = dato.tasa.toFixed(2)
          obj.exento = dato.exento
          const descuento = (dato.precio * dato.cantidad) - dato.monto
          obj.descuento = Math.abs(descuento).toFixed(DECIMALES)
          obj.descuento = reg.tipomoneda === '1' ? Math.abs(descuento).toFixed(2) : (Math.abs(descuento) / reg.tasacambio).toFixed(4)
          obj.monto = reg.tipomoneda === '1' ? dato.monto.toFixed(2) : (dato.monto / reg.tasacambio).toFixed(4)
          obj.intipounidad = dato.intipounidad
          let tdunidaditem = ''
          if (obj.intipounidad > 0) {
            tdunidaditem = obj.intipounidad === '1' ? 'Unidad(es)' : obj.intipounidad === '2' ? 'Kilo(s)' : obj.intipounidad === '3' ? 'Litro(s)' : obj.intipounidad === '4' ? 'Metro(s)' : 'Caja(s)'
          }
          obj.tdunidaditem = tdunidaditem
          // subtotaldetalle += Number(obj.monto)
          this.detallesDoc.push(obj)
        }
        // console.log(this.detallesDoc)
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
        // reg.subtotal = detalles.data.data.length > 0 ? subtotaldetalle : reg.subtotal
      }
      reg.fecha = moment(reg.fecha, 'DD/MM/YYYY hh:mm:ss a')
      this.registro.logo = reg.logo
      this.registro.razonsocialdetail = reg.razonsocial
      this.registro.rifdetail = reg.rif
      this.registro.direcciondetail = reg.direccion
      this.registro.tipodocumentodetail = reg.tipodocumento
      this.registro.numerodocumento = reg.numerodocumento
      this.registro.numerointerno = reg.numerointerno
      this.registro.serial = reg.serial
      this.registro.nombreclientedetail = reg.nombrecliente
      this.registro.observacion = reg.observacion
      this.registro.piedepagina = reg.piedepagina
      this.registro.tipomonedadetail = reg.tipomoneda
      this.registro.tasacambiodetail = reg.tasacambio
      this.registro.abrevdetail = reg.abrev
      this.registro.cedulaclientedetail = reg.cedulacliente
      this.registro.direccionclientedetail = reg.direccioncliente
      this.registro.telefonoclientedetail = reg.telefonocliente
      this.registro.emailclientedetail = reg.emailcliente
      this.registro.fechadetail = reg.fechasolo
      this.registro.horadetail = reg.hora

      this.registro.exentodetail = reg.exento
      this.registro.exentodetaildiv = reg.exentodiv

      this.registro.basegdetail = reg.baseg
      this.registro.basegdetaildiv = reg.basegdiv
      this.registro.baserdetail = reg.baser
      this.registro.baserdetaildiv = reg.baserdiv
      this.registro.baseigtfdetail = reg.baseigtf
      this.registro.baseigtfdetaildiv = reg.baseigtfdiv

      this.registro.impuestogdetail = reg.impuestog
      this.registro.impuestogdetaildiv = reg.impuestogdiv
      this.registro.impuestordetail = reg.impuestor
      this.registro.impuestordetaildiv = reg.impuestordiv
      this.registro.impuestoigtfdetail = reg.impuestoigtf
      this.registro.impuestoigtfdetaildiv = reg.impuestoigtfdiv

      this.registro.totalimpuestodetail = Number(reg.impuestogN) + Number(reg.impuestorN) + Number(reg.impuestoigtfN)
      reg.total = reg.subtotal + this.registro.totalimpuestodetail
      // this.registro.totalimpuestodetail = this.completarDecimales(this.registro.totalimpuestodetail)
      // this.registro.subtotaldetail = this.completarDecimales(reg.subtotal)
      this.registro.totaldetail = this.completarDecimales(reg.total, 2)
      this.registro.totaldetaildiv = this.completarDecimales(reg.total / reg.tasacambio, 4)
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
      this.haydata = false
      this.loading = false
      console.log('Cliente emisor no encontrado')
    }
  }
}
</script>
<style>
.dash_welcome_small {
  margin: 0px 0px 20px 0px;
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
