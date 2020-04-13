<template>
	<div>
		<container-center>
			<heading size="display" class="sans-serif-3 mb-8">Privacy Policy</heading> 

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Effective April 01, 2020
			</p> 

			<Heading size="heading2" class="sans-serif-3 mb-8">What information Morselo collects and Why</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				In order for you to create an account on Morselo and use our Services, we need to collect and process certain information. Depending on your use of the Services, that may include:

			</p>


			<list
				:lists="collectedInformation"
				unorderedListColor="text-gray-500"
				list-css="text-gray-800 md:text-lg items-start mb-4"
				class="mb-8"
			></list>

			<Heading size="heading2" class="sans-serif-3 mb-8">Information Disclosure</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				We do not share, sell, rent, or trade User Personal Information with third parties for commercial purposes.
			</p>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				We may share User Personal Information with a limited number of third party vendors who process it on our behalf to provide or improve our service, and who have agreed to privacy restrictions similar to our own Privacy Statement. Our third party vendors are listed below.
			</p>
			
			<Heading size="heading2" class="sans-serif-3 mb-8">Third Party Vendors</heading>


			<Heading size="heading" class="sans-serif-3 mb-2">We may share your account information with third parties in some circumstances, including:</heading>

			<list
				:lists="shareAccountInformation"
				unorderedListColor="text-gray-500"
				list-css="text-gray-800 md:text-lg items-start mb-4"
				class="mb-8"
			></list>

			<Heading size="heading" class="sans-serif-3 mb-2">Data Storage</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Morselo uses third-party vendors and hosting partners for hardware, software, networking, storage, and related technology we need to run Morselo. By using Morselo Services, you authorize Morselo to transfer, store, and use your information in the India and any other country where we operate. All service providers and third-party vendors are required to meet our data protection standards.
			</p>

			<Heading size="heading" class="sans-serif-3 mb-2">Tracking & Cookies</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				We use browser cookies and similar technologies to recognize you when you return to our Services. Third-party vendors may also use cookies for various reasons. 
			</p>
<!--
			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Morselo uses a specific cookie in order to facilitate the use of Google Universal Analytics for users who have visited the Applications or the Platforms. We do this only to better understand how you use the Website and the other Services, with a view to offering improvements for all Morselo users; and to tailor our business and marketing activities accordingly, both generally and specifically to you. Google Analytics cookies do not provide Morselo with any Personal Information.You can prevent Google Analytics from recognizing you on return visits to this site by disabling cookies on your browser.
			</p>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				You may opt-out of this feature by installing the Google Analytics Opt-out Browser Add-on, by setting your web browser to refuse cookies, or by setting your browser to alert you when cookies are being sent. If you do so, note that some parts of the Site may not function properly.

			</p>
-->
			<Heading size="heading" class="sans-serif-3 mb-2">Data Security</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				We use encryption (HTTPS/TLS) to protect data transmitted to and from our site. However, no data transmission over the Internet is 100% secure, so we can’t guarantee security. You use the Service at your own risk, and you’re responsible for taking reasonable measures to secure your account.
			</p>

			<Heading size="heading" class="sans-serif-3 mb-2">Administrative Emails from Morselo</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				Sometimes we’ll send you emails about your account, service changes or new policies. You can’t opt out of this type of “transactional” email (unless you delete your account).
			</p>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				When you interact with a transactional email sent from Morselo (such as opening an email or clicking on a particular link in an email), we may receive information about that interaction.
			</p> 

			<Heading size="heading" class="sans-serif-3 mb-2">Deleting Your Personal Information</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8"> 
				You may request deletion of your personal information and account by contacting us.
			</p>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				To protect information from accidental or malicious destruction, we may maintain residual copies for a brief time period. But, if you delete your account, your information and content will be unrecoverable after that time.
			</p>

			<Heading size="heading" class="sans-serif-3 mb-2">Business Transfers</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				If we are involved in a merger, acquisition, bankruptcy, reorganization or sale of assets such that your information would be transferred or become subject to a different privacy policy, we’ll notify you in advance of any such change.
			</p>

			<Heading size="heading" class="sans-serif-3 mb-2">Changes to this Policy</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				We reserve the right to revise this Privacy Policy at any time. If we change this Privacy Policy in the future, we will post the revised Privacy Policy and update the “Effective Date,” above, to reflect the date of the changes.
			</p>

			<Heading size="heading" class="sans-serif-3 mb-2">Questions</heading>

			<p class="block text-normal sm:text-xl text-gray-800 sans-serif-3 mb-8">
				If you have any questions about these Policy, please contact us.
			</p>

		</container-center>
	</div>
</template>

<script>
import ContainerCenter from "@/components/ui/ContainerCenter"; 
import { Heading, List } from "septemberui";
import { mapGetters } from "vuex";

export default {
	metaInfo: {
		title: "Privacy Policy",
		titleTemplate: "%s | Morselo"
	},
	components: {
		ContainerCenter,
		List, 
		Heading
	},

	computed: {
		...mapGetters({
			authenticated: "auth/authenticated"
		})
	},

	data() {
		return {
			collectedInformation: [
				"Communications you send to us (for example, when you ask for support, send us questions or comments, or report a problem).",
				"Information that you submit on or to Morselo in the form of reactions.",
				"The email address associated with your GitHub account, if you choose to sign up using your Github credentials. Morselo will also request permission to access additional information  when required(these permissions are governed by GitHub’s privacy policies and can be managed through your GitHub privacy settings). We never post anything to your GitHub without your permission."
			],
			shareAccountInformation: [
				"with your consent.",
				"to a service provider or partner who meets our data protection standards.",
				"for survey or research purposes, after aggregation, anonymization, or pseudonomization.",
				"when we have a good faith belief it is required by law, such as pursuant to a subpoena or other legal process.",
				"when we have a good faith belief that doing so will help prevent imminent harm to someone."
			]
		};
	}
};
</script>
