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
						<div
							v-if="loading"
							class="loading apollo"
						>Loading...</div>

						<!-- Result -->
						<template
							v-if="data"
							class="result apollo"
						>
							<div class="md:flex md:justify-between md:items-center mb-4">
								<heading
									size="heading"
									class="mb-1 md:mb-0"
								>My snippets</heading>
								<heading
									size="small-caps"
									class="mb-4 md:mb-0"
								>Total: {{ data.user.bits.paginatorInfo.total }}</heading>
							</div>

							<div class="flex flex-col">
								<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
									<div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
										<table class="min-w-full">
											<thead>
												<tr>
													<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">Date Created</th>
													<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">Title</th>
													<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">Likes</th>
													<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">Tags</th>
													<th class="px-6 py-3 border-b border-gray-200 bg-gray-100"></th>
												</tr>
											</thead>
											<tbody class="bg-white">
												<tr
													v-for="(bit, index) in data.user.bits.data"
													:key="index"
												>
													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<div class="flex items-center">
															<div class="flex-shrink-0 h-6 w-6">
																<icon
																	name="clock"
																	class="w-6 h-6 text-gray-400 flex-no-shrink"
																></icon>
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
														<div
															class="text-gray-600"
															v-if="bit.tags"
														>
															<span
																class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-default"
																v-for="(tag, index) in bit.tags"
																:key="index"
																:class="{'mr-2': (index +1) < bit.tags.length}"
															>
																<span v-html="tag"></span>
															</span>
														</div>
													</td>

													<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
														<router-link
															class="border border-gray-300 text-blue-500 hover:bg-gray-100 hover:text-blue-700 shadow-sm uppercase px-4 py-2 text-sm leading-tight rounded-lg base-button inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline"
															:to="{
															name: 'snippetsEdit',
															params: {
																id: bit.id
															}
														}"
														>
															Edit
														</router-link>
														<!-- <loading-button
															variant-type="outline"
															class="shadow-sm uppercase"
															size="small"
														>Edit</loading-button> -->
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
										:to="{ name: 'snippetsShow', params: { id: bit.id } }"
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
		async loadMore(query) {
			this.$refs.loadMoreButton.startLoading();
			await query
				.fetchMore({
					variables: {
						id: this.userData.id,
						page: this.page++
					},
					updateQuery: (previousResult, { fetchMoreResult }) => {
						if (
							!fetchMoreResult ||
							fetchMoreResult.user.bits.data.length === 0
						) {
							this.showMoreEnabled = false;
							return previousResult;
						}
						return Object.assign({}, previousResult, {
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
										...fetchMoreResult.user.bits.data
									],
									paginatorInfo:
										fetchMoreResult.user.bits.paginatorInfo
								}
							}
						});
					}
				})
				.finally(() => {
					this.$refs.loadMoreButton.stopLoading();
				});
		}
	}
};
</script>

<style lang="css" scoped>
.tags-input-badge {
	position: relative;
	display: inline-block;
	padding: 0.4em 0.4em;
	font-family: inherit;
	font-size: 85%;
	font-weight: 600;
	line-height: 1;
	text-align: center;
	white-space: nowrap;
	vertical-align: baseline;
	border-radius: 0.25em;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tags-input-badge-pill {
	padding-right: 1.65em;
	padding-left: 0.65em;
	border-radius: 10em;
}

.tags-input-badge-selected-default {
	color: #212529;
	background-color: #f0f1f2;
}
</style>
