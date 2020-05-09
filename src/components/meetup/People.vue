<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8"></a-col>
      <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <div style="display: flex; justify-content: space-between">
          <h1 style="font-weight : bolder; margin-left: 15px; display: flex;">People</h1>
          <p style="margin: 10px">
            <b>All</b>
            {{loadUser[0].length}}
          </p>
        </div>

        <md-list class="md-triple-line md-dense">
          <md-list-item v-for="(user,index) in loadUser[0]" :key="index">
            <md-avatar>
              <img
                src="https://images.unsplash.com/photo-1521988597352-a2c0b9e9108f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                alt="People"
              />
            </md-avatar>

            <div class="md-list-item-text">
              <h6>{{user.userName}}</h6>
              <span></span>
              <p>{{user.email}}</p>
            </div>

            <md-button class="md-icon-button md-list-action">
              <md-icon>person_add</md-icon>
            </md-button>
          </md-list-item>

          <md-divider class="md-inset"></md-divider>
        </md-list>
      </a-col>
      <a-col :xs="0" :sm="24" :md="8" :lg="8" :xl="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      'loadUser'
    ])
  }
}
</script>
