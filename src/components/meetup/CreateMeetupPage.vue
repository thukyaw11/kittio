<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="8">
        <router-link to="/meetups">
          <b>
            <md-icon style="padding: 10px;">arrow_back</md-icon>
          </b>
        </router-link>
        <span style="margin-left:5px;font-family: 'Roboto', sans-serif;">
          <b>သင့်‌ကြောင်ကိုထည့်သွင်းပါ</b>
        </span>
        <br />
        <br />

        <br />

        <div class="post_activity">
          <div @click="onPickFile" class="photo_upload" v-if="!imageURL">
            <md-avatar class="md-avatar-icon md-large" style="background: grey;">
              <md-icon>add_photo_alternate</md-icon>
              <input
                type="file"
                name
                accept="image"
                style="display:none"
                ref="fileInput"
                @change="onFilePicked"
              />
            </md-avatar>
          </div>
          <div
            v-if="imageURL"
            style="width : 80px; height : 80px;"
            @click="onPickFile"
            class="photo_upload"
          >
            <img :src="imageURL" alt="preview" style="height:100%; width: 100%;" />
            <input
              type="file"
              name
              accept="image"
              style="display:none"
              ref="fileInput"
              @change="onFilePicked"
            />
          </div>

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
        </md-button>
      </a-col>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>

    </a-row>
  </div>
</template>

<script>
import store from '@/store/index'
export default {
  data() {
    return {
      description: "",
      imageURL: "",
      image: null,
      petName: "",
      genetic: "",
      phNum: "",
      petAge: "",
      gender: "",
      address: "",
      email: "",
      petAgeValid: false
    };
  },
  computed: {
    emailValidate() {
      if (this.email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/;
        return re.test(this.email);
      }
      return true;
    },
    ageValidate() {
      return this.petAge <= 16;
    },
    phoneNumValidate() {
      return this.phNum.length < 12;
    },
    validEmail() {
      return {
        "md-invalid": !this.emailValidate
      };
    },
    validAge() {
      return {
        "md-invalid": !this.ageValidate
      };
    },
    validPhoneNum() {
      return {
        "md-invalid": !this.phoneNumValidate
      };
    },
    formisValid() {
      return (
        this.description != "" &&
        this.imageURL != "" &&
        this.petName != "" &&
        this.genetic != "" &&
        this.phNum != "" &&
        this.petAge != "" &&
        this.petAge <= 16 &&
        this.petAge > 0 &&
        this.gender != "" &&
        this.address != "" &&
        this.email != "" &&
        this.emailValidate == true
      );
    }
  },
  methods: {
    refresh() {
      this.description = "";
      this.imageURL = "";
      this.image = null;
    },
    onCreateMeetup() {
      if (!this.formisValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const dateNow = new Date(Date.now() - 20000);
      const meetupOption = {
        username: store.getters["users/user"].displayName,
        profileUrl: store.getters["users/user"].profileUrl,
        petName: this.petName,
        petAge: this.petAge,
        genetic: this.genetic,
        gender: this.gender,
        phNum: this.phNum,
        address: this.address,
        description: this.description,
        position: store.getters["users/user"].position,
        email: this.email,
        image: this.image,
        createdTime: dateNow
      };

      store.dispatch("posts/createNewMeetup", meetupOption);
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
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>

<style scoped>
.photo_upload {
  margin: 0 auto;
}

.post_activity {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
}

.create_profile_container {
  display: flex;
}
h3 {
  padding: 10px 0px;
}
.profile_image {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  margin-right: 10px;
}
/* textarea {
  border: none;
  background-color: none;
  outline: 0;
  font-size: 15px;
  width: 300px;
  height: 50px;
} */
/* Hide scrollbar for Chrome, Safari and Opera */
/* textarea::-webkit-scrollbar {
  display: none;
}

textarea:focus {
  border: none;
  background-color: none;
  outline: 0;
  width: 300px;
  height: 30px;
} */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  appearance: none;
  outline: 0;
  box-shadow: none;
  border: 0 !important;
  background-image: none;
  width: 100%;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}

select {
  flex: 1;
  padding: 0 0.5em;
  cursor: pointer;
  background: none;
}
</style>
