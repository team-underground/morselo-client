<template>
	<div>
		<container-center>
			<div class="flex flex-wrap -mx-4">
				<div class="w-full md:w-2/3 px-4">
					<ApolloQuery :query="
						require('../../graphql/queries/bitsOfUsers.gql').default
						">
						<template v-slot="{ result: { error, data, loading }, query, isLoading }">
							<!-- Loading -->
							<div v-if="loading" class="loading apollo">Loading...</div>

							<!-- Result -->
							<template v-if="data" class="result apollo">
								<div class="md:flex md:justify-between md:items-center mb-4">
									<heading size="heading" class="mb-1 md:mb-0">Latest snippets</heading>
								</div>

								<card :is-padding="false">
									<router-link
										class="block border-b border-gray-200 py-5 px-5 hover:bg-gray-100"
										v-for="(bit, index) in data.bits.data"
										:key="index"
										:to="`/snippets/${bit.id}`"
									>
										<div>
											<heading size="heading" class="mb-3 hover:text-blue-500">{{ bit.title }}</heading>

											<div class="flex text-sm items-center">
												<div class="flex items-center mr-4 md:mr-6">
													<icon name="user" class="w-6 h-6 text-gray-400 flex-no-shrink"></icon>
													<span class="ml-2 text-gray-600">{{ bit.user.name }}</span>
												</div>
												<div class="flex items-center mr-4 md:mr-6">
													<icon name="clock" class="w-6 h-6 text-gray-400 flex-no-shrink"></icon>

													<span class="ml-2 text-gray-600">{{ bit.created_at | formattedDate }}</span>
												</div>
												<div class="flex items-center mr-4 md:mr-6">
													<icon name="heart" class="w-6 h-6 text-gray-400 flex-no-shrink"></icon>
													<span class="ml-2 text-gray-600">{{ bit.likes_count }}</span>
												</div>
											</div>
										</div>
									</router-link>
								</card>

								<div class="md:w-64 mx-auto">
									<loading-button
										ref="loadMoreButton"
										class="mt-8 py-3 px-5 w-full text-truncate"
										type="button"
										v-if="showMoreEnabled"
										@click.prevent="loadMore(query, data.bits.paginatorInfo.currentPage)"
									>Load more snippets</loading-button>
								</div>
							</template>
						</template>
					</ApolloQuery>
				</div>

				<div class="md:w-1/3 px-4 mt-10">
					<ApolloQuery :query="
						require('../../graphql/queries/categories.gql').default
						">
						<template v-slot="{ result: { error, data, loading }, isLoading }">
							<!-- Loading -->
							<div v-if="isLoading" class="loading apollo">Loading...</div>

							<!-- Result -->
							<template v-if="data" class="result apollo">
								<heading size="large" class="mb-2">Categories</heading>

								<div class="flex flex-wrap -mx-4">
									<router-link
										class="italic block text-gray-600 hover:text-blue-500 w-1/2 px-4"
										v-for="(category, categoryIndex) in data.categories"
										:key="categoryIndex"
										:to="`/category/${category.name}`"
									>
										<div class="border-b border-gray-200 py-2">{{ category.name }}</div>
									</router-link>
								</div>
							</template>
						</template>
					</ApolloQuery>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import LoadingButton from "@/components/ui/LoadingButton";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";

import { formattedDate } from "../../filters";

export default {
	components: {
		Card,
		ContainerCenter,
		LoadingButton,
		Heading,
		Icon
	},

	data() {
		return {
			page: 1,
			showMoreEnabled: true
		};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user"
		})
	},

	methods: {
		async loadMore(query, currentPage) {
			this.$refs.loadMoreButton.startLoading();
			await query
				.fetchMore({
					variables: {
						page: currentPage + 1
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						const newBits = fetchMoreResult.bits.data;
						const hasMore =
							fetchMoreResult.bits.paginatorInfo.hasMorePages;

						this.showMoreEnabled = hasMore;

						return {
							bits: {
								__typename: previousResult.bits.__typename,
								data: [
									...previousResult.bits.data,
									...fetchMoreResult.bits.data
								],
								paginatorInfo:
									fetchMoreResult.bits.paginatorInfo
							}
						};
					}
				})
				.finally(() => {
					this.$refs.loadMoreButton.stopLoading();
				});
		}
	}
};
</script>
