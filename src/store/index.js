import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import reset from "./reset";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errors: {},
    openLoginModal: false,
    snippetPage: 1
  },

  getters: {
    errors(state) {
      return state.errors;
    },
    showLoginModal(state) {
      return state.openLoginModal ? true : false;
    },
    snippetPage(state) {
      return state.snippetPage;
    }
  },

  mutations: {
    SET_ERRORS(state, data) {
      state.errors = data;
    },
    SET_LOGIN_MODAL(state) {
      state.openLoginModal = !state.openLoginModal;
    },
    SET_SNIPPET_PAGE(state, data) {
      state.snippetPage = data;
    }
  },

  actions: {
    setErrors({ commit }, errors) {
      commit("SET_ERRORS", errors);
    },
    setLoginModal({ commit }) {
      commit("SET_LOGIN_MODAL");
    },
    setSnippetPage({ commit }, value) {
      commit("SET_SNIPPET_PAGE", value);
    }
  },

  modules: {
    auth,
    reset
  }
});
