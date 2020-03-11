<template>
  <div id="app" class="flex flex-col min-h-screen">
    <the-navigation />

    <div class="px-4 py-4 flex-1">
      <transition name="slide" mode="out-in">
        <router-view />
      </transition>
    </div>

    <div class="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- <div class="border-t border-gray-200"> -->
      <div class="py-8 text-gray-700">
        &copy; 2020 Morsel. All Rights Reserved
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";

export default {
  name: "app",

  components: {
    TheNavigation
  }
};
</script>

<style>
#app {
  font-family: "Barlow", Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
