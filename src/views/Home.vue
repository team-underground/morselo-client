<template>
	<div>
		<container-center>
			<div class="flex flex-wrap -mx-4">
				<div class="md:w-1/2 px-4 md:pt-16">
					<heading tag="h1" size="display2" class="mb-4">
						Organize
						<br />All Your Snippets
					</heading>

					<heading class="mb-5" size="medium">
						Collect and organize valuable code snippets
						<br />and access from anywhere
					</heading>

					<loading-button tag="a" to="/register">Sign up Free</loading-button>
				</div>
				<div class="md:w-1/2 px-4">
					<div class="md:px-10">
						<ApolloMutation
							:mutation="require('../graphql/mutations/register.gql').default"
							:variables="{
								name: this.user.name,
								email: this.user.email,
								password: this.user.password,
								password_confirmation: this.user.password_confirmation,
							}"
							@done="onDone"
						>
							<template v-slot="{ mutate, loading, error, gqlError }">
								<card class="shadow-lg py-3">
									<heading size="heading2" class="mb-5 text-center">Sign up Free!</heading>
									<div class="mb-4">
										<text-input
											v-model="user.name"
											label="Name"
											placeholder="eg. John Wick"
											@keydown="error ? delete gqlError.extensions.validation.name : ''"
											:errors="
												error && gqlError.extensions.validation.hasOwnProperty('name') && gqlError.extensions.validation.name.length ? gqlError.extensions.validation.name : []
											"
										></text-input>
									</div>

									<div class="mb-4">
										<text-input
											v-model="user.email"
											type="text"
											label="Email"
											placeholder="eg. baba@yaga.test"
											@keydown="error ? delete gqlError.extensions.validation.email : ''"
											:errors="
												error && gqlError.extensions.validation.hasOwnProperty('email') && gqlError.extensions.validation.email.length ? gqlError.extensions.validation.email : []
											"
										></text-input>
									</div>

									<div class="mb-4">
										<text-input
											v-model="user.password"
											type="password"
											label="Password"
											placeholder="Minimum 8 characters"
											@keydown="error ? delete gqlError.extensions.validation.password : ''"
											:errors="
												error && gqlError.extensions.validation.hasOwnProperty('password') && gqlError.extensions.validation.password.length ? gqlError.extensions.validation.password : []
											"
										></text-input>
									</div>

									<div class="mb-4">
										<text-input
											v-model="user.password_confirmation"
											type="password"
											label="Password"
											placeholder="Minimum 8 characters"
											@keydown="error ? delete gqlError.extensions.validation.password_confirmation : ''"
											:errors="
												error && gqlError.extensions.validation.hasOwnProperty('password_confirmation') && gqlError.extensions.validation.password_confirmation.length ? gqlError.extensions.validation.password_confirmation : []
											"
										></text-input>
									</div>

									<heading class="mb-3" size="small">
										By registering you agree to our
										<a href="#" class="text-blue-500">Terms</a> and
										<a href="#" class="text-blue-500">Privacy Policy</a>.
									</heading>

									<loading-button
										class="mt-2 w-full"
										:disabled="loading"
										@click="mutate()"
										:class="{'base-spinner': loading }"
									>Let's get started</loading-button>
								</card>
							</template>
						</ApolloMutation>
					</div>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import Heading from "@/components/ui/Heading";
import LoadingButton from "@/components/ui/LoadingButton";
import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import TextInput from "@/components/ui/TextInput";

export default {
	components: {
		Heading,
		LoadingButton,
		ContainerCenter,
		Card,
		TextInput,
		LoadingButton
	},

	data() {
		return {
			user: {}
		};
	},

	methods: {
		onDone() {
			this.user = {};
		}
	}
};
</script>

