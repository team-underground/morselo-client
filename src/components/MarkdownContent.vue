<template>
	<div
		v-html="compiledMarkdown"
		class="markdown-content overflow-x-scroll"
	></div>
</template>

<script>
import marked, { Renderer } from "marked";
import highlightjs from "highlight.js";
import "highlight.js/styles/night-owl.css";

const escapeMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;"
};

function escapeForHTML(input) {
	return input.replace(/([&<>'"])/g, char => escapeMap[char]);
}

// Create your custom renderer.
const renderer = new Renderer();
renderer.code = (code, language) => {
	// Check whether the given language is valid for highlight.js.
	const validLang = !!(language && highlightjs.getLanguage(language));

	// Highlight only if the language is valid.
	// highlight.js escapes HTML in the code, but we need to escape by ourselves
	// when we don't use it.
	const highlighted = validLang
		? highlightjs.highlight(language, code).value
		: escapeForHTML(code);

	// Render the highlighted code with `hljs` class.
	return `<pre class="block overflow-x-auto"><code class="text-sm p-8 mb-5 hljs ${language}">${highlighted}</code></pre>`;
};

// Set the renderer to marked.
marked.setOptions({ renderer });

export default {
	computed: {
		compiledMarkdown() {
			return marked(this.markdown, {
				sanitize: true,
				highlight(md) {
					return highlightjs.highlightAuto(md).value;
				}
			});
		}
	},

	props: ["markdown"]
};
</script>

<style scoped>
/* ::v-deep pre {
	@apply px-8 py-4 -mx-8 my-8 overflow-x-auto text-sm;
} */
</style>