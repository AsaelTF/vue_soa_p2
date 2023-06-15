<template>
  <div class="font-Roboto mx-5">
    <p class="text-2xl text-center font-Roboto font-bold tracking-wide my-5">
      Registrar empleado
    </p>
    <div class="flex flex-col items-center justify-center my-16">
      <form class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Numero de empleado:
            </label>
            <input
            v-model="data.numeroEmpleado"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="DOE"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Nombre(s):
            </label>
            <input
            v-model="data.nombre"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Apellidos(s):
            </label>
            <input
            v-model="data.apellidos"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Doe"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              CURP:
            </label>
            <input
            v-model="data.curp"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="DOE"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              E-Mail:
            </label>
            <input
            v-model="data.correo"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="DOE@mail.com"
            />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              Fecha de nacimiento:
            </label>
            <input
            v-model="data.fechaNacimiento"
              class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="date"
              placeholder="DOE"
            />
          </div>
        </div>
      </form>
      <button @click="postEmpleado" class="bg-sky-600 px-5 py-4 font-Sora text-white rounded-lg hover:ring-2 hover:ring-sky-600 ring-offset-2 transition ease-in-out duration-300">Registrar empleado</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      data: {
        numeroEmpleado: 100,
        estatus: false,
        fechaIngreso: "2023-06-02",
        nombre: "",
        apellidos: "",
        curp: "",
        correo: "",
        fechaNacimiento: "",
      },
      response: null,
    };
  },
  methods: {
    postEmpleado(){
      var  xmlData = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RegistrarEmpleado xmlns="http://tempuri.org/">
      <numeroEmpleado>${this.data.numeroEmpleado}</numeroEmpleado>
      <estatus>false</estatus>
      <fechaIngreso>2023-06-14T21:16:25.522Z</fechaIngreso>
      <nombre>${this.data.nombre}</nombre>
      <apellidos>${this.data.apellidos}</apellidos>
      <curp>${this.data.curp}</curp>
      <correo>${this.data.correo}</correo>
      <FechaNacimiento>${this.data.fechaNacimiento}</FechaNacimiento>
    </RegistrarEmpleado>
  </soap:Body>
</soap:Envelope>

`;
      console.log(xmlData);
      axios
        .post("https://soa-wcf.azurewebsites.net/Service.svc", xmlData, {
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://tempuri.org/IService/RegistrarEmpleado",
          },
          maxContentLength: Infinity,
        })
        .then((response) => {
          //Almacenamos el string de la respuesta en this.arrayActivo
          this.arrayActivo = response.data;
          console.log(this.arrayActivo)
          //Creamos una variable const que contentra el regex para descartar el xml
          const jsonRegex = /\{.*?\}/s;
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
    }
  },
};
</script>

<style scoped></style>
