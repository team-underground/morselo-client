<template>
	<div
		id="app"
		class="flex flex-col min-h-screen"
	>
		<the-navigation :github-url="githubUrl" />

		<div class="px-4 py-4 flex-1 h-0">
			<transition
				name="slide"
				mode="out-in"
			>
				<router-view />
			</transition>
		</div>

		<!-- Modal -->
		<div
			style=" background-color: rgba(0, 0, 0, 0.8)"
			class="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full"
			v-show="showLoginModal"
		>
			<div class="p-4 max-w-4xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
				<div
					class="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
					@click="setLoginModal()"
				>
					<svg
						class="fill-current w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
					</svg>
				</div>

				<div class="shadow w-full rounded-lg bg-white overflow-hidden w-full block px-8 md:px-16 lg:px-16 py-8">
					<div class="flex flex-wrap -mx-4">
						<div class="md:w-1/2 px-4 md:pt-12">
							<heading
								tag="h1"
								size="heading"
								class="mb-6 md:pr-16"
							>Join our community for taking these benifits</heading>
							<list
								:lists="lists"
								unorderedListColor="text-blue-500"
								list-css="text-gray-600 md:text-lg items-center mb-1"
							></list>

							<div class="mt-8">
								<a
									:href="githubUrl"
									class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-lg px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-3 hover:opacity-75 shadow"
								>Login with Github</a>
								<!-- <loading-button
							tag="a"
							to="/"
							class="shadow py-3"
						>Login with Twitter</loading-button> -->
							</div>
						</div>
						<div class="hidden md:block lg:block md:w-1/2 px-4 mt-10 md:mt-0">
							<div class="md:px-10 py-10">
								<img
									src="@/assets/dev_focus.svg"
									alt="dev_focus"
									class="w-2/3 md:w-4/5 mx-auto"
								/>
							</div>
							<div class="h-24 grid-blue"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- /Modal -->

		<div class="w-full max-w-screen-xl mx-auto sm:px-6 p-8 flex justify-between flex-wrap">
			<!-- <div class="border-t border-gray-200"> -->
			<div class="text-gray-700 md:w-1/2 mb-2 md:mb-0">
				&copy; 2020 Morselo. All Rights Reserved
			</div>
			<div class="text-gray-600 text-sm">
				Powered By
				<link-to
					to="https://www.netlify.com/"
					target="_blank"
					rel="noreferrer"
				>Netlify</link-to>,
				<link-to
					to="https://heroku.com/"
					target="_blank"
					rel="noreferrer"
				>Heroku</link-to> &amp;
				<link-to
					to="https://github.com/"
					target="_blank"
					rel="noreferrer"
				>Github</link-to>
			</div>
			<!-- </div> -->
		</div>
	</div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
import { Heading, List, LinkTo } from "septemberui";
import { mapGetters, mapActions } from "vuex";

export default {
	name: "app",
	components: {
		TheNavigation,
		Heading,
		List,
		LinkTo
	},
	data() {
		return {
			lists: [
				"collect & organize code, snippets and notes",
				"Manage your snippets with ease",
				"access from anywhere",
				"share with others",
				"filter snippets by category"
			],
			searchTerm: this.$route.query.q || null
		};
	},
	computed: {
		...mapGetters({
			showLoginModal: "showLoginModal"
		}),
		githubUrl() {
			return `${process.env.VUE_APP_ROOT_API}/login/github`;
		}
	},
	methods: {
		...mapActions({
			setLoginModal: "setLoginModal"
		})
	}
};
</script>
