import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faEye, faEyeSlash, faUser, faSort, faHome, faChartPie, faSlidersH, faWallet, faExchangeAlt, faLocationArrow, faQrcode, faLongArrowAltLeft, faSpinner, faCancel } from '@fortawesome/free-solid-svg-icons'

library.add(
    faEye,
    faEyeSlash,
    faSort, 
    faHome, 
    faChartPie, 
    faSlidersH, 
    faWallet, 
    faExchangeAlt, 
    faLocationArrow, 
    faQrcode,
    faLongArrowAltLeft,
    faSpinner,
    faCancel
    )


createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).use(VueSweetalert2).mount('#app')
import 'bootstrap/dist/js/bootstrap.js'

// axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.baseURL = 'https://digixcel-backend.onrender.com/api/';

