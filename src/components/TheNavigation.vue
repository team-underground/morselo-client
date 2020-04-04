<template>
	<div>
		<div class="border-b shadow-sm">
			<div class="max-w-6xl mx-auto md:pt-8 px-4">
				<div class="flex flex-1 items-end border-b-4 border-gray-800 justify-between py-4 md:py-6">
					<div>

						<router-link
							to="/"
							exact-active-class=""
						>
							<div class="flex items-center md:items-end lg:items-end">
								<div class="mr-4">
									<svg
										width="48"
										height="48"
										viewBox="0 0 512 512"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M213.765 308.934V344.535L102.4 289.682V259.241L213.765 204.393V240.244L136.167 274.217L213.765 308.934ZM282.624 203.636L251.623 348.684C250.829 352.491 249.926 356.267 248.914 360.006C248.141 362.775 246.958 364.946 245.376 366.476C243.789 368.035 241.48 368.803 238.454 368.803C230.928 368.803 227.159 365.103 227.159 357.737C227.159 355.805 227.902 350.988 229.376 343.273L260.265 198.226C261.888 190.511 263.435 185.228 264.909 182.377C266.389 179.526 269.266 178.1 273.552 178.1C277.243 178.1 280.059 179.107 282.015 181.12C283.971 183.133 284.949 185.903 284.949 189.423C284.949 192.023 284.171 196.759 282.624 203.636ZM409.6 289.682L298.235 344.786V309.184L376.059 274.467L298.235 240.244V204.893L409.6 259.491V289.682Z"
											fill="black"
										/>
										<path
											d="M481.28 0H30.72C22.5725 0 14.7588 3.67791 8.99768 10.2246C3.23656 16.7714 0 25.6506 0 34.9091L0 477.091C0 486.349 3.23656 495.229 8.99768 501.775C14.7588 508.322 22.5725 512 30.72 512H481.28C489.427 512 497.241 508.322 503.002 501.775C508.763 495.229 512 486.349 512 477.091V34.9091C512 25.6506 508.763 16.7714 503.002 10.2246C497.241 3.67791 489.427 0 481.28 0ZM404.48 23.2727C415.77 23.2727 424.96 33.7105 424.96 46.5455C424.96 59.3804 415.77 69.8182 404.48 69.8182C393.19 69.8182 384 59.3804 384 46.5455C384 33.7105 393.19 23.2727 404.48 23.2727ZM348.16 23.2727C359.45 23.2727 368.64 33.7105 368.64 46.5455C368.64 59.3804 359.45 69.8182 348.16 69.8182C336.87 69.8182 327.68 59.3804 327.68 46.5455C327.68 33.7105 336.87 23.2727 348.16 23.2727ZM481.28 477.091H30.72V93.0909H481.28V477.091ZM460.8 69.8182C449.51 69.8182 440.32 59.3804 440.32 46.5455C440.32 33.7105 449.51 23.2727 460.8 23.2727C472.09 23.2727 481.28 33.7105 481.28 46.5455C481.28 59.3804 472.09 69.8182 460.8 69.8182Z"
											fill="black"
										/>
									</svg>
								</div>
								<div>
									<p class="text-xl md:text-4xl sans-serif-3 text-gray-800 font-bold uppercase tracking-tight">
										Morselo
									</p>
									<div class="flex items-center -mt-2 md:-mt-4 lg:-mt-4">
										<div class="leading-tight border-t-2 relative w-6">
										</div>
										<p class="text-xs md:text-base sans-serif-2 text-gray-600 pl-3">
											daily code excerpts
										</p>
									</div>
								</div>
							</div>
						</router-link>

					</div>
					<div class="flex-1 mx-32">
						<search-input
							v-model="$parent.searchTerm"
							placeholder="Search ..."
							@keypress.native="search"
						></search-input>
					</div>
					<div class="flex items-center justify-end">
						<template v-if="authenticated">
							<router-link
								tag="button"
								:to="{
									name: 'snippetsNew'
								}"
								exact-active-class=""
								class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-sm px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-12 hover:opacity-75 shadow-sm sans-serif"
							>Create New Snippet</router-link>
							<dropdown>
								<template #trigger>
									<button
										type="button"
										class="flex items-center focus:outline-none focus:shadow-outline rounded-full"
									>
										<img
											:src="user.avatar"
											alt="user"
											class="h-8 w-8 rounded-full"
										/>
									</button>
								</template>
								<template #dropdown>
									<div class="rounded-md bg-white shadow-xs overflow-hidden py-1 transition duration-300 ease-in-out">
										<div class="truncate mb-2 px-4 py-1">
											<span class="text-sm text-gray-500">Logged in as</span>
											<div class="text-gray-700 font-medium text-truncate">
												{{ user.name }}
											</div>
										</div>
										<div class="border-t border-gray-100 my-1"></div>
										<a
											class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
											href="mailto:abhisheksarmah660@gmail.com"
										>Help & Support</a>
										<a
											@click.prevent="logout()"
											class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
											href="#"
										>Logout</a>
									</div>
								</template>
							</dropdown>
						</template>
						<template v-else>
							<a
								:href="githubUrl"
								class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-sm px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-3 hover:opacity-75 shadow-sm"
							>Login with Github</a>
							<!-- <a
								href="#"
								class="text-sm font-semibold inline-block px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
							>Login with Github</a> -->
						</template>
						<!-- <a
							href="#"
							class="text-xs font-semibold inline-block px-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>Twitter</a>
						<div
							class="inline-block mx-1 h-5 w-1 leading-none border-r-2"
							style="transform: rotate(20deg)"
						></div>
						<a
							href="#"
							class="text-xs font-semibold inline-block px-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>Sign
							in</a> -->
					</div>
				</div>
				<div class="h-1 border-b"></div>
				<div class="overflow-x-auto border-b -m-px">
					<div class="flex items-center flex-1">
						<router-link
							:to="{
                name: 'feedsIndex'
              }"
							class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>Feeds</router-link>
						<router-link
							:to="{ name: 'AllCategory' }"
							class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>Categories</router-link>

						<template v-if="authenticated">
							<router-link
								:to="{ name: 'Dashboard' }"
								class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
							>Dashboard</router-link>
							<router-link
								:to="{
                  name: 'snippetsIndex'
                }"
								class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
							>My Snippets</router-link>
							<router-link
								:to="{ name: 'Bookmarks' }"
								class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
							>Bookmarks</router-link>
						</template>

						<router-link
							:to="{ name: 'about' }"
							class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>About</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dropdown from "@/components/ui/Dropdown";
