<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404/401
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Acceso No Autorizado...
      </div>

      <q-btn
        class="q-mt-xl"
        color="dark"
        text-color="white"
        unelevated
        @click="salir"
        label="Salir / Iniciar sesión"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404',
  methods: {
    salir () {
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
    }
  }
})
</script>
