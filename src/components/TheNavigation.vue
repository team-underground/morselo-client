<template>
	<div>
		<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
			<nav class="md:flex items-center justify-between md:h-16">
				<div class="flex flex-1 md:flex-none items-center md:mr-10 justify-between">
					<a class="block font-bold text-2xl tracking-tight text-gray-900 leading-tight" href="/">morsel.</a>

					<div
						class="md:hidden w-10 h-10 rounded-full hover:bg-blue-200 transition duration-500 p-2 cursor-pointer"
						@click="showMenu = !showMenu"
					>
						<svg class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</div>
				</div>

				<div class="hidden md:block flex-1">
					<div class="flex justify-end items-center">
						<!-- <div class="flex flex-1 items-center">
							<router-link
								:to="{
							name: 'home'
						}"
								class="text-gray-600 hover:text-blue-500 mr-6"
							>Home</router-link>
						</div>-->
						<div class="flex items-center">
							<router-link
								:to="{
								name: 'home'
							}"
								class="font-medium text-gray-600 hover:text-blue-500 mr-6"
							>Home</router-link>

							<router-link
								:to="{
							name: 'home'
						}"
								class="font-medium text-gray-600 hover:text-blue-500 mr-6"
							>Feeds</router-link>

							<template v-if="authenticated">
								<router-link
									:to="{
							name: 'dashboard'
							}"
									class="font-medium text-gray-600 hover:text-blue-500 mr-6"
								>Dashboard</router-link>

								<router-link
									:to="{
							name: 'snippetsIndex'
							}"
									class="font-medium text-gray-600 hover:text-blue-500 mr-6"
								>My Snippets</router-link>

								<router-link
									:to="{
							name: 'Bookmarks'
							}"
									class="font-medium text-gray-600 hover:text-blue-500 mr-6"
								>Bookmarks</router-link>

								<router-link to="/snippets/new" v-slot="{ href, route, navigate }">
									<loading-button class="mr-6" type="button" @click="navigate">New Snippet</loading-button>
								</router-link>
							</template>

							<template v-if="!authenticated">
								<router-link
									:to="{
								name: 'login'
							}"
									class="font-medium text-gray-600 hover:text-blue-500 mr-8"
								>Login</router-link>

								<loading-button tag="a" to="/register">Get Started</loading-button>
							</template>

							<template v-if="authenticated">
								<dropdown>
									<template #trigger>
										<button
											type="button"
											class="flex items-center focus:outline-none focus:shadow-outline rounded-full"
										>
											<img src="@/assets/avatar.png" alt="user" class="h-8 w-8 rounded-full" />
										</button>
									</template>
									<template #dropdown>
										<div
											class="rounded-lg bg-white shadow-xs overflow-hidden py-1 transition duration-300 ease-in-out"
										>
											<div class="truncate mb-2 px-4 py-1">
												<span class="text-sm text-gray-500">Logged in as</span>
												<div class="text-gray-700 font-medium text-truncate">{{ user.name }}</div>
											</div>
											<div class="border-t my-1"></div>
											<!-- <a
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
											>Settings</a>-->
											<a
												class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
												href="#"
											>Help & Support</a>

											<!-- <div class="border-t my-1"></div> -->
											<a
												@click.prevent="logout()"
												class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
												href="#"
											>Logout</a>
										</div>
									</template>
								</dropdown>
							</template>
						</div>
					</div>
				</div>

				<div
					class="md:hidden transition-all duration-500 py-1 shadow-xs bg-white rounded-lg mt-2"
					v-if="showMenu"
				>
					<template v-if="authenticated">
						<div class="flex items-center px-4 py-2 border-b border-gray-200">
							<div class="flex-no-shrink rounded-full mr-2 bg-gray-200 shadow-inset">
								<img src="@/assets/avatar.png" alt="user" class="h-8 w-8 rounded-full" />
							</div>
							<div class="ml-2 text-gray-600 block font-medium leading-tight text-sm">
								{{ user.name }}
								<br />
								<div class="text-truncate text-xs text-gray-500">{{ user.email }}</div>
							</div>
						</div>
					</template>

					<router-link
						:to="{
							name: 'home'
						}"
						class="text-gray-700 hover:text-blue-500 block py-2 border-b border-gray-200 px-4"
					>Home</router-link>

					<template v-if="authenticated">
						<router-link
							:to="{
							name: 'dashboard'
							}"
							class="block text-gray-700 hover:text-blue-500 py-2 border-b border-gray-200 px-4"
						>Dashboard</router-link>

						<router-link
							:to="{
							name: 'snippetsIndex'
							}"
							class="block text-gray-700 hover:text-blue-500 py-2 border-b border-gray-200 px-4"
						>Snippets</router-link>

						<router-link
							:to="{
							name: 'Bookmarks'
							}"
							class="block text-gray-700 hover:text-blue-500 py-2 px-4 border-b border-gray-200"
						>Bookmarks</router-link>

						<a
							@click.prevent="logout()"
							class="block text-gray-700 hover:text-blue-500 py-2 px-4"
							href="#"
						>Logout</a>
					</template>

					<template v-if="!authenticated">
						<div class="text-gray-600 px-4 pt-3">Log in with</div>
						<div class="flex py-2">
							<div class="w-1/2 px-4">
								<a
									href="http://vue-bits-server.test/login/github"
									class="w-full inline-block text-center align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-lg px-4 py-2 border border-black text-white bg-black mr-3 hover:opacity-75 px-4"
								>Github</a>
							</div>
							<div class="w-1/2 px-4">
								<loading-button tag="a" to="/" class="w-full">Twitter</loading-button>
							</div>
						</div>
					</template>
				</div>
			</nav>

			<!-- <div v-if="authenticated">Welcome, {{ user.name }}</div> -->
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dropdown from "@/components/ui/Dropdown";
import LoadingButton from "@/components/ui/LoadingButton";
import Icon from "@/components/ui/Icon";

export default {
	components: {
		Dropdown,
		LoadingButton,
		Icon
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user"
		})
	},

	data() {
		return {
			showMenu: false
		};
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
