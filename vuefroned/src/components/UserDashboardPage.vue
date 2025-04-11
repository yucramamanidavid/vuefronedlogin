<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <p>Contenido privado solo accesible para usuarios autenticados.</p>

      <div class="button-container">
        <!-- Mostrar el botón de Cerrar sesión si está autenticado -->
        <button v-if="isAuthenticated" @click="logout" class="btn btn-logout">Cerrar sesión</button>

        <!-- Mostrar el botón de Iniciar sesión si no está autenticado -->
        <button v-if="!isAuthenticated" @click="goToLogin" class="btn btn-login">Iniciar sesión</button>

        <!-- Mostrar el botón de Registrarse si no está autenticado -->
        <button v-if="!isAuthenticated" @click="goToRegister" class="btn btn-register">Registrarse</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/services/axios'; // Instancia de Axios configurada
import { mapGetters } from 'vuex'; // Para obtener el estado de Vuex

export default {
  computed: {
    ...mapGetters(['isAuthenticated']), // Obtener el estado de autenticación desde Vuex
  },
  methods: {
    logout() {
      const token = localStorage.getItem('auth_token');  // Obtiene el token de localStorage

      if (!token) {
        console.log("No hay token disponible para hacer logout.");
        alert("No se encuentra el token. Por favor, inicia sesión nuevamente.");
        return;  // Si no hay token, sale de la función de logout
      }

      // Si el token está presente, continúa con la solicitud de logout
      api.get('/sanctum/csrf-cookie', { withCredentials: true })
          .then(() => {
            api.post('/logout', {}, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
                .then(() => {
                  localStorage.removeItem('auth_token');  // Elimina el token después del logout
                  this.$store.dispatch('logout');  // Actualiza el estado de Vuex
                  this.$router.push('/login');  // Redirige al login
                })
                .catch((error) => {
                  console.error('Error al cerrar sesión:', error);
                  alert('Error al cerrar sesión');
                });
          })
          .catch((error) => {
            console.error('Error al obtener CSRF Token:', error);
            alert('Error al obtener CSRF Token');
          });
    },
    goToLogin() {
      this.$router.push('/login'); // Redirige al login
    },
    goToRegister() {
      this.$router.push('/register'); // Redirige al register
    },
  },
};
</script>

<style scoped>
/* Estilos */
.dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f9;
}

.dashboard-container {
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 400px;
  width: 100%;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

p {
  color: #666;
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

button {
  padding: 12px 25px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: none;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
}

.btn-logout:hover {
  background-color: #c82333;
}

.btn-login {
  background-color: #007bff;
  color: white;
}

.btn-login:hover {
  background-color: #0056b3;
}

.btn-register {
  background-color: #28a745;
  color: white;
}

.btn-register:hover {
  background-color: #218838;
}

@media (max-width: 600px) {
  .form-container {
    width: 90%;
    padding: 20px;
  }

  button {
    font-size: 0.9rem;
  }
}
</style>
