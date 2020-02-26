<template>
  <div>
    <h1>Dashboard</h1>
    <!-- {{ user.bits.data.length }}
    <div class="mb-10">
      <h1 class="text-lg">bits</h1>
      <div v-for="bit in user.bits.data" :key="bit.id">
        {{ bit.title }}
        <br />
      </div>

      <div class="mt-5">
        <button type="button" v-if="showMoreEnabled" @click="showMore">
          Show More
        </button>
      </div>
    </div> -->

    <ApolloQuery
      :query="require('../../graphql/queries/bitsOfCurrentUser.gql').default"
      :variables="{
        id: this.userData.id,
        page: 1
      }"
    >
      <template v-slot="{ result: { loading, error, data }, query }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-if="data" class="result apollo">
          {{ data.user.bits.data }}
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>

        <button type="button" v-if="showMoreEnabled" @click="loadMore(query)">
          Show More
        </button>
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

export default {
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
          const hasMore = fetchMoreResult.user.bits.paginatorInfo.hasMorePages;

          this.showMoreEnabled = hasMore;

          return {
            user: {
              id: previousResult.user.id,
              name: previousResult.user.name,
              email: previousResult.user.email,
              __typename: previousResult.user.__typename,

              bits: {
                __typename: previousResult.user.bits.__typename,
                data: [...previousResult.user.bits.data, ...newUserBits],
                paginatorInfo: fetchMoreResult.user.bits.paginatorInfo
              }
            }
          };
        }
      });
    },

    async loadMore(query) {
      await query.fetchMore({
        variables: {
          id: this.userData.id,
          page: this.page++
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newUserBits = fetchMoreResult.user.bits.data;
          const hasMore = fetchMoreResult.user.bits.paginatorInfo.hasMorePages;

          this.showMoreEnabled = hasMore;

          return {
            user: {
              id: previousResult.user.id,
              name: previousResult.user.name,
              email: previousResult.user.email,
              __typename: previousResult.user.__typename,

              bits: {
                __typename: previousResult.user.bits.__typename,
                data: [...previousResult.user.bits.data, ...newUserBits],
                paginatorInfo: fetchMoreResult.user.bits.paginatorInfo
              }
            }
          };
        }
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
