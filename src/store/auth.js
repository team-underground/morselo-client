import {
  LOGIN_USER_MUTATION,
  GET_CURRENT_USER,
  LOGOUT
} from "../graphql/queries/userQueries";
import { Apollo } from "../graphql/apollo";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated(state) {
      return !!state.token && !!state.user;
    },
    user(state) {
      return state.user;
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    }
  },
  actions: {
    async login({ dispatch }, credentials) {
      // let response = null;
      // try {
      // let response = await Apollo.mutate({
      //   mutation: LOGIN_USER_MUTATION,
      //   variables: {
      //     username: credentials.email,
      //     password: credentials.password
      //   }
      // })
      //   .then(({ data: { loginUser } }) => console.log("here", loginUser))
      //   .catch(({ graphQLErrors }) => console.log("error here", graphQLErrors));
      // } catch ({ graphQLErrors }) {
      //   this.dispatch("setErrors", graphQLErrors[0].extensions.validation);
      // }
      // console.log(response);
      // dispatch("attempt", response.data.login.access_token);
      // .then(response => {
      //   console.log(response);
      // })
      // .catch(({ graphQLErrors }) => {
      //   this.dispatch("setErrors", graphQLErrors[0].extensions.validation);
      //   return;
      //   // console.log(this);
      //   // console.log("here", graphQLErrors);
      // });

      let response = await Apollo.mutate({
        mutation: LOGIN_USER_MUTATION,
        variables: {
          username: credentials.email,
          password: credentials.password
        }
      });

      return dispatch("attempt", response.data.login.access_token);
    },
    async attempt({ commit, state }, token) {
      if (token) {
        localStorage.setItem("token", token);
        commit("SET_TOKEN", token);
      }
      if (!state.token) {
        return;
      }
      try {
        let response = await Apollo.query({
          query: GET_CURRENT_USER
        });
        commit("SET_USER", response.data.me);
        Apollo.resetStore();
      } catch (e) {
        localStorage.removeItem("token");
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        Apollo.resetStore();
      }
    },

    logout({ commit }) {
      return Apollo.mutate({
        mutation: LOGOUT
      }).then(() => {
        // console.log(store);
        localStorage.removeItem("token");
        commit("SET_TOKEN", null);
        commit("SET_USER", null);
        Apollo.resetStore();
      });
    }
  }
};
