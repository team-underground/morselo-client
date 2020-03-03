import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import reset from "./reset";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: {}
  },

  getters: {
    errors(state) {
      return state.errors;
    }
  },

  mutations: {
    SET_ERRORS(state, data) {
      state.errors = data;
    }
  },

  actions: {
    setErrors({ commit }, errors) {
      commit("SET_ERRORS", errors);
    }
  },

  modules: {
    auth,
    reset
  }
});
