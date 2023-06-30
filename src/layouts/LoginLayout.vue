<template>
  <div class="bg-primary window-height window-width row justify-center">
    <div class="col-9 fondoimg" >
        <div class="absolute-bottom-right text-subtitle2">
          <img src="logo_sit.jpg" style="max-width: 180px;" />
        </div>
    </div>
    <div class="col-3 bg-white">
      <div class="row justify-center">
        <img src="login_sid.png" style="max-width: 180px;margin-top: 20px;" />
      </div>
      <div class="row justify-center">
        <h5 class="text-h5 text-secondary q-my-md">Identificarse</h5>
      </div>
      <div class="row justify-center">
        <form @submit.prevent="submit" class="row justify-center">
          <q-card bordered class="q-pa-lg shadow-1" style="max-width: 335px;border-radius: 10px;">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square filled clearable v-model="usuario" type="text" label="Usuario" >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <q-input square filled clearable v-model="clave" type="password" label="Clave" >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn unelevated color="primary" type="submit"  :loading="loading"  size="lg" class="full-width" label="Ingresar" >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </q-card-actions>
            <!-- <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">¿Olvidó contraseña?</p>
            </q-card-section> -->
          </q-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import axios from 'axios'
import moment from 'moment'
import md5 from 'md5'

const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  name: 'LoginLayout',
  data () {
    return {
      term: '',
      usuario: '',
      clave: '',
      loading: false
    }
  },
  methods: {
    submit () {
      fetch('https://api.ipify.org?format=json').then(x => x.json()).then(({ ip }) => {
        this.term = ip
        // console.log(this.term)
        if (this.usuario === '') {
          Notify.create('El Usuario es requerido para iniciar sesión')
        } else if (this.clave === '') {
          Notify.create('La contraseña es requerida para iniciar sesión')
        } else {
          this.loading = true
          axios.post(ENDPOINT_PATH_V2 + 'usuario/login', {
            usuario: this.usuario,
            clave: md5(this.clave)
          }).then(async response => {
            this.loading = false
            if (response.status === 200) {
              axios.post(ENDPOINT_PATH_V2 + 'bitacora', {
                idusuario: response.data.resp.id,
                idevento: 1,
                ip: this.term,
                observacion: 'Acceso al sistema con éxito',
                fecha: moment().format('YYYY-MM-DD HH:mm:ss')
              })
              sessionStorage.setItem('id_usuario', response.data.resp.id)
              sessionStorage.setItem('rif_sede', response.data.resp.rif)
              sessionStorage.setItem('co_rol', response.data.resp.idrol)
              sessionStorage.setItem('tx_nombre', response.data.resp.nombre)
              sessionStorage.setItem('tx_rol', response.data.resp.rol)
              sessionStorage.setItem('co_sede', response.data.resp.idserviciosmasivo || 0)
              sessionStorage.setItem('tx_sede', response.data.resp.razonsocial || '')
              if (response.data.resp.idrol === '3') {
                this.$router.push('/consulta')
              } else {
                // this.$router.push('/dashboard')
                this.$router.push('/emisores')
              }
            } else {
              this.loading = false
              Notify.create(response.data.message)
            }
          }).catch(error => {
            this.loading = false
            Notify.create('Error ' + error)
          })
        }
      }
      )
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
.fondoimg {
    background: url("../assets/fondo_home.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
