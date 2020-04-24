<template>
  <div>
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12">
        <br />
        <div style="font-size : 30px">Sign Up</div>
        <br />
        <div v-if="error">
          <app-alert :title="error.message"></app-alert>
        </div>
        <br />
        <md-field>
          <label>User Name</label>
          <md-textarea v-model="username" md-autogrow></md-textarea>
        </md-field>
        <md-field>
          <label>Email</label>
          <md-textarea v-model="email" md-autogrow></md-textarea>
        </md-field>
        <md-field>
          <label>Password toggle</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>

        <md-button
          class="md-raised md-primary"
          style="float: right"
          :disabled="!formisValid"
          @click="onSignUp"
        >Sign Up</md-button>
      </a-col>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>

    <div style="margin : 0 auto; height: 200px; width : 200px;margin-top: 100px">
      <img src="../../assets/logincat.png" alt="kitty" />
    </div>
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