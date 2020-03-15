<template>
	<div>
		<container-center>
			<heading
				size="heading"
				class="mb-4"
			>Create a new snippet</heading>

			<div class="mb-10">
				<ApolloMutation
					:mutation="require('../../graphql/mutations/createBit.gql').default"
					:variables="{
            title: this.bit.title,
            snippet: this.bit.snippet,
            tags: this.bit.tags.map((tag) => tag.value)
          }"
					@done="onDone"
					@error="onError"
				>
					<template v-slot="{ mutate, loading, error, gqlError }">
						<div class="mb-4">
							<text-input
								label="Title"
								v-model="bit.title"
								placeholder="Give some title"
								:errors="errors['title']"
								@keydown="delete errors['title']"
							/>
						</div>

						<div class="mb-4">
							<label class="form-label block mb-1 font-semibold text-gray-700">Tags</label>
							<tags-input-with-search
								elementId="tags-input-search"
								:existing-tags="categories"
								v-model="bit.tags"
								typeahead
								typeahead-style="dropdown"
								:typeahead-hide-discard="true"
								:only-existing-tags="true"
								:limit="3"
								:errors="errors['tags']"
								@keydown="delete errors['tags']"
							></tags-input-with-search>
						</div>

						<div
							class="mb-4"
							:class="{
                'simplemde-haserror':
                  error &&
                  gqlError.extensions.validation.hasOwnProperty('snippet')
              }"
						>
							<label class="form-label block font-semibold text-gray-700">Snippet Details</label>
							<vue-simplemde
								v-model="bit.snippet"
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
							:disabled="loading"
							@click="mutate()"
							:class="{ 'base-spinner': loading }"
						>Save Snippet</loading-button>
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
import { ADD_BIT_MUTATION } from "../../graphql/queries/bitQueries";
import { mapGetters, mapActions } from "vuex";

import TextInput from "@/components/ui/TextInput";
import LoadingButton from "@/components/ui/LoadingButton";
import Heading from "@/components/ui/Heading";
import ContainerCenter from "@/components/ui/ContainerCenter";
import TagsInputWithSearch from "@/components/ui/TagsInputWithSearch";

export default {
	components: {
		VueSimplemde,
		TextInput,
		LoadingButton,
		ContainerCenter,
		TagsInputWithSearch,
		Heading
	},

	data() {
		return {
			bit: {
				title: "",
				snippet: "",
				tags: []
			}
		};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user",
			errors: "errors"
		})
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
				return data.categories.map(el => {
					return {
						value: el.name,
						key: parseInt(el.id)
					};
				});
			}
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
		},

		showError(field) {
			if (field.length) return field[0];
			return "";
		},

		deleteError(error) {
			alert(error);
			error = [];
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
