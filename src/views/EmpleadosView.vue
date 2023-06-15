<template>
  <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
    Empleados
  </p>
  <CardPersona
	:arrayEmpleados="arrayEmpleados"
	></CardPersona>
</template>

<script>
import axios from "axios";
import CardPersona from "../components/CardPersona.vue";

export default {
  data() {
    return {
      arrayEmpleados: null,
      xmlData: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ObtenerEmpleados xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>
`,
      //https://localhost:7083/Personas
    };
  },
  mounted() {
    axios
      .post("https://soa-wcf.azurewebsites.net/Service.svc", this.xmlData, {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://tempuri.org/IService/ObtenerEmpleados",
        },
        maxContentLength: Infinity,
      })
      .then((response) => {
        //Almacenamos el string de la respuesta en this.arrayEmpleados
        this.arrayEmpleados = response.data;
        //Creamos una variable const que contentra el regex para descartar el xml
        const jsonRegex = /\[\{.*?\}\]/s;
        //Ejecturamos la funcion match para que nos devuelva lo que se encuentra dentro de [{}]
        const existeJson = this.arrayEmpleados.match(jsonRegex);
        //Si es verdadero, es que existe el json y hacemos la funcion
        if (existeJson) {
          //Guardamos el valor de match en jsonResult
          const jsonResult = existeJson[0];
          //Convertimos nuevamente a JSON y lo guardamos en this.arrayEmpleados
          this.arrayEmpleados = JSON.parse(jsonResult);

          console.log(this.arrayEmpleados);
        } else {
          console.log("No se encontró la cadena JSON en la respuesta.");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  },
  components: {
    CardPersona,
  },
};
</script>

<style scoped></style>
