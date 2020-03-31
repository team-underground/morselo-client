import Vue from "vue";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "apollo-link-error";
import { setContext } from "apollo-link-context";
import VueApollo from "vue-apollo";
import store from "@/store";

// Create a new Middleware Link using setContext
const middlewareLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const resetToken = onError(({ networkError }) => {
  if (
    networkError &&
    networkError.name === "ServerError" &&
    networkError.statusCode === 401
  ) {
    store.dispatch("auth/logout");
  }
});

// Create a new HttpLink to connect to your GraphQL API.
// According to the Apollo docs, this should be an absolute URI.
const httpLink = new HttpLink({
  uri: `${process.env.VUE_APP_ROOT_API}/graphql`
});

// I'm creating another variable here just because it makes it easier to add more links in the future.
const authFlowLink = middlewareLink.concat(resetToken);
const link = authFlowLink.concat(httpLink);

// Create the apollo client
export const Apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Register the VueApollo plugin with Vue.
Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
  // Apollo 2.0 allows multiple clients to be enabled at once.
  // Here we select the default (and only) client.
  defaultClient: Apollo
});
