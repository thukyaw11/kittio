<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12">
        <div style="font-size : 20px">Say "meow" to the world</div>
        <br />
        <br />

        <md-field style="padding: 10px 15px 10px 10px">
          <label>Description</label>
          <md-textarea v-model="description" required></md-textarea>
          <md-icon>description</md-icon>
        </md-field>

        <md-button class="md-raised md-primary" @click="onPickFile">Upload Image</md-button>
        <input
          type="file"
          name
          accept="image"
          style="display:none"
          ref="fileInput"
          @change="onFilePicked"
        />
        <div v-if="imageURL" style="width : 300px; height : 100px">
          <img :src="imageURL" alt="preview" width="300" height="200" />
        </div>

        <md-button
          class="md-fab md-plain"
          style="float: right;position: fixed; bottom : 30px; right: 30px"
          :disabled="!formisValid"
          @click="onCreateMeetup"
        >
          <md-icon>near_me</md-icon>
        </md-button>
      </a-col>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      imageURL: "",
      image: null
    };
  },
  computed: {
    formisValid() {
      return this.description != "" && this.imageURL != "";
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formisValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      console.log(this.$store.getters.user);
      const dateNow = new Date(Date.now() - 20000);
      const meetupOption = {
        username: this.$store.getters.user.displayName,
        description: this.description,
        image: this.image,
        createdTime: dateNow
      };

      this.$store.dispatch("createNewMeetup", meetupOption);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;

      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("please add a valid file");
      }
      const fileReader = new FileReader();

      fileReader.addEventListener("load", () => {
        this.imageURL = fileReader.result;
        console.log(this.imageURL);
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
