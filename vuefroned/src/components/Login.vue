<template>
    <div class="login">
      <h2>Iniciar sesión</h2>
      <form @submit.prevent="onLogin">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Ingrese su correo electrónico"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>

  <script>
  import api from '@/services/axios'; // Importa tu instancia de Axios

  export default {
    data() {
      return {
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      onLogin() {
        this.errorMessage = ''; // Reset error message before making the request

        // Hacer solicitud de CSRF token primero
        api.get('/sanctum/csrf-cookie', { withCredentials: true })
          .then(() => {
            api.post('/login', { email: this.email, password: this.password }, { withCredentials: true })
              .then(response => {
                localStorage.setItem('auth_token', response.data.token); // Guardar token en localStorage
                this.$router.push('/dashboard'); // Redirigir al dashboard o página de inicio
              })
              .catch(error => {
                this.errorMessage = 'Credenciales incorrectas';
                console.error('Login error:', error);
              });
          })
          .catch(error => {
            this.errorMessage = 'Error al obtener CSRF Token';
            console.error('CSRF error:', error);
          });
      }
    }
  };
  </script>

  <style scoped>
  /* Añadir estilos básicos */
  .error {
    color: red;
    font-size: 14px;
  }
  </style>
