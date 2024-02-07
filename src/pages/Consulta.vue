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
          <span class="filtros">Cliente emisor: {{ clienteEmisorfilter }}</span>
          <span class="filtros">Estatus: {{ estatusfilter }}</span>
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
        :filter="filterTable"
        no-data-label="No hay registros!">
        <template v-slot:top-left>
          <q-input dense debounce="300" color="primary" v-model="filterTable" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:top-right>
          <div style="display: inline;">
            <q-btn icon-right="print" class="q-ml-sm col-md-4 col-sm-3 col-xs-3" color="secondary" label="Imprimir" @click="openImprimir" :disable="btnDisable"/>
            <q-btn icon-right="file_download" class="q-ml-sm col-md-4 col-sm-3 col-xs-3" color="secondary" label="Exportar" @click="drawerExportar = true" :disable="btnDisable"/>
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
              {{ props.row.fechasolo + ' ' + props.row.hora }}
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
            <q-td key="totalimpuestos" :props="props">
              {{ props.row.totalimpuestos }}
            </q-td>
            <q-td key="estatus" :props="props">
              <q-badge v-if="isNormal(props.row)" class="normal">
                Normal
              </q-badge>
              <q-badge v-if="isAnulado(props.row)" class="anulado">
                Anulado
              </q-badge>
              <q-badge v-if="isDebito(props.row)" class="notadebito">
                Afectado Nota de débito
              </q-badge>
              <q-badge v-if="isCredito(props.row)" class="notacredito">
                Afectado Nota de crédito
              </q-badge>
            </q-td>
            <q-td key="detail" :props="props">
              <q-btn color="secondary" icon="visibility" @click="openDrawerDetalles(props.row)" />
            </q-td>
            <q-td key="enviarcorreo" :props="props">
              <q-btn :color="props.row.colorEmailStatus" :icon="props.row.iconoEmailStatus" @click="renderWindownRedirectEmail(props.row)" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-dialog v-model="viewdetail" persistent>
        <q-card style="max-width: inherit; width: auto">
          <div id="detailid">
            <q-item>
              <q-item-section style="flex: auto">
                <img width="100" :src="registroDet.logo" onerror="this.src='logo_nophoto.png'" />
              </q-item-section>

              <q-item-section>
                <table>
                  <tr>
                    <td style="width: 300px">
                      <span>{{ registroDet.razonsocialdetail }}</span>
                      <br /><span style="font-size: 10px">
                        {{ registroDet.direcciondetail }}
                      </span>
                      <br /><span style="font-size: 10px">
                        RIF: {{ registroDet.rifdetail }}
                      </span>
                    </td>
                    <td style="display: grid">
                      <span>N° DE CONTROL:
                        <span style="
                            font-size: 18px;
                            color: #e00303;
                            font-weight: bolder;
                          ">{{ registroDet.numerodocumento }}</span></span>
                      <span>{{ registroDet.tipodocumentodetail }}:
                        {{ registroDet.numerointerno }}</span>
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
                      Cliente: {{ registroDet.nombreclientedetail }}
                    </td>
                    <td>Fecha de Emisión: {{ registroDet.fechadetail }}</td>
                  </tr>
                  <tr>
                    <td>
                      {{ " " + registroDet.abrevdetail }}:
                      {{ registroDet.cedulaclientedetail }}
                    </td>
                    <td>Hora de Emisión: {{ registroDet.horadetail }}</td>
                  </tr>
                  <tr>
                    <td>Teléfono: {{ registroDet.telefonoclientedetail }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Dirección: {{ registroDet.direccionclientedetail }}</td>
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
              <q-item-section side top style="font-size: 11px;">
                <table style="width: 656px">
                  <tr>
                    <td style="width: 525px; text-align: right">
                      Subtotal Bs.:
                    </td>
                    <td style="text-align: right">
                      {{ registroDet.subtotaldetail }}
                    </td>
                  </tr>
                  <tr v-if="registroDet.impuestogdetail !== '0,00'">
                    <td style="text-align: right">IVA 16% Bs.:</td>
                    <td style="text-align: right">
                      {{ registroDet.impuestogdetail }}
                    </td>
                  </tr>
                  <tr v-if="registroDet.impuestordetail !== '0,00'">
                    <td style="text-align: right">IVA 8% Bs.:</td>
                    <td style="text-align: right">
                      {{ registroDet.impuestordetail }}
                    </td>
                  </tr>
                  <tr v-if="registroDet.impuestoigtfdetail !== '0,00'">
                    <td style="text-align: right">IGTF 3% Bs.:</td>
                    <td style="text-align: right">
                      {{ registroDet.impuestoigtfdetail }}
                    </td>
                  </tr>
                  <tr>
                    <td style="text-align: right">Total Bs.:</td>
                    <td style="text-align: right">
                      {{ registroDet.totaldetail }}
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
                {{ registroDet.piedepagina }}
              </div>
              <div style="text-align: center; font-size: 8px; color: red">
                ORIGINAL
              </div>
            </q-item>
          </div>
          <q-separator spaced inset="item" />
          <q-card-actions align="right">
            <q-btn color="secondary" label="XML" @click="exportXMLDetail(registroDetalle)" />
            <q-btn color="secondary" label="PDF" style="margin-right: 10px" @click="exportDetailToPDF" />
            <q-btn label="Cerrar" color="negative" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
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
                  <td style="width: 80%;">Smart Innovación Tecnológica RIF: J-50375790-6</td>
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
          <div class="tituloDrawer">
            <div style="margin: 0 20px; font-size: 25px; font-weight: bolder">Filtros</div>
            <q-icon color="red" name="close" @click="drawerFilters = false" class="cursor-pointer" style="font-size: x-large;" />
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Fechas:</span>
            <div style="display: flex;justify-content: space-around;">
              <input class="inputDate fecha1" type="date" id="desde" :value="dateFrom">
              <input class="inputDate fecha2" type="date" id="hasta" :value="dateTo">
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Cliente emisor:</span>
            <q-icon color="blue" :name="view1 ? 'expand_less' : 'expand_more'" @click="view1 = !view1" class="cursor-pointer" style="font-size: x-large;position: absolute;top: -12px; right: 10px;" />
            <q-select v-if="(co_rol === '1' || co_rol === '2') && view1" label="Agregue Nombre o RIF" dense
              class="col-md-3 col-sm-12 col-xs-12" filled v-model="modelsede" :disable="disabledSede" use-input hide-selected
              fill-input clearable options-dense option-label="namerif" option-value="cod" input-debounce="0"
              :options="optionssede" @update:model-value="changeSede()" @input:="changeSede()" @filter="searchEmisor"
              style="padding: 5px" />
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">N° Control:</span>
            <q-icon color="blue" :name="view3 ? 'expand_less' : 'expand_more'" @click="view3 = !view3" class="cursor-pointer" style="font-size: x-large;position: absolute;top: -12px; right: 10px;" />
            <q-input v-if="view3" filled label="Agregue N° Control" v-model="numerodocumento"
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
            <q-icon color="blue" :name="view4 ? 'expand_less' : 'expand_more'" @click="view4 = !view4" class="cursor-pointer" style="font-size: x-large;position: absolute;top: -12px; right: 10px;" />
            <div v-if="view4" style="display: grid;">
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
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Estatus anulado:</span>
            <q-icon color="blue" :name="view5 ? 'expand_less' : 'expand_more'" @click="view5 = !view5" class="cursor-pointer" style="font-size: x-large;position: absolute;top: -12px; right: 10px;" />
            <div v-if="view5" style="display: grid;">
              <q-radio
                v-model="estatusanulados"
                val="4"
                label="Todos"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                @click="listarfacturas"
              />
              <q-separator />
              <q-radio
                v-model="estatusanulados"
                val="2"
                label="Anulados"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                @click="listarfacturas"
              />
              <q-radio
                v-model="estatusanulados"
                val="1"
                label="No anulados"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                @click="listarfacturas"
              />
            </div>
          </div>
          <div class="text-center">
            <q-btn label="Cerrar" color="negative" @click="drawerFilters = false" />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-drawer
      v-model="drawerExportar"
      side="right"
      :width="300"
      :breakpoint="700"
      overlay
      elevated
      class="text-secondary"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div class="tituloDrawer">
            <div style="margin: 0 20px; font-size: 25px; font-weight: bolder">Exportar</div>
            <q-icon color="red" name="close" @click="drawerExportar = false" class="cursor-pointer" style="font-size: x-large;" />
          </div>
          <div style="margin: 20px 5px;">Exportar los documentos de acuerdo a tus necesidades y escoge el formato que sea de tu agrado.</div>
          <img src="exportar.png" alt="Exportar" style="max-width: 285px;">
          <div style="margin: 20px 5px;"> Exportar <span class="text-blue">{{ rows.length }}</span> documento(s).</div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Exportar como:</span>
            <q-radio
              v-model="tipoExportar"
              val="1"
              label="Registros en un archivo PDF"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :disable="disableExport"
            />
            <q-separator />
            <q-radio
              v-model="tipoExportar"
              val="2"
              label="Comprimido .zip en varios PDFs"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :disable="disableExport"
            />
            <q-separator />
            <q-radio
              v-model="tipoExportar"
              val="3"
              label="Registros en un archivo XML"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :disable="disableExport"
            />
            <q-separator />
            <q-radio
              v-model="tipoExportar"
              val="4"
              label="Registros en un archivo .csv"
              checked-icon="task_alt"
              unchecked-icon="highlight_off"
              :disable="disableExport"
            />
          </div>
          <div class="text-center" style="display: flex;justify-content: space-evenly;">
            <q-btn label="Aceptar" :disable="btnDisableExp" color="secondary" @click="exportarDoc" />
            <q-btn label="Cerrar" color="negative" @click="drawerExportar = false" />
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>
    <q-dialog v-model="openDialogExportar" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-primary text-white" style="width: 480px;">
        <q-card-section>
          <div class="text-h6">Aviso!</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="bg-white text-secondary">
          <div class="text-h6 text-center">Debe seleccionar Clente Emisor</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="secondary" label="Cerrar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-drawer
      v-model="drawerDetalle"
      side="right"
      :width="375"
      :breakpoint="700"
      overlay
      elevated
      class="text-secondary"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-sm">
          <div class="tituloDrawer">
            <div style="margin: 0 20px; font-size: 25px; font-weight: bolder">Detalles del documento</div>
            <q-icon color="red" name="close" @click="drawerDetalle = false" class="cursor-pointer" style="font-size: x-large;" />
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Datos del emisor:</span>
            <div style="display: flex;align-items: start;">
              <img width="100" :src="registro.logo" onerror="this.src='logo_nophoto.png'" />
              <div style="display: grid;">
                <div style="margin: 3px;">{{ registro.razonsocialdetail }}</div>
                <div style="margin: 3px;">{{ registro.direcciondetail }}</div>
                <div style="margin: 3px;">RIF: {{ registro.rifdetail }}</div>
              </div>
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Datos del documento:</span>
            <div style="margin: 3px;">N° DE CONTROL: {{ registro.numerodocumento }}</div>
            <div style="margin: 3px;">{{ registro.tipodocumentodetail }}: {{ registro.numerointerno }}</div>
            <div style="margin: 3px 3px 10px 3px;">Fecha emisión: {{ registro.fechadetail }} {{ registro.horadetail }}</div>
            <div style="margin-bottom: 10px;">
              <span style="margin-right: 10px;">Estatus </span>
              <q-badge v-if="isNormal(registroDetalle)" class="normal">
                Normal
              </q-badge>
              <q-badge v-if="isAnulado(registroDetalle)" class="anulado">
                Anulado
              </q-badge>
              <q-badge v-if="isDebito(registroDetalle)" class="notadebito">
                Afectado Nota de débito
              </q-badge>
              <q-badge v-if="isCredito(registroDetalle)" class="notacredito">
                Afectado Nota de crédito
              </q-badge>
            </div>
            <div v-if="numeroafectado.length > 0" style="display: grid;border: solid 1px #ccc;border-radius: 5px;padding: 15px;" >
              <span style="margin: 3px;">Afecta a {{ tipodocafectado }} {{numeroafectado}}</span>
              <span style="margin: 3px;">De fecha: {{ fechaafectado }}</span>
              <div class="text-center">
                <q-btn label="Ver relacionado" color="primary" @click="openDetailRelacionado" style="width: fit-content; border-radius: 15px;font-size: 10px;"/>
              </div>
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Datos del cliente:</span>
            <div style="display: flex;">
              <div class="circuloPerfil">
                {{ primeraletra(registro.nombreclientedetail) }}
              </div>
              <div style="display: grid;padding-left: 10px;">
                <div style="margin: 3px;">{{ registro.nombreclientedetail }}</div>
                <div style="margin: 3px;">{{ registro.abrevdetail }}: {{ registro.cedulaclientedetail }}</div>
              </div>
            </div>
            <div style="margin: 3px;display: flex;align-items: center;">
              <q-icon name="home" style="font-size: 20px;" />
              <span style="margin: 3px 7px;">{{ registro.direccionclientedetail }}</span>
            </div>
            <div style="margin: 3px;display: flex;align-items: center;">
              <q-icon name="phone" style="font-size: 20px;" />
              <span style="margin: 3px 7px;">{{ registro.telefonoclientedetail }}</span>
            </div>
            <div style="margin: 3px;display: flex;align-items: center;">
              <q-icon name="email" style="font-size: 20px;" />
              <span style="margin: 3px 7px;">{{ registro.emailclientedetail }}</span>
            </div>
          </div>
          <div style="margin: 20px 5px;border: solid 1px #ccc;border-radius: 5px;padding: 15px;position: relative;display: grid;">
            <span class="bg-white" style="position: absolute;top: -12px; left: 10px; color: #ccc;">Montos de lo gravado:</span>
            <div style="display: flex;width: 100%;">
              <div style="width: 48%; border-right: 2px solid #D9E7F5;">
                <div style="margin: 3px 0;">IVA 16% Bs. {{ registro.impuestogdetail }}</div>
                <div style="margin: 3px 0;">Reducido 8% Bs. {{ registro.impuestordetail }}</div>
                <div style="margin: 3px 0;">IGTF 3% Bs. {{ registro.impuestoigtfdetail }}</div>
                <div style="margin: 3px 0;">Exento Bs. {{ registro.exentodetail }}</div>
              </div>
              <div style="width: 50%;padding-left: 10px;">
                <div style="margin: 3px;">Base Bs. {{ registro.subtotaldetail }}</div>
                <div style="margin: 3px;">Impuestos Bs. {{ registro.totalimpuestodetail }}</div>
                <div style="margin: 3px;">&nbsp;</div>
                <div style="margin: 3px;font-weight: bolder;color: #0999FF;">Total Bs. {{ registro.totaldetail }}</div>
              </div>
            </div>
          </div>
          <div class="text-center" style="display: flex;justify-content: space-evenly;">
            <q-btn label="Ver documento" color="secondary" @click="openDetail" />
            <q-btn label="Cerrar" color="negative" @click="drawerDetalle = false" />
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
      arregloFiltroTipos: ref([]),
      arregloidtipodocumento: ref([]),
      disabletipo: ref(true),
      tipodocumentofilter: ref('Todos'),
      clienteEmisorfilter: ref('Todos'),
      estatusfilter: ref('Todos'),
      estatusanulados: ref('4'),
      tipotodos: ref(true),
      tipofactura: ref(false),
      tipocredito: ref(false),
      tipodebito: ref(false),
      tipoorden: ref(false),
      tipoguia: ref(false),
      drawerFilters: ref(false),
      tipoExportar: ref('1'),
      drawerExportar: ref(false),
      disableExport: ref(true),
      drawerDetalle: ref(false),
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
      tx_nombre: sessionStorage.getItem('tx_nombre'),
      loading: ref(false),
      numerodocumento: ref(''),
      titulotabla: ref('Documentos'),
      disable: ref(true),
      filterTable: ref(''),
      btnDisable: ref(true),
      btnDisableExp: ref(false),
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
        { name: 'totalimpuestos', label: 'Impuestos', field: 'totalimpuestos' },
        { name: 'estatus', label: 'Estatus', field: 'status' },
        { name: 'detail', label: 'Detalles', align: 'center' },
        {
          name: 'enviarcorreo',
          label: 'Envío de correo',
          field: 'enviarcorreo'
        }
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
        { name: 'totalimpuestos', label: 'Impuestos', field: 'totalimpuestos' },
        { name: 'detail', label: 'Detalles', align: 'center' },
        {
          name: 'enviarcorreo',
          label: 'Envío de correo',
          field: 'enviarcorreo'
        }
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
        { name: 'totalimpuestos', label: 'Impuestos', field: 'totalimpuestos' },
        { name: 'detail', label: 'Detalles', align: 'center' },
        {
          name: 'enviarcorreo',
          label: 'Envío de correo',
          field: 'enviarcorreo'
        }
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
      registroDet: {},
      registroDetalle: '',
      tipodocafectado: '',
      fechaafectado: '',
      numeroafectado: '',
      tipodocafectadoDet: '',
      fechaafectadoDet: '',
      numeroafectadoDet: '',
      selected: [],
      idusuario: sessionStorage.getItem('id_usuario'),
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      rif_sede_seleted: sessionStorage.getItem('rif_sede_seleted'),
      rif_sede: sessionStorage.getItem('rif_sede'),
      tx_sede: sessionStorage.getItem('tx_sede'),
      openDialogExportar: false,
      view1: false,
      view2: false,
      view3: false,
      view4: false,
      view5: false
    }
  },
  methods: {
    exportarDoc () {
      switch (this.tipoExportar) {
        case '1':
          this.exportPDF()
          break
        case '2':
          if (this.serviciosmasivo) {
            this.exportarLotes()
          } else {
            this.openDialogExportar = true
          }
          break
        case '3':
          this.exportXML(this.tempxml)
          break
        case '4':
          this.exportTable()
          break
        default:
          console.log('Sorry, we are out of.')
      }
    },
    primeraletra (item) {
      return item ? item[0] : 'S'
    },
    openDetail () {
      if (this.co_rol === '3') {
        const anniomes =
        moment(this.registroDetalle.fecha, 'DD/MM/YYYY HH:mm:ss a').format('YYYY') +
        '-' +
        moment(this.registroDetalle.fecha, 'DD/MM/YYYY HH:mm:ss a').format('MM')
        window.open(
          ENDPOINT_PATH_V2 +
        'archivos/' +
        this.registroDetalle.rif +
        '/' +
        anniomes +
        '/' +
        this.registroDetalle.rif +
        this.registroDetalle.numerodocumento
        )
      } else {
        this.buscarDetalles(this.registroDetalle)
        this.viewdetail = true
      }
    },
    openDetailRelacionado () {
      this.buscarDetailRelacionado(this.registroDetalle)
    },
    async openDrawerDetalles (reg) {
      this.registroDetalle = reg
      this.rowtempxml = []
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
      this.rowtempxml.push(this.detailXML(reg))
      this.drawerDetalle = true
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
    },
    async buscarDetalles (reg) {
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
          this.tipodocafectadoDet = ''
          this.fechaafectadoDet = ''
          this.numeroafectadoDet = ''
          if (reg.relacionado.length > 0) {
            const body = {
              idserviciosmasivo: reg.idserviciosmasivo,
              numerodocumento: reg.relacionado
            }
            await axios.post(ENDPOINT_PATH_V2 + 'reporte/facturas/relacionado', body).then(async response => {
              const datosafectado = response.data.data
              this.tipodocafectadoDet = datosafectado[0].tipodocumento
              this.fechaafectadoDet = moment(datosafectado[0].fecha).format('DD/MM/YYYY hh:mm:ss a')
              this.numeroafectadoDet = datosafectado[0].numerointerno.length > 0 ? datosafectado[0].numerointerno : reg.relacionado
            })
          }
          reg.subtotal = detalles.data.data.length > 0 ? subtotaldetalle : reg.subtotal
        }
        reg.fecha = moment(reg.fecha, 'DD/MM/YYYY hh:mm:ss a')
        this.rowtempxml.push(this.detailXML(reg))
        this.viewdetail = true
        this.registroDet.logo = reg.logo
        this.registroDet.razonsocialdetail = reg.razonsocial
        this.registroDet.rifdetail = reg.rif
        this.registroDet.direcciondetail = reg.direccion
        this.registroDet.tipodocumentodetail = reg.tipodocumento
        this.registroDet.numerodocumento = reg.numerodocumento
        this.registroDet.numerointerno = reg.numerointerno
        this.registroDet.nombreclientedetail = reg.nombrecliente
        this.registroDet.piedepagina = reg.piedepagina
        this.registroDet.abrevdetail = reg.abrev
        this.registroDet.cedulaclientedetail = reg.cedulacliente
        this.registroDet.direccionclientedetail = reg.direccioncliente
        this.registroDet.telefonoclientedetail = reg.telefonocliente
        this.registroDet.emailclientedetail = reg.emailcliente

        this.registroDet.fechadetail = reg.fechasolo
        this.registroDet.horadetail = reg.hora
        this.registroDet.exentodetail = reg.exento

        this.registroDet.basegdetail = reg.baseg
        this.registroDet.baserdetail = reg.baser
        this.registroDet.baseigtfdetail = reg.baseigtf

        this.registroDet.impuestogdetail = reg.impuestog
        this.registroDet.impuestordetail = reg.impuestor
        this.registroDet.impuestoigtfdetail = reg.impuestoigtf

        this.registroDet.totalimpuestodetail = Number(reg.impuestogN) + Number(reg.impuestorN) + Number(reg.impuestoigtfN)
        reg.total = reg.subtotal + this.registroDet.totalimpuestodetail
        this.registroDet.totalimpuestodetail = this.completarDecimales(this.registroDet.totalimpuestodetail)
        this.registroDet.subtotaldetail = this.completarDecimales(reg.subtotal)
        this.registroDet.totaldetail = this.completarDecimales(reg.total)
      }
    },
    openImprimir () {
      this.viewPrint = true
    },
    imprimir () {
      window.frames.print_frame.document.body.innerHTML = document.getElementById('areaImprimir').innerHTML
      window.frames.print_frame.window.focus()
      window.frames.print_frame.window.print()
      this.viewPrint = false
    },
    getColorEmailStatus (obj) {
      if (obj.estatuscorreo === '1' && obj.enviocorreo === '1') {
        return 'info'
      }
      return 'negative'
    },
    getIconoEmailStatus (obj) {
      if (obj.estatuscorreo === '1' && obj.enviocorreo === '1') {
        return 'mark_email_read'
      }
      return 'cancel_schedule_send'
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
      this.clienteEmisorfilter = 'Todos'
      if (this.modelsede?.cod) {
        this.rif_sede_exportar = this.modelsede?.rif
        this.disable = false
        this.clienteEmisorfilter = this.modelsede?.name
      }
      this.listarfacturas()
    },
    changeCodes () {
      this.idcodigocomercial = this.modelcodes?.cod
      this.codigocomercial = this.modelcodes?.namecode
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
        idtipodocumento: this.idtipodocumento,
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
        rif: this.rif_sede_exportar,
        estatus: 4
      }
      const url = ENDPOINT_PATH_V2 + 'archivos/exportarlote'
      axios.post(
        url,
        body,
        { responseType: 'arraybuffer' }
      ).then(async response => {
        const blob = new Blob([response.data])
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = window.URL.createObjectURL(blob)
        link.download = $this.rif_sede_exportar + '-' + moment().format('YYYYMMDDhhmmss') + '.zip'
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
    buscarDetailRelacionado (row) {
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
          obj.numerointerno = datos[0].numerointerno
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
          this.buscarDetalles(obj)
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
          row.iconoEmailStatus = 'mark_email_read'
          row.colorEmailStatus = 'info'
        }
        return row
      })
      this.rows = lista
    },
    listarfacturas () {
      this.estatusfilter = this.estatusanulados === '1' ? 'No anulados' : this.estatusanulados === '2' ? 'Anulados' : 'Todos'
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
        idtipodocumento: this.idtipodocumento,
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
        estatus: Number(this.estatusanulados)
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

            obj.totalimpuestos = Number(obj.impuestogN) + Number(obj.impuestorN) + Number(obj.impuestoigtfN)

            obj.exento = this.completarDecimales(obj.exento)
            obj.baseg = this.completarDecimales(obj.baseg)
            obj.impuestog = this.completarDecimales(obj.impuestogN)
            obj.baser = this.completarDecimales(obj.baser)
            obj.impuestor = this.completarDecimales(obj.impuestorN)
            obj.baseigtf = this.completarDecimales(obj.baseigtf)
            obj.impuestoigtf = this.completarDecimales(obj.impuestoigtfN)
            obj.colorEmailStatus = this.getColorEmailStatus(datos[i])
            obj.iconoEmailStatus = this.getIconoEmailStatus(datos[i])
            this.rows.push(obj)
            this.tempxml.push(this.detailXML(datos[i]))
            this.crearClientes(obj)
          }
          this.disableExport = this.rows.length === 0 || false
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
    isNormal (row) {
      return (row.estatus === '1' && !row.notadebito && !row.notacredito) ? 'true' : false
    },
    isAnulado (row) {
      return row.estatus === '2' ? 'true' : false
    },
    isDebito (row) {
      return row.notadebito || false
    },
    isCredito (row) {
      return row.notacredito || false
    },
    changeTipos (valor) {
      this.tipofactura = valor
      this.tipocredito = valor
      this.tipodebito = valor
      this.tipoorden = valor
      this.tipoguia = valor
      this.arregloFiltroTipos = []
      this.tipodocumentofilter = 'Todos'
      this.arregloidtipodocumento = []
      this.idtipodocumento = undefined
    },
    updateArregloFiltroTipos (val, tipo, id) {
      if (val) {
        this.arregloidtipodocumento.push(id)
        this.arregloFiltroTipos.push(tipo)
      } else {
        this.arregloidtipodocumento = this.arregloidtipodocumento.filter(item => item !== id)
        this.arregloFiltroTipos = this.arregloFiltroTipos.filter(item => item !== tipo)
      }
      this.tipodocumentofilter = this.arregloFiltroTipos.join(' | ')
      this.idtipodocumento = this.arregloidtipodocumento.join(', ')
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
      } else {
        this.updateArregloFiltroTipos(val, 'Factura', 1)
      }
      this.listarfacturas()
    },
    tipocredito: function (val) {
      // console.log(val)
      this.tipotodos = ((!val && !this.tipofactura && !this.tipodebito && !this.tipoorden && !this.tipoguia) ||
      (val && this.tipofactura && this.tipodebito && this.tipoorden && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      } else {
        this.updateArregloFiltroTipos(val, 'Nota de crédito', 3)
      }
      this.listarfacturas()
    },
    tipodebito: function (val) {
      this.tipotodos = ((!val && !this.tipocredito && !this.tipocredito && !this.tipoorden && !this.tipoguia) ||
      (val && this.tipocredito && this.tipocredito && this.tipoorden && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      } else {
        this.updateArregloFiltroTipos(val, 'Nota de débito', 2)
      }
      this.listarfacturas()
    },
    tipoorden: function (val) {
      this.tipotodos = ((!val && !this.tipocredito && !this.tipodebito && !this.tipodebito && !this.tipoguia) ||
      (val && this.tipocredito && this.tipodebito && this.tipodebito && this.tipoguia)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      } else {
        this.updateArregloFiltroTipos(val, 'Orden de entrega', 4)
      }
      this.listarfacturas()
    },
    tipoguia: function (val) {
      this.tipotodos = ((!val && !this.tipocredito && !this.tipodebito && !this.tipoorden && !this.tipoorden) ||
      (val && this.tipocredito && this.tipodebito && this.tipoorden && this.tipoorden)) || false
      if (this.tipotodos) {
        this.changeTipos(false)
      } else {
        this.updateArregloFiltroTipos(val, 'Guía de despacho', 5)
      }
      this.listarfacturas()
    }
  },
  mounted () {
    fetch('https://api.ipify.org?format=json')
      .then((x) => x.json())
      .then(({ ip }) => {
        this.term = ip
        this.colspan = this.co_rol === '1' ? 8 : this.co_rol === '2' ? 7 : 6
        // console.log('this.rif_sede')
        // console.log(this.rif_sede)
        // console.log('this.tx_sede')
        // console.log(this.tx_sede)
        this.rif_sede_exportar = this.rif_sede
        this.serviciosmasivo = this.tx_sede
        this.clienteEmisorfilter = this.tx_sede.length > 0 ? this.tx_sede : 'Todos'
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
          this.rif_sede_exportar = this.rif_sede_seleted
          this.clienteEmisorfilter = this.tx_sede_seleted
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
        const selectElementDesde = document.querySelector('.fecha1')
        const selectElementHasta = document.querySelector('.fecha2')

        selectElementDesde.addEventListener('change', (event) => {
          this.dateFrom = selectElementDesde.value
          this.listarfacturas()
        })
        selectElementHasta.addEventListener('change', (event) => {
          this.dateTo = selectElementHasta.value
          this.listarfacturas()
        })
      })
  }
}
</script>

<style>
.text-caption {
  font-size: inherit;
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
.inputDate {
  font-family: 'avenir';
  width: 116px;
  padding: 7px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: #f2f2f2;
}
.tituloDrawer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.anulado {
  background: #F17F7F;
  color: #BF4141;
  padding: 5px 10px;
}
.notadebito {
  background: #62DDBC;
  color: #1C9877;
  padding: 5px 10px;
}
.notacredito {
  background: #FFD586;
  color: #AF832F;
  padding: 5px 10px;
}
.normal {
  background: #86d8ff;
  color: #29719a;
  padding: 5px 10px;
}
.circuloPerfil {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  color: #fff;
  background: #f57b09;
  align-items: center;
  border-radius: 50%;
  font-size: 34px;
  font-weight: bold;
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
