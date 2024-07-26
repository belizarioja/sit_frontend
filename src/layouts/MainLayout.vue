<template>
   <div class="my-font">
    <q-layout view="lHh Lpr lff" container style="min-height: 100vh;"  class="shadow-2 rounded-borders">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Smart App Web</q-toolbar-title>
          <q-btn-dropdown
            class="glossy"
            color="secondary"
            :label="tx_nombre"
          >
            <div class="row no-wrap q-pa-md" style="color: #65778D;">
              <div class="column">
                <div class="text-h6 q-mb-md" style="font-weight: bold;">Configuración de cuenta</div>
                <div v-if="tx_sede" style="margin: 5px 10px;">
                  <q-icon name="store" style="font-size: 20px;" />
                  <span style="margin: 10px;">Emisor:</span>
                  <span>{{ tx_sede }}</span>
                </div>
                <div style="margin: 5px 10px;">
                  <q-icon name="admin_panel_settings" style="font-size: 20px;" />
                  <span style="margin: 10px;">Perfil:</span>
                  <span>{{ tx_rol }}</span></div>
                <div style="margin: 5px 10px;">
                  <q-icon name="account_circle" style="font-size: 20px;" />
                  <span style="margin: 10px;">Usuario:</span>
                  <span>{{ tx_usuario }}</span>
                </div>
                <div v-if="tx_email" style="margin: 5px 10px;">
                  <q-icon name="email" style="font-size: 20px;" />
                  <span style="margin: 10px;">Email:</span>
                  <span>{{ tx_email }}</span>
                </div>
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar color="secondary" text-color="white" size="72px">
                  {{ primeraletra(tx_nombre) }}
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{tx_nombre}}</div>

                <q-btn
                  color="negative"
                  label="Cambiar contraseña"
                  push
                  size="sm"
                  @click.stop="btnOpenUpdClave"
                />
              </div>
            </div>
          </q-btn-dropdown>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 95px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item v-if="co_rol === '1' || co_rol === '3' || co_rol === '2'" clickable v-ripple @click="listado" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="view_quilt" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Dashboard</div>
                <div style="font-size: x-small">
                  Indicadores, gráficas
                </div>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="consulta" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="summarize" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Consulta</div>
                <div style="font-size: x-small">
                  Consultas, registros, exportar
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="informes" style="font-size: 12px">
              <q-item-section avatar>
                <q-icon color="black" name="query_stats" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Reportes</div>
                <div style="font-size: x-small">
                  Emisor, semanal, anual, providencia 0032
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="sedes" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="store" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Clientes</div>
                <div style="font-size: x-small">
                  Módulo de emisores
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="usuarios" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="manage_accounts" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Usuarios</div>
                <div style="font-size: x-small">
                  Gestión de acceso
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1'" clickable v-ripple @click="tranzasAsignacion" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="list" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Asignaciones</div>
                <div style="font-size: x-small">
                  Lotes de documentos
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="auditorias" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="policy" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Auditoría</div>
                <div style="font-size: x-small">
                  Bitácoras de seguridad
                </div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1'" clickable v-ripple @click="simulador" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="print" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Simulador</div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1'" clickable v-ripple @click="simulador2" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="print" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Anular</div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1'" clickable v-ripple @click="simuladorAsignacion" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="print" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Asignar</div>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="salir" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="logout" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Salir</div>
                <div style="font-size: x-small">
                  Cerrar sesión
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-img class="absolute-top" src="logo_sit.jpg" style="height: 100px"></q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
      <q-page-sticky v-if="co_rol === '1' || co_rol === '2'" position="bottom-right" :offset="fabPos">
        <q-btn
         fab
         :disable="draggingFab"
         icon="people_alt"
         color="primary"
         @click="sedeschange"
         v-touch-pan.prevent.mouse="moveFab"
        />
      </q-page-sticky>
    </q-layout>
    <q-dialog v-model="modalactualizarclave" persistent>
      <q-card  style="width: 300px;">
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Actualizar Clave</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="nuevaclave"
            label="Ingrese nueva clave"
            autofocus
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
             <q-btn color="negative" label="Cancelar" v-close-popup />
             <q-btn
              color="secondary"
              label="Aceptar"
              @click="cambiarclave"
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
import { Notify } from 'quasar'
import axios from 'axios'
import md5 from 'md5'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default defineComponent({
  name: 'MainLayout',
  setup () {
    return {
      drawer: ref(false),
      nuevaclave: ref(''),
      modalactualizarclave: ref(false),
      miniState: ref(true)
    }
  },
  data () {
    return {
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      logo_sede: ENDPOINT_PATH_V2 + 'imagen/' + sessionStorage.getItem('rif_sede') + '.png',
      tx_usuario: sessionStorage.getItem('tx_usuario'),
      co_usuario: sessionStorage.getItem('id_usuario'),
      tx_email: sessionStorage.getItem('tx_email'),
      tx_nombre: sessionStorage.getItem('tx_nombre'),
      co_rol: sessionStorage.getItem('co_rol'),
      tx_rol: sessionStorage.getItem('tx_rol'),
      tx_sede: sessionStorage.getItem('tx_sede'),
      draggingFab: false,
      fabPos: [18, 18]
    }
  },
  methods: {
    moveFab (ev) {
      // console.log(ev)
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },
    cambiarclave () {
      if (this.nuevaclave.length < 4) {
        Notify.create('Debe ingresar nueva clave correcta ')
        return
      }
      const body = {
        nuevaclave: md5(this.nuevaclave)
      }
      axios.put(ENDPOINT_PATH_V2 + 'usuario/cambioclave/' + this.idUpd, body).then(async response => {
        this.modalactualizarclave = false
        Notify.create('Calve cambiada en forma correcta')
      })
    },
    primeraletra (item) {
      return item ? item[0] : 'S'
    },
    btnOpenUpdClave () {
      this.idUpd = this.co_usuario
      this.modalactualizarclave = true
    },
    listado () {
      this.$router.push('/dashboard')
    },
    sedes () {
      this.$router.push('/sedes')
    },
    auditorias () {
      this.$router.push('/auditorias')
    },
    sedeschange () {
      sessionStorage.removeItem('co_sede_seleted')
      sessionStorage.removeItem('tx_sede_seleted')
      sessionStorage.removeItem('rif_sede_seleted')
      this.$router.push('/emisores')
    },
    consulta () {
      this.$router.push('/consulta')
    },
    simulador () {
      this.$router.push('/simulador')
    },
    simulador2 () {
      this.$router.push('/simulador2')
    },
    simuladorAsignacion () {
      this.$router.push('/simuladorAsignacion')
    },
    tranzasAsignacion () {
      this.$router.push('/tranzasAsignacion')
    },
    usuarios () {
      this.$router.push('/usuarios')
    },
    informes () {
      this.$router.push('/informes')
    },
    salir () {
      this.$q.dialog({
        title: 'Confirmación!',
        message: '¿Está seguro que quieres cerrar sesión?',
        ok: {
          color: 'secondary',
          label: 'Sí'
        },
        cancel: {
          color: 'negative',
          label: 'No'
        },
        persistent: true
      }).onOk(() => {
        sessionStorage.removeItem('co_sede_seleted')
        sessionStorage.removeItem('tx_sede_seleted')
        sessionStorage.removeItem('rif_sede_seleted')
        sessionStorage.removeItem('tx_rol')
        sessionStorage.removeItem('tx_nombre')
        sessionStorage.removeItem('tx_sede')
        sessionStorage.removeItem('co_sede')
        sessionStorage.removeItem('id_usuario')
        sessionStorage.removeItem('rif_sede')
        sessionStorage.removeItem('co_rol')
        this.$router.push('/')
      })
    }
  },
  mounted () {
    if (!this.co_rol) {
      this.$router.push('/erroracceso')
    }
  }
})
</script>
