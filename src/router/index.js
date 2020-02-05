import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Authorization from '@/authorization';

// Views
import Home from '../views/Home';
import PageNotFound from '../views/PageNotFound';
import Dashboard from '../views/Dashboard';
import Login from '../views/auth/Login';

export function requireAuth(to, from, next) {
   if (!store.getters['auth/authenticated']) {
		return next({
			name: 'login'
		})
	}

	next()
}

export function guest(to, from , next) {
	if (store.getters['auth/authenticated']) {
		return next({
			name: 'dashboard'
		})
	}

	next()
}

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
	        title: 'Home'
	    }
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: Dashboard,
		meta: {
	        hasRole: ['Admin', 'Super Admin'],
	        title: 'Dashboard'
	    },
		beforeEnter: requireAuth
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
        	title: 'Login'
      	},
		beforeEnter: guest
	},
	{
		path: '/not-found',
		name: 'not-found',
		component: PageNotFound,
		meta: {
			title: 'Page Not Found'
		}
	},
	{
		path: '*',
		redirect: "/not-found"
	}
];

const router = new VueRouter({
	mode: 'history',
	// base: process.env.BASE_URL,
	routes
})

router.beforeEach ((to, from, next) => {
	// Print Title
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find(r => r.meta && r.meta.title);

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
	
 	if (store.getters['auth/authenticated']) {
		if (to.meta.hasRole && to.meta.hasRole !== "undefined") {
			if (Authorization.hasRole(store.getters['auth/user'].relationships.roles.data, to.meta.hasRole) === true) {
				next();
			} else {
				next({ name: "not-found" });
			}
	    } else {
	    	next();
	    }
	} else {
		next()
	}
});

export default router;

