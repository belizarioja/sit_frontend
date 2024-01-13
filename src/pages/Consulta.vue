<template>
  <div class="my-font my-fondo q-pa-md">
    <div class="row">
      <span class="text-secondary" style="margin: 0 20px; font-size: 25px; font-weight: bolder;">Consulta</span>
    </div>
    <div class="row">
      <div class="col" style="position: relative;">
        <div style="margin-top: 20px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;">
          <span class="filtros">Desde: {{ dateFrom }}</span>
          <span class="filtros">Hasta: {{ dateTo }}</span>
          <span class="filtros">Tipo documento: {{ tipodocumentofilter }}</span>
        </div>
        <span class="my-fondo" style="position: absolute;top: 9px; left: 20px; color: #ccc;">Filtrado por:</span>
      </div>
    </div>
    <div class="row q-pa-md" style="">
      <q-table
        class="my-sticky-header-table"
        :title="modeltipo.cod ? modeltipo.name : titulotabla" :rows="rows"
        :columns="columnseleted"
        row-key="name"
        :pagination="initialPagination"
        style="overflow: auto;"
        :loading="loading"
        no-data-label="No hay registros!">
        <template v-slot:top-right>
          <div style="display: inline;">
            <q-btn icon-right="print" class="q-ml-sm col-md-4 col-sm-3 col-xs-3" color="secondary" label="Imprimir" @click="exportTable" :disable="btnDisable"/>
            <q-btn icon-right="file_download" class="q-ml-sm col-md-4 col-sm-3 col-xs-3" color="secondary" label="Exportar" @click="exportTable" :disable="btnDisable"/>
            <q-btn icon-right="filter_alt" class="q-ml-sm col-md-4 col-sm-3 col-xs-3" color="secondary" label="Filtrar" @click="drawerFilters = true" />
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-if="co_rol === '1' ||
              co_rol === '3' ||
              (co_rol === '2' && !co_sede_seleted)
              " key="rif" :props="props" style="display: grid; text-align: left; height: 51px">
              <span style="
                  font-weight: bolder;
                  width: 200px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                ">{{ props.row.razonsocial }}</span>
              <span style="font-style: italic">RIF: {{ props.row.rif }}</span>
            </q-td>
            <q-td v-if="co_rol === '1' || co_rol === '3'" key="numerointerno" :props="props">
              {{ props.row.numerointerno }}
            </q-td>
            <q-td key="tipodocumento" :props="props">
              {{ props.row.tipodocumento }}
            </q-td>
            <q-td key="numerodocumento" :props="props">
              <span style="font-weight: bolder">
                {{ props.row.numerodocumento }}</span>
            </q-td>
            <q-td key="fecha" :props="props">
              {{ props.row.fecha }}
            </q-td>
            <q-td key="nombrecliente" :props="props" style="display: grid; text-align: left; height: 51px">
              <span style="
                  font-weight: bolder;
                  width: 180px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                ">{{ props.row.nombrecliente }}</span>
              <span style="font-style: italic">{{ props.row.abrev }}: {{ props.row.cedulacliente }}</span>
            </q-td>
            <q-td key="exento" :props="props">
              {{ props.row.exento }}
            </q-td>
            <q-td key="tasag" :props="props">
              {{ props.row.tasag }}
            </q-td>
            <q-td key="baseg" :props="props">
              {{ props.row.baseg }}
            </q-td>
            <q-td key="impuestog" :props="props">
              {{ props.row.impuestog }}
            </q-td>
            <q-td key="tasar" :props="props">
              {{ props.row.tasar }}
            </q-td>
            <q-td key="baser" :props="props">
              {{ props.row.baser }}
            </q-td>
            <q-td key="impuestor" :props="props">
              {{ props.row.impuestor }}
            </q-td>
            <q-td key="tasaigtf" :props="props">
              {{ props.row.tasaigtf }}
            </q-td>
            <q-td key="baseigtf" :props="props">
              {{ props.row.baseigtf }}
            </q-td>
            <q-td key="impuestoigtf" :props="props">
              {{ props.row.impuestoigtf }}
            </q-td>
            <q-td key="anulado" :props="props">
              <q-badge v-if="isAnulado(props.row)" color="red" style="padding: 5px 10px">
                Anulado
              </q-badge>
            </q-td>
            <q-td key="detail" :props="props">
              <q-btn color="primary" icon="receipt_long" @click="openDetail(props.row)" />
            </q-td>
            <q-td key="enviarcorreo" :props="props">
              <q-badge :color="props.row.colorEmailStatus" style="cursor: pointer; padding: 5px 10px"
                @click="renderWindownRedirectEmail(props.row)">
                {{ props.row.enviarcorreo }}
              </q-badge>
              <q-badge v-if="props.row.enviocorreo === '0'" color="orange" style="padding: 5px 10px">
                {{ props.row.enviarcorreo }}
              </q-badge>
            </q-td>
            <q-td key="relacionado" :props="props">
              <q-badge v-if="props.row.relacionado" color="green" style="cursor: pointer; padding: 5px 10px"
                @click="buscarDetail(props.row)">
                {{ props.row.relacionado }}
              </q-badge>
            </q-td>
            <q-td key="exportar" :props="props">
              <q-btn color="info" label="XML" @click="exportXMLDetail(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="viewdetail" persistent>
        <q-card style="max-width: inherit; width: auto">
          <div id="detailid">
            <q-item>
              <q-item-section style="flex: auto">
                <img width="100" :src="registro.logo" onerror="this.src='logo_nophoto.png'" />
              </q-item-section>

              <q-item-section>
                <table>
                  <tr>
                    <td style="width: 300px">
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
                      <span v-if="numeroafectado.length > 0" style="font-size: 10px">Afecta a: {{ tipodocafectado }}
                        <span style="color: #e00303; font-weight: bolder">{{
                          numeroafectado
                        }}</span></span>
                      <span v-if="numeroafectado.length > 0" style="font-size: 10px">Fecha: {{ fechaafectado }}</span>
                    </td>
                  </tr>
                </table>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
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
            <q-item v-if="(co_rol === '1' || co_rol === '3') && detallesDoc.length > 0
              ">
              <q-table :rows="detallesDoc" :columns="columnsDetallesDoc" row-key="codigo" hide-pagination dense
                style="width: 100%">
                <template v-slot:body-cell-descripcion="props">
                  <q-td :props="props" style="
                      display: grid;
                      height: fit-content;
                      white-space: pre-wrap;
                      width: 400px;
                    ">
                    <span>{{ props.row.descripcion }}</span>
                    <span>{{ props.row.comentario }}</span>
                  </q-td>
                </template>
              </q-table>
            </q-item>
            <q-separator />

            <q-item>
              <q-item-section side top>
                <table style="width: 656px">
                  <tr>
                    <td style="width: 525px; text-align: right">
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
          <q-separator spaced inset="item" />
          <q-card-actions align="right">
            <q-btn color="info" label="PDF" style="margin-right: 10px" @click="exportDetailToPDF" />
            <q-btn label="Cerrar" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <q-drawer
      v-model="drawerFilters"
      side="right"
      :width="300"
      :breakpoint="700"
      overlay
      elevated
      class="bg-white text-secondary"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div style="margin: 0 20px; font-size: 25px; font-weight: bolder">Filtros</div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Cliente emisor:</span>
            <q-select v-if="co_rol === '1' || co_rol === '2'" label="Agregue Nombre o RIF" dense
              class="col-md-3 col-sm-12 col-xs-12" filled v-model="modelsede" :disable="disabledSede" use-input hide-selected
              fill-input clearable options-dense option-label="namerif" option-value="cod" input-debounce="0"
              :options="optionssede" @update:model-value="changeSede()" @input:="changeSede()" @filter="searchEmisor"
              style="padding: 5px" />
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Fechas:</span>
            <div style="display: flex;justify-content: space-around;">
              <input type="date" name="desde" :value="dateFrom" style="width: 110px;">
              <input type="date" name="desde" :value="dateTo" style="width: 110px;">
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">N° Control:</span>
            <q-input filled label="Agregue N° Control" v-model="numerodocumento"
              @input:="listarfacturas" style="padding: 5px" :disable="disable" dense>
              <template v-slot:append>
                <q-icon v-if="numerodocumento.length > 0" name="close" @click="(numerodocumento = ''), listarfacturas()"
                  class="cursor-pointer" />
              </template>
              <template v-slot:after>
                <q-btn dense color="primary" icon="search" @click="listarfacturas" :disable="disable" />
              </template>
            </q-input>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Tipo documento:</span>
            <q-checkbox
              v-model="tipotodos"
              label="Todos"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :disable="disabletipo"
            />
            <q-separator />
            <q-checkbox
              v-model="tipofactura"
              label="Factura"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-checkbox
              v-model="tipocredito"
              label="Nota de crédito"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-checkbox
              v-model="tipodebito"
              label="Nota de débito"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-checkbox
              v-model="tipoorden"
              label="Orden de entrega"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
            <q-checkbox
              v-model="tipoguia"
              label="Guía de despacho"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
            />
          </div>
          <div class="text-center">
            <q-btn label="Cerrar" color="negative" @click="drawerFilters = false" />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { ref } from 'vue'

