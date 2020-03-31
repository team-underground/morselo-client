<template>
  <div class="w-full px-4 flex">
    <div class="py-6 flex flex-col w-full" :class="{ 'border-b': this.border }">
      <div class="flex mb-2 flex-wrap">
        <tag v-for="tag in snippet.tags" :tag="tag" :key="tag"></tag>
      </div>
      <div>
        <router-link
          :to="{
            name: 'snippetsShow',
            params: {
              id: snippet.slug
            }
          }"
          class="leading-tight inline-block text-gray-800 hover:text-blue-600 sans-serif-3 mb-2 flex-1"
          :class="titleSizeClass"
          style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
        >
          {{ snippet.title }}
        </router-link>
      </div>

      <div
        class="flex flex-wrap text-normal items-center text-gray-600 leading-tight"
      >
        By
        <a
          href="#"
          class="leading-tight ml-1 text-sm inline-block text-blue-600 hover:text-gray-800 sans-serif-2"
          >{{ snippet.user.name }}</a
        >
        <span class="text-gray-500 mx-3 text-sm">&bull;</span>
        <span class="text-sm">{{ snippet.created_at | formattedDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from "@/components/snippets/Tag";
import { formattedDate } from "@/filters";
export default {
  props: {
    snippet: {
      type: Object
    },
    titleSize: {
      type: String,
      default: "normal"
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Tag
  },
  computed: {
    titleSizeClass() {
      return {
        "text-xl md:text-2xl": this.titleSize == "normal",
        "text-2xl sm:text-3xl md:text-5xl": this.titleSize == "large"
      };
    }
  }
};
</script>