import { SearchInput } from "septemberui";

export default {
	props: ["githubUrl"],

	components: {
		Dropdown,
		SearchInput
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user"
		})
	},

	data() {
		return {
			searchTerm: this.$parent.searchTerm || null,
			showMenu: false
		};
	},

	watch: {
		"$parent.searchTerm": {
			handler: function(newValue, preValue) {
				this.searchTerm = newValue || null;
			},
			deep: true,
			immediate: true
		}
	},

	methods: {
		search(e) {
			let keyCode = e.keyCode ? e.keyCode : e.which;
			if (keyCode === 13) {
				this.$router
					.push({
						path: "/search",
						query: { q: this.searchTerm }
					})
					.catch(err => {});
			}
		},
		...mapActions({
			logoutAction: "auth/logout"
		}),

		logout() {
			this.logoutAction().then(() => {
				if (this.$router.currentRoute.name !== "feedsIndex") {
					this.$router.replace({
						name: "feedsIndex"
					});
				}
			});
		}
	}
};
</script>
<style>
.shadow-search {
	-webkit-box-shadow: 1px 2px 0px#3182ce;
	box-shadow: 1px 2px 0px #3182ce;
}
.search-input {
	border-radius: 0.125rem !important;
}
.search-input:focus {
	@apply shadow-search;
}
</style>