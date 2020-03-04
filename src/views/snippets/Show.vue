<template>
	<div>
		<container-center>
			<div class="flex flex-wrap">
				<div class="md:w-2/3">
					<ApolloQuery
						:query="require('../../graphql/queries/bitsSingle.gql').default"
						:variables="{
              id: $route.params.id
            }"
					>
						<template v-slot="{ result: { error, data, loading }, query, isLoading }">
							<!-- Loading -->
							<div
								v-if="isLoading"
								class="loading apollo"
							>Loading...</div>

							<!-- Result -->
							<template
								v-else-if="data"
								class="result apollo"
							>
								<card class="mb-1">
									<heading
										size="heading2"
										class="mb-3 text-truncate"
									>
										{{ data.bit.title }}
									</heading>
									<div class="md:flex mb-6 md:items-center">
										<div class="flex-1 mb-4 md:mb-0">
											<div class="flex items-center">
												<div class="p-2 flex-no-shrink rounded-full mr-2 bg-gray-200 shadow-inset">
													<icon
														name="user"
														class="w-6 h-6 text-gray-400"
													></icon>
												</div>
												<div>
													<span class="ml-2 text-gray-600 block font-medium leading-tight">{{ data.bit.user.name }}</span>
													<span class="ml-2 text-gray-500 block text-sm leading-tight">{{ data.bit.created_at | formattedDate }}</span>
												</div>
											</div>
										</div>

										<div class="w-50 flex">
											<ApolloMutation
												:mutation="require('../../graphql/mutations/likeBit.gql').default"
												:variables="{
													bitId: data.bit.id
												}"
												:update="updateCache"
											>
												<template v-slot="{ mutate, loading, error }">
													<loading-button
														variant-type="outline"
														class="items-center mr-4"
														size="small"
														@click="mutate()"
													>
														<icon
															name="heart"
															class="w-6 h-6 flex-no-shrink"
															:class="{
																'text-red-600': data.bit.isLiked,
																'text-gray-400': !data.bit.isLiked
															}"
														></icon>
														<span class="ml-2 text-gray-600">{{ data.bit.likes_count }} Likes</span>
													</loading-button>
												</template>
											</ApolloMutation>
											<ApolloMutation
												:mutation="require('../../graphql/mutations/bookmarkBit.gql').default"
												:variables="{
													bitId: data.bit.id
												}"
											>
												<template v-slot="{ mutate, loading, error }">
													<loading-button
														variant-type="outline"
														class="items-center mr-4"
														size="small"
														@click="mutate()"
													>
														<icon
															name="bookmark"
															class="w-6 h-6 flex-no-shrink"
															:class="{
																'text-blue-600': data.bit.isBookmarked,
																'text-gray-400': !data.bit.isBookmarked
															}"
														></icon>
														<span class="text-gray-600 w-12">
															{{data.bit.isBookmarked ? 'Saved': 'Save'}}
														</span>
													</loading-button>
												</template>
											</ApolloMutation>
											<!-- <loading-button
												variant-type="outline"
												class="items-center"
												size="small"
											>
												<icon
													name="bookmark"
													class="w-6 h-6 text-gray-400 flex-no-shrink"
												></icon>
												<span class="ml-1 text-gray-600">Save</span>
											</loading-button> -->
										</div>
									</div>

									<div class="h1 border-b-2 border-gray-100 mb-6"></div>

									<markdown-content :markdown="data.bit.snippet"></markdown-content>
								</card>
							</template>

							<!-- No result -->
							<div
								v-else
								class="no-result apollo"
							>No result :(</div>
						</template>
					</ApolloQuery>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Heading from "@/components/ui/Heading";
import LoadingButton from "@/components/ui/LoadingButton";
import ContainerCenter from "@/components/ui/ContainerCenter";
import MarkdownContent from "@/components/MarkdownContent";

import { formattedDate } from "../../filters";

export default {
	components: {
		Card,
		ContainerCenter,
		Heading,
		Icon,
		MarkdownContent,
		LoadingButton
	},

	data() {
		return {};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user"
		})
	},

	methods: {
		updateCache(previousResult, { data: { likeBit } }) {
			//graphql automatically update the cache for you
			return;
		}
	},

	apollo: {}
};
</script>

<style>
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
	@apply text-xl text-gray-700 font-bold leading-tight tracking-tight mb-2;
}

.markdown-content p,
.markdown-content ul {
	@apply text-gray-600 font-normal mb-4 leading-relaxed;
}

.markdown-content ul,
.markdown-content ol {
	@apply pl-4;
}

.markdown-content ul {
	@apply list-disc;
}

.markdown-content ol {
	@apply list-decimal;
}
</style>
