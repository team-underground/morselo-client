<template>
	<div>
		<ApolloQuery
			:query="require('@/graphql/queries/bitsOfUsers.gql').default"
			:variables="{
				search: query
			}"
		>
			<template v-slot="{ result: { error, data, loading }, query, isLoading }">
				<!-- loading state -->
				<div
					v-if="isLoading"
					class="loading apollo"
				>
					<div class="max-w-2xl mx-auto py-2 px-4 overflow-hidden">
						<div class="mb-16 pt-1">
							<h2 class="mb-4 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800">
								search results
							</h2>

							<div class="mb-10">
								<div class="mb-6 md:flex md:flex-wrap -mx-4">
									<div
										class="w-full px-4 flex flex-grow-0"
										v-for="i in [1,2,3,4,5,6,7,8,9]"
										:key="i"
									>
										<div class="py-6 border-b flex flex-col w-full">
											<div class="flex mb-2 flex-wrap">
												<div
													v-for="i in [1,2,3]"
													:key="i"
													class="mr-4 inline-block"
												>
													<span class="bg-gray-300 h-4 rounded text-sm text-transparent text-gray-300">
														{{ Math.random().toString(36).substring(2, Math.floor(Math.random() * 16) + 5)}}
													</span></div>
											</div>
											<div class="inline-flex">
												<span class="mb-2 bg-gray-300 rounded h-8 text-gray-300">
													{{ Math.random().toString(36).substring(2, Math.floor(Math.random() * 16) + 20) + Math.random().toString(36).substring(2, Math.floor(Math.random() * 16) + 10) + Math.random().toString(36).substring(2, Math.floor(Math.random() * 16) + 5)}}
												</span>
											</div>

											<div class="flex flex-wrap text-normal items-center text-gray-300 leading-tight">
												<div class="inline-block bg-gray-300 rounded">{{ Math.random().toString(36).substring(2, Math.floor(Math.random() * 32) + 10)  }}</div>
												<span class="text-gray-500 mx-3 text-sm">&bull;</span>
												<span class="text-transparent bg-gray-300 rounded">{{Math.random().toString(36).substring(2, Math.floor(Math.random() * 32) + 10) }}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<template v-if="data">
					<div class="max-w-2xl mx-auto py-2 px-4 overflow-hidden">
						<div class="mb-16 pt-1">
							<h2 class="mb-4 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800">
								Search Results
							</h2>

							<div
								class="mb-10"
								v-if="data.bits.data.length > 0"
							>
								<div class="mb-6 md:flex md:flex-wrap -mx-4 items-end">
									<snippet
										v-for="(bit, index) in data.bits.data"
										:key="index"
										:snippet="bit"
										class="px-4 flex-grow-0"
									></snippet>
								</div>
								<div class="flex justify-center px-4">
									<loading-button
										ref="loadMoreButton"
										rounded="small"
										class="shadow-tag font-semibold w-64"
										style="background:white;border-color: #2d3748;border-width: 2px;color: #718096;"
										@click="loadMore(query, data.bits.paginatorInfo.currentPage)"
										v-show="data.bits.paginatorInfo.hasMorePages"
									>Load More...</loading-button>
								</div>
							</div>
							<div
								class="h-64"
								v-else
							>
								<card class="flex justify-center items-center">
									<heading size="heading">We couldn't find any result :(</heading>
								</card>
							</div>
						</div>
					</div>
				</template>
			</template>
		</ApolloQuery>
	</div>
</template>

<script>
import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import { LoadingButton, TextInput } from "septemberui";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import Snippet from "@/components/snippets/ItemWithTag";

export default {
	beforeRouteLeave(to, from, next) {
		// called when the route that renders this component is about to
		// be navigated away from.
		// has access to `this` component instance.
		this.$parent.searchTerm = null;
		next();
	},
	props: ["query"],

	components: {
		Card,
		ContainerCenter,
		LoadingButton,
		TextInput,
		Heading,
		Icon,
		Snippet
	},

	data() {
		return {
			page: 1,
			showMoreEnabled: true,
			subscriberEmail: null
		};
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
