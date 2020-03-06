<template>
	<div>
		<container-center>
			<div class="flex flex-wrap -mx-4">
				<div class="md:w-1/2 px-4 mx-auto">
					<div class="md:px-10">
						<ApolloMutation
							:mutation="
                require('../../graphql/mutations/forgotpassword.gql').default
              "
							:variables="{
                email: this.email
              }"
							@done="onDone"
							@error="onError"
						>
							<template v-slot="{ mutate, loading }">
								<heading
									size="heading"
									class="mb-5 text-center"
								>Reset your password</heading>
								<card class="shadow-md py-3">
									<template v-if="!emailSent">
										<div class="mb-4">
											<text-input
												v-model="email"
												type="text"
												label="Enter your user account's verified email address and we will send you a password reset link."
												placeholder="Enter your email address"
												:errors="errors['email']"
												@keydown="delete errors['email']"
											></text-input>
										</div>

										<loading-button
											class="mt-2 w-full"
											:disabled="loading"
											@click="mutate()"
											:class="{ 'base-spinner': loading }"
										>Send password reset email</loading-button>
									</template>
									<template v-else>
										<p class="form-label block mb-1 font-semibold text-gray-700 mb-12">
											Check your email for a link to reset your password. If it
											doesn’t appear within a few minutes, check your spam
											folder.
										</p>
										<div class="flex flex-col">
											<router-link
												:to="{ name: 'login' }"
												class="border border-gray-400 text-blue-500 hover:text-blue-700 px-4 py-2 rounded-lg base-button inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline"
											>Return to sign in</router-link>
										</div>
									</template>
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
import { mapActions, mapGetters } from "vuex";
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
			email: "",
			emailSent: false
		};
	},

	computed: {
		...mapGetters({
			status: "reset/getStatus",
			errors: "errors"
		})
	},

	methods: {
		...mapActions({
			setErrors: "setErrors"
		}),
		onDone({ data: { forgotPassword } }) {
			if (forgotPassword.status == "EMAIL_SENT") {
				this.emailSent = true;
			}
			this.email = "";
			this.$snack.danger({
				text: forgotPassword.message,
				button: "Ok",
				action: this.clickAction
			});
		},
		onError({ graphQLErrors }) {
			this.emailSent = false;
			let errorCategory = graphQLErrors[0].extensions.category;
			if (errorCategory == "validation") {
				this.setErrors(graphQLErrors[0].extensions.validation);
			}
		}
	}
};
</script>
