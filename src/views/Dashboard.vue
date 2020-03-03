<template>
	<div>
		<h1>Dashboard</h1>
		<div class="mb-10">
			<h1 class="text-lg">bits</h1>
			<div v-for="bit in bits.data" :key="bit.id">
				{{ bit.title }}
				<br />
			</div>

			<div class="mt-5">
				<button type="button" v-if="showMoreEnabled" @click="showMore">Show More</button>
			</div>

			<form @submit.prevent="createBit" method="POST">
				<p>
					<input type="text" v-model="bit.title" placeholder="Title" />
				</p>

				<p>
					<input type="text" v-model="bit.snippet" placeholder="Snippet" />
				</p>

				<button type="submit">Create Snippet</button>
			</form>
		</div>
	</div>
</template>

<script>
import {
	ALL_BITS_OF_CURRENT_USER_QUERY,
	ADD_BIT_MUTATION,
	ALL_BITS_QUERY
} from "../graphql/queries/bitQueries";

import { mapGetters } from "vuex";

export default {
	data() {
		return {
			user: {},
			page: 1,
			showMoreEnabled: true,

			bit: {
				title: "",
				snippet: ""
			},

			bits: []
		};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user"
		})
	},

	methods: {
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

		createBit() {
			this.$apollo
				.mutate({
					mutation: ADD_BIT_MUTATION,
					variables: {
						title: this.bit.title,
						snippet: this.bit.snippet
					},
					update: (store, { data: { createBit } }) => {
						// read data from cache for this query
						const data = store.readQuery({ query: ALL_BITS_QUERY });

						// add new post from the mutation to existing posts
						data.bits.data.unshift(createBit);

						// write data back to the cache
						store.writeQuery({ query: ALL_BITS_QUERY, data });
					}
				})
				.then(response => {
					this.bits = response.data.bits;

					// this.$router.replace("/");
				});
		}
	},

	apollo: {
		user: {
			query: ALL_BITS_OF_CURRENT_USER_QUERY,
			variables() {
				return {
					id: this.userData.id,
					page: this.page
				};
			}
		},

		bits: {
			query: ALL_BITS_QUERY
		}
	}
};
</script>
