<template>
	<div class>
		<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-3">
			<!-- <div class="border-b border-gray-200"> -->
			<nav class="flex items-center justify-between flex-wrap h-16">
				<div class="flex items-center flex-shrink-0 mr-10">
					<span class="font-bold text-xl tracking-tight text-gray-900">Vue-Bits</span>
				</div>

				<div class="flex-1 flex justify-between items-center">
					<div class="hidden md:block">
						<router-link
							:to="{
                            name: 'home'
                        }"
							class="text-gray-600 hover:text-blue-500 mr-6"
						>Home</router-link>

						<template v-if="authenticated">
							<router-link
								:to="{
                                name: 'dashboard'
                            }"
								class="text-gray-600 hover:text-blue-500 mr-6"
							>Dashboard</router-link>

							<router-link
								:to="{
                                name: 'snippetsIndex'
                            }"
								class="text-gray-600 hover:text-blue-500 mr-6"
							>Snippets</router-link>
						</template>
					</div>

					<div class="hidden md:block" v-if="!authenticated">
						<router-link
							:to="{
                                name: 'login'
                            }"
							class="text-gray-600 hover:text-blue-500 mr-8"
						>Login</router-link>

						<loading-button tag="a" to="/register">Get Started</loading-button>
					</div>

					<div class="hidden md:block" v-if="authenticated">
						<dropdown>
							<template #trigger>
								<button
									type="button"
									class="flex items-center focus:outline-none focus:shadow-outline rounded-full"
								>
									<img
										src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=256&amp;q=80"
										alt
										class="h-8 w-8 rounded-full"
									/>
								</button>
							</template>
							<template #dropdown>
								<div class="mt-1 bg-white border rounded-lg w-48 py-1 shadow-lg">
									<a
										class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
										href="#"
									>My Snippets</a>
									<a
										class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
										href="#"
									>Profile & Account</a>
									<a
										class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
										href="#"
									>Settings</a>
									<div class="border-t my-1"></div>
									<a
										@click.prevent="logout()"
										class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
										href="#"
									>Logout</a>
								</div>
							</template>
						</dropdown>
					</div>
				</div>
			</nav>
			<!-- </div> -->

			<!-- <div v-if="authenticated">Welcome, {{ user.name }}</div> -->
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dropdown from "@/components/ui/Dropdown";
import LoadingButton from "@/components/ui/LoadingButton";

export default {
	components: {
		Dropdown,
		LoadingButton
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user"
		})
	},

	methods: {
		...mapActions({
			logoutAction: "auth/logout"
		}),

		logout() {
			this.logoutAction().then(() => {
				this.$router.replace({
					name: "home"
				});
			});
		}
	}
};
</script>

 