<template>
	<div>
		<container-center>
			<div class="flex flex-wrap">
				<div class="w-full md:w-2/3">
					<template
						v-if="bookmarks"
						class="result apollo"
					>
						<div class="md:flex md:justify-between md:items-center mb-4">
							<heading
								size="heading2"
								class="mb-1 md:mb-0"
							>My Bookmarks</heading>
							<heading
								size="small-caps"
								class="mb-4 md:mb-0"
							>Total: {{ bookmarks.paginatorInfo.total }}</heading>
						</div>

						<card
							:is-padding="false"
							class="mb-10"
						>
							<router-link
								class="block border-b border-gray-200 py-5 px-5 hover:bg-gray-100"
								v-for="(bit, index) in bookmarks.data"
								:key="index"
								:to="{ name: 'snippetsShow', params: { id: bit.id } }"
							>
								<heading
									size="heading"
									class="mb-3 hover:text-blue-500"
								>
									{{ bit.title }}
								</heading>

								<div class="flex text-sm items-center">
									<div class="flex items-center mr-4 md:mr-6">
										<icon
											name="clock"
											class="w-6 h-6 text-gray-400 flex-no-shrink"
										></icon>

										<span class="ml-2 text-gray-600">
											{{ bit.created_at | formattedDate }}
										</span>
									</div>
									<div class="flex items-center mr-4 md:mr-6">
										<icon
											name="heart"
											class="w-6 h-6 text-gray-400 flex-no-shrink"
										></icon>
										<span class="ml-2 text-gray-600">
											{{ bit.likes_count }}
										</span>
									</div>

								</div>
							</router-link>
						</card>

						<pagination
							:total-pages="bookmarks.paginatorInfo.lastPage"
							:total="bookmarks.paginatorInfo.total"
							:per-page="bookmarks.paginatorInfo.perPage"
							:current-page="bookmarks.paginatorInfo.currentPage"
							:has-more-pages="bookmarks.paginatorInfo.hasMorePages"
							@pagechanged="showMore"
						/>
					</template>
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
import Pagination from "@/components/ui/Pagination";
import All_BOOKMARKS from "@/graphql/queries/bookmarksOfCurrentUser.gql";
import { formattedDate } from "../../filters";

export default {
	components: {
		Card,
		ContainerCenter,
		LoadingButton,
		Heading,
		Icon,
		Pagination
	},

	apollo: {
		bookmarks() {
			return {
				query: All_BOOKMARKS,
				variables: {
					page: this.page
				},
				update: data => (this.bookmarks = data.bookmarks)
			};
		}
	},

	data() {
		return {
			bookmarks: null,
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
		showMore(page) {
			this.page = page;
			this.$apollo.queries.bookmarks.fetchMore({
				variables: {
					page: this.page
				},

				// Transform the previous result with new data
				updateQuery: (previousResult, { fetchMoreResult }) => {
					const newBookmarks = fetchMoreResult.bookmarks.data;

					return {
						bookmarks: {
							__typename: previousResult.bookmarks.__typename,
							data: [...newBookmarks],
							paginatorInfo:
								fetchMoreResult.bookmarks.paginatorInfo
						}
					};
				}
			});
		}
	}
};
</script>
