import Vue from "vue";
import { apolloProvider } from "./graphql/apollo";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";

import "@/assets/css/style.css";

Vue.config.productionTip = false;

store.dispatch("auth/attempt", localStorage.getItem("token")).then(() => {
  new Vue({
    store,
    router,
    apolloProvider,
    render: h => h(App)
  }).$mount("#app");
});
