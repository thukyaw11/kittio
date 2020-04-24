<template>
  <div>
    <br />
    <div style="margin : 0 auto; height: 200px; width : 200px">
      <img src="../assets/kitty.png" alt="kitty">
    </div>
    <a-row>
      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">

        <md-button
          class="md-raised md-primary"
          style="float: right"
          router
          to="/meetups"
        >Explore Kitty</md-button>
      </a-col>
      <a-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <md-button
          class="md-raised md-primary"
          style="float: left"
          router
          to="/meetup/new"
        >Create Pose</md-button>
      </a-col>
    </a-row>
  </div>
</template>
