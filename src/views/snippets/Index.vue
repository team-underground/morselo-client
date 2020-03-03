<template>
	<div>
		<container-center>
			<div class="flex flex-wrap">
				<div class="w-full md:w-2/3">
					<ApolloQuery
						:query="
              require('../../graphql/queries/bitsOfCurrentUser.gql').default
            "
						:variables="{
              id: userData.id,
              page: 1
            }"
						:deep="true"
					>
						<template v-slot="{ result: { error, data, loading }, query, isLoading }">
							<!-- Loading -->
							<div v-if="loading" class="loading apollo">Loading...</div>

							<!-- Result -->
							<template v-if="data" class="result apollo">
								<div class="md:flex md:justify-between md:items-center mb-4">
									<heading size="heading2" class="mb-1 md:mb-0">My snippets</heading>
									<heading
										size="small-caps"
										class="mb-4 md:mb-0"
									>Total: {{ data.user.bits.paginatorInfo.total }}</heading>
								</div>

								<card :is-padding="false">
									<a
										class="block border-b border-gray-200 py-5 px-5 hover:bg-gray-100"
										v-for="(bit, index) in data.user.bits.data"
										:key="index"
										:href="`/snippets/${bit.id}`"
									>
										<heading size="heading" class="mb-3 hover:text-blue-500">
											{{
											bit.title
											}}
										</heading>

										<div class="flex text-sm items-center">
											<div class="flex items-center mr-4 md:mr-6">
												<icon name="clock" class="w-6 h-6 text-gray-400 flex-no-shrink"></icon>

												<span class="ml-2 text-gray-600">
													{{
													bit.created_at | formattedDate
													}}
												</span>
											</div>
											<div class="flex items-center mr-4 md:mr-6">
												<icon name="heart" class="w-6 h-6 text-gray-400 flex-no-shrink"></icon>
												<span class="ml-2 text-gray-600">
													{{
													bit.likes_count
													}}
												</span>
											</div>
											<!-- <div class="flex items-center">
                        <icon
                          name="bookmark"
                          class="w-6 h-6 text-gray-400 flex-no-shrink"
                        ></icon>
                        <span class="ml-1 text-gray-600">Save</span>
											</div>-->
										</div>
									</a>
								</card>

								<loading-button
									ref="loadMoreButton"
									class="mt-8 py-3 px-5 w-full"
									type="button"
									v-if="showMoreEnabled"
									@click.prevent="loadMore(query)"
								>Load More</loading-button>
							</template>

							<!-- No result -->
							<!-- <div v-else class="no-result apollo">No result :(</div> -->
						</template>
					</ApolloQuery>
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import {
	ALL_BITS_OF_CURRENT_USER_QUERY,
	ADD_BIT_MUTATION,
	ALL_BITS_QUERY
} from "../../graphql/queries/bitQueries";

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
		updateCache() {
			alert("hello");
		},

		showMore() {
			this.page++;

			this.$apollo.queries.user.fetchMore({
				variables: {
					id: this.userData.id,
					page: this.page
				},

				// Transform the previous result with new data
				updateQuery: (previousResult, { fetchMoreResult }) => {
					console.log(previousResult, fetchMoreResult);
					const newUserBits = fetchMoreResult.user.bits.data;
					const hasMore =
						fetchMoreResult.user.bits.paginatorInfo.hasMorePages;

					this.showMoreEnabled = hasMore;

					return {
						user: {
							id: previousResult.user.id,
							name: previousResult.user.name,
							email: previousResult.user.email,
							__typename: previousResult.user.__typename,

							bits: {
								__typename: previousResult.user.bits.__typename,
								data: [
									...previousResult.user.bits.data,
									...newUserBits
								],
								paginatorInfo:
									fetchMoreResult.user.bits.paginatorInfo
							}
						}
					};
				}
			});
		},

		async loadMore(query) {
			this.$refs.loadMoreButton.startLoading();
			await query
				.fetchMore({
					variables: {
						id: this.userData.id,
						page: this.page++
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						const newUserBits = fetchMoreResult.user.bits.data;
						const hasMore =
							fetchMoreResult.user.bits.paginatorInfo
								.hasMorePages;

						this.showMoreEnabled = hasMore;

						return {
							user: {
								id: previousResult.user.id,
								name: previousResult.user.name,
								email: previousResult.user.email,
								__typename: previousResult.user.__typename,

								bits: {
									__typename:
										previousResult.user.bits.__typename,
									data: [
										...previousResult.user.bits.data,
										...newUserBits
									],
									paginatorInfo:
										fetchMoreResult.user.bits.paginatorInfo
								}
							}
						};
					}
				})
				.finally(() => {
					this.$refs.loadMoreButton.stopLoading();
				});
		}
	}

	//   apollo: {
	//     user: {
	//       query: ALL_BITS_OF_CURRENT_USER_QUERY,
	//       variables() {
	//         return {
	//           id: this.userData.id,
	//           page: 1
	//         };
	//       }
	//     }
	//   }
};
</script>
