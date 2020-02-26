<template>
	<div>
		<div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 md:pt-24">
			<heading tag="h1" size="display2" class="mb-4">
				Organize
				<br />All Your Snippets
			</heading>

			<heading
				class="mb-5"
				size="medium"
			>Collect and organize valuable code snippets and access from anywhere</heading>

			<loading-button tag="a" to="/register">Sign up Free</loading-button>
		</div>
	</div>
</template>

<script>
import Heading from "@/components/ui/Heading";
import LoadingButton from "@/components/ui/LoadingButton";

export default {
	components: {
		Heading,
		LoadingButton
	}
};
</script>

