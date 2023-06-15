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
			arrayActivo:null,
			xmlData: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ObtenerActivos xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>
`,
		}
	},
	mounted() {
    axios
      .post("https://soa-wcf.azurewebsites.net/Service.svc", this.xmlData, {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://tempuri.org/IService/ObtenerActivos",
        },
        maxContentLength: Infinity,
      })
      .then((response) => {
        //Almacenamos el string de la respuesta en this.arrayActivo
        this.arrayActivo = response.data;
        //Creamos una variable const que contentra el regex para descartar el xml
        const jsonRegex = /\[\{.*?\}\]/s;
        //Ejecturamos la funcion match para que nos devuelva lo que se encuentra dentro de [{}]
        const existeJson = this.arrayActivo.match(jsonRegex);
        //Si es verdadero, es que existe el json y hacemos la funcion
        if (existeJson) {
          //Guardamos el valor de match en jsonResult
          const jsonResult = existeJson[0];
          //Convertimos nuevamente a JSON y lo guardamos en this.arrayActivo
          this.arrayActivo = JSON.parse(jsonResult);

          console.log(this.arrayActivo);
        } else {
          console.log("No se encontró la cadena JSON en la respuesta.");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
	components:{
		CardActivo
	}
}
</script>

<style scoped>

</style>