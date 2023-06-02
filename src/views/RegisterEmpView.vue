<template>
  <div class="font-Roboto mx-5">
    <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
      Registrar empleado
    </p>
    <div class="flex flex-col items-center justify-center my-16">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Numero de empleado:
            </label>
            <input
            v-model="data.numeroEmpleado"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="DOE"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Nombre(s):
            </label>
            <input
            v-model="data.nombre"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Apellidos(s):
            </label>
            <input
            v-model="data.apellidos"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              CURP:
            </label>
            <input
            v-model="data.curp"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="DOE"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              E-Mail:
            </label>
            <input
            v-model="data.correo"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="DOE@mail.com"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Fecha de nacimiento:
            </label>
            <input
            v-model="data.fechaNacimiento"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="date"
              placeholder="DOE"
            />
          </div>
        </div>
      </form>
      <button @click="postEmpleado" class="bg-sky-600 px-5 py-4 font-Sora text-white rounded-lg hover:ring-2 hover:ring-sky-600 ring-offset-2 transition ease-in-out duration-300">Registrar empleado</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        numeroEmpleado: 100,
        estatus: false,
        fechaIngreso: "2023-06-02",
        nombre: "",
        apellidos: "",
        curp: "",
        correo: "",
        fechaNacimiento: "",
      },
      response: null,
    };
  },
  methods: {
    postEmpleado(){
      axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .post("https://localhost:7083/Personas", this.data)
      .then((response) => {
        this.response = response.data;
        console.log(this.response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    }
  },
};
</script>

<style scoped></style>
