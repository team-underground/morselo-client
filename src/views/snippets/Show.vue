<template>
  <div>
    <div class="max-w-6xl mx-auto px-4 mb-10 py-8">
      <ApolloQuery
        :query="require('../../graphql/queries/bitsSingle.gql').default"
        :variables="{
          id: $route.params.id
        }"
        @result="onResult"
      >
        <template
          v-slot="{ result: { error, data, loading }, query, isLoading }"
        >
          <!-- Loading -->
          <div v-if="isLoading" class="loading apollo">Loading...</div>
          <template v-else-if="data" class="result apollo">
            <div class="flex mb-2 flex-wrap">
              <router-link
                v-for="tag in data.bit.tags"
                :key="tag"
                :to="{
                  name: 'categoryShow',
                  params: {
                    category: tag
                  }
                }"
                class="leading-tight mr-4 text-sm font-semibold border-b border-blue-600 inline-block text-blue-600 hover:text-gray-800 uppercase tracking-wide"
                >#{{ tag }}</router-link
              >
            </div>

            <h2
              class="mb-4 inline-block leading-tight text-3xl sm:text-4xl md:text-5xl font-bold sans-serif-3 text-gray-800 tracking-tight"
            >
              {{ data.bit.title }}
            </h2>

            <div class="md:flex md:-mx-6">
              <div class="md:w-2/3 md:px-6">
                <div
                  class="md:flex md:flex-wrap text-normal items-center text-gray-600 leading-tight border-b mb-6  pb-4"
                >
                  <div class="md:w-1/2">
                    By
                    <a
                      href="#"
                      class="inline-block text-blue-600 hover:text-gray-800 sans-serif-2"
                      >{{ data.bit.user.name }}</a
                    >
                    <span class="text-gray-500 mx-1 text-sm">&bull;</span>
                    <span>{{ data.bit.created_at | formattedDate }}</span>
                  </div>
                  <div class="md:w-1/2 md:text-right flex justify-end">
                    <ApolloMutation
                      :mutation="
                        require('../../graphql/mutations/likeBit.gql').default
                      "
                      :variables="{
                        bitId: data.bit.id
                      }"
                      :update="updateCache"
                    >
                      <template v-slot="{ mutate, loading, error }">
                        <div class="flex items-center mr-16">
                          <loading-button
                            v-if="authenticated"
                            variant-type="outline"
                            class="items-center mr-4 shadow-sm w-8 h-8 rounded-full hover:border-gray-300"
                            @click="mutate()"
                            style="padding:0!important;"
                          >
                            <icon
                              name="heart"
                              class="w-6 h-6 flex-no-shrink"
                              :class="{
                                'text-red-600': data.bit.isLiked,
                                'text-gray-400': !data.bit.isLiked
                              }"
                            ></icon>
                          </loading-button>
                          <loading-button
                            v-else
                            variant-type="outline"
                            class="items-center mr-4 shadow-sm w-8 h-8 rounded-full hover:border-gray-300"
                            @click="setLoginModal"
                            style="padding:0!important;"
                          >
                            <icon
                              name="heart"
                              class="w-6 h-6 flex-no-shrink"
                              :class="{
                                'text-red-600': data.bit.isLiked,
                                'text-gray-400': !data.bit.isLiked
                              }"
                            ></icon>
                          </loading-button>
                          <heading size="large">{{
                            data.bit.likes_count
                          }}</heading>
                        </div>
                      </template>
                    </ApolloMutation>
                    <ApolloMutation
                      :mutation="
                        require('../../graphql/mutations/bookmarkBit.gql')
                          .default
                      "
                      :variables="{
                        bitId: data.bit.id
                      }"
                    >
                      <template v-slot="{ mutate, loading, error }">
                        <div class="flex items-center">
                          <loading-button
                            v-if="authenticated"
                            variant-type="outline"
                            class="items-center mr-4 shadow-sm w-8 h-8 rounded-full hover:border-gray-300"
                            @click="mutate()"
                            style="padding:0!important;"
                          >
                            <icon
                              name="bookmark"
                              class="w-6 h-6 flex-no-shrink"
                              :class="{
                                'text-green-600': data.bit.isBookmarked,
                                'text-gray-400': !data.bit.isBookmarked
                              }"
                            ></icon>
                          </loading-button>
                          <loading-button
                            v-else
                            variant-type="outline"
                            class="items-center mr-4 shadow-sm w-8 h-8 rounded-full hover:border-gray-300"
                            @click="setLoginModal"
                            style="padding:0!important;"
                          >
                            <icon
                              name="bookmark"
                              class="w-6 h-6 flex-no-shrink"
                              :class="{
                                'text-green-600': data.bit.isBookmarked,
                                'text-gray-400': !data.bit.isBookmarked
                              }"
                            ></icon>
                          </loading-button>
                          <heading size="large">{{
                            data.bit.bookmarks_count
                          }}</heading>
                        </div>
                      </template>
                    </ApolloMutation>
                    <!-- <span>Share on:</span>
										<a
											href="#"
											class="sans-serif-3 italic text-blue-600 hover:text-blue-500 inline-block"
										>Twitter</a> -->
                  </div>
                </div>

                <div class="mb-10 md:pl-10">
                  <markdown-content
                    :markdown="data.bit.snippet"
                  ></markdown-content>
                </div>
              </div>
              <div class="md:w-1/3 md:px-6">
                <ApolloQuery
                  :query="
                    require('../../graphql/queries/topSnippets.gql').default
                  "
                  fetchPolicy="no-cache"
                >
                  <template v-slot="{ result: { loading, error, data } }">
                    <div
                      class="border-t pt-1 border-gray-800 mt-6 md:mt-32 lg:mt-64"
                    >
                      <h2
                        class="mb-4 border-t-8 border-gray-800 py-4 leading-none text-2xl md:text-3xl font-semibold tracking-wide uppercase sans-serif text-gray-800"
                      >
                        Top 5 Snippets
                      </h2>
                    </div>
                    <div v-if="isLoading" class="loading apollo">
                      Loading...
                    </div>

                    <template v-else-if="data" class="result apollo">
                      <top-snippet :snippets="data.topSnippets"></top-snippet>
                    </template>
                  </template>
                </ApolloQuery>
              </div>
            </div>
          </template>
        </template>
      </ApolloQuery>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Icon from "@/components/ui/Icon";
