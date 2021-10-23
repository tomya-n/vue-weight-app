import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginData: {
      username: "",
    },
  },
  mutations: {
    saveLoginData(state, payload) {
      state.loginData.username = payload.username;
    },
  },
  actions: {
    save(context, payload) {
      context.commit("saveLoginData", payload);
    },
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: "vue-weight-app",
      storage: window.sessionStorage,
    }),
  ],
});
