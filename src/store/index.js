import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';
import * as users from '@/store/modules/users.js'
import * as posts from '@/store/modules/posts.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    users,
    posts
  },
  state: {
    meetUps: [],
    user: null,
    loading: false,
    error: null,
  },
  mutations: {

    SET_USER(state, payload) {
      state.user = payload;
    },

    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    SET_LOADED_MEETUP(state, payload) {
      state.meetUps = payload;
    },
    CHANGE_USER_PROFILE_PIC(state, payload) {
      state.user.profileUrl = payload.url;

      const filteredValue = (data) => {
        return data.filter(function (meetup){
          return meetup.creatorId == payload.userId
        })
      }

      const toChange = filteredValue(state.meetUps);

      // console.log(toChange);

      toChange.forEach(element => {
        element.profileUrl = payload.url
      });
    },


  },
  actions: {
    autoSignIn({ commit }, payload) {
      commit('SET_USER', { id: payload.uid, position: "User", displayName: payload.providerData[0].displayName, profileUrl : payload.photoURL, registeredMeetups: [] })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('SET_USER', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    }
  }
})