import Heading from "@/components/ui/Heading";
import LoadingButton from "@/components/ui/LoadingButton";
import MarkdownContent from "@/components/MarkdownContent";
import gql from "graphql-tag";

import TopSnippet from "@/components/snippets/TopList";

export default {
  metaInfo() {
    return { title: this.title, titleTemplate: "%s | Bit Magazine" };
  },
  components: {
    Heading,
    Icon,
    MarkdownContent,
    LoadingButton,
    TopSnippet
  },

  data() {
    return {
      title: "Loading..."
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
      //graphql automatically update the cache for you
      return;
    },
    ...mapActions({
      setLoginModal: "setLoginModal"
    }),

    onResult({ data: { bit } }) {
      this.title = bit.title;
    }

    // updateBookmarkCache(store, { data: { user } }) {
    // 	const query = {
    // 		query: gql`
    // 			query getBookmarksOfCurrentUser($page: Int!) {
    // 				bookmarks(first: 10, page: $page) {
    // 					data {
    // 						id
    // 						uuid
    // 						slug
    // 						title
    // 						created_at
    // 						likes_count
    // 						tags
    // 						user {
    // 							id
    // 							name
    // 							email
    // 						}
    // 					}
    // 					paginatorInfo {
    // 						lastPage
    // 						perPage
    // 						currentPage
    // 						hasMorePages
    // 						total
    // 					}
    // 				}
    // 			}
    // 		`,
    // 		variables: {
    // 			page: 1
    // 		}
    // 	};

    // 	const data = store.readQuery(query);
    // 	console.log(data);
    // 	// Mutate cache result
    // 	// data.user.bits.data.unshift(createBit);
    // 	// data.user.bits.paginatorInfo.total++;
    // }
  },

  apollo: {}
};
</script>

<style>
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
  @apply text-xl text-gray-700 font-bold leading-tight tracking-tight mb-2;
}

.markdown-content p,
.markdown-content ul {
  @apply text-gray-600 font-normal mb-4 leading-relaxed;
}

.markdown-content ul,
.markdown-content ol {
  @apply pl-4;
}

.markdown-content ul {
  @apply list-disc;
}

.markdown-content ol {
  @apply list-decimal;
}
</style>
