<template>
  <div>
    <container-center>
      <div class="flex flex-wrap -mx-4">
        <div class="w-full">
          <ApolloQuery
            :query="
              require('../../graphql/queries/categoryWiseBits.gql').default
            "
            :variables="{
              name: $route.params.category,
              page: this.page
            }"
          >
            <template
              v-slot="{ result: { error, data, loading }, query, isLoading }"
            >
              <!-- Loading -->
              <div v-if="loading" class="loading apollo">Loading...</div>

              <!-- Result -->
              <template v-if="data" class="result apollo">
                <div class="max-w-6xl mx-auto py-2 px-4 overflow-hidden">
                  <div
                    class="w-full rounded-sm bg-white overflow-hidden px-8 py-6 flex justify-center sans-serif-3 mb-10 border-2 border-b-none border-gray-800 shadow-tag"
                  >
                    <heading
                      size="display2"
                      class="mb-1 md:mb-0 flex items-center"
                    >
                      <i
                        class="text-gray-600 mr-6 colored"
                        :class="data.category.icon"
                      >
                      </i>
                      {{ data.category.name }}</heading
                    >
                  </div>
                </div>
                <div class="max-w-xl mx-auto py-2 px-4">
                  <div>
                    <div class="mb-10">
                      <div class="mb-6 md:flex md:flex-wrap -mx-4">
                        <snippet
                          v-for="(bit, index) in data.category.bits.data"
                          :key="index"
                          :snippet="bit"
                        ></snippet>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="md:w-64 mx-auto">
                  <loading-button
                    :ref="`loadMoreButton-${$route.params.category}`"
                    rounded="small"
                    class="mt-8 py-3 px-5 shadow-tag font-semibold w-64"
                    style="background:white;border-color: #2d3748;border-width: 2px;color: #718096;"
                    @click="
                      loadMore(
                        query,
                        data.category.bits.paginatorInfo.currentPage
                      )
                    "
                    v-show="data.category.bits.paginatorInfo.hasMorePages"
                    >Load More...</loading-button
                  >
                </div>
              </template>
            </template>
          </ApolloQuery>
        </div>
      </div>
    </container-center>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ContainerCenter from "@/components/ui/ContainerCenter";
import { LoadingButton } from "septemberui";
import Heading from "@/components/ui/Heading";
import Snippet from "@/components/snippets/ItemWithTag";

export default { 
  metaInfo() {
        return {
            title: `${this.$route.params.category} | The Morselo Community` || "Loading...",
            meta: [
                { name: 'description', content: `${this.$route.params.category} snippets on The Morselo Community` },
                { property: 'og:title', content: `${this.$route.params.category} | The Morselo Community` },
                { property: 'og:site_name', content: 'Morselo Community'},
                { property: 'og:description', content: `${this.$route.params.category} snippets on The Morselo Community`},
                {property: 'og:type', content: 'website'},
                {property: 'og:url', content: location.href}  ,
                { property: 'twitter:card', content: "summary_large_image"},
                { property: 'twitter:url', content:  location.href},
                {property: 'twitter:title', content: `${this.$route.params.category} | The Morselo Community`},
                {property: 'twitter:description', content: `${this.$route.params.category} snippets on The Morselo Community`},  
            ]
        }
    },
  components: {
    ContainerCenter,
    LoadingButton,
    Heading,
    Snippet
  },

  data() {
    return {
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
    async loadMore(query, currentPage) {
      this.$refs[
        `loadMoreButton-${this.$route.params.category}`
      ].startLoading();
      await query
        .fetchMore({
          variables: {
            page: currentPage + 1
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return Object.assign({}, previousResult, {
              category: {
                __typename: previousResult.category.__typename,
                id: previousResult.category.id,
                name: previousResult.category.name,
                icon: previousResult.category.icon,
                bits: {
                  __typename: previousResult.category.bits.__typename,
                  data: [
                    ...previousResult.category.bits.data,
                    ...fetchMoreResult.category.bits.data
                  ],
                  paginatorInfo: fetchMoreResult.category.bits.paginatorInfo
                }
              }
            });
          }
        })
        .finally(() => {
          this.$refs[
            `loadMoreButton-${this.$route.params.category}`
          ].stopLoading();
        });
    }
  }
};
</script>
