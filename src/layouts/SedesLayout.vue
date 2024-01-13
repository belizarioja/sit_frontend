<template>
 <div class="my-font bg-primary window-height window-width row justify-center">
  <div class="bg-white col-3">
    <div class="" style="text-align: center; padding: 20px;">
      <img src="logo_sit.jpg" style="max-width: 180px;" />
    </div>
    <div class="text-h6 text-secondary text-center">
      Seleccione cliente
    </div>
    <div class="text-center" style="display: flex; justify-content: center;">
      <div class="iconSeleccionado text-secondary">
        Seleccionado
      </div>
    </div>
    <q-btn
      label="Cliente"
      :disabled="changePacks"
      color="primary"
      @click="continuar"
      style="float:left;margin-left: 40px;"
    />
    <q-btn
      v-if="co_rol !== '4'"
      label="Todos"
      v-close-popup color="secondary"
      @click="todos"
      style="float: right;margin-right: 40px;"/>
  </div>
  <div class="col-9">
    <div
      class="row"
      style="justify-content: center;"
    >
      <div
        v-for="(item, index) in rows"
        :key="index"
        class="iconPaquete sedeNoSelected "
        :class="{[`class${index}`]: true}"
        @click="onSeleted(index, item.cod, item.razonsocial, item.rif)"
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
      usuario: '',
      clave: '',
      loading: false,
      co_rol: sessionStorage.getItem('co_rol'),
      columns: [
        { name: 'logo', align: 'center', label: 'Logo', field: 'logo', sortable: true },
        { name: 'rif', align: 'center', label: 'RIF', field: 'rif', sortable: true },
        { name: 'razonsocial', align: 'center', label: 'Razón social', field: 'razonsocial', sortable: true },
        { name: 'direccion', label: 'Dirección', field: 'direccion', sortable: true },
        { name: 'email', label: 'Correo electrónico', field: 'email', sortable: true },
        { name: 'telefono', label: 'Teléfono contacto', field: 'telefono', sortable: true },
        { name: 'estatus', label: 'Estatus', field: 'estatus' }
      ],
      rows: []
    }
  },
  methods: {
    todos () {
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
    onSeleted (index, cod, razonsocial, rif) {
      this.changePacks = true
      const element = document.querySelector('.class' + index)

      this.onClean()
      element.classList.add('sedeSelected')
      element.classList.remove('sedeNoSelected')
      this.co_sede_seleted = cod
      this.tx_sede_seleted = razonsocial
      this.rif_sede_seleted = rif
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
    this.listar()
  }
}
</script>
<style>
    .sedeNoSelected{
    border: 2px solid #ddd;
    }
    .sedeSelected {
    border: 2px solid #74ab43;
    }
  .iconPaquete {
    background: white;
    text-align: center;
    width: 300px;
    height: 110px;
    border-radius: 10px;
    margin: 9px;
    padding: 5px;
    float: left;
    cursor: pointer;
    display: flex;
    padding-top: 10px;
  }
  .iconSeleccionado {
    align-items: center;
    width: 130px;
    height: 170px;
    border-radius: 10px;
    border: 2px dashed #5a8f89;
    margin: 20px;
    padding: 5px;
    display: grid;
    padding-top: 10px;
  }

  .nombrePaquete {
    height: 53px;
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
  .diasPaquete {
    font-size: 14px;
  }
  .sedePaquete {
    font-size: 11px;
    font-weight: bolder;
    color: #74ab43;
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
</style>