import ModalRedirectEmail from '../components/modals/ModalRedirectEmail.vue'
import { exportFile, Notify } from 'quasar'
import axios from 'axios'
import moment from 'moment'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2
function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
export default {
  setup () {
    return {
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months:
          'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
            '_'
          ),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split(
          '_'
        ),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      },
      term: ref(''),
      disabletipo: ref(true),
      tipodocumentofilter: ref('Todos'),
      tipotodos: ref(true),
      tipofactura: ref(false),
      tipocredito: ref(false),
      tipodebito: ref(false),
      tipoorden: ref(false),
      tipoguia: ref(false),
      drawerFilters: ref(false),
      totalbaseg: ref('0,00'),
      totalbaser: ref('0,00'),
      totalbaseigtf: ref('0,00'),
      totalimpuestog: ref('0,00'),
      totalimpuestor: ref('0,00'),
      totalimpuestoigtf: ref('0,00'),
      disabledSede: ref(false),
      viewdetail: ref(false),
      idserviciosmasivo: ref(undefined),
      idtipodocumento: ref(undefined),
      serviciosmasivo: ref(undefined),
      tipodocumento: ref(undefined),
      colspan: ref(''),
      dateHoy: moment().format('DD/MM/YYYY'),
      tx_nombre: sessionStorage.getItem('tx_nombre'),
      loading: ref(false),
      numerodocumento: ref(''),
      titulotabla: ref('Documentos'),
      disable: ref(true),
      btnDisable: ref(true),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
      co_rol: sessionStorage.getItem('co_rol'),
      co_sede: sessionStorage.getItem('co_sede'),
      initialPagination: {
        page: 1,
        rowsPerPage: 10 // 0 means all rows
      }
    }
  },
  data () {
    return {
      columnseleted: [],
      columns: [
        {
          name: 'rif',
          required: true,
          label: 'Cliente emisor',
          align: 'left',
          field: (row) => row.razonsocial,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'numerointerno',
          align: 'left',
          label: 'N° Interno',
          field: 'numerointerno',
          sortable: true
        },
        {
          name: 'tipodocumento',
          align: 'left',
          label: 'Documento',
          sortable: true
        },
        {
          name: 'numerodocumento',
          align: 'left',
          label: 'Número de Control',
          field: 'numerodocumento',
          sortable: true
        },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha' },
        {
          name: 'nombrecliente',
          align: 'left',
          label: 'Nombre Cliente',
          field: 'nombrecliente'
        },
        { name: 'exento', label: 'Exento', field: 'exento' },
        { name: 'tasag', label: 'Tasa IVA', field: 'tasag' },
        { name: 'baseg', label: 'Imponible IVA', field: 'baseg' },
        { name: 'impuestog', label: 'Impuesto IVA', field: 'impuestog' },
        { name: 'tasar', label: 'Tasa Reducido', field: 'tasar' },
        { name: 'baser', label: 'Imponible Reducido', field: 'baser' },
        { name: 'impuestor', label: 'Impuesto Reducido', field: 'impuestor' },
        { name: 'tasaigtf', label: 'Tasa IGTF', field: 'tasaigtf' },
        { name: 'baseigtf', label: 'Imponible IGTF', field: 'baseigtf' },
        { name: 'impuestoigtf', label: 'Impuesto IGTF', field: 'impuestoigtf' },
        { name: 'anulado', label: 'Anulado', field: 'status' },
        { name: 'detail', label: 'Ver', align: 'center' },
        {
          name: 'enviarcorreo',
          label: 'Envío de correo',
          field: 'enviarcorreo'
        },
        { name: 'relacionado', label: 'Relacionado', field: 'relacionado' },
        { name: 'exportar', label: 'Exportar', align: 'center' }
      ],
      columns2: [
        {
          name: 'rif',
          required: true,
          label: 'Cliente emisor',
          align: 'left',
          field: (row) => row.razonsocial,
          format: (val) => `${val}`,
          sortable: true
        },
        {
          name: 'tipodocumento',
          align: 'left',
          label: 'Documento',
          field: 'tipodocumento',
          sortable: true
        },
        {
          name: 'numerodocumento',
          align: 'left',
          label: 'Número de Control',
          field: 'numerodocumento',
          sortable: true
        },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha' },
        {
          name: 'nombrecliente',
          align: 'left',
          label: 'Nombre Cliente',
          field: 'nombrecliente'
        },
        { name: 'exento', label: 'Exento', field: 'exento' },
        { name: 'tasag', label: 'Tasa IVA', field: 'tasag' },
        { name: 'baseg', label: 'Imponible IVA', field: 'baseg' },
        { name: 'impuestog', label: 'Impuesto IVA', field: 'impuestog' },
        { name: 'tasar', label: 'Tasa Reducido', field: 'tasar' },
        { name: 'baser', label: 'Imponible Reducido', field: 'baser' },
        { name: 'impuestor', label: 'Impuesto Reducido', field: 'impuestor' },
        { name: 'tasaigtf', label: 'Tasa IGTF', field: 'tasaigtf' },
        { name: 'baseigtf', label: 'Imponible IGTF', field: 'baseigtf' },
        { name: 'impuestoigtf', label: 'Impuesto IGTF', field: 'impuestoigtf' },
        { name: 'detail', label: 'Ver', align: 'center' },
        {
          name: 'enviarcorreo',
          label: 'Envío de correo',
          field: 'enviarcorreo'
        },
        { name: 'relacionado', label: 'Relacionado', field: 'relacionado' },
        { name: 'exportar', label: 'Exportar', align: 'center' }
      ],
      columns3: [
        {
          name: 'tipodocumento',
          align: 'left',
          label: 'Documento',
          field: 'tipodocumento',
          sortable: true
        },
        {
          name: 'numerodocumento',
          align: 'left',
          label: 'Número de Control',
          field: 'numerodocumento',
          sortable: true
        },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha' },
        {
          name: 'nombrecliente',
          align: 'left',
          label: 'Nombre Cliente',
          field: 'nombrecliente'
        },
        { name: 'exento', label: 'Exento', field: 'exento' },
        { name: 'tasag', label: 'Tasa IVA', field: 'tasag' },
        { name: 'baseg', label: 'Imponible IVA', field: 'baseg' },
        { name: 'impuestog', label: 'Impuesto IVA', field: 'impuestog' },
        { name: 'tasar', label: 'Tasa Reducido', field: 'tasar' },
        { name: 'baser', label: 'Imponible Reducido', field: 'baser' },
        { name: 'impuestor', label: 'Impuesto Reducido', field: 'impuestor' },
        { name: 'tasaigtf', label: 'Tasa IGTF', field: 'tasaigtf' },
        { name: 'baseigtf', label: 'Imponible IGTF', field: 'baseigtf' },
        { name: 'impuestoigtf', label: 'Impuesto IGTF', field: 'impuestoigtf' },
        { name: 'detail', label: 'Ver', align: 'center' },
        {
          name: 'enviarcorreo',
          label: 'Envío de correo',
          field: 'enviarcorreo'
        },
        { name: 'relacionado', label: 'Relacionado', field: 'relacionado' },
        { name: 'exportar', label: 'Exportar', align: 'center' }
      ],
      rows: [],
      columnsDetallesDoc: [
        /* {
          name: 'codigo',
          label: 'Código',
          align: 'left',
          field: 'codigo'
        }, */
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
      detallesDoc: [],
      tempxml: [],
      rowtempxml: [],
      modeltipo: [],
      modelimpuesto: [],
      optionsimpuesto: [
        { cod: undefined, name: 'Todos' },
        { cod: 1, name: 'Exento' },
        { cod: 2, name: 'Impuesto IVA' },
        { cod: 3, name: 'Impuesto reducido' },
        { cod: 4, name: 'Impuesto IGTF' }
      ],
      optionstipo: [],
      dataEmail: {},
      modelsede: null,
      modelcodes: [],
      optionssede: [],
      optionscodes: [],
      modelcliente: null,
      optionscliente: [],
      basegdetail: '',
      baserdetail: '',
      exentodetail: '',
      baseigtfdetail: '',
      registro: {},
      tipodocafectado: '',
      fechaafectado: '',
      numeroafectado: '',
      selected: [],
      idusuario: sessionStorage.getItem('id_usuario'),
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted'),
      rif_sede: sessionStorage.getItem('rif_sede')
    }
  },
  methods: {
    getColorEmailStatus (obj) {
      if (obj.estatuscorreo === '1' && obj.enviocorreo === '1') {
        return 'blue'
      }
      return 'red'
    },
    exportDetailToPDF () {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('l', 'pt', 'a4')
      console.log(document.getElementById('detailid'))
      doc.html(document.getElementById('detailid'), {
        callback: function (doc) {
          doc.save('smartdigitalDetalle.pdf')
        },
        x: 60,
        y: 60
      })
    },
    JSONtoXML (obj) {
      let xml = ''
      for (const prop in obj) {
        xml += obj[prop] instanceof Array ? '' : '<' + prop + '>'
        if (obj[prop] instanceof Array) {
          for (const array in obj[prop]) {
            xml += '\n<' + prop + '>\n'
            xml += this.JSONtoXML(obj[prop][array])
            xml += '</' + prop + '>'
          }
        } else if (typeof obj[prop] === 'object') {
          xml += this.JSONtoXML(obj[prop])
        } else {
          xml += obj[prop]
        }
        xml += obj[prop] instanceof Array ? '' : '</' + prop + '>\n'
      }
      xml = xml.replace(/<\/?[0-9]{1,}>/g, '')
      return xml
    },
    exportXML (arreglo) {
      let header = '<?xml version="1.0"?>\n'
      header +=
        '<root xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n\n'
      header += '<IsOriginal>true</IsOriginal>\n'
      header += '<IsOriginalMessage>ORIGINAL</IsOriginalMessage>\n\n'
      header += '<Documents>\n'

      const xml = this.JSONtoXML(arreglo)
      let footer = '</Documents>\n'
      footer += '</root>\n'

      // console.log(header + xml + footer)
      const status = exportFile(
        'smartdigital' + moment().format('YYYYMMDDHmmss') + '.xml',
        header + xml + footer,
        'txt'
      )

      if (status !== true) {
        Notify.create('Browser denied file download...')
      }
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(',')
          )
        )
        .join('\r\n')

      const status = exportFile('smartdigital-export.csv', content, 'text/csv')

      if (status !== true) {
        Notify.create('Browser denied file download...')
      }
    },
    exportPDF () {
      const vm = this
      this.crearbitacora(vm.dateFrom, vm.dateTo, 7)
      const columns = [
        { title: 'Emisor', dataKey: 'razonsocial' },
        { title: 'Rif', dataKey: 'rif' },
        { title: 'N° Interno', dataKey: 'numerointerno' },
        { title: 'Tipo Documento', dataKey: 'tipodocumento' },
        { title: 'N° de Control', dataKey: 'numerodocumento' },
        { title: 'Cliente', dataKey: 'nombrecliente' },
        { title: 'RIF Cliente', dataKey: 'cedulacliente' },
        { title: 'Fecha', dataKey: 'fecha' },
        { title: 'IVA', dataKey: 'impuestog' },
        { title: 'Reducido', dataKey: 'impuestor' },
        { title: 'IGTF', dataKey: 'impuestoigtf' }
      ]
      const addFooters = (doc) => {
        const pageCount = doc.internal.getNumberOfPages()

        doc.setFont('helvetica', 'italic')
        doc.setFontSize(11)
        doc.setPage(pageCount)
        doc.text('Smart Digital', 40, doc.internal.pageSize.height - 40)
        doc.text(
          'Fecha de Exportación ' + vm.dateHoy,
          600,
          doc.internal.pageSize.height - 40
        )
        doc.text(
          'Usuario: ' + vm.tx_nombre,
          600,
          doc.internal.pageSize.height - 20
        )
      }
      const tipodoc = vm.idtipodocumento ? vm.tipodocumento : 'Documentos'
      const emisor = vm.idserviciosmasivo
        ? ' Emisor ' + vm.serviciosmasivo
        : ''
      // eslint-disable-next-line new-cap
      const doc = new jsPDF('l', 'pt')
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(13)
      doc.text(
        'Reporte de ' +
        tipodoc +
        '       Desde ' +
        moment(vm.dateFrom).format('DD/MM/YYYY') +
        ' Hasta ' +
        moment(vm.dateTo).format('DD/MM/YYYY') +
        '       ' +
        emisor,
        40,
        40
      )
      doc.autoTable(columns, vm.rows, {
        margin: { top: 60 }
      })
      addFooters(doc)
      doc.save('smartdigitalRegistros.pdf')
    },
    exportXMLDetail (reg) {
      this.rowtempxml = []
      this.rowtempxml.push(this.detailXML(reg))
      // console.log(this.rowtempxml)
      this.exportXML(this.rowtempxml)
    },
    async openDetail (reg) {
      //  console.log('openDetail')
      if (this.co_rol === '3') {
        const anniomes =
        moment(reg.fecha, 'DD/MM/YYYY HH:mm:ss a').format('YYYY') +
        '-' +
        moment(reg.fecha, 'DD/MM/YYYY HH:mm:ss a').format('MM')
        window.open(
          ENDPOINT_PATH_V2 +
        'archivos/' +
        reg.rif +
        '/' +
        anniomes +
        '/' +
        reg.rif +
        reg.numerodocumento
        )
      } else {
        this.rowtempxml = []
        this.detallesDoc = []
        if (reg.cod) {
          const detalles = await axios.get(ENDPOINT_PATH_V2 + 'reporte/facturas/detalles/' + reg.cod)
          // this.detallesDoc = detalles.data.data
          // console.log(detalles.data.data.length)

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
              console.log('datosafectado')
              console.log(datosafectado[0])
              this.tipodocafectado = datosafectado[0].tipodocumento
              this.fechaafectado = moment(datosafectado[0].fecha).format('DD/MM/YYYY hh:mm:ss a')
              this.numeroafectado = datosafectado[0].numerointerno.length > 0 ? datosafectado[0].numerointerno : reg.relacionado
            })
          }
          reg.subtotal = detalles.data.data.length > 0 ? subtotaldetalle : reg.subtotal
        }
        // console.log(this.detallesDoc)
        reg.fecha = moment(reg.fecha, 'DD/MM/YYYY hh:mm:ss a')
        this.rowtempxml.push(this.detailXML(reg))
        this.viewdetail = true
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
      }
    },
    searchCliente (val, update, abort) {
      if (val.length < 3) {
        abort()
        return
      }
      update(() => {
        if (val === '') {
          this.optionscliente = this.clientes
        } else {
          const needle = val.toLowerCase()
          this.optionscliente = this.clientes.filter(
            (v) => v.namerif.toLowerCase().indexOf(needle) > -1
          )
        }
      })
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
    changeImpuesto () {
      this.exento = undefined
      this.impuestog = undefined
      this.impuestor = undefined
      this.impuestoigtf = undefined
      switch (this.modelimpuesto.cod) {
        case 1:
          this.exento = true
          break
        case 2:
          this.impuestog = true
          break
        case 3:
          this.impuestor = true
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break
        case 4:
          this.impuestoigtf = true
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break
        default:
          console.log('Sorry, we are out of.')
      }
      this.listarfacturas()
    },
    changeCliente () {
      this.cedulacliente = this.modelcliente?.rif
      this.listarfacturas()
    },
    changeSede () {
      this.disable = true
      this.numerodocumento = ''
      this.idserviciosmasivo = this.modelsede?.cod
      this.serviciosmasivo = this.modelsede?.namerif
      if (this.modelsede?.cod) {
        this.disable = false
      }
      this.listarfacturas()
    },
    changeTipo () {
      // this.disable = true
      this.idtipodocumento = this.modeltipo.cod
      this.tipodocumento = this.modeltipo.name
      // this.numerodocumento = ''
      this.listarfacturas()
    },
    changeCodes () {
      console.log(this.modelcodes?.cod)
      this.idcodigocomercial = this.modelcodes?.cod
      this.codigocomercial = this.modelcodes?.namecode
      console.log(this.idcodigocomercial)
      console.log(this.codigocomercial)
      this.listarfacturas()
    },
    redistribuir () {
      const body = {
        rif: this.rif_sede_seleted
      }
      const url = ENDPOINT_PATH_V2 + 'archivos/redistribuir'
      axios.post(
        url,
        body
      ).then(async response => {
        Notify.create('Documentos redidtribuidos con exito ')
      }).catch(error => {
        Notify.create('Problemas al listar Tipos de documentos ' + error)
      })
    },
    exportarLotes () {
      const $this = this
      /* const arregloOriginal = this.rows.map(item => ({
        correlativo: item.numerodocumento,
        annio: moment(item.fecha, 'DD/MM/YYYY hh:mm:ss a').format('YYYY'),
        mes: moment(item.fecha, 'DD/MM/YYYY hh:mm:ss a').format('MM')
      })) */
      // console.log('Arreglo de arreglos: ', arregloDeArreglos)
      const desde =
        this.numerodocumento.length > 0
          ? undefined
          : moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const hasta =
        this.numerodocumento.length > 0
          ? undefined
          : moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')

      const body = {
        idserviciosmasivo: this.modelsede?.cod
          ? this.modelsede.cod
          : this.co_rol === '3'
            ? this.co_sede
            : undefined,
        idtipodocumento: this.modeltipo?.cod,
        idcodigocomercial: this.modelcodes?.cod,
        cedulacliente: this.modelcliente?.rif,
        numerodocumento:
          this.numerodocumento.length > 0 ? this.numerodocumento : undefined,
        desde: desde,
        hasta: hasta,
        exento: this.exento,
        impuestog: this.impuestog,
        impuestor: this.impuestor,
        impuestoigtf: this.impuestoigtf,
        rif: $this.rif_sede,
        estatus: 4
      }
      const url = ENDPOINT_PATH_V2 + 'archivos/exportarlote'
      // console.log('2 Segundo INDICE: ', indice)
      // console.log(body)
      axios.post(
        url,
        body,
        { responseType: 'arraybuffer' }
      ).then(async response => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = window.URL.createObjectURL(blob)
        link.download = $this.rif_sede + '-' + moment().format('YYYYMMDDhhmmss') + '.zip'
        link.click()
        window.URL.revokeObjectURL(link.href)
        // Notify.create('Documentos exportados con exito ')
      }).catch(error => {
        Notify.create('Problemas al listar Tipos de documentos ' + error)
      })
    },
    listartipos () {
      axios
        .get(ENDPOINT_PATH_V2 + 'tipodocumento')
        .then(async (response) => {
          const datos = response.data.data
          this.optionstipo = []
          const obj = {}
          obj.cod = undefined
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
          const datos = response.data.data
          this.optionssede = []
          for (const i in datos) {
            if (datos[i].razonsocial.length > 0) {
              const obj = {}
              obj.cod = datos[i].id
              obj.name = datos[i].razonsocial
              obj.rif = datos[i].rif
              obj.namerif = datos[i].razonsocial + ' ' + datos[i].rif
              obj.tokenservicios = datos[i].tokenservicios
              if (datos[i].estatus === '0' && this.co_rol === '1') {
                this.optionssede.push(obj)
              }
              if (datos[i].estatus === '1') {
                this.optionssede.push(obj)
              }
              // this.optionssede.push(obj)
            }
          }
          this.emisores = this.optionssede
          // this.rifs = this.optionssede
        })
        .catch((error) => {
          Notify.create('Problemas al listar Sedes ' + error)
        })
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
        })
        .catch((error) => {
          Notify.create('Problemas al listar Codigos comerciales ' + error)
        })
    },
    buscarDetail (row) {
      // console.log(this.co_rol)
      // console.log(row)
      const body = {
        idserviciosmasivo: row.idserviciosmasivo,
        numerodocumento: row.relacionado
      }
      axios
        .post(ENDPOINT_PATH_V2 + 'reporte/facturas/relacionado', body)
        .then(async (response) => {
          const datos = response.data.data
          const obj = {}
          obj.cod = datos[0].id
          obj.logo = ENDPOINT_PATH_V2 + 'imagen/' + datos[0].rif + '.png'
          obj.idserviciosmasivo = datos[0].idserviciosmasivo
          obj.razonsocial = datos[0].razonsocial
          obj.rif = datos[0].rif
          obj.relacionado = datos[0].relacionado
          obj.piedepagina = datos[0].piedepagina
          obj.direccion = datos[0].direccion
          obj.telefono = datos[0].telefono
          obj.trackingid = datos[0].trackingid
          obj.numerodocumento = datos[0].numerodocumento
          obj.tipodocumento = datos[0].tipodocumento
          obj.abrev = datos[0].abrev
          obj.cedulacliente = datos[0].cedulacliente
          obj.nombrecliente = datos[0].nombrecliente
          obj.direccioncliente = datos[0].direccioncliente
          obj.telefonocliente = datos[0].telefonocliente
          obj.estatus = datos[0].estatus
          obj.observacion = datos[0].observacion
          obj.fecha = moment(datos[0].fecha).format('DD/MM/YYYY hh:mm:ss a')
          obj.fechasolo = moment(datos[0].fecha).format('DD/MM/YYYY')
          obj.hora = moment(datos[0].fecha).format('hh:mm:ss a')
          obj.subtotal = datos[0].subtotal
          obj.total = datos[0].total

          obj.tasag = datos[0].tasag ? datos[0].tasag + '%' : '0%'
          obj.tasar = datos[0].tasar ? datos[0].tasar + '%' : '0%'
          obj.tasaigtf = datos[0].tasaigtf ? datos[0].tasaigtf + '%' : '0%'

          obj.exento = datos[0].exento || 0
          obj.exentoN = datos[0].exento || 0
          obj.baseg = datos[0].baseg || 0
          obj.basegN = datos[0].baseg || 0
          obj.impuestogN = datos[0].impuestog || 0
          obj.baser = datos[0].baser || 0
          obj.impuestorN = datos[0].impuestor || 0
          obj.baseigtf = datos[0].baseigtf || 0
          obj.baseigtfN = datos[0].baseigtf || 0
          obj.impuestoigtfN = datos[0].impuestoigtf || 0

          datos[0].totalxml =
            Number(obj.exentoN) + Number(obj.basegN) + Number(obj.impuestogN)
          datos[0].grandtotalxml =
            Number(datos[0].totalxml) +
            Number(obj.baseigtfN) +
            Number(obj.impuestoigtfN)
          obj.totalxml = datos[0].totalxml
          obj.grandtotalxml = datos[0].grandtotalxml

          obj.exento = this.completarDecimales(obj.exento)
          obj.baseg = this.completarDecimales(obj.baseg)
          obj.impuestog = this.completarDecimales(obj.impuestogN)
          obj.baser = this.completarDecimales(obj.baser)
          obj.impuestor = this.completarDecimales(obj.impuestorN)
          obj.baseigtf = this.completarDecimales(obj.baseigtf)
          obj.impuestoigtf = this.completarDecimales(obj.impuestoigtfN)
          this.openDetail(obj)
        })
        .catch((error) => {
          Notify.create('Problemas al Buscar factura ' + error)
        })
    },
    crearbitacora (desde, hasta, idevento) {
      let observacion = ''
      let fechas = ' desde el ' + desde + ' hasta el ' + hasta
      const tipodoc = this.modeltipo.name ? ', ' + this.modeltipo.name : ''
      observacion += tipodoc
      const cliente = this.modelsede?.name
        ? ', cliente emisor ' + this.modelsede.namerif
        : ''
      observacion += cliente
      const tipoimpuesto = this.modelimpuesto.name
        ? ', tipo de impuesto ' + this.modelimpuesto.name
        : ''
      observacion += tipoimpuesto
      const clientefinal = this.modelcliente?.rif
        ? ', cliente consumidor ' + this.modelcliente.namerif
        : ''
      observacion += clientefinal

      if (this.numerodocumento.length > 0) {
        fechas = ''
        observacion += ', N° de control ' + this.numerodocumento
      }
      observacion += fechas
      axios.post(ENDPOINT_PATH_V2 + 'bitacora', {
        idusuario: this.idusuario,
        idevento: idevento,
        ip: this.term,
        observacion: observacion,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss')
      })
    },
    async onSendEmail (row) {
      await axios
        .post(ENDPOINT_PATH_V2 + 'email', {
          numerodocumento: row.numerodocumento,
          rif: row.rif,
          email: row.emailcliente
        })
        .then(() => {
          Notify.create('Correo enviado sin problema ')
        })
    },
    renderWindownRedirectEmail (data) {
      this.dataEmail = data
      this.$q
        .dialog({
          component: ModalRedirectEmail,
          componentProps: {
            email: this.dataEmail
          }
        })
        .onOk(() => {
          this.updateEmailState(this.dataEmail)
        })
    },
    updateEmailState (record) {
      const { trackingid } = record
      const lista = this.rows.map((row) => {
        if (row.trackingid === trackingid) {
          row.enviarcorreo = 'Enviado'
          row.colorEmailStatus = 'blue'
        }
        return row
      })
      this.rows = lista
    },
    listarfacturas () {
      const desde =
        this.numerodocumento.length > 0
          ? undefined
          : moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const hasta =
        this.numerodocumento.length > 0
          ? undefined
          : moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const body = {
        idserviciosmasivo: this.modelsede?.cod
          ? this.modelsede.cod
          : this.co_rol === '3'
            ? this.co_sede
            : undefined,
        idtipodocumento: this.modeltipo?.cod,
        idcodigocomercial: this.modelcodes?.cod,
        cedulacliente: this.modelcliente?.rif,
        numerodocumento:
          this.numerodocumento.length > 0 ? this.numerodocumento : undefined,
        desde: desde,
        hasta: hasta,
        exento: this.exento,
        impuestog: this.impuestog,
        impuestor: this.impuestor,
        impuestoigtf: this.impuestoigtf,
        estatus: 4
      }
      this.crearbitacora(desde, hasta, 3)
      this.loading = true
      this.btnDisable = true
      axios
        .post(ENDPOINT_PATH_V2 + 'reporte/facturas', body)
        .then(async (response) => {
          const datos = response.data.data
          this.rows = []
          this.tempxml = []
          this.clientes = []
          this.totalbaseg = 0
          this.totalbaser = 0
          this.totalbaseigtf = 0
          this.totalimpuestog = 0
          this.totalimpuestor = 0
          this.totalimpuestoigtf = 0
          for (const i in datos) {
            const obj = {}
            obj.cod = datos[i].id
            obj.logo = ENDPOINT_PATH_V2 + 'imagen/' + datos[i].rif + '.png'
            obj.idserviciosmasivo = datos[i].idserviciosmasivo
            obj.razonsocial = datos[i].razonsocial
            obj.rif = datos[i].rif
            obj.piedepagina = datos[i].piedepagina
            obj.relacionado = datos[i].relacionado
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
            obj.estatuscorreo = datos[i].estatuscorreo
            obj.enviocorreo = datos[i].enviocorreo
            obj.enviarcorreo =
              datos[i].enviocorreo === '0'
                ? 'N/A'
                : datos[i].estatuscorreo === '1'
                  ? 'Enviado'
                  : 'No enviado'

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

            this.totalbaseg += Number(obj.basegN)
            this.totalbaser += Number(obj.baserN)
            this.totalbaseigtf += Number(obj.baseigtfN)
            this.totalimpuestog += Number(obj.impuestogN)
            this.totalimpuestor += Number(obj.impuestorN)
            this.totalimpuestoigtf += Number(obj.impuestoigtfN)

            datos[i].totalxml =
              Number(obj.exentoN) + Number(obj.basegN) + Number(obj.impuestogN)
            datos[i].grandtotalxml =
              Number(datos[i].totalxml) +
              Number(obj.baseigtfN) +
              Number(obj.impuestoigtfN)
            obj.totalxml = datos[i].totalxml
            obj.grandtotalxml = datos[i].grandtotalxml

            obj.exento = this.completarDecimales(obj.exento)
            obj.baseg = this.completarDecimales(obj.baseg)
            obj.impuestog = this.completarDecimales(obj.impuestogN)
            obj.baser = this.completarDecimales(obj.baser)
            obj.impuestor = this.completarDecimales(obj.impuestorN)
            obj.baseigtf = this.completarDecimales(obj.baseigtf)
            obj.impuestoigtf = this.completarDecimales(obj.impuestoigtfN)
            obj.colorEmailStatus = this.getColorEmailStatus(datos[i])
            this.rows.push(obj)
            this.tempxml.push(this.detailXML(datos[i]))
            this.crearClientes(obj)
          }
          this.totalbaseg = this.completarDecimales(this.totalbaseg)
          this.totalbaser = this.completarDecimales(this.totalbaser)
          this.totalbaseigtf = this.completarDecimales(this.totalbaseigtf)

          this.totalimpuestog = this.completarDecimales(this.totalimpuestog)
          this.totalimpuestor = this.completarDecimales(this.totalimpuestor)
          this.totalimpuestoigtf = this.completarDecimales(
            this.totalimpuestoigtf
          )

          this.loading = false
          this.btnDisable = this.rows.length === 0 || false
        })
        .catch((error) => {
          Notify.create('Problemas al listar Reporte ' + error)
        })
    },
    detailXML (row) {
      const objxml = {}
      objxml.DocumentDto = {}
      objxml.DocumentDto.CompanyFiscalRegistry = row.rif
      objxml.DocumentDto.CompanyName = row.razonsocial
      objxml.DocumentDto.CompanyAddressOne = row.direccion
      objxml.DocumentDto.CompanyAddressFour = row.telefono
      objxml.DocumentDto.id = row.numerointerno
      objxml.DocumentDto.Currency = 'VES'

      objxml.DocumentDto.ProductLiteral = row.tipodocumento
      objxml.DocumentDto.SerieLiteral = row.numerodocumento
      // console.log(row.fecha)
      objxml.DocumentDto.DayDate = moment(
        row.fecha,
        'DD/MM/YYYY hh:mm:ss a'
      ).format('DD')
      objxml.DocumentDto.tMonthDate = moment(
        row.fecha,
        'DD/MM/YYYY hh:mm:ss a'
      ).format('MM')
      objxml.DocumentDto.YearDate = moment(
        row.fecha,
        'DD/MM/YYYY hh:mm:ss a'
      ).format('YYYY')

      objxml.DocumentDto.EmissionTimeFormatted = moment(
        row.fecha,
        'DD/MM/YYYY hh:mm:ss a'
      ).format('hh:mm:ss a')
      objxml.DocumentDto.Name = row.nombrecliente
      objxml.DocumentDto.FiscalRegistry = row.cedulacliente
      objxml.DocumentDto.Address = row.direccioncliente
      objxml.DocumentDto.Phone = row.telefonocliente
      objxml.DocumentDto.CreditNoteText = ''
      objxml.DocumentDto.Note1 = row.observacion

      objxml.DocumentDto.TaxBaseVES = row.baseg
      objxml.DocumentDto.ExemptAmountVES = row.exento
      objxml.DocumentDto.TaxPercentVES = row.tasag
      objxml.DocumentDto.TaxAmountVES = row.impuestog
      objxml.DocumentDto.TotalVES = this.completarDecimales(row.totalxml)

      objxml.DocumentDto.Annulled = row.estatus === '2' ? 'true' : 'false'
      objxml.DocumentDto.IGTFPercentage = row.tasaigtf
      objxml.DocumentDto.IGTFBaseAmountVES = row.baseigtf
      objxml.DocumentDto.IGTFAmountVES = row.impuestoigtf
      objxml.DocumentDto.GrandTotalVES = this.completarDecimales(
        row.grandtotalxml
      )

      return objxml
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
    crearClientes (row) {
      const obj = {}
      const namerif = row.cedulacliente + ' ' + row.nombrecliente
      if (this.clientes.findIndex((item) => item.namerif === namerif) === -1) {
        obj.rif = row.cedulacliente
        obj.namerif = namerif
        this.clientes.push(obj)
      }
    },
    isAnulado (row) {
      return row.estatus === '2' ? 'true' : false
    },
    changeTipos (valor) {
      this.tipofactura = valor
      this.tipocredito = valor
      this.tipodebito = valor
      this.tipoorden = valor
      this.tipoguia = valor
    }
  },
  watch: {
    dateFrom: function (val) {
      this.listarfacturas()
    },
    dateTo: function (val) {
      this.listarfacturas()
    },
    tipofactura: function (val) {
      this.tipotodos = ((!val && !this.tipocredito && !this.tipodebito && !this.tipoorden && !this.tipoguia) ||
      (val && this.tipocredito && this.tipodebito && this.tipoorden && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      }
      // this.listarfacturas()
    },
    tipocredito: function (val) {
      console.log(val)
      this.tipotodos = ((!val && !this.tipofactura && !this.tipodebito && !this.tipoorden && !this.tipoguia) ||
      (val && this.tipofactura && this.tipodebito && this.tipoorden && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      }
      // this.listarfacturas()
    },
    tipodebito: function (val) {
      console.log(val)
      this.tipotodos = ((!val && !this.tipocredito && !this.tipocredito && !this.tipoorden && !this.tipoguia) ||
      (val && this.tipocredito && this.tipocredito && this.tipoorden && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      }
      // this.listarfacturas()
    },
    tipoorden: function (val) {
      console.log(val)
      this.tipotodos = ((!val && !this.tipocredito && !this.tipodebito && !this.tipodebito && !this.tipoguia) ||
      (val && this.tipocredito && this.tipodebito && this.tipodebito && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      }
      // this.listarfacturas()
    },
    tipoguia: function (val) {
      console.log(val)
      this.tipotodos = ((!val && !this.tipocredito && !this.tipodebito && !this.tipoorden && !this.tipoorden) ||
      (val && this.tipocredito && this.tipodebito && this.tipoorden && this.tipoorden)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      }
      // this.listarfacturas()
    }
  },
  mounted () {
    fetch('https://api.ipify.org?format=json')
      .then((x) => x.json())
      .then(({ ip }) => {
        this.term = ip
        this.colspan = this.co_rol === '1' ? 8 : this.co_rol === '2' ? 7 : 6
        if (this.co_sede_seleted) {
          if (this.co_rol !== '1') {
            this.colspan = 6
          }
          const obj = {}
          obj.cod = this.co_sede_seleted
          obj.rif = this.rif_sede_seleted
          obj.razonsocial = this.tx_sede_seleted
          this.idserviciosmasivo = this.co_sede_seleted
          obj.namerif = obj.razonsocial + ' ' + obj.rif
          this.serviciosmasivo = obj.namerif
          this.modelsede = obj
          this.disabledSede = true
          this.disable = false
        }
        if (this.co_rol === '3') {
          this.disable = false
        }
        this.listarsedes()
        this.listartipos()
        this.listarfacturas()
        this.getCodes()
        // console.log((this.co_rol === '3' || this.co_rol === '4') || (this.co_rol === '2' && this.co_sede_seleted))
        this.columnseleted =
          this.co_rol === '2' && !this.co_sede_seleted
            ? this.columns2
            : this.co_rol === '1' || this.co_rol === '3'
              ? this.columns
              : this.columns3
        /* setInterval(() => {
        this.listarfacturas()
      }, 3000) */
      })
  }
}
</script>

<style>
.text-caption {
  font-size: inherit;
}
.filtros {
  padding: 3px 7px;
  background: #ECF6FF;
  border: solid 1px #5a8f89;
  margin: 5px;
  border-radius: 8px;
  font-size: 13px;
}
.totales {
  font-weight: bolder;
  color: blue;
}

.redirectEmail-wrapper {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.redirectEmail-header {
  margin: 0;
  font-size: 1.2rem;
}

.redicrectEmail-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
.q-card {
    width: auto;
}
</style>
<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  min-height: 70vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #f2f2f2

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
