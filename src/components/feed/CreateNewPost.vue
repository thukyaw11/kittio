<template>
  <v-container>
    <h1>Write a post</h1>
    <v-row>
      <v-col
        cols="12"
        md="12"
      >
        <!-- <div class="post_activity">
         
         

          <md-field style="margin-left: 13px">
            <label>ကြောင်အမည်</label>
            <md-textarea md-autogrow v-model="petName"></md-textarea>
          </md-field>
        </div>
        <br />
        <br />

        <a-radio-group button-style="solid" style="margin-left: 75px" v-model="gender">
          <a-radio-button value="male">အထီး</a-radio-button>
          <a-radio-button value="female">အမ</a-radio-button>
        </a-radio-group>
        <br />
        <br />

        <md-field>
          <md-icon>pets</md-icon>
          <label>မျိုးရိုး</label>
          <md-input v-model="genetic"></md-input>
        </md-field>

        <md-field :class="validAge">
          <md-icon>timeline</md-icon>
          <label>အသက်</label>
          <md-input md-autogrow v-model="petAge" type="number"></md-input>
          <span
            class="md-error"
            style="margin-left: 35px"
          >average lifespan of a cat is about 16 years</span>
        </md-field>

        <md-field :class="validPhoneNum">
          <md-icon>local_phone</md-icon>
          <label>ဆက်သွယ်ရန်ဖုန်း</label>
          <span class="md-prefix" style="margin-left:10px">09-</span>
          <md-input type="number" md-autogrow v-model="phNum"></md-input>
          <span class="md-error" style="margin-left: 35px">enter a vaild phone number</span>

        </md-field>

        <md-field>
          <md-icon>home</md-icon>
          <label>လိပ်စာ</label>
          <md-textarea md-autogrow v-model="address"></md-textarea>
        </md-field>

        <md-field :class="validEmail">
          <md-icon>contact_mail</md-icon>
          <label>အီးမေးလ်</label>
          <md-input md-autogrow v-model="email" type="email"></md-input>
          <span class="md-error" style="margin-left: 35px">enter a vaild email</span>
        </md-field>

        <md-field>
          <md-icon>description</md-icon>
          <label>ကြောင်အကြောင်း</label>
          <md-textarea md-autogrow v-model="description"></md-textarea>
        </md-field>

        <md-button
          class="md-fab md-plain"
          style="float: right;position: fixed; bottom : 30px; right: 30px"
          :disabled="!formisValid"
          @click="onCreateMeetup"
        >
          <md-icon>near_me</md-icon>
        </md-button> -->
        <v-card
          class="mx-auto"
          height="auto"
          style="padding:25px"
        >

          <input
            type="text"
            class="borderless_Input"
            placeholder="Title"
            v-model="title"
          />
          <div
            @click="onPickFile"
            class="photo_upload"
            v-if="!imageURL"
          >

            <v-btn
              class="ma-2"
              dark
            >Choose image
              <v-icon
                dark
                right
              >mdi-image</v-icon>
            </v-btn>
            <input
              type="file"
              name
              accept="image"
              style="display:none"
              ref="fileInput"
              @change="onFilePicked"
            />

          </div>
          <div
            v-if="imageURL"
            style="width : 300px; height : 240px;cursor:pointer"
            @click="onPickFile"
            class="photo_upload"
          >
            <img
              :src="imageURL"
              alt="preview"
              style="height:100%; width: 100%;"
            />
            <input
              type="file"
              name
              accept="image"
              style="display:none"
              ref="fileInput"
              @change="onFilePicked"
            />
          </div>
          <br>

          <textarea
            v-model="description"
            class="borderless_Textarea"
            placeholder="Start Write Here"
          />

          <v-btn color="primary" :disabled="!formisValid" @click="onCreateFeed">Publish</v-btn>
          
          
          </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import store from "@/store/index";
export default {
  data() {
    return {
      title: "",
      description: "",
      imageURL: "",
      image: null
    };
  },
  computed: {
    formisValid() {
      return this.description != "" && this.imageURL != "" && this.title != "";
    }
  },
  methods: {
    onCreateFeed() {
      if (!this.formisValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      if (!this.description) {
        return;
      }
      const dateNow = new Date(Date.now() - 20000);
      const meetupOption = {
        username: store.getters["users/user"].displayName,
        profileUrl: store.getters["users/user"].profileUrl,
        title: this.title,
        description: this.description,
        position: store.getters["users/user"].position,
        image: this.image,
        createdTime: dateNow
      };

      store.dispatch("posts/createNewFeed", meetupOption).then(() => {
        this.$router.push("/feeds");
      });
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
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style scoped>
textarea {
  border: none;
  background-color: none;
  outline: 0;
  font-size: 18px;
  width: 100%;
  height: 300px;
}

textarea:focus {
  border: none;
  background-color: none;
  outline: 0;
  width: 100%;
  height: 300px;
}

.borderless_Textarea {
  height: 300px;
  width: 100%;
  overflow: auto;
}

input[type="text"] {
  border: none;
  background-color: none;
  outline: 0;
  font-weight: bold;
  font-size: 25px;
}

input[type="text"]:focus {
  border: none;
  background-color: none;
  outline: 0;
}

.borderless_Input {
  width: 100%;
  overflow: auto;
}
</style>
