<template>
	<div class="sm:px-6 lg:px-4 h-full flex flex-col justify-center items-center min-h-full">
		<heading
			size="display2"
			class="sans-serif mb-4"
		>404</heading>
		<heading
			size="heading"
			class="sans-serif-2 mb-4"
		>The page you are looking for couldn't be found</heading>
		<link-to to="/">Go to Home</link-to>

	</div>
</template>

<script	>
import { Heading, LinkTo } from "septemberui";
export default {
	components: {
		Heading,
		LinkTo
	}
};
</script>