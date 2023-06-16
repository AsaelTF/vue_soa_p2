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
        v-model="data.identificadorEmpleado"
        @change="cambiarEmpleado(empleado_seleccionado)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled selected>Escoja un empleado</option>
        <template v-for="(empleado, index) in arrayEmpleados">
          <option v-if="!empleado.estatus" :value="empleado.id">
            {{
              "ID:" +
              empleado.id +
              " " +
              empleado.nombre +
              " " +
              empleado.apellidos +
              ", Id Empleado: " +
              empleado.numeroEmpleado
            }}
          </option>
        </template>
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
        v-model="data.identificadoActivo"
        @change="cambiarActivo(activo_seleccionado)"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option disabled selected>Escoja un activo</option>
        <template v-for="(activo, index) in arrayActivos">
          <option :value="activo.Id" v-if="!activo.Estatus">
            {{
              "ID:" +
              activo.Id +
              " " +
              activo.Nombre +
              ", Descripción: " +
              activo.Descripcion
            }}
          </option>
        </template>
      </select>
    </div>
    <div class="flex flex-col gap-y-10 mb-16">
      <p>ID: Empleado seleccionado: {{ data.identificadorEmpleado }}</p>
      <p>ID: Activo seleccionado: {{ data.identificadoActivo }}</p>
    </div>
    <div class="flex flex-wrap -mx-3 mb-6">
      <div class="w-full px-3">
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="grid-password"
        >
          Fecha de entrega
        </label>
        <input
          v-model="data.fechaEntrega"
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="date"
          placeholder="DOE"
          :max="fecha"
        />
      </div>
    </div>
    <div class="mb-16">
      <button
        @click="postActivoEmpleado(),test()"
        class="border-2 border-sky-600 text-sky-600 tracking-wide text-sm px-4 py-2 w-full rounded hover:bg-sky-600 hover:text-white transition ease-in-out duration-150"
      >
        Confirmar Asignación
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activo_seleccionado: null,
      empleado_seleccionado: null,
      nombre_empleado_seleccionado: "Ninguno",
      nombre_activo_seleccionado: "Ninguno",
      arrayEmpleados: [],
      arrayActivos: [],
      fechaActual: "",
      correo: "",
      data: {
        identificadorEmpleado: null,
        identificadoActivo: null,
        fechaAsignacion: "",
        fechaLiberacion: "",
        fechaEntrega: "",
      },
      xmlDataActivos: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ObtenerActivos xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>
`,
      xmlDataEmpleados: `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ObtenerEmpleados xmlns="http://tempuri.org/"/>
  </soap:Body>
</soap:Envelope>
`,
    };
  },
  computed: {
    fecha() {
      this.fechaActual = new Date();
      var dt = new Date();
      dt.setDate(dt.getDate() + 2);
      this.fechaActual = dt;
      return this.fechaActual.toISOString().split("T")[0];
    },
  },
  mounted() {
    axios
      .post(
        "https://soa-wcf.azurewebsites.net/Service.svc",
        this.xmlDataEmpleados,
        {
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://tempuri.org/IService/ObtenerEmpleados",
          },
          maxContentLength: Infinity,
        }
      )
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

    /// PARA LOS ACTIVOS
    axios
      .post(
        "https://soa-wcf.azurewebsites.net/Service.svc",
        this.xmlDataActivos,
        {
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://tempuri.org/IService/ObtenerActivos",
          },
          maxContentLength: Infinity,
        }
      )
      .then((response) => {
        //Almacenamos el string de la respuesta en this.arrayActivos
        this.arrayActivos = response.data;
        //Creamos una variable const que contentra el regex para descartar el xml
        const jsonRegex = /\[\{.*?\}\]/s;
        //Ejecturamos la funcion match para que nos devuelva lo que se encuentra dentro de [{}]
        const existeJson = this.arrayActivos.match(jsonRegex);
        //Si es verdadero, es que existe el json y hacemos la funcion
        if (existeJson) {
          //Guardamos el valor de match en jsonResult
          const jsonResult = existeJson[0];
          //Convertimos nuevamente a JSON y lo guardamos en this.arrayActivos
          this.arrayActivos = JSON.parse(jsonResult);

          console.log(this.arrayActivos);
        } else {
          console.log("No se encontró la cadena JSON en la respuesta.");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        
      });
  },
  methods: {
    cambiarActivo(activo_seleccionado) {
      this.activo_seleccionado = activo_seleccionado;
      this.nombre_activo_seleccionado = this.arrayActivos.find(
        (activo) => activo.id === activo_seleccionado
      );
    },
    saberEmpleado() {
      for (let i = 0; i < this.arrayEmpleados.length; i++) {
        if (this.arrayEmpleados[i].id == this.data.identificadorEmpleado) {
          console.log(this.arrayEmpleados[i].correo);
          this.correo = this.arrayEmpleados[i].correo;
        }
      }
    },
    postActivoEmpleado() {
      this.data.fechaAsignacion = new Date().toISOString().split("T")[0];
      this.data.fechaLiberacion = new Date().toISOString().split("T")[0];

      var xmlDataActivoEmpleado = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RegistrarActivoEmpledao xmlns="http://tempuri.org/">
      <identificadorEmpleado>${this.data.identificadorEmpleado}</identificadorEmpleado>
      <identificadoActivo>${this.data.identificadoActivo}</identificadoActivo>
      <fechaAsignacion>${this.data.fechaAsignacion}</fechaAsignacion>
      <fechaLiberacion>${this.data.fechaLiberacion}</fechaLiberacion>
      <fechaEntrega>${this.data.fechaEntrega}</fechaEntrega>
    </RegistrarActivoEmpledao>
  </soap:Body>
</soap:Envelope>
`;

      console.log(xmlDataActivoEmpleado);
      axios
        .post(
          "https://soa-wcf.azurewebsites.net/Service.svc",
          xmlDataActivoEmpleado,
          {
            headers: {
              "Content-Type": "text/xml; charset=utf-8",
              SOAPAction: "http://tempuri.org/IService/RegistrarActivoEmpledao",
            },
            maxContentLength: Infinity,
          }
        )
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          
        });
    },
    test() {
      for (let i = 0; i < this.arrayEmpleados.length; i++) {
        if (this.arrayEmpleados[i].id == this.data.identificadorEmpleado) {
          this.correo = this.arrayEmpleados[i].correo;
        }
      }
      console.log(this.correo);
      var xmlCorreo = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <AvisarEmpleado xmlns="http://tempuri.org/">
      <mensaje>Tu entrega del activo es para el ${this.data.fechaEntrega}</mensaje>
      <correo>${this.correo}</correo>
    </AvisarEmpleado>
  </soap:Body>
</soap:Envelope>

`;
      axios
        .post("https://soa-wcf.azurewebsites.net/Service.svc", xmlCorreo, {
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: "http://tempuri.org/IService/AvisarEmpleado",
          },
          maxContentLength: Infinity,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          
        });
    },
  },
};
</script>

<style scoped></style>
