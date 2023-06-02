import { createWebHistory, createRouter } from "vue-router";
import ActivosView from "../views/ActivosView.vue"
import EmpleadosView from "../views/EmpleadosView.vue"
import AsignarView from "../views/AsignarView.vue"
import RegisterActView from "../views/RegisterActView.vue"
import RegisterEmpView from "../views/RegisterEmpView.vue"
import ActivosEmpleadosView from "../views/ActivosEmpleadosView.vue"
// import ComparePage from "../components/views/ActivosView.vue"


const routes = [
	{
		path: "/empleados",
		component: EmpleadosView
	},
	{ 
		path: "/",
		redirect: "/empleados"
	},
	{ 
		path: "/activos",
		component: ActivosView
	},
	{ 
		path: "/asignar",
		component: AsignarView
	},
	{ 
		path: "/registrar/empleado",
		component: RegisterEmpView
	},
	{ 
		path: "/registrar/activo",
		component: RegisterActView
	},
	{
		path:"/activos-empleados",
		component: ActivosEmpleadosView
	}
	// { 
	// 	path: "/:pathMatch(.*)*", 
	// 	component: PageNotFound 
	// }

]

const router = createRouter({
	history: createWebHistory(),
	routes,
  });

export default router;