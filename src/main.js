import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import Antd from 'ant-design-vue';
import Alert from './components/share/Alert'
import VueTimeago from 'vue-timeago'
import VueSweetalert2 from 'vue-sweetalert2';
import fb from './firebase/init'
import VueChatScroll from 'vue-chat-scroll';


import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(Vuetify);
Vue.use(VueSweetalert2);
Vue.use(VueChatScroll);
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
  vuetify : new Vuetify({
    icons: {
      iconfont: 'md'
    }
  }),
  router,
  store,
  render: h => h(App),
  created() {
      fb.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$store.dispatch('autoSignIn', user);
          this.$store.dispatch('users/autoSignIn', user);
          this.$store.dispatch('users/loadMyProfilePost', user.uid);

        }
      })
    this.$store.dispatch('posts/loadFeeds');
    this.$store.dispatch('users/loadUser');
  }
}).$mount('#app')
