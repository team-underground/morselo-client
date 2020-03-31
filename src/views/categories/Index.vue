<template>
	<div>
		<div class="max-w-xl mx-auto px-4 mt-10">
			<ApolloQuery :query="require('../../graphql/queries/categories.gql').default">
				<template v-slot="{ result: { error, data, loading }, isLoading }">
					<div
						v-if="isLoading"
						class="loading apollo"
					>
						<div class="flex flex-wrap -mx-4">
							<div
								class="w-full px-4 w-full rounded flex mb-10 h-16 bg-gray-300"
								v-for="i in [1,2,3,4,5,6,7,8,9,10]"
								:key="i"
							></div>
						</div>
					</div>

					<template
						v-if="data"
						class="result apollo"
					>
						<!-- <heading size="large" class="mb-2">Categories</heading> -->
						<div class="flex flex-wrap -mx-4">
							<router-link
								class="italic block text-gray-600 hover:text-blue-500 w-full px-4 w-full rounded-sm bg-white overflow-hidden px-8 py-2 flex sans-serif-3 mb-10 border-2 border-b-none border-gray-800 shadow-tag"
								v-for="(category, index) in data.categories"
								:key="index"
								:to="{
									name: 'categoryShow',
									params: {
										category: category.name
									}
								}"
							>
								<div class="flex items-center">
									<heading
										size="display"
										class="mb-1 md:mb-0 flex items-center"
									>
										<i
											class="text-gray-600 mr-6 colored"
											:class="category.icon"
										>
										</i>
										{{ category.name }}</heading>
								</div>
							</router-link>
						</div>
					</template>
				</template>
			</ApolloQuery>
		</div>
	</div>
</template>

<script>
import { Heading } from "septemberui";

export default {
	components: {
		Heading
	}
};
</script>
