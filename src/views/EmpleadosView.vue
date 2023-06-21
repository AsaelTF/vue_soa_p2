<template>
  <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
    Empleados
  </p>
  <div class="flex justify-end w-full mb-5">
    <div class="flex flex-col w-64 gap-y-3">
      <input
        class="border focus:no-underline ring-0"
        type="text"
        name=""
        id=""
        v-model="correo"
      />
      <button
        @click="correoMasivo()"
        class="text-sm font-medium bg-indigo-700 text-white rounded"
      >
        Enviar correos masivo a todos los empleados
      </button>
    </div>
  </div>
  <div class="min-h-screen">
    <CardPersona :arrayEmpleados="arrayEmpleados"></CardPersona>
  </div>
</template>

<script>
import axios from "axios";
import CardPersona from "../components/CardPersona.vue";

export default {
  data() {
    return {
      correo:"",
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
  methods: {
    correoMasivo() {
      xmlCorreo: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <EnviarCorreos xmlns="http://tempuri.org/">
      <mensaje>${this.correo}</mensaje>
    </EnviarCorreos>
  </soap:Body>
</soap:Envelope>
`,
axios
      .post("https://soa-wcf.azurewebsites.net/Service.svc", this.xmlData, {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: "http://tempuri.org/IService/EnviarCorreos",
        },
        maxContentLength: Infinity,
      })
      .then((response) => {

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
    },
  },
  components: {
    CardPersona,
  },
};
</script>

<style scoped></style>
