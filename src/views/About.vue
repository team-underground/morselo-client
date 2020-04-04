<template>
	<div>
		<container-center>
			<h2 class="mb-6 inline-block border-b-2 border-gray-500 py-1 leading-none text-2xl md:text-3xl font-semibold tracking-wider uppercase sans-serif text-gray-500">
				Hello! Dev
			</h2>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
				Often searching for your valuable snippets or reusable functions in your previous projects is fraustating right? Sometimes it takes lot of times and efforts to find so. &#x1F624; Wait ...
			</p>
			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
				Morselo is a place you might be looking for. This is a platform where you could easily manage your snippets, code or notes without any hassle. Let the burden of managing and organising your snippet to Morselo, so that you could concentrate more on your productivity.
			</p>
			<div class="border-4 p-2 my-10">
				<div class="bg-white p-4 border">

					<p class="text-gray-800 text-4xl md:text-5xl sans-serif-3 tracking-tight leading-none">
						Join our community for taking these benifits...
						<!-- by managing your snippets with ease -->
						<!-- Save your snippets in one place -->
					</p>
					<div class="flex flex-wrap -mx-4">
						<div class="md:w-1/2 px-4 md:pt-12 flex flex-col justify-around mt-10 md:mt-0">
							<list
								:lists="lists"
								unorderedListColor="text-blue-500"
								list-css="text-gray-600 md:text-lg items-center"
							></list>

							<div
								v-if="!authenticated"
								class="mt-10"
							>
								<a
									href="http://vue-bits-server.test/login/github"
									class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-sm px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-3 hover:opacity-75 shadow-sm"
								>Login with Github</a>
								<!-- <loading-button
							tag="a"
							to="/"
							class="shadow py-3"
						>Login with Twitter</loading-button> -->
							</div>
						</div>
						<div class="hidden md:block md:w-1/2 px-4 mt-10 md:-mt-8">
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

			<div class="">
				<div class="bg-line-pattern-gray p-2">
					<div class="bg-white p-4 border-2">
						<h2 class="mb-8 inline-block border-b-2 border-gray-500 py-1 leading-none text-2xl font-semibold tracking-wider uppercase sans-serif text-gray-500">
							Support Us
						</h2>

						<div class="flex mb-4">
							<div>
								<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
									Our application is open source, meaning you can inspect every
									little detail of the code, or chip in yourself! We will soon
									accept PR's.
								</p>
								<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
									We are continously improving the platform for serving you
									better.
								</p>
								<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
									Love, what we do?
									<link-to
										to="https://www.paypal.me/abhisheksarmah/50"
										target="_blank"
									>Buy us a coffee.</link-to>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import ContainerCenter from "@/components/ui/ContainerCenter";
import List from "@/components/ui/List";
import { LinkTo } from "septemberui";
import { mapGetters } from "vuex";

export default {
	metaInfo: {
		title: "About Not US",
		content: "something"
	},
	components: {
		ContainerCenter,
		List,
		LinkTo
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated"
		})
	},

	data() {
		return {
			lists: [
				"collect & organize code, snippets and notes",
				"Manage your snippets with ease",
				"access from anywhere",
				"share with others",
				"filter snippets by category"
			]
		};
	}
};
</script>
