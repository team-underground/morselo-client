<template>
	<router-link
		:to="{
            name: 'categoryShow',
            params: {
                category: tag
            }
        }"
		class="leading-tight mr-4 text-sm font-semibold border-b border-blue-600 inline-block text-blue-600 hover:text-gray-800 uppercase tracking-wide"
	>#{{tag}}</router-link>
</template>

<script>
export default {
	name: "Tag",
	props: ["tag"]
};
</script> 