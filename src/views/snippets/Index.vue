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
							v-if="isLoading"
							class="loading apollo"
						>Loading...</div>

						<!-- Result -->
						<template
							v-if="data"
							class="result apollo"
						>
							<div class="md:flex md:justify-between md:items-center mb-4 mt-6">
								<heading
									size="heading"
									class="mb-1 md:mb-0 sans-serif-3"
								>My snippets</heading>
								<heading
									size="small-caps"
									class="mb-4 md:mb-0 sans-serif"
								><span class="sans-serif-2">Total</span>: {{ data.user.bits.paginatorInfo.total }}</heading>
							</div>

							<template v-if="data.user.bits.data.length > 0">
								<div class="flex flex-col">
									<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
										<div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-sm border-b border-gray-200">
											<table class="min-w-full">
												<thead class="sans-serif-2">
													<tr>
														<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">
															Date Created
														</th>
														<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">
															Title
														</th>
														<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">
															Likes
														</th>
														<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">
															Tags
														</th>
														<th class="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-bold text-gray-600 uppercase tracking-wider">
															Action
														</th>
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
																	<span class="text-gray-600 sans-serif">{{bit.created_at | formattedDate}}</span>
																</div>
															</div>
														</td>

														<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
															<router-link
																class="text-blue-500 hover:text-blue-600"
																:to="`/snippets/${bit.slug}`"
															>
																<div
																	style="max-width:300px;"
																	class="truncate"
																>
																	{{ bit.title }}
																</div>
															</router-link>
														</td>

														<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
															<div class="text-gray-600 sans-serif">
																{{ bit.likes_count }}
															</div>
														</td>

														<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
															<div
																class="text-gray-600 truncate"
																style="max-width:300px;"
																v-if="bit.tags"
															>
																<span
																	class="tags-input-badge tags-input-badge-pill tags-input-badge-selected-default"
																	v-for="(tag, index) in bit.tags"
																	:key="index"
																	:class="{ 'mr-2': index + 1 < bit.tags.length }"
																>
																	<span v-html="tag"></span>
																</span>
															</div>
														</td>

														<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
															<router-link
																class="border border-gray-300 text-blue-500 hover:bg-gray-100 hover:text-blue-700 shadow-sm uppercase px-4 py-2 text-sm leading-tight rounded-lg base-button inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline sans-serif-2"
																:to="{
																	name: 'snippetsEdit',
																	params: {
																	id: bit.slug
																	}
																}"
															>
																Edit
															</router-link>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>

								<div class="md:w-64 mx-auto">
									<loading-button
										ref="loadMoreButton"
										class="mt-8 py-3 px-5 w-full text-truncate"
										rounded="small"
										type="button"
										v-show="data.user.bits.paginatorInfo.hasMorePages"
										@click.prevent="loadMore(query)"
									>Load more snippets</loading-button>
								</div>
							</template>
							<div
								class="h-64"
								v-else
							>
								<card class="flex justify-center items-center">
									<heading size="heading">We couldn't find any result :(</heading>
								</card>
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
import { mapGetters, mapActions } from "vuex";

import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import LoadingButton from "@/components/ui/LoadingButton";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";

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
			page: null,
			showMoreEnabled: true
		};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user",
			snippetPage: "snippetPage"
		})
	},

	created() {
		this.page = this.snippetPage;
	},

	watch: {
		page(value) {
			this.setSnippetPage(value);
		}
	},

	methods: {
		...mapActions({
			setSnippetPage: "setSnippetPage"
		}),

		async loadMore(query) {
			this.page++;
			this.$refs.loadMoreButton.startLoading();
			await query
				.fetchMore({
					variables: {
						id: this.userData.id,
						page: this.page
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
