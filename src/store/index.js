import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetUps: [

    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    CREATE_NEW_MEETUP(state, payload) {
      state.meetUps.push(payload);
    },
    SET_USER(state, payload) {
      console.log(payload);
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
    }
  },
  actions: {
    loadMeetUps({ commit }) {
      firebase.database().ref('posts').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              description: obj[key].description,
              imgURL: obj[key].imageUrl,
              owner: obj[key].owner,
              time: obj[key].time,
              creatorId: obj[key].creatorId
            })
          }
          commit('SET_LOADED_MEETUP', meetups);
        })
        .catch(error => console.log(error))
    },
    createNewMeetup({ commit, getters }, payload) {
      console.log("From store" + payload.username);
      const newMeetUp = {
        owner: payload.username,
        time: 'Just now',
        // imgURL: payload.imageURL,
        description: payload.description,
        createorId: getters.user.id
      }
      let imageUrl
      let key
      let ext
      firebase.database().ref('posts').push(newMeetUp)
        .then((data) => {
          key = data.key;
          return key
        })
        .then(key => {
          const filename = payload.image.name
          ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          console.log(fileData);
          return firebase.storage().ref('meetups/' + key + '.' + ext).getDownloadURL()
        })
        .then(URL => {
          imageUrl = URL
          console.log(imageUrl)
          return firebase.database().ref('posts').child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('CREATE_NEW_MEETUP', {
            ...newMeetUp,
            imageUrl: imageUrl,
            id: key
          });
        })
        .catch((error) => {
          console.log(error);
        })
    },
    signUserUp({ commit }, payload) {

      commit('CLEAR_ERROR')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
         user => {
           user.user
             .updateProfile({
               displayName: payload.username
             })
             .then(()=>{
               const newUser = {
                 id: user.user.uid,
                 username : user.user.providerData[0].displayName,
                 registeredMeetups: []
               }
               commit('SET_USER', newUser)

             })



         }
       )
       .catch(error => {
          commit('SET_ERROR', error)
        })
    },
    signUserIn({ commit }, payload) {
      commit('CLEAR_ERROR')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.user.uid,
              name : user.user.displayName,
              registeredMeetups: []
            }
            commit('SET_USER', newUser)
          }
        ).catch(error => {
          commit('SET_ERROR', error)
        })
    },
    autoSignIn({ commit }, payload) {
      commit('SET_USER', { id: payload.uid, registeredMeetups: [] })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('SET_USER', null)
    }
  },
  modules: {
  },
  getters: {
    loadMeetUps(state) {
      return state.meetUps;
    },
    loadMeetUp(state) {
      return (meetupid) => {
        return state.meetUps.find((meetup) => {
          return meetup.id == meetupid;
        })
      }
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    }
  }
})
