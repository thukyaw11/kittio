import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Antd from 'ant-design-vue';
import * as firebase from 'firebase';
import Alert from './components/share/Alert'

import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.component('app-alert',Alert);

  

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyBac5NaU_4-4nxN7VQ-ORTloNMUhm30LXs",
      authDomain: "dev-meet-1a9ef.firebaseapp.com",
      databaseURL: "https://dev-meet-1a9ef.firebaseio.com",
      projectId: "dev-meet-1a9ef",
      storageBucket: "gs://dev-meet-1a9ef.appspot.com",
      messagingSenderId: "413274064631",
      appId: "1:413274064631:web:d47ee57dc4ed4b8ba675f2",
      measurementId: "G-5J8GMW2V60"
    }),
    firebase.auth().onAuthStateChanged((user)=> {
      if(user){
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetUps');
  }
}).$mount('#app')
