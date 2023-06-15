<template>
	<div>
	  <div class="grid grid-cols-3 justify-items-center gap-y-5 font-Roboto">
		<div v-for="(activo, index) in arrayActivo" class="max-w-sm w-full border border-1 border-black rounded">
		  <div
			class="w-full h-[250px] bg-cover bg-center"
			v-bind:style="{ backgroundImage: 'url(https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Icon-CC-V-Wrench-Screwdriver-Fluent-Blue-111x111?wid=515&hei=293&fit=crop)' }"
		  ></div>
		  <div class="px-3 mt-2">
			<p class="text-lg font-medium">Nombre: {{ activo.Nombre }}</p>
			<p class="text-sm text-black/60">ID: {{ activo.Id }}</p>
		  </div>
		  <div class="px-3 text-sm text-black/60 mb-2">
			<p v-if="activo.Estatus == 0">¿Asignado? No</p>
			<p v-if="activo.Estatus == 1">¿Asignado? Sí</p>
			<p>Descripción: {{ activo.Descripcion }}</p>
		  </div>
		  <!-- <div class="flex px-3 text-sm gap-x-2 font-medium text-[#1867C0] mb-2">
			<button :class="activo.activo == 0 ? 'hover:bg-blue-50':'cursor-text text-gray-600'" class=" p-2 tracking-[.0892857143em]">ASIGNAR ACTIVO</button>
			<button :class="activo.activo == 1 ? 'hover:bg-blue-50':'cursor-text text-gray-600'" class=" p-2 tracking-[.0892857143em]">DESASIGNAR ACTIVO</button>
		  </div> -->
		</div>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	props: {
	  arrayActivo: {
		type: Object,
	  },
	},
  };
  </script>
  
  <style scoped></style>
  