import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null,  // Estado de usuario (autenticado o no)
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  }
});
