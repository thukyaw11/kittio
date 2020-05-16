<template>

  <v-container
    class="fill-height"
    fluid
  >

  <v-row
  align="center"
  justify="center"
>
  <v-col
    cols="12"
    sm="8"
    md="4"
  >
    <v-card class="elevation-12">
      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Email"
            v-model="email"
            prepend-icon="email"
            type="text"
          ></v-text-field>

          <v-text-field
            id="password"
            label="Password"
            v-model="password"
            prepend-icon="lock"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary"
         :disabled="!formisValid"
        @click="onSignIn">Login</v-btn>
      </v-card-actions>
    </v-card>
    <div v-if="error">
      <app-alert :title="error.message"></app-alert>
    </div>
  </v-col>
</v-row>

  </v-container>
</template>



<script>
import store from '@/store/index'
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    formisValid() {
      return this.email != "" && this.password != "";
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    user(value) {
      console.log(value);
      if (value !== null && value !== undefined) {
        this.$router.push("/feeds");
      }
    }
  },
  methods: {
    onSignIn() {
      store.dispatch("users/signUserIn", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
