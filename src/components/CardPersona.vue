<template>
  <div>
    <div class="grid grid-cols-3 justify-items-center gap-y-5 font-Roboto">
      <div v-for="(empleado, index) in arrayEmpleados" class="max-w-xs w-full border border-1 border-black rounded">
        <div
          class="w-full h-[250px] bg-cover bg-center"
          v-bind:style="{ backgroundImage: 'url(https://images.reporteindigo.com/wp-content/uploads/2023/02/Dinosaurio-con-profesio%CC%81n-Este-es-el-origen-de-la-nueva-tendencia-y-co%CC%81mo-puedes-conseguir-uno--647x660.jpeg)' }"
        ></div>
        <div class="px-3 mt-2">
          <p class="text-lg font-medium">Nombre: {{ empleado.nombre+" "+ empleado.apellidos }}</p>
		  <p class="text-sm text-black/60">ID: {{ empleado.id }}</p>
      <p class="text-sm text-black/60">Numero de empleado: {{ empleado.numeroEmpleado }}</p>
        </div>
        <div class="px-3 text-sm text-black/60 mb-2">
          <p v-if="!empleado.estatus">¿Tiene activo? No</p>
          <p v-if="empleado.estatus">¿Tiene activo? Sí</p>
          <!-- <p>Nombre del activo: {{ empleado.nombre_activo }}</p> -->
          <p class="text-sm text-black/60">Correo electronico: {{ empleado.correo }}</p>
          <p class="text-sm text-black/60">CURP: {{ empleado.curp }}</p>
        </div>
        <div class="flex px-3 text-xs gap-x-2 font-medium mb-2">
          <button :class="!empleado.estatus ? 'border border-red-600 hover:bg-red-600 rounded text-red-600 hover:text-white transition ease-in-out duration-150':'cursor-text text-gray-600'" class=" p-2 tracking-[.0892857143em]">ELIMINAR EMPLEADO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arrayEmpleados: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>
