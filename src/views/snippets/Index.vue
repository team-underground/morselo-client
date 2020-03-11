<template>
	<div>
		<ApolloQuery
			:query="require('../../graphql/queries/bitsOfCurrentUser.gql').default"
			:variables="{
				id: userData.id,
				page: 1
			}"
			:deep="true"
		>
			<template v-slot="{ result: { error, data, loading }, query, isLoading }">
				<container-center>
					<!-- <div class="flex w-full"> -->
					<div class="w-full">
						<!-- Loading -->
						<div v-if="loading" class="loading apollo">Loading...</div>

						<!-- Result -->
						<template v-if="data" class="result apollo">
							<div class="md:flex md:justify-between md:items-center mb-4">
								<heading size="heading" class="mb-1 md:mb-0">My snippets</heading>
								<heading
									size="small-caps"
									class="mb-4 md:mb-0"
								>Total: {{ data.user.bits.paginatorInfo.total }}</heading>
							</div>

							<div class="flex flex-col">
								<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
									<div
										class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
									>
										<table class="min-w-full">
											<thead>
												<tr>
													<th
														class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider"
													>Date Created</th>
													<th
														class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider"
													>Title</th>
													<th
														class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider"
													>Likes</th>
													<th
														class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider"
													>Tags</th>
													<th class="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
												</tr>
											</thead>
											<tbody class="bg-white">
												<tr v-for="(bit, index) in data.user.bits.data" :key="index">
													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<div class="flex items-center">
															<div class="flex-shrink-0 h-6 w-6">
																<icon name="clock" class="w-6 h-6 text-gray-400 flex-no-shrink"></icon>
															</div>
															<div class="ml-2">
																<span class="text-gray-600">{{ bit.created_at | formattedDate }}</span>
															</div>
														</div>
													</td>

													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<router-link
															class="text-blue-500 hover:text-blue-600"
															:to="`/snippets/${bit.id}`"
														>{{ bit.title }}</router-link>
													</td>

													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<div class="text-gray-600">{{ bit.likes_count }}</div>
													</td>

													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<div class="text-gray-600">Tags</div>
													</td>

													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<loading-button variant-type="outline" class="shadow-sm uppercase" size="small">Edit</loading-button>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>

							<!-- <card :is-padding="false">
									<router-link
										class="block border-b border-gray-200 py-5 px-5 hover:bg-gray-100"
										v-for="(bit, index) in data.user.bits.data"
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

												<div class="flex overflow-hidden">
													<div
														class="bg-gray-200 inline-flex items-center justify-center h-8 w-8 rounded-full text-white border-2 border-white"
													>
														<i class="devicon-javascript-plain colored text-base"></i>
													</div>

													<div
														class="-ml-3 bg-gray-200 inline-flex items-center justify-center h-8 w-8 rounded-full text-white border-2 border-white"
													>
														<i class="devicon-laravel-plain colored text-base"></i>
													</div>

													<div
														class="-ml-3 bg-gray-200 inline-flex items-center justify-center h-8 w-8 rounded-full text-white border-2 border-white"
													>
														<i class="devicon-nodejs-plain colored text-base"></i>
													</div>
												</div>
											</div>
										</div>
										 
									</router-link>
							</card>-->

							<div class="md:w-64 mx-auto">
								<loading-button
									ref="loadMoreButton"
									class="mt-8 py-3 px-5 w-full text-truncate"
									type="button"
									v-if="showMoreEnabled"
									@click.prevent="loadMore(query)"
								>Load more snippets</loading-button>
							</div>
						</template>

						<!-- No result -->
						<!-- <div v-else class="no-result apollo">No result :(</div> -->
					</div>
					<!-- </div> -->
				</container-center>
			</template>
		</ApolloQuery>
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
