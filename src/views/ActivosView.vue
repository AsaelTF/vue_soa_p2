<template>
	<p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">Activos</p>
	<CardActivo
	:arrayActivo="arrayActivo"
	></CardActivo>
</template>

<script>
import axios from 'axios'
import CardActivo from '../components/CardActivo.vue'

export default{
	data(){
		return{
			arrayActivo:[
			]
			//https://localhost:7083/Activo
		}
	},
	mounted(){
    axios
      //.get('http://172.16.128.41:3000/api/v1/viper/getAll')
      .get('https://localhost:7083/Activo')
      .then(response => {
        this.arrayActivo = response.data
        console.log(this.arrayActivo)
      })
      .catch(error => {
        console.log(error)

      })
      .finally(() => {

      })
  },
	components:{
		CardActivo
	}
}
</script>

<style scoped>

</style>