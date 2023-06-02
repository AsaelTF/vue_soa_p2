<template>
  <div>
    <div class="grid grid-cols-3 justify-items-center gap-y-5 font-Roboto">
      <div
        v-for="(empleado, index) in arrayActivoEmpleado"
        class="max-w-xs w-full border border-1 border-black rounded"
      >
        <div
          class="w-full h-[250px] bg-cover bg-center"
          v-bind:style="{
            backgroundImage:
              'url(https://images.reporteindigo.com/wp-content/uploads/2023/02/Dinosaurio-con-profesio%CC%81n-Este-es-el-origen-de-la-nueva-tendencia-y-co%CC%81mo-puedes-conseguir-uno--647x660.jpeg)',
          }"
        ></div>
        <div class="px-3 mt-2">
          <p class="text-sm text-black/60">ID: {{ empleado.id }}</p>
          <p class="text-sm text-black/60">
            Numero de empleado: {{ empleado.idEmpleado }}
          </p>
          <p class="text-sm text-black/60">
            Numero de empleado: {{ empleado.idActivo }}
          </p>
        </div>
        <div class="px-3 text-sm text-black/60 mb-2">
          <!-- <p>Nombre del activo: {{ empleado.nombre_activo }}</p> -->
          <p class="text-sm text-black/60">
            Fecha de asignación: {{ empleado.fechaAsignacion }}
          </p>
          <p class="text-sm text-black/60">
            Fecha de entrega: {{ empleado.fechaEntrega }}
          </p>
          <p class="text-sm text-black/60">
            Fecha de liberación: {{ empleado.fechaLiberacion }}
          </p>
        </div>
        <div class="flex px-3 text-xs gap-x-2 font-medium mb-2">
          <button
		  @click="deleteActivoEmpleado(empleado.id)"
            class="border border-red-600 hover:bg-red-600 rounded text-red-600 hover:text-white transition ease-in-out duration-150 p-2 tracking-[.0892857143em]"
          >
            DESASIGNAR ACTIVO
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      response: null,
    };
  },
  props: {
    arrayActivoEmpleado: {
      type: Object,
    },
  },
  methods: {
    deleteActivoEmpleado(id) {
      axios
        //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
        .delete("https://localhost:7083/ActivoEmpleado/"+id)
        .then((response) => {
          this.response = response.data;
          console.log(this.response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    },
  },
};
</script>

<style scoped></style>
