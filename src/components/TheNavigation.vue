<template>
  <div>
    <div class="border-b shadow-sm">
      <div class="max-w-6xl mx-auto md:pt-8 px-4">
        <div
          class="flex flex-1 items-end border-b-4 border-gray-800 justify-between py-4 md:py-6"
        >
          <div>
            <router-link
              to="/"
              exact-active-class=""
              class="text-xl md:text-4xl sans-serif-3 text-gray-800 font-bold uppercase tracking-tight"
            >
              Morselo</router-link
            >
            <div class="leading-tight border-t-2 relative">
              <div
                class="text-xs md:text-base sans-serif-2 text-gray-600 absolute top-0 right-0 -mt-2 md:-mt-3 bg-white pl-4"
              >
                daily code excerpts
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end">
            <template v-if="authenticated">
              <router-link
                tag="button"
                :to="{
                  name: 'snippetsNew'
                }"
                exact-active-class=""
                class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-sm px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-12 hover:opacity-75 shadow-sm sans-serif"
                >Create New Snippet</router-link
              >
              <dropdown>
                <template #trigger>
                  <button
                    type="button"
                    class="flex items-center focus:outline-none focus:shadow-outline rounded-full"
                  >
                    <img
                      :src="user.avatar"
                      alt="user"
                      class="h-8 w-8 rounded-full"
                    />
                  </button>
                </template>
                <template #dropdown>
                  <div
                    class="rounded-md bg-white shadow-xs overflow-hidden py-1 transition duration-300 ease-in-out"
                  >
                    <div class="truncate mb-2 px-4 py-1">
                      <span class="text-sm text-gray-500">Logged in as</span>
                      <div class="text-gray-700 font-medium text-truncate">
                        {{ user.name }}
                      </div>
                    </div>
                    <div class="border-t border-gray-100 my-1"></div>
                    <a
                      class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                      href="mailto:abhisheksarmah660@gmail.com"
                      >Help & Support</a
                    >
                    <a
                      @click.prevent="logout()"
                      class="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                      href="#"
                      >Logout</a
                    >
                  </div>
                </template>
              </dropdown>
            </template>
            <template v-else>
              <a
                :href="githubUrl"
                class="inline-flex align-items-center justify-center font-semibold focus:outline-none focus:shadow-outline rounded-sm px-4 py-3 border border-gray-800 text-white bg-gray-800 mr-3 hover:opacity-75 shadow-sm"
                >Login with Github</a
              >
              <!-- <a
								href="#"
								class="text-sm font-semibold inline-block px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
							>Login with Github</a> -->
            </template>
            <!-- <a
							href="#"
							class="text-xs font-semibold inline-block px-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>Twitter</a>
						<div
							class="inline-block mx-1 h-5 w-1 leading-none border-r-2"
							style="transform: rotate(20deg)"
						></div>
						<a
							href="#"
							class="text-xs font-semibold inline-block px-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
						>Sign
							in</a> -->
          </div>
        </div>
        <div class="h-1 border-b"></div>
        <div class="overflow-x-auto border-b -m-px">
          <div class="flex items-center flex-1">
            <router-link
              :to="{
                name: 'feedsIndex'
              }"
              class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
              >Feeds</router-link
            >
            <router-link
              :to="{ name: 'AllCategory' }"
              class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
              >Categories</router-link
            >

            <template v-if="authenticated">
              <router-link
                :to="{ name: 'Dashboard' }"
                class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
                >Dashboard</router-link
              >
              <router-link
                :to="{
                  name: 'snippetsIndex'
                }"
                class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
                >My Snippets</router-link
              >
              <router-link
                :to="{ name: 'Bookmarks' }"
                class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
                >Bookmarks</router-link
              >
            </template>

            <router-link
              :to="{ name: 'about' }"
              class="mr-4 md:mr-8 text-sm font-semibold border-b border-transparent inline-block whitespace-no-wrap px-2 py-2 text-gray-600 hover:text-gray-800 uppercase tracking-wide"
              >About</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Dropdown from "@/components/ui/Dropdown";

export default {
  props: ["githubUrl"],

  components: {
    Dropdown
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },

  data() {
    return {
      showMenu: false
    };
  },

  methods: {
    ...mapActions({
      logoutAction: "auth/logout"
    }),

    logout() {
      this.logoutAction().then(() => {
        if (this.$router.currentRoute.name !== "feedsIndex") {
          this.$router.replace({
            name: "feedsIndex"
          });
        }
      });
    }
  }
};
</script>
