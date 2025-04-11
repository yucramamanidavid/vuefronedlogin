<template>
  <div class="register-form">
    <div class="form-container">
      <h1>Registro</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input v-model="name" type="text" id="name" required placeholder="Ingresa tu nombre" />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input v-model="email" type="email" id="email" required placeholder="Ingresa tu correo electrónico" />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input v-model="password" type="password" id="password" required placeholder="Ingresa tu contraseña" />
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirmar Contraseña</label>
          <input v-model="password_confirmation" type="password" id="password_confirmation" required placeholder="Confirma tu contraseña" />
        </div>
        <div class="form-group">
          <label for="role">Rol</label>
          <select v-model="role" required>
            <option value="cliente">Cliente</option>
            <option value="emprendedor">Emprendedor</option>
            <option value="super-admin">Super Admin</option>
          </select>
        </div>
        <button type="submit" class="btn-submit">Registrarse</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'cliente' // Valor por defecto
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          role: this.role
        });
        console.log('Registro exitoso:', response.data);
        // Redirigir a login o dashboard después del registro exitoso
        this.$router.push('/login'); // Redirige al login
      } catch (error) {
        console.error('Error en registro:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos para el formulario de registro */
.register-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

select {
  padding: 10px;
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
