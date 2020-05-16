<template>
  <!-- <div>
    <a-row>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="font-family: 'Roboto', sans-serif;">
        <div style="margin : 0 auto; height: 100%; width : 100%;" class="cover_image">
          <img src="../../assets/signincover.svg" alt="kitty" style="margin: 0 auto;width:100%" />
        </div>
        <div id="form_gp">


        <div style="font-size : 30px;">Sign Up</div>
        <br />

        <br />
        <md-field>
          <md-icon>account_circle</md-icon>
          <label>User Name</label>
          <md-textarea v-model="username" md-autogrow maxlength="20"></md-textarea>
        </md-field>
        <md-field>
          <md-icon>email</md-icon>
          <label>Email</label>
          <md-textarea v-model="email" md-autogrow></md-textarea>
        </md-field>
        <md-field>
          <md-icon>lock_open</md-icon>
          <label>Password</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <router-link to="/signin">Already have an account?</router-link>
        <br><br>
        <md-button
          class="md-raised md-primary"
          style=" width: 100%; color: white; margin: 0"
          :style="formisValid? 'background-color: rgb(34, 34, 70)' : 'background-color: rgb(34, 34, 70, 0.5)'"
          :disabled="!formisValid"
          

        >Sign Up</md-button>
          </div>

      </a-col>

      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>
  </div> -->

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
            <v-toolbar-title>Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                v-model="username"
                prepend-icon="account-circle"
                type="text"
                maxlength="20"
                counter
              ></v-text-field>

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
            <v-btn
              color="primary"
              :disabled="!formisValid"
              @click="onSignUp"
            >Register</v-btn>
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
import store from "@/store/index";
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
      imageURL: "",
      image: null
    };
  },
  computed: {
    formisValid() {
      return this.username != "" && this.password != "" && this.password != "";
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
      if (value !== null && value !== undefined) {
        this.$router.push("/feeds");
      }
    }
  },
  methods: {
    onSignUp() {
      store.dispatch("users/signUserUp", {
        email: this.email,
        password: this.password,
        username: this.username
      });
      console.log("work");
    }
  }
};
</script>

<style scoped>
.photo_upload {
  justify-content: space-between;
  display: flex;
  align-items: center;
  vertical-align: center;
}
#form_gp {
  margin: 10px;
}
</style>
