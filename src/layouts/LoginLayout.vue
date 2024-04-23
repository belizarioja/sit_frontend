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
            <q-card-section class="text-center">
              <div class="text-grey-6" @click="abrirRecuperarClave" style="cursor: pointer;">¿Olvidó contraseña?</div>
            </q-card-section>
          </q-card>
        </form>
      </div>
    </div>
    <!-- MODAL PARA ACTUALIZAR HORA DE SESION DE USUARIO-->
    <q-dialog v-model="modalRestringido" persistent>
      <q-card >
        <q-card-section>
          <div class="text-h6" style="text-align: center;">¡Acceso restringido!</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="text-align: center;">
          <img src="acceso_restringido.jpeg" style="max-width: 180px;margin-top: 20px;" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div style="background: blanchedalmond;padding: 10px;border-radius: 15px;border: 1px solid #e9a070;">Por favor intente acceder durante el horario permitido</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
             <q-btn color="secondary" label="Aceptar" v-close-popup />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA RECUPERAR CLAVE-->
    <q-dialog v-model="modalRecuperar" persistent>
      <q-card style="width: 350px;">
        <q-card-section>
          <div class="text-h6" style="text-align: center;">Recuperar Contraseña</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="text-align: center;">
          <q-input rounded standout clearable v-model="usuariorecuperar" type="text" label="Usuario" style="margin-bottom: 20px;" >
            <template v-slot:prepend>
              <q-icon name="account_circle" />
            </template>
          </q-input>
          <q-input rounded standout clearable v-model="emailrecuperar" type="text" label="Email" >
            <template v-slot:prepend>
              <q-icon name="mail_lock" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-pt-none" style="height: 60px;">
          <div v-if="validarecuperar" style="background: blanchedalmond; padding: 10px;border-radius: 15px;border: 1px solid #e9a070; text-align: center;">
            Por favor ingrese usuario y alguno de los correos electrónicos que tiene registrado
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
            <q-btn color="negative" label="Cancelar"  v-close-popup />
            <q-btn color="secondary" label="Aceptar" @click="recuperarClave" />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA CONFIRMAR ENFIO DE RECUPERACION DE CLAVE-->
    <q-dialog v-model="modalMensaje" persistent>
      <q-card style="width: 400px;">
        <q-card-section>
          <div class="text-h6" style="text-align: center;">¡IMPORTANTE!</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="text-align: center;">
          <img src="correoenviado.png" style="max-width: 180px;margin-top: 20px;" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div style="background: blanchedalmond;padding: 10px;border-radius: 15px;border: 1px solid #e9a070; text-align: center;">
            {{messagerecuperacion}}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
             <q-btn color="secondary" label="Aceptar" v-close-popup />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA CAMBIAR CLAVE-->
    <q-dialog v-model="modalCambiarClave" persistent>
      <q-card style="width: 350px;">
        <q-card-section style="display: flex; align-items: center;">
          <q-icon name="lock_reset" style="font-size: 60px; margin-right: 20px; color: orange;" />
          <div class="text-h6" style="text-align: center;">Cambiar Contraseña</div>
        </q-card-section>
        <q-card-section class="q-pt-none" style="text-align: center;">
          <q-input rounded standout clearable v-model="nuevaclave1" type="password" label="Nueva contraseña" style="margin-bottom: 20px;" >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
          <q-input rounded standout clearable v-model="nuevaclave2" type="password" label="Repita contraseña" >
            <template v-slot:prepend>
              <q-icon name="lock_clock" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-pt-none" style="height: 60px;">
          <div v-if="validanuevaclave" style="background: blanchedalmond; padding: 10px;border-radius: 15px;border: 1px solid #f18945; text-align: center; color: #f18945;">
            Por favor, la nueva clave y confirmación de clave deben ser iguales y válidas.
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;margin-top: 20px;">
            <q-btn color="negative" label="Cancelar"  v-close-popup />
            <q-btn color="secondary" label="Aceptar" @click="cambiarclave" />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA CONFIRMAR CAMBIO DE CLAVE CON EXITO -->
    <q-dialog v-model="modalconfirmar" persistent>
      <q-card style="width: 350px;">
        <q-card-section>
          <div class="text-h6" style="text-align: center;">En Horabuena!</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-center">
          <img src="confirmar.png" alt="Actualizar" style="max-width: 285px;">
          <div style="background: #c4e9c4; padding: 10px;border-radius: 15px;border: 1px solid #012c0e; text-align: center; color: #012c0e;">
            !Nueva clave actualizada con éxito, ya puede usarla para ingresar!
           </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;">
             <q-btn
              color="secondary"
              label="Aceptar"
              v-close-popup
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
    <!-- MODAL PARA INDICAR CLAVE TEMPORAL VENCIDA -->
    <q-dialog v-model="modalClaveVencida" persistent>
      <q-card style="width: 350px;">
        <q-card-section  style="display: flex; align-items: center;">
          <q-icon name="cancel" style="font-size: 60px; margin-right: 20px; color: red;" />
          <div class="text-h6" style="text-align: center;">Clave Temporal Vencida!</div>
        </q-card-section>
        <q-card-section class="q-pt-none text-center">
          <img src="acceso_restringido.jpeg" style="max-width: 180px;" />
          <div style="background: #f1b4b4; padding: 10px;border-radius: 15px;border: 1px solid #7a0202; text-align: center; color: #7a0202;">
            !Debe enviar a recuperar la clave nuevamente!
           </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
           <div style="display: flex; justify-content: space-evenly;">
             <q-btn
              color="secondary"
              label="Aceptar"
              v-close-popup
             />
           </div>
         </q-card-section>
      </q-card>
    </q-dialog>
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
      hora: moment().format('HH:mm:ss'),
      fechahoy: moment().format('YYYY-MM-DD HH:mm:ss'),
      idUpd: '',
      validarecuperar: false,
      validanuevaclave: false,
      btnDisable: true,
      modalRestringido: false,
      modalconfirmar: false,
      modalMensaje: false,
      modalRecuperar: false,
      modalClaveVencida: false,
      modalCambiarClave: false,
      usuario: '',
      messagerecuperacion: '',
      usuariorecuperar: '',
      emailrecuperar: '',
      clave: '',
      nuevaclave1: '',
      nuevaclave2: '',
      loading: false
    }
  },
  methods: {
    cambiarclave () {
      if (this.nuevaclave1.length < 4) {
        this.validanuevaclave = true
        // Notify.create('Debe ingresar nueva clave correcta ')
        return
      }
      if (this.nuevaclave1 !== this.nuevaclave2) {
        this.validanuevaclave = true
        // Notify.create('Las claves deben ser iguales!')
        return
      }
      const body = {
        nuevaclave: md5(this.nuevaclave1)
      }
      axios.put(ENDPOINT_PATH_V2 + 'usuario/cambioclave/' + this.idUpd, body).then(async response => {
        this.modalCambiarClave = false
        this.modalconfirmar = true
      })
    },
    abrirRecuperarClave () {
      this.usuariorecuperar = ''
      this.emailrecuperar = ''
      this.validarecuperar = false
      this.modalRecuperar = true
    },
    recuperarClave () {
      if (!this.usuariorecuperar || !this.emailrecuperar || this.usuariorecuperar.length === 0 || this.emailrecuperar.length === 0) {
        this.validarecuperar = true
        return
      }
      // console.log('Enviar a recuperar contraseña')
      this.modalRecuperar = false
      axios.post(ENDPOINT_PATH_V2 + 'usuario/recuperarclave', {
        usuario: this.usuariorecuperar,
        email: this.emailrecuperar
      }).then(async response => {
        // console.log(response)
        if (response.status === 200) {
          this.messagerecuperacion = response.data.message
          this.modalMensaje = true
          // Notify.create(response.data.message)
        }
      })
    },
    onVerify (token, eKey) {
      // console.log('Verified: ', { token, eKey })
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
              // console.log(response.data.resp.horaentrada)
              // console.log(response.data.resp.horasalida)
              // console.log(response.data.resp.fecharecuperacion)
              if (response.data.resp.fecharecuperacion) {
                // console.log('COMPARAR FECHAS')
                const fecharecuperacion = moment(response.data.resp.fecharecuperacion).format('YYYY-MM-DD HH:mm:ss')
                const duration = moment.duration(moment().diff(fecharecuperacion)).asHours()
                if (duration > 12) {
                  // console.log('DEBE SOLICITAR RECUPERAR OTRA CLAVE')
                  // console.log(duration)
                  // this.idUpd = response.data.resp.id
                  this.modalClaveVencida = true
                } else {
                  // console.log('DEBE CAMBIAR CLAVE')
                  // console.log(duration)
                  this.idUpd = response.data.resp.id
                  this.modalCambiarClave = true
                }
                return
              }
              if (this.hora < response.data.resp.horaentrada || this.hora > response.data.resp.horasalida) {
                // console.log('¡Acceso restringido! Por favor intente acceder durante el horario permitido')
                axios.post(ENDPOINT_PATH_V2 + 'bitacora', {
                  idusuario: response.data.resp.id,
                  idevento: 10,
                  ip: this.term,
                  observacion: 'Acceso al sistema en horario restringido',
                  fecha: moment().format('YYYY-MM-DD HH:mm:ss')
                })
                this.modalRestringido = true
              } else {
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
  },
  watch: {
    nuevaclave1: function (val) {
      this.validanuevaclave = false
      // this.listarfacturas()
    },
    nuevaclave2: function (val) {
      this.validanuevaclave = false
      // this.listarfacturas()
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
