<template>
 <div class="my-font window-height window-width row justify-center">
  <div class="my-fondo col-3">
    <div class="" style="text-align: center; padding: 20px;">
      <img src="logo_sit.jpg" style="width: 220px;" />
    </div>
    <div class="text-h6 text-secondary text-center">
      Cliente seleccionado
    </div>
    <div class="row">
      <div class="col" style="height: 65vh;">
        <div class="row" style="justify-content: center;">
          <div v-if="changePacks" class="iconSeleccionado text-secondary">
            No hay selección
          </div>
          <div v-else class="iconSeleccionado text-secondary">
            <div class="imgPaquete">
              <img
                v-bind:src="itemselected.logo"
                onerror="this.src='default.svg'"
                :width="itemselected.width"
                style="border-radius: 7px;"
              />
            </div>
            <div class="tituloPaqueteSelected">
              <span class="nombrePaquete">{{ itemselected.razonsocial }}</span>
              <span class="sedePaquete">RIF: {{itemselected.rif}}</span>
            </div>
          </div>
        </div>
        <div v-if="!changePacks" class="row" style="">
          <div class="col">
            <span class="nombrePaqueteSeleted" style="margin: 3px 20px; text-align: center;">Dirección: {{ itemselected.direccion }}</span>
            <span class="nombrePaqueteSeleted">Email: {{itemselected.email}}</span>
            <span class="nombrePaqueteSeleted">Sitio web: {{itemselected.sitioweb}}</span>
            <span class="nombrePaqueteSeleted">Teléfono: {{itemselected.telefono}}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: space-around;">
      <q-btn
        label="Cliente"
        :disabled="changePacks"
        color="primary"
        @click="continuar"
      />
      <q-btn
        v-if="co_rol !== '4'"
        label="Todos"
        v-close-popup color="secondary"
        @click="todos"
      />
    </div>
  </div>
  <div class="col-9 fondocolorimg">
    <div
      class="row"
      style="justify-content: center;"
    >
      <div
        v-for="(item, index) in rows"
        :key="index"
        class="iconPaquete sedeNoSelected "
        :class="{[`class${index}`]: true}"
        @click="onSeleted(index, item)"
      >
        <div class="imgPaquete">
          <img
            v-bind:src="item.logo"
            onerror="this.src='default.svg'"
            :width="item.width"
            style="border-radius: 7px;"
          />
        </div>
        <div class="tituloPaquete">
          <span class="nombrePaquete">{{ item.razonsocial }}</span>
          <span class="sedePaquete">RIF: {{item.rif}}</span>
        </div>
      </div>
    </div>
    <q-btn
      label="Salir"
      class="absolute-bottom-right "
      v-close-popup color="dark"
      @click="salir"
      style="margin: 20px;"
    />
  </div>
</div>
</template>

<script>
import { Notify } from 'quasar'
import axios from 'axios'
const config = require('../config/endpoints.js')
const ENDPOINT_PATH_V2 = config.endpoint_path_v2

export default {
  name: 'SedesLayout',
  data () {
    return {
      changePacks: true,
      itemselected: {},
      rows: [],
      usuario: '',
      clave: '',
      loading: false,
      co_rol: sessionStorage.getItem('co_rol')
    }
  },
  methods: {
    todos () {
      sessionStorage.setItem('co_sede_seleted', '')
      sessionStorage.setItem('tx_sede_seleted', '')
      sessionStorage.setItem('rif_sede_seleted', '')
      if (this.co_rol === '1') {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/consulta')
      }
    },
    continuar () {
      sessionStorage.setItem('co_sede_seleted', this.co_sede_seleted)
      sessionStorage.setItem('tx_sede_seleted', this.tx_sede_seleted)
      sessionStorage.setItem('rif_sede_seleted', this.rif_sede_seleted)
      if (this.co_rol === '1') {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/consulta')
      }
    },
    onClean () {
      this.co_sede_seleted = ''
      this.tx_sede_seleted = ''
      this.rif_sede_seleted = ''
      const elements = document.querySelectorAll('.iconPaquete')
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('sedeSelected')) {
          elements[i].classList.remove('sedeSelected')
          elements[i].classList.add('sedeNoSelected')
        }
      }
    },
    onSeleted (index, item) {
      this.changePacks = true
      const element = document.querySelector('.class' + index)

      this.onClean()
      element.classList.add('sedeSelected')
      element.classList.remove('sedeNoSelected')
      this.itemselected = item
      console.log(this.itemselected)
      this.co_sede_seleted = item.cod
      this.tx_sede_seleted = item.razonsocial
      this.rif_sede_seleted = item.rif
      const elements = document.querySelectorAll('.iconPaquete')
      for (let i = 0; i < elements.length; i++) {
        if (elements[i].classList.contains('sedeSelected')) {
          this.changePacks = false
        }
      }
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
        sessionStorage.removeItem('co_rol')
        this.$router.push('/')
      })
    },
    listar () {
      this.btndisable = false
      axios.get(ENDPOINT_PATH_V2 + 'sede').then(async response => {
        console.log(response.data)
        const datos = response.data.data
        this.rows = []
        for (const i in datos) {
          const obj = {}
          obj.cod = datos[i].id
          obj.logo = ENDPOINT_PATH_V2 + 'imagen/' + datos[i].rif + '.png'
          obj.width = 80
          obj.rif = datos[i].rif
          obj.razonsocial = datos[i].razonsocial
          obj.direccion = datos[i].direccion
          obj.email = datos[i].email
          obj.sitioweb = datos[i].sitioweb
          obj.telefono = datos[i].telefono
          obj.tokenservicios = datos[i].tokenservicios
          obj.estatus = datos[i].estatus === '1' ? 'Activo' : 'Inactivo'
          this.rows.push(obj)
        }
        console.log(this.rows)
      }).catch(error => {
        Notify.create('Problemas al listar Sedes ' + error)
      })
    }
  },
  mounted () {
    if (this.co_rol !== '1' && this.co_rol !== '2' && this.co_rol !== '4') {
      this.$router.push('/erroracceso')
    }
    this.listar()
  }
}
</script>
<style>
  .sedeNoSelected{
    border: 2px solid #ddd;
  }
  .sedeSelected {
    border: 2px solid #0999FF;
  }
  .iconPaquete {
    background: white;
    text-align: center;
    width: 300px;
    height: 110px;
    border-radius: 20px;
    margin: 9px;
    padding: 5px;
    float: left;
    cursor: pointer;
    display: flex;
    padding-top: 10px;
  }
  .iconSeleccionado {
    text-align: center;
    align-items: center;
    width: 150px;
    height: 190px;
    border-radius: 20px;
    border: 2px dashed #5a8f89;
    margin: 20px;
    padding: 5px;
    display: grid;
    justify-content: center;
    padding-top: 10px;
  }
  .nombrePaqueteSeleted {
    font-size: 13px;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .nombrePaquete {
    height: 60px;
    font-size: 13px;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .precioPaquete {
    font-size: 15px;
    font-weight: bolder;
  }
  .direccionPaquete {
    font-size: 9px;
    font-style: italic;
    height: 25px;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .sedePaquete {
    font-size: 14px;
    font-weight: bolder;
    color: #f57b09;
  }
  .imgPaquete {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tituloPaquete {
    width: 72%;
    display: grid;
    align-items: center;
    justify-content: center;
  }
  .tituloPaqueteSelected {
    display: grid;
    align-items: center;
    justify-content: center;
  }
.fondocolorimg {
    background: url("../assets/fondo_emisores_up.png") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>
