<template>
	<component
		:is="tag"
		class="shadow h-full bg-white overflow-hidden w-full block"
		:class="roundedClass"
		:href="to"
	>
		<div
			class="card-header border-0 flex items-center justify-between px-8 py-3 bg-gray-100"
			v-if="withHeader"
		>
			<div class="text-truncate">
				<slot name="header"></slot>
			</div>
			<div>
				<slot name="header-action"></slot>
			</div>
		</div>

		<div :class="bodyClass">
			<slot />
		</div>

		<div
			class="px-8 py-3 bg-gray-100"
			v-if="withFooter"
		>
			<slot name="footer"></slot>
		</div>
	</component>
</template>

<script>
export default {
	name: "Card",

	props: {
		withHeader: {
			type: Boolean,
			default: false
		},
		withFooter: {
			type: Boolean,
			default: false
		},
		isPadding: {
			type: Boolean,
			default: true
		},
		to: {
			type: String
		},
		tag: {
			type: String,
			default: "div"
		},
		rounded: {
			type: String,
			default: "rounded-lg"
		}
	},

	computed: {
		bodyClass() {
			return {
				"px-8 py-6": this.isPadding === true
			};
		},
		roundedClass() {
			let rounded = null;
			switch (this.rounded) {
				case "small":
					rounded = "rounded-sm";
					break;
				case "medium":
					rounded = "rounded-md";
					break;
				case "large":
					rounded = "rounded-lg";
					break;
				case "full":
					rounded = "rounded-full";
					break;
				default:
					rounded = this.rounded;
					break;
			}
			return rounded;
		}
	}
};
</script>
