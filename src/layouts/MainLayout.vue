<template>
   <div class="">
    <q-layout view="lHh Lpr lff" container style="min-height: 100vh;"  class="shadow-2 rounded-borders">
      <q-header class="bg-primary">
        <q-toolbar>
          <q-toolbar-title>Smart App Web</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
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
            <q-item v-if="co_rol === '1'" clickable v-ripple @click="listado" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="dashboard" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Dashboard</div>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="consulta" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="black" name="summarize" />
              </q-item-section>
              <q-item-section>
                <div>Consulta</div>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple @click="anulaciones" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="black" name="bookmark_remove" />
              </q-item-section>
              <q-item-section>
                <div>Anulaciones</div>
              </q-item-section>
            </q-item>
            <!--<q-item clickable v-ripple @click="reportes" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="print" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Reportes</div>
              </q-item-section>
            </q-item>-->
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="sedes" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="store" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Clientes</div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="usuarios" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="manage_accounts" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Usuarios</div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1'" clickable v-ripple @click="tranzasAsignacion" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="list" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Asignaciones</div>
              </q-item-section>
            </q-item>
            <q-item v-if="co_rol === '1' || co_rol === '2'" clickable v-ripple @click="auditorias" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="policy" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Auditoría</div>
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
            <!-- <q-item v-if="co_rol === '1'" clickable v-ripple @click="simuladorAsignacion" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="print" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Simulador Asignación</div>
              </q-item-section>
            </q-item> -->
            <q-item clickable v-ripple @click="salir" style="font-size: 12px;">
              <q-item-section avatar>
                <q-icon color="secondary" name="logout" />
              </q-item-section>
              <q-item-section>
                <div class="text-secondary">Salir</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-img class="absolute-top" src="logo_sit.jpg" style="height: 100px"></q-img>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>

import { defineComponent, ref } from 'vue'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default defineComponent({
  name: 'MainLayout',
  setup () {
    return {
      drawer: ref(false),
      miniState: ref(true)
    }
  },
  data () {
    return {
      co_sede_seleted: sessionStorage.getItem('co_sede_seleted'),
      tx_sede_seleted: sessionStorage.getItem('tx_sede_seleted'),
      logo_sede: ENDPOINT_PATH_V2 + 'imagen/' + sessionStorage.getItem('rif_sede') + '.png',
      tx_usuario: sessionStorage.getItem('rol_name'),
      tx_nombre: sessionStorage.getItem('tx_nombre'),
      co_rol: sessionStorage.getItem('co_rol'),
      tx_rol: sessionStorage.getItem('tx_rol'),
      tx_sede: sessionStorage.getItem('tx_sede')
    }
  },
  methods: {
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
    reportes () {
      this.$router.push('/reportes')
    },
    anulaciones () {
      this.$router.push('/anulaciones')
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
    salir () {
      this.$q.dialog({
        title: 'Confirmación!',
        message: '¿Está seguro que quieres cerrar sesión?',
        ok: {
          color: 'primary',
          label: 'Sí'
        },
        cancel: {
          color: 'secondary',
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
        sessionStorage.removeItem('co_rol')
        this.$router.push('/')
      })
    }
  }
})
</script>
