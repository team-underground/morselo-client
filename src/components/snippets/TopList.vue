<template>
	<div>
		<div
			class="flex py-3 border-b"
			v-for="(snippet, index) in snippets"
			:key="snippet.id"
		>
			<div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 text-gray-700 mr-3 flex-shrink-0 flex items-center justify-center font-semibold sans-serif-3 text-xl">
				{{ index + 1 }}
			</div>
			<div>
				<router-link
					:to="{
            name: 'snippetsShow',
            params: {
              id: snippet.slug
            }
          }"
					class="leading-tight block text-normal sm:text-xl text-gray-800 hover:text-blue-600 sans-serif-3"
				>{{ snippet.title }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["snippets"]
};
</script>
