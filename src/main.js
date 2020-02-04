import Vue from 'vue';
import App from './App.vue';

import router from '@/router';
import store from '@/store';
import axios from 'axios';

require('@/store/subscriber')

axios.defaults.baseURL = 'https://teaboardapi.sumato.tech/api/v1';

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
	new Vue({
		store,
		router,
		render: h => h(App),
	}).$mount('#app')
})
