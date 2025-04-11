import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

// Importa los componentes
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import UserDashboardPage from './components/UserDashboardPage.vue'
import store from "@/store";

// Configura Axios para la API
axios.defaults.baseURL = 'http://localhost:8000/api';  // Cambia la URL si es necesario
axios.defaults.withCredentials = true;  // Habilita las cookies de sesión

// Define las rutas de la aplicación
const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/dashboard', component: UserDashboardPage, meta: { requiresAuth: true } },  // Cambia el nombre aquí
];

// Crear una instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Crear la aplicación de Vue y montarla
createApp(App)
    .use(store)
  .use(router)  // Usa Vue Router
  .mount('#app');
