<template>
	<div v-html="compiledMarkdown" class="markdown-content"></div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

export default {
	computed: {
		compiledMarkdown() {
			return marked(this.markdown, {
				sanitize: true,
				highlight(md) {
					return hljs.highlightAuto(md).value;
				}
			});
		}
	},

	props: ["markdown"]
};
</script>

<style scoped>
::v-deep pre {
	@apply bg-gray-100 px-8 py-4 -mx-8 my-8 overflow-x-auto text-sm;
}
</style>