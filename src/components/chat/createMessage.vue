<template>
  <v-row>
    <v-text-field
      v-model="newMessage"
      placeholder="Enter your message"
      solo
      v-on:keyup.enter="createMessage"
    ></v-text-field>
    <v-btn
      color="primary"
      large
      @click="createMessage"
    >Send to {{currentChannel}}</v-btn><br>
  </v-row>

</template>
<script>
import store from "@/store/index";
export default {
  name: "createMessage",
  data() {
    return {
      newMessage: null,
    };
  },
  methods: {
    createMessage() {
      store.dispatch('chat/onCreateMessage', this.newMessage);
      this.newMessage = null;
    }
  },
  computed: {
    currentChannel() {
      return store.getters["chat/currentChannel"];
    }
  }
};
</script>