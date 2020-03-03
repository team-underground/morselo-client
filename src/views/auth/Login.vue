<template>
	<div class="my-10 mx-auto max-w-md">
		<form method="POST" @submit.prevent="submit">
			<card class="pb-4">
				<heading size="heading2" class="mb-4 text-center">Login to continue</heading>

				<alert
					class="block justify-center mb-4"
					variant="danger"
					:with-icon="false"
					v-if="errorMessage && errorMessage === 'authentication'"
				>Email or password is incorrect</alert>

				<div class="mb-4">
					<text-input
						label="Email"
						type="email"
						v-model="form.email"
						@keydown="errors ? delete errors.username : ''"
						:errors="errors && errors.hasOwnProperty('username') && errors.username.length ? errors.username : []"
					/>
				</div>

				<div class="mb-4">
					<text-input
						label="Password"
						type="password"
						v-model="form.password"
						@keydown="errors ? delete errors.password : ''"
						:errors="errors && errors.hasOwnProperty('password') && errors.password.length ? errors.password : []"
					/>
				</div>

				<loading-button type="submit" class="mt-2 w-full" :disabled="loading">Log in</loading-button>
			</card>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TextInput from "@/components/ui/TextInput";
import LoadingButton from "@/components/ui/LoadingButton";
import Card from "@/components/ui/Card";
import Alert from "@/components/ui/Alert";
import Heading from "@/components/ui/Heading";

export default {
	components: {
		TextInput,
		LoadingButton,
		Card,
		Heading,
		Alert
	},

	data() {
		return {
			form: {
				email: "",
				password: ""
			},
			errors: {},
			loading: false,
			errorMessage: ""
		};
	},

	// computed: {
	// 	...mapGetters({
	// 		user: "auth/user"
	// 	})
	// },

	// watch: {
	// 	user(value) {
	// 		if (value) {
	// 			this.$router.replace({
	// 				name: "home"
	// 			});
	// 		}
	// 	}
	// },

	methods: {
		...mapActions({
			login: "auth/login"
		}),

		submit() {
			this.login(this.form)
				.then(() => {
					this.$router.replace({
						name: "dashboard"
					});
				})
				.catch(error => {
					console.log(error);
					this.errorMessage =
						error.graphQLErrors[0].extensions.category;
					this.errors = error.graphQLErrors[0].extensions.validation;
				});
		}
	}
};
</script>