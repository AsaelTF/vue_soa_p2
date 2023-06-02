<template>
	<div class="font-Roboto mx-5">
	  <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
		Registrar activo
	  </p>
	  <div class="flex flex-col items-center justify-center my-44">
		<form class="w-full max-w-lg">
		  <div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3 mb-6 md:mb-0">
			  <label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-first-name"
			  >
				Nombre del activo:
			  </label>
			  <input
			  v-model="data.nombre"
				class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-last-name"
				type="text"
				placeholder="Doe"
			  />
			</div>
		  </div>
		  <div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3 mb-6 md:mb-0">
			  <label
				class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
				for="grid-first-name"
			  >
				Descripción del producto:
			  </label>
			  <input
			  v-model="data.descripcion"
				class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
				id="grid-last-name"
				type="text"
				placeholder="Doe"
			  />
			</div>
		  </div>
		</form>
		<button @click="postActivo" class="bg-sky-600 px-5 py-4 font-Sora text-white rounded-lg hover:ring-2 hover:ring-sky-600 ring-offset-2 transition ease-in-out duration-300">Registrar empleado</button>
	  </div>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
	data() {
	  return {
		data:{
			nombre:"",
			descripcion:"",
			estatus:false
		}
	  };
	},
	methods:{
		postActivo(){
			axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .post("https://localhost:7083/Activo", this.data)
      .then((response) => {
        this.response = response.data;
        console.log(this.response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
		}
	}
  };
  </script>
  
  <style scoped></style>
  