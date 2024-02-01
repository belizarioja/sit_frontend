<template>
  <q-dialog persistent>
    <q-card class="redirectEmail-card">
      <div class="redirectEmail-wrapper">
        <p class="redirectEmail-header">Redireccionar Email</p>
        <div class="redirectEmail-content">
          <div class="redirectEmail-input">
            <q-input filled dense class="col-md-3 col-sm-6 col-xs-12" v-model="search"
              placeholder="Ingrese email a reenviar" />
            <p class="redirectEmail-error" v-if="error">{{ error }}</p>
          </div>
          <div class="redicrectEmail-actions">
            <q-btn label="Cancelar" color="negative" v-close-popup />
            <q-btn label="Enviar" color="secondary" @click="onConfirmSendEmail" />
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, toRefs, onMounted } from 'vue'
import { Notify, useQuasar } from 'quasar'
import axios from 'axios'
const config = require('../../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

async function sendEmail (body) {
  return await axios.post(ENDPOINT_PATH_V2 + 'email', body)
}
export default {
  props: ['showWindow', 'email'],
  emits: ['ok', 'hide'],
  setup (props, { emit }) {
    const $q = useQuasar()
    const { email } = toRefs(props)
    const search = ref('')
    const error = ref('')

    onMounted(() => {
      search.value = email.value.emailcliente
    })

    const isValidEmail = (email) => {
      const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return expresionRegular.test(email)
    }

    const resetEmail = () => {
      search.value = ''
    }

    const onSendEmail = async (value) => {
      const body = {
        email: value,
        rif: email.value.rif,
        numerodocumento: email.value.numerodocumento
      }

      const res = await sendEmail({ ...body })
      const { data } = res

      if (Object.hasOwn(data, 'error') && data.error === true) {
        error.value = data.error
        return
      }

      if (Object.hasOwn(data, 'error') && data.success === true) {
        Notify.create('Correo enviado sin problema ')
        emit('ok')
        resetEmail()
        emit('hide')
        return
      }

      Notify.create('Ha ocurrido un error inesperado')
    }

    const renderConfirmSendEmail = (email) => {
      $q.dialog({
        title: 'Confirmación!',
        message: '¿Está seguro de enviar este documento al correo del cliente?',
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
        onSendEmail(email)
      })
    }

    const onConfirmSendEmail = () => {
      if (!isValidEmail(search.value)) {
        error.value = 'Email invalido'
        return
      }

      renderConfirmSendEmail(search.value)
      // emit('hide')
    }

    return {
      search,
      error,
      onConfirmSendEmail,
      onSendEmail
    }
  }
}
</script>

<style lang="scss" scoped>
.redirectEmail-card {
  max-width: inherit;
  min-width: 350px;
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

.redirectEmail-content {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.redirectEmail-input {
  height: 60px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.redirectEmail-error {
  margin: 0;
  font-size: 0.8rem;
  color: red;
}

.redicrectEmail-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}
</style>
