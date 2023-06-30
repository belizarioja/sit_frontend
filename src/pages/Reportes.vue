<template>
  <div class="q-pa-md">
    <div class="row">
      <span style="margin: 0 20px;font-size: 25px;font-weight: bolder;">Reportes</span>
    </div>
    <div class="row">
        <q-select
          v-if="co_rol === '1' || co_rol === '2'"
          label="Buscar por Nombre o RIF del Emisor"
          dense
          class="col-md-3 col-sm-12 col-xs-12"
          filled
          v-model="modelsede"
          :disable="disabledSede"
          use-input
          hide-selected
          fill-input
          clearable
          options-dense
          option-label="namerif"
          option-value="cod"
          input-debounce="0"
          :options="optionssede"
          @update:model-value="changeSede()"
          @input:="changeSede()"
          @filter="searchEmisor"
          style="padding: 5px;"
        />
        <q-select
          v-if="co_rol === '1' || co_rol === '2'"
          class="col-md-3 col-sm-12 col-xs-12"
          label="Buscar Código de Operación"
          dense
          filled
          v-model="modelcodes"
          use-input
          hide-selected
          fill-input
          clearable
          options-dense
          option-label="namecode"
          option-value="cod"
          input-debounce="0"
          :options="optionscodes"
          @update:model-value="changeCodes()"
          @input:="changeCodes()"
          @filter="searchCodes"
          style="padding: 5px;"
        />
        <q-select
          dense
          class="col-md-3 col-sm-6 col-xs-12"
          filled
          options-dense
          v-model="modeltipo"
          :options="optionstipo"
          option-label="name"
          option-value="cod"
          label="Tipo de Documento"
          @update:model-value="changeTipo()"
          style="padding: 5px;"
        />
        <q-input
          filled
          class="col-md-3 col-sm-6 col-xs-12"
          label="Buscar por N° Control"
          v-model="numerodocumento"
          @input:="listarfacturas"
          style="padding: 5px;"
          :disable="disable"
          dense
        >
          <template v-slot:append>
            <q-icon
             v-if="numerodocumento.length > 0"
             name="close"
             @click="numerodocumento = '', listarfacturas()"
             class="cursor-pointer"
            />
          </template>
          <template v-slot:after>
            <q-btn dense color="primary" icon="search" @click="listarfacturas" :disable="disable"/>
          </template>
        </q-input>
    </div>
    <div class="row">
      <q-select
          label="Buscar por Nombre o RIF del cliente"
          dense
          class="col-md-3 col-sm-6 col-xs-12"
          filled
          v-model="modelcliente"
          use-input
          :disable="disable"
          hide-selected
          fill-input
          clearable
          options-dense
          option-label="namerif"
          option-value="rif"
          input-debounce="0"
          :options="optionscliente"
          @update:model-value="changeCliente()"
          @input:="changeCliente()"
          @filter="searchCliente"
          style="padding: 5px;"
        />
        <q-input
          dense
          filled
          label="Desde"
          mask="date"
          v-model="dateFrom"
          class="col-md-3 col-sm-6 col-xs-6"
          style="padding: 5px;">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFrom" :locale="myLocale">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          dense
          filled
          label="Hasta"
          v-model="dateTo"
          class="col-md-3 col-sm-6 col-xs-6"
          style="padding: 5px;"
          :locale="myLocale"
          mask="date">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateTo" :locale="myLocale">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          dense
          class="col-md-3 col-sm-6 col-xs-12"
          filled
          options-dense
          v-model="modelimpuesto"
          :options="optionsimpuesto"
          option-label="name"
          option-value="cod"
          label="Tipo de Impuesto"
          @update:model-value="changeImpuesto()"
          style="padding: 5px;"
        />
    </div>
    <div class="row q-pa-md" style="">
      <q-table
        class="my-sticky-header-table"
        :title="modeltipo.cod ? modeltipo.name : titulotabla"
        :rows="rows"
        :columns="columnseleted"
        row-key="name"
        :pagination="initialPagination"
        style="overflow: auto;"
        :loading="loading"
        no-data-label="No hay registros!"
      >
       <template v-slot:top-right>
        <div class="row">
          <q-btn color="primary" icon="print" label="Imprimir" @click="openImprimir" :disable="loading" />
        </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td v-if="(co_rol === '1' || co_rol === '3') || (co_rol === '2' && !co_sede_seleted)" key="rif" :props="props" style="display: grid;text-align:left;height: 51px;">
              <span style="font-weight: bolder; width: 220px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{ props.row.razonsocial }}</span>
              <span style="font-style: italic;">RIF: {{ props.row.rif }}</span>
            </q-td>
            <q-td v-if="co_rol === '1' || co_rol === '3'"  key="trackingid" :props="props">
              {{ props.row.trackingid }}
            </q-td>
            <q-td key="tipodocumento" :props="props">
              {{ props.row.tipodocumento }}
            </q-td>
            <q-td key="numerodocumento" :props="props">
              <span style="font-weight: bolder;"> {{ props.row.numerodocumento }}</span>
            </q-td>
            <q-td key="fecha" :props="props">
              {{ props.row.fecha }}
            </q-td>
            <q-td key="nombrecliente" :props="props" style="display: grid;text-align:left;height: 51px;">
              <span style="font-weight: bolder; width: 180px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">{{ props.row.nombrecliente }}</span>
              <span style="font-style: italic;">{{ props.row.abrev }}: {{ props.row.cedulacliente }}</span>
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
            <q-td key="relacionado" :props="props">
              <q-badge v-if="props.row.relacionado"
                color="green"
                style="cursor: pointer;padding: 5px 10px;"
              >
              {{ props.row.relacionado }}
            </q-badge>
            </q-td>
          </q-tr>
        </template>
        <!-- <template v-slot:bottom-row>
          <q-tr>
            <q-td :colspan="colspan" class="totales">
              Totales
            </q-td>
            <q-td style="text-align: right;"  class="totales">
              {{totalbaseg}}
            </q-td>
            <q-td style="text-align: right;" class="totales">
              {{totalimpuestog}}
            </q-td>
            <q-td  class="totales">
            </q-td>
            <q-td style="text-align: right;" class="totales">
              {{totalbaser}}
            </q-td>
            <q-td style="text-align: right;" class="totales">
              {{totalimpuestor}}
            </q-td>
            <q-td  class="totales">
            </q-td>
            <q-td style="text-align: right;" class="totales">
              {{totalbaseigtf}}
            </q-td>
            <q-td style="text-align: right;" class="totales">
              {{totalimpuestoigtf}}
            </q-td>
            <q-td  class="totales">
            </q-td>
            <q-td  class="totales">
            </q-td>
            <q-td  class="totales">
            </q-td>
          </q-tr>
        </template> -->
      </q-table>
      <q-dialog v-model="viewPrint" persistent>
        <q-card style="width: 1050px; max-width: 80vw;">
          <q-card-actions align="right">
              <q-btn label="Cerrar" color="secondary" v-close-popup />
              <q-btn color="primary" icon="print" label="Imprimir" @click="imprimir" />
            </q-card-actions>
          <div id="areaImprimir"  style="width: 100%;">
            <table style="width: 99%;margin: 7px;">
              <thead>
                <tr>
                  <td style="width: 80%;">Imprenta Digital Rif: J 000000000-0</td>
                  <td style="width: 20%;text-align: right;">Usuario: {{tx_nombre}}</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colspan="2" style="text-align: center;height: 40px;font-weight: bolder;">REPORTE DOCUMENTOS PROCESADOS</td>
                </tr>
                <tr>
                  <td style="height: 20px;">Filtrado por:</td>
                  <td style="text-align: right;">Fecha reporte: {{dateHoy}}</td>
                </tr>
                <tr>
                  <td style="height: 20px; font-size: 12px;">
                    {{filtroDesde}}{{filtroHasta}}{{filtroEmisor}}
                    {{filtroTipo}}
                  </td>
                  <td style="text-align: right;">Hora reporte: {{hourHoy}}</td>
                </tr>
                <tr>
                  <td colspan="2" style="height: 20px; font-size: 12px;">
                    {{filtroImpuesto}}{{filtroCliente}}{{filtroNumero}}
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="width: 99%;margin: 5px;border: 1px solid #666666;border-collapse: collapse;">
              <thead>
                <tr>
                  <template v-for="col in columnsPrintf"  :key="col.name">
                    <td
                      style="border: 1px solid #666666;border-collapse: collapse;text-align: center;font-weight: bolder;"
                      :style="col.name === 'baser' || col.name === 'baseg' || col.name === 'baseigtf' ? 'width: 95px;' : 'width: auto;'"
                    >{{col.label}}</td>
                  </template>
                </tr>
              </thead>
              <tbody>
                <template v-for="row in rows" :key="row.name">
                  <tr>
                    <td style="border: 1px solid #666666;border-collapse: collapse;padding: 0 0 0 5px;">{{row.tipodocumento}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;padding: 0 0 0 5px;">{{row.numerodocumento}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;padding: 0 0 0 5px;">{{row.fecha}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;padding: 0 0 0 5px;">{{row.nombrecliente}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.exento}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.baseg}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.impuestog}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.baser}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.impuestor}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.baseigtf}}</td>
                    <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;">{{row.impuestoigtf}}</td>
                  </tr>
                </template>
                <tr>
                  <td colspan="5" style="border: 1px solid #666666;border-collapse: collapse;padding: 0 0 0 5px;font-weight: bolder;"> Totales</td>
                  <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;font-weight: bolder;">{{totalbaseg}}</td>
                  <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;font-weight: bolder;">{{totalimpuestog}}</td>
                  <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;font-weight: bolder;">{{totalbaser}}</td>
                  <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;font-weight: bolder;">{{totalimpuestor}}</td>
                  <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;font-weight: bolder;">{{totalbaseigtf}}</td>
                  <td style="border: 1px solid #666666;border-collapse: collapse;text-align: right;padding: 0 5px 0 0;font-weight: bolder;">{{totalimpuestoigtf}}</td>
                </tr>
              </tbody>
            </table>
            <!--<q-card-section class="row items-center">
              <q-table
                dense
                :rows="rows"
                :columns="columnsPrintf"
                row-key="num"
                :rows-per-page-options="[0]"
                separator="cell"
                v-model:pagination="paginationPrint"
                style="width: 100%;"
              >
            </q-table>
            </q-card-section> -->
          </div>
            <iframe name="print_frame" width="0" height="0" frameborder="0" src="about:blank"></iframe>
            <q-card-actions align="right">
              <q-btn label="Cerrar" color="secondary" v-close-popup />
              <q-btn color="primary" icon="print" label="Imprimir" @click="imprimir" />
            </q-card-actions>
          </q-card>
      </q-dialog>
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
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
        firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
        format24h: true,
        pluralDay: 'dias'
      },
      term: ref(''),
      totalbaseg: ref('0,00'),
      totalbaser: ref('0,00'),
      totalbaseigtf: ref('0,00'),
      totalimpuestog: ref('0,00'),
      totalimpuestor: ref('0,00'),
      totalimpuestoigtf: ref('0,00'),
      disabledSede: ref(false),
      viewdetail: ref(false),
      viewPrint: ref(false),
      viewPrint2: ref(false),
      idserviciosmasivo: ref(undefined),
      idtipodocumento: ref(undefined),
      serviciosmasivo: ref(undefined),
      tipodocumento: ref(undefined),
      colspan: ref(''),
      dateHoy: moment().format('DD/MM/YYYY'),
      hourHoy: moment().format('hh:mm:ss a'),
      tx_nombre: sessionStorage.getItem('tx_nombre'),
      loading: ref(false),
      numerodocumento: ref(''),
      titulotabla: ref('Documentos'),
      disable: ref(true),
      dateFrom: ref(moment().format('YYYY-MM-DD')),
      dateTo: ref(moment().format('YYYY-MM-DD')),
      co_rol: sessionStorage.getItem('co_rol'),
      co_sede: sessionStorage.getItem('co_sede'),
      initialPagination: {
        page: 1,
        rowsPerPage: 10 // 0 means all rows
      },
      paginationPrint: {
        page: 1,
        rowsPerPage: 0 // 0 means all rows
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
          field: row => row.razonsocial,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'trackingid', align: 'left', label: 'Referencia ID', field: 'trackingid', sortable: true },
        { name: 'tipodocumento', align: 'left', label: 'Documento', field: 'tipodocumento', sortable: true },
        { name: 'numerodocumento', align: 'left', label: 'Número de Control', field: 'numerodocumento', sortable: true },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha' },
        { name: 'nombrecliente', align: 'left', label: 'Nombre Cliente', field: 'nombrecliente' },
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
        { name: 'relacionado', label: 'Relacionado', field: 'relacionado' }
      ],
      columns2: [
        {
          name: 'rif',
          required: true,
          label: 'Cliente emisor',
          align: 'left',
          field: row => row.razonsocial,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'tipodocumento', align: 'left', label: 'Documento', field: 'tipodocumento', sortable: true },
        { name: 'numerodocumento', align: 'left', label: 'Número de Control', field: 'numerodocumento', sortable: true },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha' },
        { name: 'nombrecliente', align: 'left', label: 'Nombre Cliente', field: 'nombrecliente' },
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
        { name: 'relacionado', label: 'Relacionado', field: 'relacionado' }
      ],
      columns3: [
        { name: 'tipodocumento', align: 'left', label: 'Documento', field: 'tipodocumento', sortable: true },
        { name: 'numerodocumento', align: 'left', label: 'Número de Control', field: 'numerodocumento', sortable: true },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha' },
        { name: 'nombrecliente', align: 'left', label: 'Nombre Cliente', field: 'nombrecliente' },
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
        { name: 'relacionado', label: 'Relacionado', field: 'relacionado' }
      ],
      columnsPrintf: [
        { name: 'tipodocumento', align: 'left', label: 'Documento', field: 'tipodocumento', style: 'font-size: 10px;' },
        { name: 'numerodocumento', align: 'left', label: 'N° Control', field: 'numerodocumento', style: 'font-size: 10px;' },
        { name: 'fecha', align: 'left', label: 'Fecha y Hora', field: 'fecha', style: 'font-size: 10px;' },
        { name: 'nombrecliente', align: 'left', label: 'Cliente', field: 'nombrecliente', style: 'font-size: 10px;' },
        { name: 'exento', label: 'Exento', field: 'exento', style: 'font-size: 10px;' },
        { name: 'baseg', label: 'Imponible IVA', field: 'baseg', style: 'font-size: 10px;' },
        { name: 'impuestog', label: 'IVA', field: 'impuestog', style: 'font-size: 10px;' },
        { name: 'baser', label: 'Imponible Reducido', field: 'baser', style: 'font-size: 10px; width:50px;' },
        { name: 'impuestor', label: 'Reducido', field: 'impuestor', style: 'font-size: 10px;' },
        { name: 'baseigtf', label: 'Imponible IGTF', field: 'baseigtf', style: 'font-size: 10px;' },
        { name: 'impuestoigtf', label: 'IGTF', field: 'impuestoigtf', style: 'font-size: 10px;' }
      ],
      rows: [],
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
      idusuario: sessionStorage.getItem('id_usuario'),
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted')
    }
  },
  methods: {
    openImprimir () {
      this.viewPrint = true
    },
    imprimir () {
      window.frames.print_frame.document.body.innerHTML = document.getElementById('areaImprimir').innerHTML
      window.frames.print_frame.window.focus()
      window.frames.print_frame.window.print()
      this.viewPrint = false
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
          this.optionscliente = this.clientes.filter(v => v.namerif.toLowerCase().indexOf(needle) > -1)
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
    listartipos () {
      axios.get(ENDPOINT_PATH_V2 + 'tipodocumento').then(async response => {
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
      }).catch(error => {
        Notify.create('Problemas al listar Tipos de documentos ' + error)
      })
    },
    listarsedes () {
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
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
            this.optionssede.push(obj)
          }
        }
        this.emisores = this.optionssede
        // this.rifs = this.optionssede
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
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
    crearbitacora (desde, hasta, idevento) {
      let observacion = ''
      let fechas = ' desde el ' + desde + ' hasta el ' + hasta
      const tipodoc = this.modeltipo.name ? ', ' + this.modeltipo.name : ''
      observacion += tipodoc
      const cliente = this.modelsede?.name ? ', cliente emisor ' + this.modelsede.namerif : ''
      observacion += cliente
      const tipoimpuesto = this.modelimpuesto.name ? ', tipo de impuesto ' + this.modelimpuesto.name : ''
      observacion += tipoimpuesto
      const clientefinal = this.modelcliente?.rif ? ', cliente consumidor ' + this.modelcliente.namerif : ''
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
    listarfacturas () {
      const desde = this.numerodocumento.length > 0 ? undefined : moment(this.dateFrom, 'YYYY/MM/DD').format('YYYY-MM-DD')
      const hasta = this.numerodocumento.length > 0 ? undefined : moment(this.dateTo, 'YYYY/MM/DD').format('YYYY-MM-DD')
      this.filtroDesde = 'Desde ' + desde
      this.filtroHasta = ' Hasta ' + hasta
      this.filtroEmisor = this.modelsede?.cod ? ', Emisor ' + this.modelsede?.namerif : ', Emisor: Todos'
      this.filtroTipo = this.modeltipo?.cod ? ', ' + this.modeltipo?.name : ', Tipo documento: Todos'
      this.filtroCliente = this.modelcliente?.rif ? ', Cliente ' + this.modelcliente?.namerif : ', Cliente: Todos'
      this.filtroNumero = this.numerodocumento.length > 0 ? ', N° Control ' + this.numerodocumento : ', N° Control: Todos'
      this.filtroImpuesto = this.exento
        ? 'Exento ' : this.impuestog
          ? 'IVA' : this.impuestor
            ? 'Impuesto Reducido' : this.impuestoigtf
              ? 'IGTF' : 'Tipo impuesto: Todos'
      const body = {
        idserviciosmasivo: this.modelsede?.cod ? this.modelsede.cod : this.co_rol === '3' ? this.co_sede : undefined,
        idtipodocumento: this.modeltipo?.cod,
        idcodigocomercial: this.modelcodes?.cod,
        cedulacliente: this.modelcliente?.rif,
        numerodocumento: this.numerodocumento.length > 0 ? this.numerodocumento : undefined,
        desde: desde,
        hasta: hasta,
        exento: this.exento,
        impuestog: this.impuestog,
        impuestor: this.impuestor,
        impuestoigtf: this.impuestoigtf,
        estatus: 1
      }
      this.crearbitacora(desde, hasta, 3)
      this.loading = true
      axios.post(ENDPOINT_PATH_V2 + 'reporte/facturas', body).then(async response => {
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
          obj.relacionado = datos[i].relacionado
          obj.direccion = datos[i].direccion
          obj.telefono = datos[i].telefono
          obj.trackingid = datos[i].trackingid
          obj.numerodocumento = datos[i].numerodocumento
          obj.tipodocumento = datos[i].tipodocumento
          obj.abrev = datos[i].abrev
          obj.cedulacliente = datos[i].cedulacliente
          obj.nombrecliente = datos[i].nombrecliente
          obj.direccioncliente = datos[i].direccioncliente
          obj.telefonocliente = datos[i].telefonocliente
          obj.estatus = datos[i].estatus
          obj.observacion = datos[i].observacion
          obj.fecha = moment(datos[i].fecha).format('DD/MM/YYYY hh:mm:ss a')
          obj.fechasolo = moment(datos[i].fecha).format('DD/MM/YYYY')
          obj.hora = moment(datos[i].fecha).format('hh:mm:ss a')
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

          datos[i].totalxml = Number(obj.exentoN) + Number(obj.basegN) + Number(obj.impuestogN)
          datos[i].grandtotalxml = Number(datos[i].totalxml) + Number(obj.baseigtfN) + Number(obj.impuestoigtfN)
          obj.totalxml = datos[i].totalxml
          obj.grandtotalxml = datos[i].grandtotalxml

          obj.exento = this.completarDecimales(obj.exento)
          obj.baseg = this.completarDecimales(obj.baseg)
          obj.impuestog = this.completarDecimales(obj.impuestogN)
          obj.baser = this.completarDecimales(obj.baser)
          obj.impuestor = this.completarDecimales(obj.impuestorN)
          obj.baseigtf = this.completarDecimales(obj.baseigtf)
          obj.impuestoigtf = this.completarDecimales(obj.impuestoigtfN)
          this.rows.push(obj)
          this.tempxml.push(this.detailXML(datos[i]))
          this.crearClientes(obj)
        }
        this.totalbaseg = this.completarDecimales(this.totalbaseg)
        this.totalbaser = this.completarDecimales(this.totalbaser)
        this.totalbaseigtf = this.completarDecimales(this.totalbaseigtf)

        this.totalimpuestog = this.completarDecimales(this.totalimpuestog)
        this.totalimpuestor = this.completarDecimales(this.totalimpuestor)
        this.totalimpuestoigtf = this.completarDecimales(this.totalimpuestoigtf)

        this.loading = false
      }).catch(error => {
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
      objxml.DocumentDto.id = row.trackingid
      objxml.DocumentDto.Currency = 'VES'

      objxml.DocumentDto.ProductLiteral = row.tipodocumento
      objxml.DocumentDto.SerieLiteral = row.numerodocumento
      objxml.DocumentDto.DayDate = moment(row.fecha).format('DD')
      objxml.DocumentDto.tMonthDate = moment(row.fecha).format('MM')
      objxml.DocumentDto.YearDate = moment(row.fecha).format('YYYY')

      objxml.DocumentDto.EmissionTimeFormatted = moment(row.fecha).format('hh:mm:ss a')
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
      objxml.DocumentDto.GrandTotalVES = this.completarDecimales(row.grandtotalxml)

      return objxml
    },
    completarDecimales (cadena) {
      cadena = Intl.NumberFormat('de-DE').format(cadena.toFixed(2))
      const arreglo = cadena.split(',')
      cadena = arreglo.length === 1 ? cadena + ',00' : arreglo[1].length === 1 ? cadena + '0' : cadena
      return cadena
    },
    crearClientes (row) {
      const obj = {}
      const namerif = row.cedulacliente + ' ' + row.nombrecliente
      if (this.clientes.findIndex(item => item.namerif === namerif) === -1) {
        obj.rif = row.cedulacliente
        obj.namerif = namerif
        this.clientes.push(obj)
      }
    }
  },
  watch: {
    dateFrom: function (val) {
      console.log(val)
      this.listarfacturas()
    },
    dateTo: function (val) {
      console.log(val)
      this.listarfacturas()
    }
  },
  mounted () {
    fetch('https://api.ipify.org?format=json').then(x => x.json()).then(({ ip }) => {
      this.term = ip
      console.log('Mounted')
      console.log(this.tx_sede_seleted)
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
      console.log(this.co_rol)
      if (this.co_rol === '3') {
        this.disable = false
      }
      this.listarsedes()
      this.listartipos()
      this.listarfacturas()
      this.getCodes()
      // console.log((this.co_rol === '3' || this.co_rol === '4') || (this.co_rol === '2' && this.co_sede_seleted))
      this.columnseleted = (this.co_rol === '2' && !this.co_sede_seleted)
        ? this.columns2 : (this.co_rol === '1' || this.co_rol === '3') ? this.columns : this.columns3
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
  .totales{
    font-weight: bolder;
    color: blue;
  }
  @media print {
    * {
      display: none;
    }
    #printableTable {
      display: block;
    }
  }
  /* @media print{
    *{ display: none; }
    table { display: block; }
  } */
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
