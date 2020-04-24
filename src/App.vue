<template>
  <div id="app">
    <md-toolbar md-elevation="0" class="md-primary" id="toolbar">
      <md-button class="md-icon-button" @click="showNavigation = true" id="drawerIcon">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title" style="flex : 1">
        <router-link to="/" style="cursor : pointer; color: white; text-decoration: none">Kittio</router-link>
      </span>
      <md-badge md-content="17" style="margin-right : 10px">
        <md-button class="md-icon-button">
          <md-icon>notifications</md-icon>
        </md-button>
      </md-badge>
      <div v-for="(item,index) in menuItems" v-bind:key="index">
        <router-link :to="item.link">
          <md-button @click="showSidepanel = true" class="md-small-hide">
            <md-icon>{{item.icon}}</md-icon>
            {{item.title}}
          </md-button>
        </router-link>
      </div>
      <md-button class="md-small-hide" v-if="isUserAuth" @click="logout"> 
        <md-icon>exit_to_app</md-icon> Logout
      </md-button>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Kittio</span>
      </md-toolbar>

      <md-list>
        <md-list-item
          v-for="(item,index) in menuItems"
          v-bind:key="index"
          router
          :to="item.link"
          @click="showNavigation = false"
        >
          <md-icon>{{item.icon}}</md-icon>
          <span class="md-list-item-text">{{item.title}}</span>
        </md-list-item>
        <md-list-item v-if="isUserAuth" @click="logout">
          <md-icon>exit_to_app</md-icon>
          <span class="md-list-item-text">Logout</span>
        </md-list-item>
      </md-list>
    </md-drawer>

    <md-content>
      <router-view></router-view>
    </md-content>
  </div>
</template>

<script>
export default {
  name: "Temporary",
  data() {
    return {
      showNavigation: false,
      showSidepanel: false
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "face", title: "Sing Up", link: "/signup" },
        { icon: "lock_open", title: "Sign In", link: "/signin" }
      ];
      if (this.isUserAuth) {
        menuItems = [
          { icon: "pets", title: "View Kitty", link: "/meetups" },
          {
            icon: "launch",
            title: "Create Pose",
            link: "/meetup/new"
          },
          { icon: "person", title: "My Account", link: "/profile" }
        ];
      }

      return menuItems;
    },
    isUserAuth() {
      return (
        this.$store.getters.user !== undefined &&
        this.$store.getters.user !== null
      );
    }
  },
  methods:{
    logout(){
      this.showNavigation = false;
      this.$store.dispatch('logout')
      this.$router.push('/');
    }
  }
};
</script>

<style>
@media (min-width: 965px) {
  #drawerIcon {
    display: none;
  }
}
#toolbar {
  position: sticky;
  top: 0px;
}
</style>