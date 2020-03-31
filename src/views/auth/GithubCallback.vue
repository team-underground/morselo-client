<template>
	<div>
		<container-center>
			<div class="flex flex-wrap -mx-4">
				<div class="md:w-1/2 px-4 mx-auto">
					<div>
						<alert
							:with-icon="false"
							class="justify-center"
						>Redirecting from github. Please wait...</alert>
					</div>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import gql from "graphql-tag";
import { mapActions, mapGetters } from "vuex";
import Alert from "@/components/ui/Alert";
import ContainerCenter from "@/components/ui/ContainerCenter";

export default {
	components: {
		Alert,
		ContainerCenter
	},

	created() {
		this.$apollo
			.mutate({
				mutation: gql`
					mutation($provider: String!, $token: String!) {
						socialLogin(provider: $provider, token: $token) {
							access_token
						}
					}
				`,
				variables: {
					provider: this.$route.query.provider,
					token: this.$route.query.token
				}
			})
			.then(({ data: { socialLogin } }) => {
				this.attempt(socialLogin.access_token).then(() => {
					this.$router.replace({
						name: "feedsIndex"
					});
				});
			})
			.catch(({ graphQLErrors }) => {
				let errorCategory = graphQLErrors[0].extensions.category;
				if (errorCategory == "authentication") {
					this.$router.replace({
						name: "login"
					});
					this.$snack.danger({
						text: `You have provided wrong credentials. Please try login again.`,
						button: "Ok",
						action: this.clickAction
					});
				}
			});
	},

	computed: {
		...mapGetters({
			errors: "errors"
		})
	},

	methods: {
		...mapActions({
			attempt: "auth/attempt",
			setErrors: "setErrors"
		})
	}
};
</script>
