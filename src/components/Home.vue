<template>
  <div>
    <br />
    <div style="margin : 0 auto; height: 100%; width : 360px;">
      <img src="../assets/home.jpg" alt="kitty" style="margin: 0 auto" />
    </div>
    <p style="text-align:center; font-size : 25px">
      Hello,
      <b>{{user.displayName}}</b>
      <br />Welcome to
      <span style="color : blue">Kittio</span>
    </p>
    <br />
    <br />
    <br />
    <br />
    <a-row>
      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <md-button class="md-fab md-primary" style="float: right" router to="/meetups">
          <md-icon>remove_red_eye</md-icon>
        </md-button>
      </a-col>

      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <md-button class="md-fab md-plain" style="float: left" router to="/meetup/new">
          <md-icon>near_me</md-icon>
        </md-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  computed: {
    user() {
      return store.getters['users/user'];
    }
  }
};
</script>
