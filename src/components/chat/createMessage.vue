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
import fb from "@/firebase/init";
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
      if (this.newMessage) {
        fb.firestore()
          .collection(this.currentChannel)
          .add({
            message: this.newMessage,
            name: store.getters["users/user"].displayName,
            timestamp: Date.now()
          })
          .then(() => {
            console.log("sent");
          })
          .catch(err => {
            console.log(err);
          });
        this.newMessage = null;
      }
    }
  },
  computed: {
    currentChannel() {
      return store.getters["chat/currentChannel"];
    }
  }
};
</script>