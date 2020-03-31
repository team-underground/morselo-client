import Vue from "vue";
import { apolloProvider } from "./graphql/apollo";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import VueSnackbar from "vue-snack";
import "vue-snack/dist/vue-snack.min.css";
import VueMeta from "vue-meta";
Vue.use(VueSnackbar, { position: "bottom-left", time: 5000 });
Vue.use(VueMeta);
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
