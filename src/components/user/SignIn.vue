<template>
  <div>
    <a-row>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" style="font-family: 'Roboto', sans-serif;">
        <div style="margin : 0 auto; height: 100%; width : 100%;" class="cover_image">
            <img src="../../assets/signincover.svg" alt="kitty" style="margin: 0 auto;width:100%" />
        </div>
        <div id="form_gp">

        <div style="font-size : 30px">Sign In</div>
        <br />
        <div v-if="error">
          <app-alert :title="error.message"></app-alert>
        </div>
        <br />
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
        <router-link to="/signup">Don't have an account?</router-link>
        <br><br>
        <md-button
          class="md-raised md-primary"
          style="width : 100%; margin: 0; color: white"
          :style="formisValid? 'background-color: rgb(34, 34, 70)' : 'background-color: rgb(34, 34, 70, 0.5)'"
          :disabled="!formisValid"
          @click="onSignIn"
        >Sign In</md-button>
        </div>

      </a-col>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>
  </div>
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
        this.$router.push("/");
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

<style scoped>
#form_gp {
  margin: 10px;
}
</style>
