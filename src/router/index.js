import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// import Authorization from "@/authorization";

// Views
import Home from "../views/Home";
import About from "../views/About";
import Privacy from "../views/Privacy";
import CodeOfConduct from "../views/CodeOfConduct";
import TermsOfUse from "../views/TermsOfUse";

import FeedsIndex from "../views/feeds/Index";
import SnippetsShow from "../views/snippets/Show";
import Search from "../views/Search";
import AllCategory from "../views/categories/Index";
import CategoryShow from "../views/categories/Show";

import PageNotFound from "../views/PageNotFound";
import Dashboard from "../views/Dashboard";

import SnippetsIndex from "../views/snippets/Index";
import Bookmarks from "../views/snippets/Bookmarks";
import SnippetsCreate from "../views/snippets/Create";
import SnippetsEdit from "../views/snippets/Edit";

// import Login from "../views/auth/Login";
import GithubCallback from "../views/auth/GithubCallback";
// import ForgotPassword from "../views/auth/ForgotPassword";
// import PasswordReset from "../views/auth/PasswordReset";

export function requireAuth(to, from, next) {
    if (!store.getters["auth/authenticated"]) {
        return next({
            name: "feedsIndex"
        });
    }

    next();
}

export function guest(to, from, next) {
    if (store.getters["auth/authenticated"]) {
        return next({
            name: "Dashboard"
        });
    }

    next();
}

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",
        component: Home,
        meta: {
            title: "Login"
        }
    },
    {
        path: "/about",
        name: "about",
        component: About,
        meta: {
            title: "About Us",
            description: "The daily code excerpt for the awesome developers"
        }
    },
    {
        path: "/privacy",
        name: "privacy",
        component: Privacy
    },
    {
        path: "/code-of-conduct",
        name: "codeOfConduct",
        component: CodeOfConduct
    },
    {
        path: "/terms-of-use",
        name: "termsOfUse",
        component: TermsOfUse
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            hasRole: ["Admin", "Super Admin"],
            title: "Dashboard"
        },
        beforeEnter: requireAuth
    },
    {
        path: "/",
        name: "feedsIndex",
        component: FeedsIndex,
        meta: {
            title: "Home"
        }
    },
    {
        path: "/search",
        name: "search",
        component: Search,
        meta: {
            title: "Search"
        },
        props: route => ({ query: route.query.q })
    },
    {
        path: "/categories",
        name: "AllCategory",
        component: AllCategory,
        meta: {
            title: "Categories"
        }
    },
    {
        path: "/category/:category",
        name: "categoryShow",
        component: CategoryShow,
        meta: {
            // title: "Show Categories"
        }
    },
    {
        path: "/snippets",
        name: "snippetsIndex",
        component: SnippetsIndex,
        meta: {
            hasRole: ["Admin", "Super Admin"],
            title: "My Snippets"
        },
        beforeEnter: requireAuth
    },
    {
        path: "/snippets/new",
        name: "snippetsNew",
        component: SnippetsCreate,
        meta: {
            hasRole: ["Admin", "Super Admin"],
            title: "New Snippet"
        },
        beforeEnter: requireAuth
    },
    {
        path: "/snippets/:id",
        name: "snippetsShow",
        component: SnippetsShow,
        meta: {
            hasRole: ["Admin", "Super Admin"]
            // title: "Show Snippets"
        }
        // beforeEnter: requireAuth
        // props: true
    },
    {
        path: "/snippets/:id/edit",
        name: "snippetsEdit",
        component: SnippetsEdit,
        meta: {
            hasRole: ["Admin", "Super Admin"]
            // title: "Edit Snippet"
        },
        beforeEnter: requireAuth
    },
    {
        path: "/saved-snippets",
        name: "Bookmarks",
        component: Bookmarks,
        meta: {
            hasRole: ["Admin", "Super Admin"],
            title: "Bookmarks"
        },
        beforeEnter: requireAuth
    },
    // {
    //   path: "/login",
    //   name: "login",
    //   component: Login,
    //   meta: {
    //     title: "Login"
    //   },
    //   beforeEnter: guest
    // },
    {
        path: "/login/github/callback",
        name: "githubcallback",
        component: GithubCallback,
        beforeEnter: guest
    },
    // {
    //   path: "/password/reset",
    //   name: "forgotpassword",
    //   component: ForgotPassword,
    //   meta: {
    //     title: "Forgot Password ?"
    //   },
    //   beforeEnter: guest
    // },
    // {
    //   path: "/password/reset/:token",
    //   name: "passwordreset",
    //   component: PasswordReset,
    //   meta: {
    //     title: "Reset password"
    //   },
    //   beforeEnter: guest
    // },
    {
        path: "/not-found",
        name: "not-found",
        component: PageNotFound,
        meta: {
            title: "Not Found"
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
    linkExactActiveClass: "text-blue-600 border-b-2 border-blue-600"
});

router.beforeEach((to, from, next) => {
    // Print Title
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle)
        document.title = `${nearestWithTitle.meta.title} | Morselo`;

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
