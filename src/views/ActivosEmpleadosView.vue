<template>
  <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
    Empleados
  </p>
  <CardActivoEmpleado :arrayActivoEmpleado="arrayActivoEmpleado"></CardActivoEmpleado>
</template>

<script>
import axios from "axios";
import CardActivoEmpleado from "../components/CardActivoEmpleado.vue";
export default {
  data() {
    return {
      arrayActivoEmpleado: [],
    };
  },
  mounted() {
    axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .get("https://localhost:7083/ActivoEmpleado")
      .then((response) => {
        this.arrayActivoEmpleado = response.data;
        console.log(this.arrayActivoEmpleado);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
  components:{
	CardActivoEmpleado
  }
};
</script>

<style scoped></style>
