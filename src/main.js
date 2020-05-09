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
import VueTimeago from 'vue-timeago'
import VueSweetalert2 from 'vue-sweetalert2';

import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueSweetalert2);
Vue.component('app-alert', Alert);


Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})
Vue.use(VueMaterial)
var sliceWord = function (text, length, clamp) {
  clamp = clamp || '...';
  var node = document.createElement('div');
  node.innerHTML = text;
  var content = node.textContent;
  return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', sliceWord);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
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
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('autoSignIn', user);
          this.$store.dispatch('loadMyProfilePost', user.uid);

        }
      })
    this.$store.dispatch('loadMeetUps');
    this.$store.dispatch('loadUser');
  }
}).$mount('#app')
