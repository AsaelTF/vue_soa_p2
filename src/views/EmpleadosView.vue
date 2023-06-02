<template>
	<p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">Empleados</p>
	<CardPersona
	:arrayEmpleados="arrayEmpleados"
	></CardPersona>
</template>

<script>
import axios from 'axios'
import CardPersona from '../components/CardPersona.vue'

export default{
	data(){
		return{
			arrayEmpleados:[]
			//https://localhost:7083/Personas
		}
	},
	mounted(){
    axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .get('https://localhost:7083/Personas')
      .then(response => {
        this.arrayEmpleados = response.data
        console.log(this.arrayEmpleados)
      })
      .catch(error => {
        console.log(error)

      })
      .finally(() => {

      })
  },
	components:{
		CardPersona
	}
}
</script>

<style scoped>

</style>