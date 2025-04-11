import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import Dashboard from './components/UserDashboardPage.vue';

const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },  // Ruta protegida
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
