<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12">
        <div v-for="(meetup,index) in meetups" v-bind:key="index">


          <md-card>
            <md-card-media>
              <md-ripple>
                <img :src="meetup.imgURL" alt="cat" />
              </md-ripple>
            </md-card-media>

            <md-card-actions>
              <md-button class="md-icon-button">
                <md-icon>favorite</md-icon>
              </md-button>

              <md-button class="md-icon-button" :to="'/meetups/'+meetup.id">
                <md-icon>remove_red_eye</md-icon>
              </md-button>

            </md-card-actions>
          </md-card>

          <br />
        </div>
      </a-col>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadMeetUps;
    }
  }
};
</script>