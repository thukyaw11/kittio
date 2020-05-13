<template>
  <div>
    <br />
    <a-row>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="8"></a-col>
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="8" style="font-family: 'Roboto', sans-serif;">
        <md-card class="md-elevation-0">
          <md-card-media v-if="loadMeetup.imgURL">
            <img :src="loadMeetup.imgURL" alt="People" />
          </md-card-media>

          <md-card-media v-else>
            <img src="https://i.pinimg.com/originals/1a/e0/90/1ae090fce667925b01954c2eb72308b6.gif" alt="">
          </md-card-media>

          <md-card-content>
            <md-list>
              <!-- <md-list-item>
                <md-avatar>

                </md-avatar>

                <div class="md-title"></div>


              </md-list-item>-->
              <!-- <h3>}</h3> -->
              <md-list-item>
                <md-avatar>
                  <img :src="loadMeetup.profileUrl" alt="" v-if="loadMeetup.profileUrl">
                  <img v-else
                    src="https://images.unsplash.com/photo-1521988597352-a2c0b9e9108f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                    alt="Avatar"
                  />
                </md-avatar>

                <span class="md-list-item-text">
                  {{loadMeetup.owner}}
                  <div class="md-subhead">
                    <timeago :datetime="loadMeetup.createdTime"></timeago>
                  </div>
                </span>
                <a :href="`tel:${loadMeetup.phNum}`">
                  <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-accent">call</md-icon>
                  </md-button>
                </a>
                <a :href="`mailto:${loadMeetup.email}`">
                  <md-button class="md-icon-button md-list-action">
                    <md-icon class="md-accent">email</md-icon>
                  </md-button>
                </a>
              </md-list-item>
              <br />
              <md-list-item>
                ကြောင်အမည်
                <span>{{loadMeetup.petName}} ({{loadMeetup.gender}})</span>
              </md-list-item>
              <md-list-item>
                မျိုးရိုး
                <span>{{loadMeetup.genetic}}</span>
              </md-list-item>
              <md-list-item>
                အသက်
                <span>{{loadMeetup.petAge}}နှစ်</span>
              </md-list-item>
            </md-list>

            <div class="additional">
              <h3>
                <b>လိပ်စာ</b>
              </h3>
              <p>{{loadMeetup.address}}</p>
            </div>
            <hr />
            <div class="additional">
              <h3>
                <b>အကြောင်းအရာ</b>
              </h3>
              <p>{{loadMeetup.description}}</p>
            </div>
          </md-card-content>
        </md-card>
      </a-col>
      <a-col :xs="0" :sm="6" :md="6" :lg="6" :xl="8"></a-col>
    </a-row>
    <md-button
      class="md-fab md-plain"
      style="float: right;position: fixed; bottom : 30px; right: 30px"
      router
      to="/meetups"
    >
      <md-icon>chevron_left</md-icon>
    </md-button>
  </div>
</template>


<script>
import store from '@/store/index'
export default {
  props: ["id"],
  computed: {
    loadMeetup() {
      return store.getters['posts/loadMeetUp'](this.id);
    }
  }
};
</script>

<style>
.additional {
  padding: 13px;
}
</style>
