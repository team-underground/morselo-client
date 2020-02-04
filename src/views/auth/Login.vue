<template>
	<div class="my-10 mx-auto max-w-xl">
		<form method="post" @submit.prevent="submit">
			<div v-if="errorMessage" class="mb-4 text-red-600">{{ errorMessage }}</div>
			
			<div class="mb-4">
				<input 
					class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
					type="email" 
					v-model="form.email" 
					placeholder="Email addresss"
				>
			</div>

			<div class="mb-4">
				<input 
					class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
					type="password" 
					v-model="form.password" 
					placeholder="Password"
				>
			</div>

			<button 
				type="submit" 
				class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
			>
				Login
			</button>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				form: {
					email: '',
					password: ''
				},
				errorMessage: ''
			}
		},

		methods: {
			...mapActions({
				login: 'auth/login'
			}),

			submit() {
				this.login(this.form).then(() => {
					this.$router.replace({
						name: 'dashboard'
					})
				}).catch((error) => {
					this.errorMessage = error.response.data.message
				}); 
			}
		}
	}
</script>