import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'

import { 
	faEarthAmerica,
	faFileCircleQuestion,
	faFilePowerpoint,
	faHammer,
	faHatWizard,
	faPersonHarassing,
	faUser,
 } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
	faHatWizard,
	faUser,
	faHammer,
	faEarthAmerica,
	faFilePowerpoint,
	faFileCircleQuestion,
	faPersonHarassing
	)

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.use(router)
.mount('#app')
