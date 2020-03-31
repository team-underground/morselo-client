<template>
  <div>
    <container-center>
      <card
        class="mb-8 relative block w-full rounded-sm bg-white sans-serif my-10 border-2 border-b-none border-gray-800 shadow-tag"
        rounded="small"
      >
        <heading size="heading2" tag="h1" class="sans-serif-3">
          <span class="font-normal text-gray-600">Howdy!</span>
          {{ user.name }}
        </heading>

        <div class="flex mt-4 md:mt-10">
          <div class="w-1/2">
            <heading size="small-caps" class="block sans-serif-2"
              >Total Snippets</heading
            >
            <heading size="heading2">{{ snippets_count }}</heading>
          </div>
          <div>
            <heading size="small-caps" class="block sans-serif-2"
              >Bookmarked</heading
            >
            <heading size="heading2">{{ bookmarks_count }}</heading>
          </div>
        </div>

        <div
          class="h-24 grid-blue absolute top-0 right-0 w-24 -mt-4 mr-2"
        ></div>
      </card>
      <heading size="heading" class="mb-4 sans-serif-3"
        >Monthly Contribution</heading
      >
      <card>
        <img
          id="monthlyContribution"
          src="https://quickchart.io/chart?width=1000&amp;height=400&amp;c={type:'bar',data:{labels:['January','February','March','April', 'May', 'June', 'July'], datasets:[{label:'Snippets', backgroundColor: 'rgb(66, 153, 225)', data:[50,60,70,180,190,20,35]}]}}"
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

  data() {
    return {
      data: [],
      snippets_count: 0,
      bookmarks_count: 0
    };
  },

  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
      token: "auth/token"
    })
  },

  created() {
    fetch("http://vue-bits-server.test/api/dashboard", {
      headers: {
        authorization: `Bearer ${this.token}`
      }
    })
      .then(response => response.json())
      .then(({ data, snippets_count, bookmarks_count }) => {
        this.data = data;
        this.snippets_count = snippets_count;
        this.bookmarks_count = bookmarks_count;
        document.getElementById(
          "monthlyContribution"
        ).src = `https://quickchart.io/chart?width=1000&height=400&c={type:'bar',data:{labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], datasets:[{label:'Snippets', backgroundColor: 'rgb(66, 153, 225)', data:[${this.data}]}]}}`;
      });
  }
};
</script>
