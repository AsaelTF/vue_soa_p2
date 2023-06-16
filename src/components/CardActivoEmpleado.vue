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
            Numero de activo: {{ empleado.idActivo }}
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
      var xmlData = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RegistrarActivo xmlns="http://tempuri.org/">
      <Nombre>${this.data.nombre}</Nombre>
      <Descripcion>${this.data.descripcion}</Descripcion>
      <Estatus>false</Estatus>
    </RegistrarActivo>
  </soap:Body>
</soap:Envelope>
`;

      axios
        .post("https://soa-wcf.azurewebsites.net/Service.svc", xmlData, {
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://tempuri.org/IService/RegistrarActivo",
          },
          maxContentLength: Infinity,
        })
        .then((response) => {
          //Almacenamos el string de la respuesta en this.arrayActivo
          this.arrayActivo = response.data;
          console.log(this.arrayActivo);
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
        .finally(() => {
          window.location.reload();
        });
    },
  },
};
</script>

<style scoped></style>
