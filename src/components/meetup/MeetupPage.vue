<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="8"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="8">
        <div class="activePeople">
          <md-avatar class="md-avatar-icon md-large" style="background: grey;margin-bottom: 40px">
            <router-link to="/meetup/new">
              <md-icon>add</md-icon>
            </router-link>
          </md-avatar>

          <div v-for="(user,index) in loadUser[0]" :key="index">
            <md-avatar class="md-avatar-icon md-primary md-large" style="border: 2px solid green">
              <img
                src="https://images.unsplash.com/photo-1521988597352-a2c0b9e9108f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              />
            </md-avatar>
            <br />
            <div class="userName">
              <small>{{user.userName | truncate(12)}}</small>
            </div>
          </div>
        </div>

        <h1 style="font-family: 'Roboto', sans-serif;">Feed</h1>
        <div v-for="(meetup,index) in loadMeetUps" v-bind:key="index">
          <md-card class="md-elevation-0">
            <md-card-header>
              <md-avatar>
                <img
                  src="https://images.unsplash.com/photo-1521988597352-a2c0b9e9108f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                />
              </md-avatar>

              <div class="md-title">
                <b>{{meetup.owner}}</b>
                <span v-show="meetup.feeling">
                  is feeling
                  <b>{{meetup.feeling}}</b>
                </span>
              </div>
              <div class="md-subhead">
                <timeago :datetime="meetup.createdTime"></timeago>
              </div>
            </md-card-header>

            <md-card-media v-if="meetup.imgURL">
              <img :src="meetup.imgURL" alt="you may need reload" />
            </md-card-media>

            <md-card-media v-else>
              <img
                src="https://i.pinimg.com/originals/1a/e0/90/1ae090fce667925b01954c2eb72308b6.gif"
                alt="you may need reload"
              />
            </md-card-media>

            <md-card-actions>
              <md-button class="md-icon-button" :to="'/meetups/'+meetup.id">
                <md-icon>remove_red_eye</md-icon>
              </md-button>
            </md-card-actions>
          </md-card>
          <hr />
          <br />
        </div>
      </a-col>

      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["user", "loadMeetUps", "loadUser"])
  }
};
</script>

<style scoped>
input[type="text"] {
  border: none; /* <-- This thing here */
  border: solid 1px #ccc;
  border-radius: 25px;
  padding-left: 15px;
}
.write_post_image {
  height: 35px;
  width: 35px;
  margin-right: 10px;
}
.input_field {
  display: flex;
  justify-content: space-between;
}
.activePeople {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
}
.md-avatar-icon {
  margin-right: 5px;
}
.activePeople::-webkit-scrollbar {
  display: none;
}
.userName {
  margin-top: 10px;
  text-align: center;
}
</style>