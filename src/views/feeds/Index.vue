<template>
	<div>
		<ApolloQuery :query="require('../../graphql/queries/bitsOfUsers.gql').default">
			<template v-slot="{ result: { error, data, loading }, query, isLoading }">
				<!-- loading state -->
				<div
					v-if="isLoading"
					class="loading apollo"
				>
					<div class="max-w-6xl mx-auto pt-4 pb-8 px-4 overflow-hidden">
						<div class="md:flex md:flex-wrap -mx-6">
							<div class="md:w-1/2 p-6">
								<div>
									<div class="flex mb-2 flex-wrap">
										<div
											v-for="i in [1,2,3]"
											:key="i"
											class="mr-4 inline-block w-20 bg-gray-300 h-4 rounded"
										></div>
									</div>
									<div class="leading-tight inline-block text-normal text-2xl sm:text-3xl md:text-5xl text-gray-800 hover:text-blue-600 sans-serif-3 mb-2 bg-gray-300 w-5/6 h-12 rounded"></div>
									<div class="flex flex-wrap text-normal items-center text-gray-600 leading-tight">
										<div class="inline-block w-32 bg-gray-300 h-4 rounded"></div>
										<span class="text-gray-500 mx-3 text-sm">&bull;</span>
										<span class="bg-gray-300 h-4 w-24 rounded"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="max-w-6xl mx-auto py-2 px-4 overflow-hidden">
						<div class="border-b border-t border-gray-800 mb-16 pt-1">
							<h2 class="mb-4 border-t-8 border-gray-800 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800">
								Latest Snippets
							</h2>

							<div class="mb-10">
								<div class="mb-6 md:flex md:flex-wrap -mx-4">
									<div
										class="md:w-1/3 px-4 flex flex-grow-0"
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
					<div class="max-w-6xl mx-auto pt-4 pb-8 px-4 overflow-hidden">
						<div class="md:flex md:flex-wrap -mx-6">
							<div class="md:w-2/3 px-6">
								<div>
									<div class="flex flex-wrap -mx-4">
										<snippet
											:snippet="data.bits.data[0]"
											title-size="large"
											:border="false"
										></snippet>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="max-w-6xl mx-auto py-2 px-4 overflow-hidden">
						<div class="border-b border-t border-gray-800 mb-16 pt-1">
							<h2 class="mb-4 border-t-8 border-gray-800 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800">
								Latest Snippets
							</h2>

							<div class="mb-10">
								<div class="mb-6 md:flex md:flex-wrap -mx-4 items-end">
									<snippet
										v-for="(bit, index) in data.bits.data"
										:key="index"
										:snippet="bit"
										class="md:w-1/3 px-4 flex-grow-0"
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
						</div>
					</div>
				</template>
			</template>
		</ApolloQuery>

		<div class="max-w-6xl mx-auto py-2 px-4 overflow-hidden">
			<div class="md:flex md:flex-wrap -mx-6">
				<div class="md:w-1/3 px-6">
					<ApolloQuery
						:query="require('../../graphql/queries/topSnippets.gql').default"
						fetchPolicy="no-cache"
					>
						<template v-slot="{ result: { loading, error, data } }">
							<div class="border-t pt-1 border-gray-800">
								<h2 class="mb-4 border-t-8 border-gray-800 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800">
									Top 5 Snippets
								</h2>
							</div>
							<div
								v-if="loading"
								class="loading apollo"
							>
								Loading...
							</div>

							<template
								v-else-if="data"
								class="result apollo"
							>
								<top-snippet :snippets="data.topSnippets"></top-snippet>
							</template>
						</template>
					</ApolloQuery>
				</div>

				<div class="md:w-1/3 px-6">
					<div class="">
						<div class="border-t pt-1 border-gray-800">
							<h2 class="mb-4 border-t-8 border-gray-800 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800">
								Rising on Dev.to
							</h2>
						</div>

						<div
							class="border-b border-gray-300 py-3"
							v-for="gist in gists"
							:key="gist.id"
						>
							<a
								target="_blank"
								:href="gist.url"
								class="leading-tight block text-normal sm:text-xl text-gray-800 hover:text-blue-600 sans-serif-3"
								style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
							>{{gist.title}}</a>
						</div>
					</div>
				</div>

				<div class="md:w-1/3 px-6">
					<div class="rounded bg-gray-200 p-4 md:px-6 md:py-10 border-t-8 border-blue-500">
						<div class="mb-3 text-center">
							<div class="leading-none text-xl text-gray-700">
								Subscribe to our
							</div>
							<div class="leading-none sans-serif-3 text-4xl md:text-5xl text-blue-600 font-bold italic">
								Newsletter.
							</div>
						</div>

						<p class="text-gray-600 text-center mb-4">
							Get latest technical news straight <br />
							in your email inbox.
						</p>

						<div class="mb-4">
							<text-input
								type="email"
								placeholder="Email address..."
								v-model="subscriberEmail"
								:errors="errors['subscriberEmail']"
								@keydown="delete errors['subscriberEmail']"
							/>
						</div>

						<loading-button
							class="mb-4 shadow w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
							type="submit"
							@click="subscribeMe()"
							ref="subscribeMeButton"
						>
							Subscribe Me
						</loading-button>

						<p class="text-gray-600 text-center text-xs">
							By registering you agree to our Terms &amp; Condition and Privacy
							Policy.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import { LoadingButton, TextInput } from "septemberui";
import Heading from "@/components/ui/Heading";
import Icon from "@/components/ui/Icon";
import Snippet from "@/components/snippets/ItemWithTag";
import TopSnippet from "@/components/snippets/TopList";

export default {
	components: {
		Card,
		ContainerCenter,
		LoadingButton,
		TextInput,
		Heading,
		Icon,
		Snippet,
		TopSnippet
	},

	data() {
		return {
			page: 1,
			showMoreEnabled: true,
			subscriberEmail: null,
			gists: []
		};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user",
			errors: "errors"
		})
	},

	created() {
		fetch("https://dev.to/api/articles?state=rising&per_page=5")
			.then(respnse => respnse.json())
			.then(data => (this.gists = data));
	},

	mounted() {
		let steinStoreScript = document.createElement("script");
		steinStoreScript.setAttribute(
			"src",
			"https://unpkg.com/stein-js-client"
		);
		steinStoreScript.setAttribute("type", "text/javascript");
		document.head.prepend(steinStoreScript);
	},

	methods: {
		...mapActions({
			setErrors: "setErrors"
		}),

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
		},

		subscribeMe() {
			const regex = RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
			if (!regex.test(this.subscriberEmail)) {
				this.setErrors({
					subscriberEmail: ["Please provide a valid email address"]
				});
				return;
			}
			this.$refs.subscribeMeButton.startLoading();
			const store = new SteinStore(
				"https://api.steinhq.com/v1/storages/5e7cbf18b88d3d04ae0815f9"
			);

			store
				.append(
					"Sheet1",

					[
						{
							email: this.subscriberEmail
						}
					],
					{
						authentication: {
							username: "bitManager",
							password: "bitDocs@2020"
						}
					}
				)
				.then(res => {
					this.$refs.subscribeMeButton.stopLoading();
					this.subscriberEmail = null;
					this.$snack.success({
						text: "Successfully subscribed!",
						button: "Ok",
						action: this.clickAction
					});
				});
		}
	}
};
</script>
