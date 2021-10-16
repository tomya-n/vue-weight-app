import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginData: {
      username: "",
      password: "",
    },
  },
  mutations: {
    saveLoginData(state, payload) {
      state.loginData.username = payload.username;
      state.loginData.password = payload.password;
    },
  },
  actions: {
    save(context,payload) {
      context.commit("saveLoginData",payload);
    },
  },
  modules: {},
});
