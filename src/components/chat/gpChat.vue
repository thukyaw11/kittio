<template>
  <v-card elevation="0">
    <v-card style="height: 600px">
      <v-row justify="space-around">

        <v-col cols="11">

          <v-sheet
            elevation="0"
            class="py-4 px-1"
          >

            <v-row>
              <v-chip-group
                mandatory
                active-class="primary--text"
              >
                <v-chip
                  v-for="channel in channels"
                  :key="channel"
                  @click="changeChannel(channel)"
                >
                  {{ channel }}
                </v-chip>
              </v-chip-group>
              <v-chip
                class="ma-2"
                color="red"
                text-color="white"
              >
                <v-avatar left>
                  <v-icon>add_circle</v-icon>
                </v-avatar>
                new channel
              </v-chip>
            </v-row>

          </v-sheet>
        </v-col>
      </v-row>

      <v-card-title style="margin-left: 20px">
        Chat message goes here .. in channel <b v-if="currentChannel">{{currentChannel}}</b>
        <b v-else>Default </b>
      </v-card-title>
      <div
        class="messages"
        v-chat-scroll="{always: false, smooth: true}"
      >
        <div
          v-for="(message,index) in messages"
          :key="index"
        >
          <span style="color:blue">[{{ message.name }}]: </span>
          <span>{{message.message}}</span><br>
          <span style="color: red">{{message.timestamp}}</span>
          <hr>
        </div>
      </div>
    </v-card>
    <v-card-actions>
      <createMessage/>
    </v-card-actions>
  </v-card>
</template>

<script>
import createMessage from "./createMessage";
import fb from "@/firebase/init";
import moment from "moment";
import store from "@/store/index"

export default {
  components: {
    createMessage
  },

  data() {
    return {
      messages: [],
      channels: [
        "messages",
        "webDesign",
        "Vue",
        "Vuex",
        "App devers",
        "Home 2"
      ]
    };
  },
  methods: {
    changeChannel(channelName) {
      this.messages = [];
      store.dispatch('chat/changeChannel', channelName);
    }
  },
  watch: {
    currentChannel() {
      this.messages = []
      let ref = fb
        .firestore()
        .collection(this.currentChannel)
        .orderBy("timestamp");

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type == "added") {
            let doc = change.doc;
            this.messages.push({
              id: doc.id,
              name: doc.data().name,
              message: doc.data().message,
              timestamp: moment(doc.data().timestamp).format("LTS")
            });
          }
        });
      });
    }
  },
  created() {
    this.messages = [];
    let ref = fb
      .firestore()
      .collection(this.currentChannel)
      .orderBy("timestamp");

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS")
          });
        }
      });
    });
  },
  computed: {
    currentChannel() {
      return store.getters["chat/currentChannel"];
    }
  }
};
</script>

<style scoped>
.messages {
  margin-left: 40px;
  line-height: 30px;
  max-height: 350px;
  overflow: auto;
}
</style>