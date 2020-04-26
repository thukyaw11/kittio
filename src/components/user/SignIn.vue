<template>
  <div>
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12">
        <div style="margin : 0 auto; height: 100%; width : 350px;">
          <img src="../../assets/login.jpg" alt="kitty" style="margin: 0 auto" />
        </div>
        <br />
        <br />
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
        <md-button
          class="md-raised md-primary"
          style="float: right"
          :disabled="!formisValid"
          @click="onSignIn"
        >Sign In</md-button>
      </a-col>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>
  </div>
</template>



<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    formisValid() {
      return this.password != "" && this.password != "";
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
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>