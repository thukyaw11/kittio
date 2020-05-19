<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>

        <v-list-item
          v-for="item in menuItems"
          :key="item.text"
          link
          :to="item.link"
          style="text-decoration:none"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
        v-if="isUserAuth"
          style="text-decoration:none"
          @click="logout"
        >
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Kittio</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfbhEQbhS6T_6jCg4524GJ8Bf0nSA2ejNbGKOUtx_lwZgvmTuJ&usqp=CAU"
            alt="Vuetify"
          ></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null
  }),
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-plus", text: "Sign Up", link: "/signup" },
        { icon: "mdi-login", text: "Sign In", link: "/signin" }
      ];
      if (this.isUserAuth) {
        menuItems = [
          { icon: "mdi-home", text: "Home", link: "/feeds" },
          {
            icon: "mdi-pencil",
            text: "Write a post",
            link: "/feednew/new"
          },
          {
            icon: "group",
            text: "People",
            link: "/people"
          },
          { icon: "account_circle", text: "Profile", link: "/profile" }
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
      this.$router.push("/signin");
    }
  }
};
</script>
