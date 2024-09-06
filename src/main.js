import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'vue3-toastify/dist/index.css';
import './assets/main.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')