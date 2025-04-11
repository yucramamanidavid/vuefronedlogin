import { createStore } from 'vuex';

export default createStore({
    state: {
        user: null, // El estado del usuario comienza en null
    },
    mutations: {
        setUser(state, user) {
            state.user = user; // Se asigna el usuario al estado
        },
        clearUser(state) {
            state.user = null; // Se borra el usuario del estado (logout)
        },
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user); // Al hacer login, se guarda el usuario en el estado
        },
        logout({ commit }) {
            commit('clearUser'); // Al hacer logout, se borra el usuario del estado
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user, // Si el estado 'user' tiene valor, es autenticado
    },
});
