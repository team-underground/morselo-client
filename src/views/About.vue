<template>
	<div>
		<container-center>
			<heading size="display" class="sans-serif-3 mb-8">About Us</heading> 

			<h2 class="mb-6 inline-block border-b-2 border-gray-500 py-1 leading-none text-2xl md:text-3xl font-semibold tracking-wider uppercase sans-serif text-gray-500">
				Hello! Dev
			</h2>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
				Often searching for your valuable snippets or reusable functions in your previous projects is fraustating right? Sometimes it takes lot of times and efforts to find so. &#x1F624; Wait ...
			</p>
			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Morselo is a place you might be looking for. This is a platform where you could easily manage your snippets, code or notes without any hassle. Let the burden of managing and organising your snippet to Morselo, so that you could concentrate more on your productivity.
			</p>

			<Heading size="heading2" class="sans-serif-3 mb-8">The Team</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-4">
				Morselo project is initiated by <link-to to="https://github.com/abhisheksarmah">abhisheksarmah</link-to> &amp; <link-to to="https://github.com/mithicher">mithicher</link-to>
			</p>  
			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-4">
				Find out more contributors at Github.
			</p> 

			<list class="mb-8">
				<template v-if="projectContributors.length > 0">
					<li
						v-for="(list, listIdx) in projectContributors"
						:key="listIdx"  
						class="flex list-none list-style-ul text-gray-800 md:text-lg items-start mb-4"
					>
						<div class="w-8">
							<svg
								class="fill-current w-6 h-6 text-gray-500" 
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<path d="M12,2C6.486,2,2,6.486,2,12c0,5.514,4.486,10,10,10s10-4.486,10-10C22,6.486,17.514,2,12,2z M10.001,16.413l-3.713-3.705 L7.7,11.292l2.299,2.295l5.294-5.294l1.414,1.414L10.001,16.413z" />
							</svg>
						</div>
						<link-to :to="list.link" 
						>{{list.value}}</link-to>
					</li>
				</template>
			</list>

			<Heading size="heading2" class="sans-serif-3 mb-8">How to Contribute</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Our application is <link-to to="https://github.com/team-underground/morselo">open source</link-to>, meaning you can inspect every little detail of the code, or chip in yourself!. Contributions in the form of issues and pull requests are welcomed and encouraged.
			</p>

			<Heading size="heading2" class="sans-serif-3 mb-8">Support Us</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Love, what we do?
				<link-to
					to="https://www.paypal.me/abhisheksarmah/0usd"
					target="_blank"
				>Buy us a coffee.</link-to>
			</p>

			<!-- <div class="">
				<div class="bg-line-pattern-gray p-2">
					<div class="bg-white p-4 border-2">
						<h2 class="mb-8 inline-block border-b-2 border-gray-500 py-1 leading-none text-2xl font-semibold tracking-wider uppercase sans-serif text-gray-500">
							
						</h2>

						<div class="flex mb-4">
							<div>
								<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
									Our application is open source, meaning you can inspect every
									little detail of the code, or chip in yourself! We will soon
									accept PR's.
								</p>
								<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
									We are continously improving the platform for serving you
									better.
								</p>
								<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-2">
									Love, what we do?
									<link-to
										to="https://www.paypal.me/abhisheksarmah/50"
										target="_blank"
									>Buy us a coffee.</link-to>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div> -->
		</container-center>
	</div>
</template>

<script>
import ContainerCenter from "@/components/ui/ContainerCenter"; 
import { LinkTo, Heading, List } from "septemberui";
import { mapGetters } from "vuex";

export default {
	metaInfo: {
		title: "About US", 
		titleTemplate: "%s | The Morselo Community"
	},
	components: {
		ContainerCenter,
		List,
		LinkTo,
		Heading
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated"
		})
	},

	data() {
		return {  
			projectContributors: [
				{
					"value": "Frontend Contribution",
					"link": "https://github.com/team-underground/morselo-client#credits"
				},
				{
					"value": "Backend Contribution",
					"link": "https://github.com/team-underground/morselo-server#credits"
				}
			]
		};
	}
};
</script>
