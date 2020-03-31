<template>
	<div>
		<container-center>
			<div class="flex flex-wrap">
				<div class="w-full">
					<template
						v-if="bookmarks"
						class="result apollo"
					>
						<div class="md:flex md:justify-between md:items-center mb-4 mt-6">
							<heading
								size="heading"
								class="mb-1 md:mb-0 sans-serif-3"
							>My Bookmarks</heading>
							<heading
								size="small-caps"
								class="mb-4 md:mb-0 sans-serif"
							><span class="sans-serif-2">Total</span>: {{ bookmarks.paginatorInfo.total }}</heading>
						</div>
						<template v-if="bookmarks.data.length > 0">
							<div class="mb-6 md:flex md:flex-wrap -mx-4">
								<snippet
									v-for="(bit, index) in bookmarks.data"
									:key="index"
									:snippet="bit"
								></snippet>
							</div>

							<pagination
								class="sans-serif-3"
								:total-pages="bookmarks.paginatorInfo.lastPage"
								:total="bookmarks.paginatorInfo.total"
								:per-page="bookmarks.paginatorInfo.perPage"
								:current-page="bookmarks.paginatorInfo.currentPage"
								:has-more-pages="bookmarks.paginatorInfo.hasMorePages"
								@pagechanged="showMore"
							/>
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
				</div>
			</div>
		</container-center>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Pagination from "@/components/ui/Pagination";
import All_BOOKMARKS from "@/graphql/queries/bookmarksOfCurrentUser.gql";
import Snippet from "@/components/snippets/ItemWithTag";

export default {
	components: {
		Card,
		ContainerCenter,
		Heading,
		Pagination,
		Snippet
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
			page: 1
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
