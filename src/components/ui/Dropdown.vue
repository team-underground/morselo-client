<template>
	<div class="relative">
		<div @click="toggle">
			<slot name="trigger"></slot>
		</div>

		<div :class="[ isOpen ? 'block' : 'hidden']">
			<div>
				<button
					@click="isOpen = false"
					type="button"
					class="z-30 block fixed inset-0 w-full h-full cursor-default"
				></button>
				<div class="absolute z-40 w-48 right-0 rounded-lg shadow-lg mt-2">
					<slot name="dropdown"></slot>
				</div>
			</div>
		</div>
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