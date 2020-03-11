<template>
	<div>
		<container-center>
			<div class="flex flex-wrap -mx-4 lg:pt-16">
				<div class="md:w-1/2 px-4 md:pt-12">
					<heading tag="h1" size="display2" class="mb-6 md:pr-16">Save snippets in one place</heading>
					<list
						:lists="lists"
						unorderedListColor="text-blue-500"
						list-css="text-gray-600 md:text-lg items-center mb-1"
					></list>

					<div class="mt-8" v-if="!authenticated">
						<a
							href="http://vue-bits-server.test/login/github"
							class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-lg px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-3 hover:opacity-75 shadow"
						>Login with Github</a>
						<loading-button tag="a" to="/" class="shadow py-3">Login with Twitter</loading-button>
					</div>
				</div>
				<div class="md:w-1/2 px-4 mt-10 md:mt-0">
					<div class="md:px-10 py-10">
						<img src="@/assets/dev_focus.svg" alt="dev_focus" class="w-2/3 md:w-4/5 mx-auto" />
					</div>
					<div class="h-24 grid-blue"></div>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import Heading from "@/components/ui/Heading";
import ContainerCenter from "@/components/ui/ContainerCenter";
import List from "@/components/ui/List";
import LoadingButton from "@/components/ui/LoadingButton";

import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		Heading,
		ContainerCenter,
		List,
		LoadingButton
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated"
		})
	},

	data() {
		return {
			lists: [
				"collect & organize valuable code snippets",
				"access from anywhere",
				"share with others",
				"filter snippets by category"
			]
		};
	},

	methods: {}
};
</script>

