<template>
	<div class="relative">
		<div @click="toggle">
			<slot name="trigger"></slot>
		</div>

		<button
			v-if="isOpen"
			@click="isOpen = false"
			type="button"
			class="z-30 block fixed inset-0 w-full h-full cursor-default"
		></button>

		<transition
			enter-active-class="transition-all ease-out duration-100"
			leave-active-class="transition-all ease-out duration-75"
			enter-class="opacity-0 scale-75"
			enter-to-class="opacity-100 scale-100"
			leave-class="opacity-100 scale-100"
			leave-to-class="opacity-0 scale-75"
		>
			<div
				v-if="isOpen"
				class="absolute z-40 w-48 right-0 rounded-lg border border-gray-100 shadow-md mt-2 -mr-1"
			>
				<slot name="dropdown"></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false
		};
	},

	mounted() {
		const onEscape = e => {
			if (!this.isOpen || e.key !== "Escape") {
				return;
			}
			this.isOpen = false;
		};
		document.addEventListener("keydown", onEscape);
		this.$on("hook:destroyed", () => {
			document.removeEventListener("keydown", onEscape);
		});
	},

	methods: {
		toggle() {
			this.isOpen = !this.isOpen;
		}
	}
};
</script>