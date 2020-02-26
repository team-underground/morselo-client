<template>
	<div id="app" class="flex flex-col min-h-screen">
		<the-navigation />

		<div class="px-4 py-10 flex-1">
			<router-view />
		</div>

		<div class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="border-t border-gray-200">
				<div class="py-8 text-gray-700">&copy; 2020 Vue-Bits</div>
			</div>
		</div>
	</div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";

export default {
	name: "app",

	components: {
		TheNavigation
	}
};
</script>

<style>
#app {
	/* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
