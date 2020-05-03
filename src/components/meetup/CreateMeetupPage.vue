<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="1" :sm="6" :md="6" :lg="6" :xl="6"></a-col>
      <a-col :xs="22" :sm="12" :md="12" :lg="12" :xl="12">
        <router-link to="/meetups">
          <b>
            <md-icon style="padding: 10px;">arrow_back</md-icon>
          </b>
        </router-link>
        <span style="margin-left:5px">
          <b>Create Post</b>
        </span>
        <br />
        <br />
        <div class="create_profile_container">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANYAAADrCAMAAAAi2ZhvAAABd1BMVEVRmeT////tuYo8T1xKMSxyQTPUpntGNyleSjfxvY3Gm3P/T21sOi6ygWFBl+nzvo7htpT9+PQ3JA7yuoVVQzJIlePKyMZRneuZpsRJluM+JiVKLCD4+/5pNyzotYfzuoXOoXiMnsDeq4BzPCSCtOvs9Py91vQ6NiUySlouQ1E8HBQ9JSVKLSKviWa4kGt4XkbZp3U5Fw5DJyFnSj2Sve3X5vhbn+ZtqOhNYoebeVqxz/KBUT7K3vahcFWTY0y7iWcjPU3BurlbRUGGaU57Sjp0ORw/TFGBkZ+bkI52ZmPl4uKupaNWOzNzVERbQDZLQ09MVXBOdKRxn9XFsKaoqrjKsqHht5CMuezYt51jdZtcgbdsVFw+MSVVj9GzRFDgS2L3jH78YHHwp4X2hXv9WHBMWmNlZmVadI6giXRSZHKwu8V0hpVccICap7LQ1945VWqIe3ielJJuXFlDgMJHJA9LRFJObJZqaXhtUVVkaoh5c4ZkjLmwk3n2dBCTAAAU60lEQVR4nM2d/UPbNhrHTYCAsoDXQQihiQmm6QVakkEhHKQJr4Xxtl3p7jpasq3baMtLIe16a3fljz9JfrdlW5ZkyPeHO5Y6tj5+Hj16HlmRpa7b0shOz25sJ5diO3OwRj7Mzs2OoL/uxHH628C6M/Ld+vRcT08P/Huk3dOO4RI3jjWyt7OPmXpm97p2d6bn5tr65yJd8uaw7uyu7bX3Z6c1pp6euZ077Vn49zR0xTtr67OzOwIvFjNW/s4upHnf3lmfnp2Flumx6YMGuL671p6ehpginTE+rN2RPUjTM41onDxOwUPwv06vCbx4PFi7ezvrc9OBNB7tiwyJMWCNfNdjdiB6zX0nsg2isVDnj4yEND0ishmCsfb2p1mYOhtrbZ0VqgdFRIEtEYi1+4EDCtlrT1xbxGHtsfUpm2bFjVyisHhNpdnrgyhHFIS11sNrKqy5njUx7RGD9X5WBBTS7HshDRKC1RZGJaqDicDaEdCtLM19EJBFCcASSwW51vm5+LFEU0Eu/qyXG+s74VQi7MWLtScwWti4eCtlTqxdIcOVV7yJFCfWekxYPbN8+QYf1nv+jjUGRfh47sPtYZFckNxKDwnUgwdjPfsHGzOVJdJBfFMbXFhtAtbS0kb1AOkRUfAfqhsbG0tLM5VKMakqsgyAXCHcCT5z8WARjDVWlJEASPgKyPohwDxKXnpAMBdPucyD5TXWWFL25wkQOPDaiyvIc2ARjFVko0oAldC7eIIhB9aeOwyOVRipIFeR0Ls4xi52rIV1N9UMMxXsXgSu9YUbxyrd+/Oji2qJgwr54ffu/vXxz8XSjWKV5jPZf951UlW5qCCXcuCKh3ef5jLzbGBMWMtSRsr+4KQ64INCkpec9nr4ryy80PINYS0sZiRJat11Uin8WAm54nLDLLxQZpGhi0XHms/k4MWyT+1YYxsB428ULmcHe9iCV5KgJ8aO9VhCpoJY/3pop+LsV6ZAwj4w332RxRfLSI9jxcrPa1CSo2uJo0Kycd39K6tfLjOfjw9roWZQSS2brzwSCAUD4iNHzDC4apF6WBSsZdyrdCyra40lxXQsg8uWSP3XxII9LEpIpMfK3zNN5YgYnMOwV3LKHL9+kGzK3KN3RGqshVrOdgnbYLwvmApyVc3u1bJz5egdkRbrfs5OZQuEDypCXRBLNbAeOrCkXO6+WKz5jOTUfw2sR+KprHTj45+uy9IOYXRY99xU0g8xGguaSz/7xxdZN9c9YVj5RQ9VyzDW9yKSJo/kDc1cd5+6sWAuRRM4KLBKizn3uaXWx5jCoCaQGnONx7YORlOthGOVal4qySy2xI5Zlr7XsP7pxYIBMZwrFKuUI1BlX+hYB7EYywwaRCwYEEO5wrAWCKe1RuOxmZiMpXvhQyIWVNgAFoK1IBFsBbH+0rFiCRhYY66k0GmvMK5grBKZysSKywehFz4KwoLNCvbDQCw/KiN3is0Hjc7lixXGFYRFjIF2rAdqXFQJUAnGComHAVh5wnjlxIojcTKwig+CseD4FTAuB2B5MyYXltiq2CUlDCswj/LH8mS3XqxY8kFD+2FYQXmvL9byYMAJdSw1RirwKBRLGvQtmP2wFgJsZWDFk+bqkqvhWFLGb/jywSrVAk+nYcU3aiX0CE9OnmzyC4c+WP5BUMNCw7Fv9g50hbU88DgNy1uYOJVbjIIVFC5MrAcpb4OAnFDUVGVmZqaSSiqJoGetCSWpH6gqCdlzJB64PNWxRz5hg4j1OChcmFieogTISmqp2j9sqrrkj7VUtY7rry6lFBcZHrhccxkkDRInfElYpdBzaRm86oIqLkGkfruG/YYAUHEdONy/VHSCqZ6ZJx+RuhcJ615wxzKw9h2BUC5WNaZhmxUCsewH4u9VHY+ele9d84Q+ypFGZQLWckjHQkJl5CNbI4CyobUN+lOlqCqKohYrS8FOaD+wX/v2hmLdBvnAMavrL9J0rxerREGF5zJs8V0uonbB+11RzUUZAC3A8MeSHQeqFWzr4X7LYDAUPqTCkjJeN/RihcR2HcuREcqpYXyvk+FB3U8AJLG9h1PGWWEoDBuNdRGivAfrPo2x0DyhVWyBonaj2aE0MM3kReMsamiSYSjjmex1Y+VpbIXTDCsjVLCpggYpSrAENpgRieSDOUosKeeuUdxYz6mwcoOH+1aOkRxGVEIEuYaTBmVq7tNihq49z4OxgjNcQ4OHz0BjxbLORl9VUNarVPusGyQPDIBnh2GpAZY753VhUcWLzI9DQ3KzaQtzqhgo16nQNYaGfqS50+6o4cSiihe5Z+PokmlxKH5Ko1s3/ozqVt/3x8pTfF8a/HEc3cl6oRhnbZxAAbZQRx4x/iOVH+Z9sWjyi9whokJYK3FjrWhYifFDCns5cw07Fp2xfgIaVrrhX24JwZIbaQ0L/BTZXHasCMZCWE0iFgCpSoVxEagLq6ljMZjLhkVlLBgFzWuSjAJSODO356xBQmUnqYjE/2beObpoaDeXDYvGWNLgv4GBtUkYq0BKq6OGqQYyXHZCLVUUgnmVTQML/JvGC+3msrDywbMyBtbXiSCshFkXUjymBDP9RqnVP+PNvSysxNdUnauWJ2DR5bgGFmime1VvQ1NW0RtmLqBUbRXycFV1c6m96SaIgmUbuywsKmNZWA0i1ozZ0mHvv7qotBLNqPmH+91cEKsRCUuqebEe0xUkphMiLO90ET1WAtpquDoDC+QELJBnYBVZdZ0LYUVyQinz2INFlQ3arDWQThOwiiZWSMyAN2C4WjRiIJBBsdrnnPgAajo9EM1aVmZoYFGV+i4s0lP+qmGssCd6aPrGfggAlaTjAJCMjGWV/wYWVXQPxwKqMdkSNm5teH7h4J51ZMFadmHRBYxwawF1A8fr0NGYPARzYplBQ4oUMMKx0DLiZJI0ukYVE5YRNHQsulqfCsvjTTeJZVT/GhZVOujBirfgAkUGLCMxlKL5oB0r5joSVpEMWLoXStF80IkVJ1UiwYSleyHGylMby4FFeL4lUCDFgiVl8iYWvQ/C4tjESsdb9YMVq2/Rlcca1mMTa57aB6XBZ0M3jzX0jB4rN29iUX8H3oxRC2sgXizrCkOj9O4kSQYWbT6IVbOwGvFiNSws2hwI3/iSjkWbD2LpXgixepvxYjV7dawoPqjnhQgr/KGqXbWEgVWnaV0xRRDV0FA3sBJRjKU9dJVoJzGsuzExpGMRJzPcUklYKsUXlU0da2giijdpUxoQayGSsfSogbAKNK1LkLBovqcWNKxo8QIqt4CxKJ8/2rgO/zMuIyyq8VjxUtFYGY7GEEse/89h5Obdx1j0mZOh3ODoTxCLJsIDABRX9yoqNNPZAF/gp9HB6K17jrEoZzFcYEeTvWGhEBKpqRWogZlKJQXhiqlKZWYAfZJSlRA0GAh7J4+iQ2kzGhLFmhmSsi8gVjrAm4CsrjQ304W0pt56s1JpwuCmqZDebK6oQRWykoZYnl/O0KkEseieq3qEsAI6l5yEw06vXelezwdN/0cQqGtBLKamZRYgVuSIYWH5PDRBc5uNgpOBqHSh4fcIQm6m2bHuQ6ywRXY+auF2kb0QFHspoDSL+dSiCj4BzUouAtY8xIqWY5jK4lYNkMwFc286KHwKYh2A4iAUW9eCeYbUtcj0VSn7El2X+DBIJVIV6vUCkcs7OYxTDKiXbFjSIsRi+6aURRGeOHShhyl6i9Np83+bKwCsNF0f4oMIw4RmrMkjRiwIVYqSHdv14glulKdvALVgtHelqOpCGx/hTYMU45PiikFf8JgLFPE/MUYMWGWUJMb4DoWxoBu6J5kbuE3pTbQ30pC/ZLm4qR3prtuA5oK9T1hbllmQIsxjOKV1Lth8N5dmhLqiVoffd93xU1e7X1Xq2ik8VNopPrP6YOaxxDhsGZ0LyTEoG2FQlQ+Oj4N21ho+7pdVQjAEKf207F0rc1+KVBo71DKwHIOq3NRbKvf39X3jv7PW2jd9/bJ+D2yjOhrIDSy2UQthLUsRZp3cemnG6M2UkbgCzQB1kJA3jvv6+vy2oBo57jvekBNAc0MjaACQ2jRHh8/MDcvNS9HLEkOWF6Kopy/3lnHAQG4FKgjruL024tVa+xv4TxWgu6z+MBXIxaY15LH7ICxNJMYkA6nlGFXrKyqsozSvwkFAQVh9x9+QhIkVM8DA2wCAulJ3jOPMPgjTDIkxyUDKfpp0gMHsNm0L2XIVc/npGG8MZQwHafx1myY/MRsLphk8WFbQcEkLbSAVjIUDqG/+yDwWa1jRpp2cyr4kN0l/lgKCzHVc1cJEkZgocgxaSDUuLD2B8mJpkQ0kNax/aLL9gbCS+jFkrCeMhbEQLB9zGU++5BnI9Y/9n3/56quvfvm5UND/2Idgx8b2eD7W4jIWH5Tk17vMtEFeOu77+SuPfu47NlZ6+fStJzw9i1/Zv0lcVvIKGr94qaDFbAeQsCZZKy1TnPZqERplT17BrySsX61ki2gs9rzJgOLEyj4lmsuaDAC/vXJDvfrNpJIHiMZiTzAMLJ5xC3O9JHYv22QA+NUB9spmqoRCNDZ7NqiLbzjWRPRCe2kIEr/9/uoPhPTHq99/s69G8elZnC4oBCtLHLzSziIM/ocCpf1lfZwiUT3hdUGExZHqGlxHRDd0Lh3CTxNcjxRAkvS9yb+5qWCqy1FvmVzEKO9YHArUgWa93hxwfkakesndHlRvLfNjwYKSxLVpMgC1WUC5fTpdaNo+3CRhfebuWBBrmaPot+sz0V76SkiQtEre9KbunHKR9A2eKssSLPqZp2icItor3YCVpeya5U0n4UdAJcZASMXdsSQ8RcM8oebSJyJXod5oNN2fNhuNOvGByuRnIVRoQi3SWpMg/f2EePutWemgjzSqlyI8UEIrTqQIq9OCRU6jIujJJ0EtkTJ5iXrxcaiyLXLgoNRk2N4Y9KqhB0EiIryuo0lWMOiAwqhy6EEQ+0ShV9kWOfENherlT5gs5Z5DLDEDl6Hsi5dPIkNN/i3OVBJezCVFWfpJoywCi2Iy0VB4AagUbTUhlbKt/9V9Yrhb6d7PTyWxUHhFoRR1gRqNchPfphr1sKf9aA3KwLcToqHwEjXGxUHBgljJZDI10Nws+FgNjsj1xkoxmfx2QvzV8eIg1oUZQSfGWEkDrWBLK/DKIJg+ISSkGLDQHkkS7a4LUWRhaWwrA81mfRMKllyNgUpRtf4tDixtPSHbWq4gubB0qSrhwxiw0A5JaK2u8JiRGyVhEfXtqHCsmr4EWUDd71RudEghmcZrQGVIOBZe3y9F+y0G5ZlH0Q//w8hUNJcoHgv/GkOK9ssZOuX0nzYEkKn6/GgMWHnjxxiiRy4TC6Mpzlihqoptylc4lvYjXYwlNtt1Ydn4CB8Kx9J+zIqxFliXc/mIjEWUcKzBBevXdoJD/G1i1Ww/IhTmhTmswShYg9p3BDVA/0G1hsWfP2WhaoeHhxMTE6OjE3v0WHvo+IkJ+NUaOgc31oINi3Vlq0F0+OXpxelJd/fr8aGhofHxcWoqyIUOh0qcdJ+cXjz9csjHpm9WoGMxe2G21jp6c7K11Y1UbrP/Ohy8LqNTbG2dvPnSqjEvuVt2YJWYfDtb+wKRuk2V37Jjye2yeR6ExkZmvK7A2Kog+ojsZuLF2inbT8VGZm6YYWBFzQuztSMXE8La4dii4LX7bFsnR1HBzO1NzN1NIlkr23rjYUI6YcdSSOfbehNtUirX5caKUPr7QUFzqaxUoFgmnjESmLUlsolFPa/mD8XTuewRgxnM2rLV2hCJctK6duQLhbyQ1VqKHxUCO6JL7mxbZVpYVJlG9stJABS7ufyNpd2tL1T7Bi8QsGj2dK75+58hppcG+fUsy2BvwoOifZdnG1ZojA8zFTbXaxZjKeEnDjdY5jERK3Rv+8BeZXKxjF2vQ4yFDRbyrMixq6kdK7h31S4ooBBXO6IbAioqqIvAyOHYg9ax92eAubKtcD8xuF5T7rmoSVYpqaAjBoR65xa0Diz/4p+mW1lcJyl6R5SvT2ipAjvY4IIvlm8wzH6h6VY2sLcJOjBZCY7sbm35cbk2u3di+dQnUakgV/c1BZiceNsdicqfy/UCNdfmzsRyMjoVAju5dr8VwikgK5GhfLncO/i7sEiPJpmoEFh32/O+CxtTqs0A5cdVywdiEX4zzkqFwMon7eskfv2AudwOvYIAFK93TspMUGQuzz73nt373UE+22Km0sjK3a/fXl+jzTAB2g7z+vrta/wpu7bccd77VgIPlrtA4aMy0JBWV1e1P7hPuOVa8uV9h4T3FRLOqFE75W5EDDp1hADCGz8I7zFxuOGb2yYg602gCxKxbIMXR7iIV/awQXrnJ+llOlY0FNCxYpLVvbxv+/DBsnKoCIngTevEsBXxxX1ELH3PzGyHdixNb3Q3JL5mkfxaMS2V71wXRNLccJD8djufl8DhKN+Rsd3SKTm2B2F1Pc90bBQ0BKNhxv22mTAsmPN2cLzQdOLJcEOxukp/3Xarw/WX79tm/V9eerl6260O0+qlb+MDXjV7NnXb7Q7W1Jl/24Ped/yuo7mm3gU0PfDt1NsdzDW1HdTy4HeJn3cs19R5YMND3vzeqVwhVGFYHcoVRhWK1ZFcoVThWB3IFU5FgdVx8TA4BlJjddj4FTheRcHqOuugPGo1ILeIiNVB+WFAHhgdq+vyin/SUoDKV3RUtFhd+U4IiFPnfvUVKxYMHLfuiKs0wSIqFgwct+qIZbpgERmrq3Rxi444deFbCnNi3eYIRjVasWJ1XZ7eCtjUKWUEZMTqyt9G5Fh9RxsBWbFuwWCRTcWEBXtY+QbBpsrRehU7Vldp+8Y8cXU7SgDkw4KeeHEjYKsX0f2PB+tGuhhLp+LFgllHvGBTpxGyCoFYECw+V1y94IDixMJ9LIZEsczcpwRhQbDzKcG+ODV1zgklAAsmHrCTCTNZGXapqClFPFhQl9tXIpyxvHq1zW0oLDFY0GSX22U+b5yaKm9fCjAUligspMt3V1Ns7gjvyNU7MXbSJBILqnR2flqOhgYPPz0/Y0qR/CUYC+nybPviapXCbtBGq1cX22cizaQrBiyk0u7Zu/OrMoQj4JXRp6vlq/N3Z7uCrWQoJiysPAwkZ2dn2+cXp1dXVwgI/t/pxfk2/BAGB1HhgaT/Axe2xKUIbbklAAAAAElFTkSuQmCC"
            alt="Avatar"
            class="profile_image"
          />
          <h3 style="display: flex;">
            {{user.displayName}}
            <span v-show="feeling" style="margin-left: 10px">
              is feeling
              <b>{{feeling}}</b>
            </span>
          </h3>
        </div>
        <br />

        <textarea
          type="text"
          class="center"
          placeholder="What's on your mind?"
          v-model="description"
          required
          style="width: 100%;"
          ref="textarea"
        />
        <div v-if="imageURL" style="width : 100%; height : 200px;margin-top: 20px">
          <img :src="imageURL" alt="preview" style="height:100%; width: 100%" />
        </div>

        <br />
        <br />
        <br />
        <div class="post_activity">
          <div class="photo_upload" @click="onPickFile">
            <p>photo</p>
            <input
              type="file"
              name
              accept="image"
              style="display:none"
              ref="fileInput"
              @change="onFilePicked"
            />
          </div>
          <div class="feeling">
            <p>feeling</p>
            <select id="slct" v-model="feeling">
              <option value=" happy">happy</option>
              <option value=" sad">sad</option>
              <option value=" wonderful">wonderful</option>
              <option value=" alone">alone</option>
              <option value=" special">special</option>
              <option value=" motivated">motivated</option>
            </select>
          </div>
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
      image: null,
      feeling: ""
    };
  },
  mounted() {
    this.$refs.textarea.focus();
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
        username: this.$store.getters.user.displayName,
        description: this.description,
        position: this.$store.getters.user.position,
        feeling: this.feeling,
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

<style scoped>
.photo_upload,
.feeling {
  text-align: center;
  padding: 8px 20px;
  display: flex;
  width: 48%;
  height: 100%;
  border-radius: 40px;
  background: rgba(136, 151, 137, 0.445);
  display: flex;
}
.photo_upload {
  padding: 8px 60px;
}

.post_activity {
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
}
::placeholder {
  color: grey;
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
textarea {
  border: none;
  background-color: none;
  outline: 0;
  font-size: 15px;
  width: 300px;
  height: 50px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
textarea::-webkit-scrollbar {
  display: none;
}

textarea:focus {
  border: none;
  background-color: none;
  outline: 0;
  width: 300px;
  height: 30px;
}
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
