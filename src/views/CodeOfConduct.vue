<template>
	<div>
		<container-center>
			<heading size="display" class="sans-serif-3 mb-8">Code of Conduct</heading> 

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				All participants of The Morselo Community are expected to abide by our Code of Conduct, both online and during in-person events that are hosted and/or associated with Morselo.
			</p> 

			<Heading size="heading2" class="sans-serif-3 mb-8">Our Pledge</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				In the interest of fostering an open and welcoming environment, we as moderators of Morselo pledge to make participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

			</p> 

			<Heading size="heading2" class="sans-serif-3 mb-8">Our Standards</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Examples of behavior that contributes to creating a positive environment include:
			</p> 

			<list
				:lists="positiveBehaviours"
				unorderedListColor="text-gray-500"
				list-css="text-gray-800 md:text-lg items-start mb-4"
				class="mb-8"
			></list>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Examples of unacceptable behavior by participants include:
			</p>

			<list
				:lists="unacceptableBehaviours"
				unorderedListColor="text-gray-500"
				list-css="text-gray-800 md:text-lg items-start mb-4"
				class="mb-8"
			></list>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				We pledge to prioritize marginalized people’s safety over privileged people’s comfort. We will not act on complaints regarding:
			</p>

			<list
				:lists="noActComplaints"
				unorderedListColor="text-gray-500"
				list-css="text-gray-800 md:text-lg items-start mb-4"
				class="mb-8"
			></list>

			<Heading size="heading2" class="sans-serif-3 mb-8">Enforcement</heading>  

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Violations of the Code of Conduct may be reported by contacting the team. All reports will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances. Further details of specific enforcement policies may be posted separately.
			</p>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Moderators have the right and responsibility to remove comments or other contributions that are not aligned to this Code of Conduct, or to suspend temporarily or permanently any members for other behaviors that they deem inappropriate, threatening, offensive, or harmful.
			</p>

			<Heading size="heading2" class="sans-serif-3 mb-8">Attribution</heading>  

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				This Code of Conduct is adapted from:
			</p>

			<list class="mb-8">
				<template v-if="codeOfConductAdaption.length > 0">
					<li
						v-for="(list, listIdx) in codeOfConductAdaption"
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

		</container-center>
	</div>
</template>

<script>
import ContainerCenter from "@/components/ui/ContainerCenter"; 
import { Heading, List,LinkTo } from "septemberui"; 

export default {
	metaInfo: {
		title: "Code of Conduct",
		titleTemplate: "%s | Morselo"
	},
	components: {
		ContainerCenter,
		List,
		LinkTo,
		Heading
	}, 

	data() {
		return {
			positiveBehaviours: [
				"Using welcoming and inclusive language",
				"Being respectful of differing viewpoints and experiences",
				"Referring to people by their preferred pronouns and using gender-neutral pronouns when uncertain",
				"Gracefully accepting constructive criticism",
				"Focusing on what is best for the community",
				"Showing empathy towards other community members"
			],
			unacceptableBehaviours: [
				"The use of sexualized language or imagery and unwelcome sexual attention or advances",
				"Trolling, insulting/derogatory comments, and personal or political attacks",
				"Public or private harassment",
				"Publishing others' private information, such as a physical or electronic address, without explicit permission",
				"Other conduct which could reasonably be considered inappropriate in a professional setting",
				"Dismissing or attacking inclusion-oriented requests"
			],
			noActComplaints: [
				"‘Reverse’ -isms, including ‘reverse racism,’ ‘reverse sexism,’ and ‘cisphobia’",
				"Reasonable communication of boundaries, such as 'leave me alone,' 'go away,' or 'I’m not discussing this with you.'",
				"Someone’s refusal to explain or debate social justice concepts",
				"Criticisms of racist, sexist, cissexist, or otherwise oppressive behavior or assumptions"
			],
			codeOfConductAdaption: [
				{
					"value": "Contributor Covenant, version 1.4",
					"link": "http://contributor-covenant.org/version/1/4"
				},
				{
					"value": "Write/Speak/Code",
					"link": "http://www.writespeakcode.com/code-of-conduct.html"
				},
				{
					"value": "Geek Feminism",
					"link": "https://geekfeminism.org/about/code-of-conduct/"
				}
			]
		};
	}
};
</script>
