<template>
  <v-container fluid>
    <v-card
      max-width="900"
      class="mx-auto"
      elevation="0"
      style="padding: 0"
    >

      <v-img
        v-if="loadFeed.imgURL"
        :src="loadFeed.imgURL"
        height="394"
      ></v-img>
      <v-img
        v-else
        src="https://i.pinimg.com/originals/1a/e0/90/1ae090fce667925b01954c2eb72308b6.gif"
      >
      </v-img>
      <v-card-title>
        {{loadFeed.title}}
      </v-card-title>

      <v-card-subtitle>
        Author -
        {{loadFeed.owner}}
      </v-card-subtitle>
      <v-card-text>
        {{loadFeed.description}}
      </v-card-text>

    </v-card>

  </v-container>
</template>


<script>
import store from "@/store/index";
export default {
  props: ["id"],
  computed: {
    loadFeed() {
      return store.getters["posts/loadFeed"](this.id);
    }
  }
};
</script>

<style>
.additional {
  padding: 13px;
}
</style>
