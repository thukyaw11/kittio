<template>
  <div>
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12">
        <div style="margin : 0 auto; height: 100%; width : 350px;">
          <img src="../../assets/signup.jpg" alt="kitty" style="margin: 0 auto" />
        </div>
        <div style="font-size : 30px">Sign Up</div>
        <br />
        <div v-if="error">
          <app-alert :title="error.message"></app-alert>
        </div>
        <br />
        <md-field>
          <md-icon>account_circle</md-icon>
          <label>User Name</label>
          <md-textarea v-model="username" md-autogrow></md-textarea>
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
          style="width : 95%"
          :disabled="!formisValid"
          @click="onSignUp"
        >Sign Up</md-button>
        
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
      username: "",
      password: ""
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
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        username: this.username
      });
    }
  }
};
</script>