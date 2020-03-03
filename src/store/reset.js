export default {
  namespaced: true,
  state: {
    token: null,
    email: null,
    status: {}
  },
  getters: {
    getStatus(state) {
      return state.status;
    }
  },
  mutations: {
    SET_STATUS(state, data) {
      state.status = data;
    }
  },
  actions: {
    setStatus({ commit }, status) {
      commit("SET_STATUS", status);
    }
  }
};
