<template>
  <div class="my-font fondoimg window-height window-width row justify-center">
    <div class="col-8" >
    </div>
    <div class="col-4">
      <div class="row justify-center">
        <img src="imglogin.png" style="max-width: 180px;margin-top: 20px;" />
      </div>
      <div class="row justify-center">
        <h5 class="text-h5 text-white q-my-md">Identificarse</h5>
      </div>
      <div class="row justify-center">
        <form @submit.prevent="submit" class="row justify-center">
          <q-card bordered class="q-pa-lg shadow-1" style="border-radius: 20px;width: 350px;">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input rounded standout clearable v-model="usuario" type="text" label="Usuario" >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
                <q-input rounded standout clearable v-model="clave" type="password" label="Clave" >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card-section class="text-center q-pa-none">
              <vue-hcaptcha
               sitekey="248a18d8-3004-44f7-82d2-93cbf544d355"
               @verify="onVerify"
               @expired="onExpire"
               @challenge-expired="onChallengeExpire"
               @error="onError">
              </vue-hcaptcha>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn
               unelevated
               rounded
               color="primary"
               type="submit"
               :loading="loading"
               size="lg"
               class="full-width"
               label="Ingresar"
               :disable="btnDisable">
                <template v-slot:loading>
                  <q-spinner-dots />
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
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
// ES_8be2ac0dcdc44c8b9e8655c92a14ab9c
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  name: 'LoginLayout',
  components: {
    VueHcaptcha
  },
  data () {
    return {
      term: '',
      btnDisable: true,
      usuario: '',
      clave: '',
      loading: false
    }
  },
  methods: {
    onVerify (token, eKey) {
      console.log('Verified: ', { token, eKey })
      this.btnDisable = false
    },
    onExpire () {
      console.log('Token expired')
      this.btnDisable = true
    },
    onChallengeExpire () {
      console.log('Challenge expired')
      this.btnDisable = true
    },
    onError (err) {
      console.log('Error', err)
      this.btnDisable = true
    },
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
              sessionStorage.setItem('tx_usuario', this.usuario)
              sessionStorage.setItem('tx_email', response.data.resp.emailbcc || '')
              sessionStorage.setItem('tx_rol', response.data.resp.rol)
              sessionStorage.setItem('co_sede', response.data.resp.idserviciosmasivo || 0)
              sessionStorage.setItem('tx_sede', response.data.resp.razonsocial || '')
              if (response.data.resp.idrol === '3') {
                // this.$router.push('/consulta')
                this.$router.push('/dashboard')
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
      })
    }
  }
}
</script>

<style>
.fondoimg {
    background: url("../assets/fondo_home.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
