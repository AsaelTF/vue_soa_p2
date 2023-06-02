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
        v-model="empleado_seleccionado"
        @change="cambiarEmpleado(empleado_seleccionado)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled selected>Escoja un empleado</option>
        <option v-for="(empleado, index) in arrayEmpleados" :value="empleado.id">
          {{ empleado.nombre }}
        </option>
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
        v-model="activo_seleccionado"
        @change="cambiarActivo(activo_seleccionado)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled selected>Escoja un activo</option>
        <option v-for="(activo, index) in arrayActivos" :value="activo.id">
          {{ activo.nombre }}
        </option>
      </select>
    </div>
    <div class="flex flex-col gap-y-10 mb-16">
      <p>Empleado seleccionado: {{ nombre_empleado_seleccionado }}, {{ empleado_seleccionado }}</p>
      <p>Activo seleccionado: {{ nombre_activo_seleccionado }}, {{ activo_seleccionado }}</p>
    </div>
    <div class="mb-16">
      <button class="bg-blue-700 hover:bg-blue-800 text-white/90 p-2 rounded">
        Confirmar Asignación
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activo_seleccionado: null,
      empleado_seleccionado: null,
      nombre_empleado_seleccionado: "Ninguno",
      nombre_activo_seleccionado: "Ninguno",
      arrayEmpleados: [
        {
          id: 1,
          nombre: "Mirse Hau",
        },
        { id: 2, nombre: "Mirse Chi" },
        { id: 3, nombre: "Maribel Hau" },
        { id: 4, nombre: "Maribel Chi" },
        { id: 5, nombre: "Mirse Maribel Hau" },
        { id: 6, nombre: "Maribel Hau Chi" },
        { id: 7, nombre: "Mirse Maribel Hau Chi" },
      ],
      arrayActivos: [
        { id: 1, nombre: "Laptop" },
        { id: 2, nombre: "Dinosaurio bb" },
        { id: 3, nombre: "Monedero Bolillo" },
        { id: 4, nombre: "Quest 2" },
        { id: 5, nombre: "MacBookAir M2" },
        { id: 6, nombre: "Google Pixel 7" },
        { id: 7, nombre: "Fortinet " },
      ],
    };
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
  },
};
</script>

<style scoped></style>
