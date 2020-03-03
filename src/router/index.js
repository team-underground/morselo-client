import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import Authorization from "@/authorization";

// Views
import Home from "../views/Home";
import PageNotFound from "../views/PageNotFound";
import Dashboard from "../views/Dashboard";

import SnippetsIndex from "../views/snippets/Index";
import SnippetsCreate from "../views/snippets/Create";
import SnippetsShow from "../views/snippets/Show";

import Login from "../views/auth/Login";

export function requireAuth(to, from, next) {
  if (!store.getters["auth/authenticated"]) {
    return next({
      name: "login"
    });
  }

  next();
}

export function guest(to, from, next) {
  if (store.getters["auth/authenticated"]) {
    return next({
      name: "dashboard"
    });
  }

  next();
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      hasRole: ["Admin", "Super Admin"],
      title: "Dashboard"
    },
    beforeEnter: requireAuth
  },
  {
    path: "/snippets",
    name: "snippetsIndex",
    component: SnippetsIndex,
    meta: {
      hasRole: ["Admin", "Super Admin"],
      title: "All Snippets"
    },
    beforeEnter: requireAuth
  },
  {
    path: "/snippets/new",
    name: "snippetsNew",
    component: SnippetsCreate,
    meta: {
      hasRole: ["Admin", "Super Admin"],
      title: "Create New Snippet"
    },
    beforeEnter: requireAuth
  },
  {
    path: "/snippets/:id",
    name: "snippetsShow",
    component: SnippetsShow,
    meta: {
      hasRole: ["Admin", "Super Admin"],
      title: "All Snippets"
    },
    beforeEnter: requireAuth
    // props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login"
    },
    beforeEnter: guest
  },
  {
    path: "/not-found",
    name: "not-found",
    component: PageNotFound,
    meta: {
      title: "Page Not Found"
    }
  },
  {
    path: "*",
    redirect: "/not-found"
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "text-blue-600"
});

router.beforeEach((to, from, next) => {
  // Print Title
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  if (store.getters["auth/authenticated"]) {
    // if (to.matched.some(record => record.meta.hasRole)) {
    //   next();
    //   //   if (
    //   //     Authorization.hasRole(
    //   //       store.getters["auth/user"].relationships.roles.data,
    //   //       to.meta.hasRole
    //   //     ) === true
    //   //   ) {
    //   //     next();
    //   //   } else {
    //   //     next({ name: "not-found" });
    //   //   }
    // } else {
    //   next();
    // }
    next();
  } else {
    next();
  }
});

export default router;
