<template>
  <div>
    <container-center>
      <div class="mb-10">
        <ApolloMutation
          :mutation="require('../../graphql/mutations/editBit.gql').default"
          :variables="{
            id: this.singleBit.id,
            title: this.singleBit.title,
            snippet: this.singleBit.snippet,
            tags: this.formattedTags
          }"
          @done="onDone"
          @error="onError"
        >
          <template v-slot="{ mutate, loading }">
            <div class="mb-4">
              <text-input
                label="Title"
                v-model="singleBit.title"
                placeholder="Give some title"
                :errors="errors['title']"
                @keydown="delete errors['title']"
              />
            </div>
            <label class="form-label block mb-1 font-semibold text-gray-700"
              >Tags</label
            >
            <tags-input-with-search
              elementId="tags-input-search"
              :existing-tags="categories"
              v-model="singleBit.tags"
              typeahead
              typeahead-style="dropdown"
              :typeahead-hide-discard="true"
              :only-existing-tags="true"
              :limit="3"
              class="mb-4"
              :errors="errors['tags']"
              @keydown.native="delete errors['tags']"
            ></tags-input-with-search>

            <div
              class="mb-4"
              :class="{
                'simplemde-haserror':
                  errors && errors['snippet'] && errors['snippet'].length
              }"
            >
              <label class="form-label block font-semibold text-gray-700"
                >Snippet Details</label
              >
              <vue-simplemde
                v-model="singleBit.snippet"
                ref="markdownEditor"
                :highlight="true"
                :configs="{
                  hideIcons: ['guide', 'heading', 'table', 'quote', 'image'],
                  showIcons: ['heading-2']
                }"
              />
              <div
                class="text-red-600 text-sm -mt-2"
                v-if="errors && errors['snippet'] && errors['snippet'].length"
              >
                {{ errors["snippet"][0] }}
              </div>
            </div>

            <loading-button
              ref="submitButton"
              :disabled="loading"
              @click="mutate()"
              :class="{ 'base-spinner': loading }"
              >Save Changes</loading-button
            >
          </template>
        </ApolloMutation>
      </div>
    </container-center>
  </div>
</template>

<script>
import hljs from "highlight.js";
window.hljs = hljs;
import gql from "graphql-tag";
import VueSimplemde from "vue-simplemde";
import { mapGetters, mapActions } from "vuex";

import TextInput from "@/components/ui/TextInput";
import LoadingButton from "@/components/ui/LoadingButton";
import ContainerCenter from "@/components/ui/ContainerCenter";
import TagsInputWithSearch from "@/components/ui/TagsInputWithSearch";

export default {
  metaInfo() {
    return {
      title: this.singleBit.title || "Loading...",
      titleTemplate: "%s | Bit Magazine"
    };
  },
  components: {
    VueSimplemde,
    TextInput,
    LoadingButton,
    ContainerCenter,
    TagsInputWithSearch
  },

  data() {
    return {
      singleBit: {}
    };
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      userData: "auth/user",
      errors: "errors"
    }),
    formattedTags() {
      if (typeof this.singleBit.tags !== "undefined") {
        return this.singleBit.tags.map(tag => tag.value);
      } else {
        return [];
      }
    }
  },

  apollo: {
    categories: {
      query: gql`
        query {
          categories {
            id
            name
          }
        }
      `,
      update: data => {
        let categories = data.categories;
        return categories.map(el => {
          return {
            value: el.name,
            key: parseInt(el.id)
          };
        });
      }
    },

    singleBit() {
      return {
        query: gql`
          query singleBit($id: String!) {
            bit(slug: $id) {
              id
              title
              snippet
              tags
            }
          }
        `,
        variables: {
          id: this.$route.params.id
        },
        fetchPolicy: "no-cache",
        update: data => {
          let formattedTags = this.categories.filter(cat =>
            data.bit.tags.includes(cat.value)
          );
          data.bit.tags = formattedTags;
          return data.bit;
        }
      };
    }
  },
  methods: {
    ...mapActions({
      setErrors: "setErrors"
    }),

    onDone() {
      this.$router.push("/snippets");
    },

    onError({ graphQLErrors }) {
      let errorCategory = graphQLErrors[0].extensions.category;
      if (errorCategory == "validation") {
        this.setErrors(graphQLErrors[0].extensions.validation);
      }
      if (errorCategory == "authorization") {
        this.$snack.danger({
          text: graphQLErrors[0].message,
          button: "Ok",
          action: this.clickAction
        });
      }
    }
  }
};
</script>

<style>
@import "~simplemde/dist/simplemde.min.css";
@import "~highlight.js/styles/tomorrow.css";
.editor-toolbar {
  border: 0;
  padding: 0;
}
.CodeMirror {
  border-radius: 0.5rem;
  border-color: #e2e8f0;
}
.CodeMirror-focused {
  @apply .shadow-outline .border-blue-100;
}
.simplemde-haserror .CodeMirror {
  @apply .border-red-400;
}
</style>
