<template>
	<div class="max-w-4xl mx-auto">
		<div class="mb-10">
			<ApolloMutation
				:mutation="require('../../graphql/mutations/createBit.gql').default"
				:variables="{
          title: this.bit.title,
					snippet: this.bit.snippet
        }"
				@done="onDone"
			>
				<template v-slot="{ mutate, loading, error, gqlError }">
					<div class="mb-4">
						<text-input
							label="Title"
							v-model="bit.title"
							placeholder="Give some title"
							@keydown="error ? delete gqlError.extensions.validation.title : ''"
							:errors="
                error && gqlError.extensions.validation.hasOwnProperty('title') && gqlError.extensions.validation.title.length ? gqlError.extensions.validation.title : []
              "
						/>
					</div>

					<div
						class="mb-4"
						:class="{ 'simplemde-haserror' : error && gqlError.extensions.validation.hasOwnProperty('snippet')}"
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
							v-if="error && gqlError.extensions.validation.hasOwnProperty('snippet') && gqlError.extensions.validation.snippet.length"
						>{{ showError(gqlError.extensions.validation.snippet) }}</div>
					</div>

					<loading-button
						:disabled="loading"
						@click="mutate()"
						:class="{'base-spinner': loading }"
					>Save Snippet</loading-button>

					<!-- <p v-if="error">{{ error }}</p> -->
					<!-- <p v-if="error">{{ gqlError.extensions.validation }}</p> -->
				</template>
			</ApolloMutation>
		</div>
	</div>
</template>

<script>
import hljs from "highlight.js";
window.hljs = hljs;

import VueSimplemde from "vue-simplemde";
import { ADD_BIT_MUTATION } from "../../graphql/queries/bitQueries";
import { mapGetters } from "vuex";

import TextInput from "@/components/ui/TextInput";
import LoadingButton from "@/components/ui/LoadingButton";

export default {
	components: {
		VueSimplemde,
		TextInput,
		LoadingButton
	},

	data() {
		return {
			bit: {
				title: "",
				snippet: ""
			}
		};
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			userData: "auth/user"
		})
	},

	apollo: {},

	methods: {
		onDone() {
			this.$router.push("/snippets");
		},

		showError(field) {
			if (field.length) return field[0];
			return "";
		},

		deleteError(error) {
			alert(error);
			error = [];
		}

		// createSnippet() {
		// 	this.$apollo
		// 		.mutate({
		// 			mutation: ADD_BIT_MUTATION,
		// 			variables: {
		// 				title: this.bit.title,
		// 				snippet: this.bit.snippet
		// 			}
		// 		})
		// 		.then(() => {
		// 			this.$router.push("/snippets");
		// 		})
		// 		.catch(() => {});
		// }
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
