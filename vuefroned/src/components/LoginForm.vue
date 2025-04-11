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
      <button type="submit" class="btn">Iniciar sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import api from '@/services/axios'; // Instancia de Axios configurada

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

      // Obtener CSRF token primero
      api.get('/sanctum/csrf-cookie', { withCredentials: true })
        .then(() => {
          api.post('/login', { email: this.email, password: this.password }, { withCredentials: true })
            .then(response => {
              localStorage.setItem('auth_token', response.data.token); // Guardar token en localStorage
              this.$router.push('/dashboard'); // Redirigir al dashboard
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
.login {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
