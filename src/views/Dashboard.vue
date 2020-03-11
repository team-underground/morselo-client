<template>
	<div>
		<container-center>
			<card class="mb-8 relative">
				<heading size="heading2" tag="h1">
					<span class="font-normal text-gray-600">Howdy!</span>
					{{ user.name }}
				</heading>

				<div class="flex justify-between mt-4 md:mt-10">
					<div>
						<heading size="small-caps" class="block">Total Snippets</heading>
						<heading size="heading2">27</heading>
					</div>
					<div>
						<heading size="small-caps" class="block">Followers</heading>
						<heading size="heading2">20</heading>
					</div>
					<div>
						<heading size="small-caps" class="block">Following</heading>
						<heading size="heading2">100</heading>
					</div>
					<div>
						<heading size="small-caps" class="block">Bookmarked</heading>
						<heading size="heading2">100</heading>
					</div>
				</div>

				<div class="h-24 grid-blue absolute top-0 right-0 w-24 -mt-4 mr-2"></div>
			</card>

			<card>
				<img
					src="https://quickchart.io/chart?width=1000&amp;height=400&amp;c={type:'bar',data:{labels:['January','February','March','April', 'May', 'June', 'July'], datasets:[{label:'Snippets', backgroundColor: 'rgb(66, 153, 225)', data:[50,60,70,180,190, 20, 35]}]}}"
					class="img-fluid"
				/>
			</card>
		</container-center>
	</div>
</template>

<script>
import Heading from "@/components/ui/Heading";
import ContainerCenter from "@/components/ui/ContainerCenter";
import Card from "@/components/ui/Card";

import { mapGetters } from "vuex";

export default {
	components: {
		Heading,
		ContainerCenter,
		Card
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated",
			user: "auth/user"
		})
	}
};
</script>
 