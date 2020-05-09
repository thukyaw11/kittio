<template>
  <div id="app">
    <md-toolbar md-elevation="0" id="toolbar" style="background : white">
      <md-button class="md-icon-button" @click="showNavigation = true" id="drawerIcon">
        <md-icon>sort</md-icon>
      </md-button>
      <span class="md-title" style="flex : 1">
        <router-link
          to="/"
          style="cursor : pointer; color: white; text-decoration: none; color : black"
        >Kittio</router-link>
      </span>
      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
      <md-avatar class="md-small">
        <router-link to="/profile" style="height: 100%">
          <img
            src="https://images.unsplash.com/photo-1521988597352-a2c0b9e9108f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            alt="Avatar"
          />
        </router-link>
      </md-avatar>
      <div v-for="(item,index) in menuItems" v-bind:key="index">
        <router-link :to="item.link">
          <md-button @click="showSidepanel = true" class="md-small-hide">
            <md-icon>{{item.icon}}</md-icon>
            {{item.title}}
          </md-button>
        </router-link>
      </div>
      <md-button class="md-small-hide" v-if="isUserAuth" @click="logout">
        <md-icon>exit_to_app</md-icon>Logout
      </md-button>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation" md-swipeable style="position: fixed">
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
        <div style="height : 1px; width : 90%; background: grey; margin: 0 auto"></div>
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
        { icon: "face", title: "Sign Up", link: "/signup" },
        { icon: "lock_open", title: "Sign In", link: "/signin" }
      ];
      if (this.isUserAuth) {
        menuItems = [
          {
            icon: "launch",
            title: "Create Pose",
            link: "/meetup/new"
          },
          { icon: "pets", title: "View Kitty", link: "/meetups" },

          {
            icon: "supervisor_account",
            title: "People on Kittio",
            link: "/people"
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
  methods: {
    logout() {
      this.showNavigation = false;
      this.$store.dispatch("logout");
      this.$router.push("/");
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
