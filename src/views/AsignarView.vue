<template>
  <div class="font-Roboto mx-5">
    <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
      Asignar activo a empleados
    </p>
    <div>
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900"
        >Selecciona un empleado</label
      >
      <select
        id="countries"
        v-model="data.identificadorEmpleado"
        @change="cambiarEmpleado(empleado_seleccionado)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled selected>Escoja un empleado</option>
        <template v-for="(empleado, index) in arrayEmpleados">
          <option
          v-if="!empleado.estatus"
          :value="empleado.id"
        >
          {{"ID:"+ empleado.id+ " " + empleado.nombre+" "+empleado.apellidos+", Id Empleado: "+empleado.numeroEmpleado }}
        </option>
        </template>
      </select>
    </div>
    <div class="my-16">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900"
        >Selecciona un activo</label
      >
      <select
        id="countries"
        v-model="data.identificadoActivo"
        @change="cambiarActivo(activo_seleccionado)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled selected>Escoja un activo</option>
        <template v-for="(activo, index) in arrayActivos">
          <option :value="activo.id" v-if="!activo.estatus">
          {{"ID:"+ activo.id+ " " + activo.nombre +", Descripción: "+activo.descripcion}}
        </option>
        </template>
      </select>
    </div>
    <div class="flex flex-col gap-y-10 mb-16">
      <p>
        ID: Empleado seleccionado: {{ data.identificadorEmpleado }}
      </p>
      <p>
        ID: Activo seleccionado: {{ data.identificadoActivo}}
      </p>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Fecha de entrega
            </label>
            <input
            v-model="data.fechaEntrega"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="date"
              placeholder="DOE"
              :max="fecha"
            />
          </div>
        </div>
    <div class="mb-16">
      <button @click="postActivoEmpleado(),test()" class="border-2 border-sky-600 text-sky-600 tracking-wide text-sm px-4 py-2 w-full rounded hover:bg-sky-600 hover:text-white transition ease-in-out duration-150">
        Confirmar Asignación
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      activo_seleccionado: null,
      empleado_seleccionado: null,
      nombre_empleado_seleccionado: "Ninguno",
      nombre_activo_seleccionado: "Ninguno",
      arrayEmpleados: [],
      arrayActivos:[],
      fechaActual :"",
      data:{
        identificadorEmpleado:null,
        identificadoActivo:null,
        fechaAsignacion:"",
        fechaLiberacion:"",
        fechaEntrega:""
      }
    };
  },
  computed: {
    fecha() {
      this.fechaActual = new Date()
      var dt = new Date();
      dt.setDate(dt.getDate() + 2)
      this.fechaActual = dt;
      return this.fechaActual.toISOString().split('T')[0];
    }
  },
  mounted() {
    axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .get("https://localhost:7083/Personas")
      .then((response) => {
        this.arrayEmpleados = response.data;
        console.log(this.arrayEmpleados);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });

    axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .get("https://localhost:7083/Activo")
      .then((response) => {
        this.arrayActivos = response.data;
        console.log(this.arrayActivos);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
  methods: {
    cambiarActivo(activo_seleccionado) {
      this.activo_seleccionado = activo_seleccionado;
      this.nombre_activo_seleccionado = this.arrayActivos.find(
        (activo) => activo.id === activo_seleccionado
      );
    },
    cambiarEmpleado(empleado_seleccionado) {
      this.empleado_seleccionado = empleado_seleccionado;
      this.nombre_empleado_seleccionado = this.arrayEmpleados.find(
        (empleado) => empleado.id === empleado_seleccionado
      );
    },
    postActivoEmpleado(){
      this.data.fechaAsignacion = new Date().toISOString().split('T')[0]
      this.data.fechaLiberacion = new Date().toISOString().split('T')[0]
      axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .post("https://localhost:7083/ActivoEmpleado", this.data)
      .then((response) => {
        this.response = response.data;
        console.log(this.response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    },
    test(){
      console.log(this.data)
    }
  },
};
</script>

<style scoped></style>
