import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import store from '@/store'; // Si estás usando Vuex para manejar el estado

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: () => import('../views/UserDashboardPage.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
// Guard para proteger rutas que requieren autenticación
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });
export default router;
