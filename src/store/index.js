import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetUps: [],
    user: null,
    loading: false,
    error: null,
    myProfile: [],
    userDatabase : []
  },
  mutations: {
    CREATE_NEW_MEETUP(state, payload) {
      state.meetUps.push(payload);
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    STORE_USER_IN_DATABASE(state,payload){
   
      state.userDatabase.push(payload);
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
    CHANGE_USER_PROFILE(state, payload) {

      const filteredValue = (data) => {
        return data.filter(function (meetup) {
          return meetup.creatorId == payload.userId;
        })
      }
      const toChange = filteredValue(state.meetUps);

      toChange.forEach(element => {
        element.owner = payload.userName
      });
    },
    LOAD_PROFILE_POST(state, payload) {
        state.myProfile.push(payload.data);
    }
  },
  actions: {
    loadUser({commit}){
      firebase.database().ref('users').once('value')
      .then((data) => {
        const users = [];
        const obj = data.val();
        for(let key in obj){
          users.push({
            userName : obj[key].userName,
            email : obj[key].email
          })
        }
        commit('STORE_USER_IN_DATABASE',users)
      })
      .catch((err)=> {
        console.log(err);
      })
    },
    loadMeetUps({ commit }) {
      firebase.database().ref('posts').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              petName : obj[key].petName,
              petAge : obj[key].petAge,
              phNum : obj[key].phNum,
              address : obj[key].address,
              email : obj[key].email,
              gender : obj[key].gender,
              genetic : obj[key].genetic,
              description: obj[key].description,
              imgURL: obj[key].imageUrl,
              owner: obj[key].owner,
              position: obj[key].position,
              createdTime: obj[key].createdTime,
              creatorId: obj[key].createorId
            })
          }
          commit('SET_LOADED_MEETUP', meetups);
        })
        .catch(error => console.log(error))
    },
    createNewMeetup({ commit, getters }, payload) {

      const newMeetUp = {
        owner: payload.username,
        petName : payload.petName,
        petAge : payload.petAge,
        genetic : payload.genetic,
        gender : payload.gender,
        phNum : payload.phNum,
        address : payload.address,
        description: payload.description,
        position: payload.position,
        email : payload.email,
        createorId: getters.user.id,
        createdTime: payload.createdTime.toString()
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
      //add user to database
      const newUserDatabase = {
        userName : payload.username,
        email : payload.email
      }
      firebase.database().ref('users').push(newUserDatabase)
      .then(()=> {
        commit('STORE_USER_IN_DATABASE',newUserDatabase);
      })

      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            user.user
              .updateProfile({
                displayName: payload.username,

              })
              .then(() => {
                const newUser = {
                  id: user.user.uid,
                  position: "User",
                  displayName: user.user.providerData[0].displayName,
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
              position: user.user.N[0].position,
              displayName: user.user.providerData[0].displayName,
              registeredMeetups: []
            }

            commit('SET_USER', newUser)
          }
        ).catch(error => {
          commit('SET_ERROR', error)
        })
    },
    autoSignIn({ commit }, payload) {
      commit('SET_USER', { id: payload.uid, position: "User", displayName: payload.providerData[0].displayName, registeredMeetups: [] })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('SET_USER', null)
    },
    changeuserprofile({ commit }, payload) {
      firebase.database().ref('posts').orderByChild("createorId").equalTo(payload.userId).on("child_added", function (data) {
        data.ref.update({
          owner: payload.userName
        });
      });
      commit('CHANGE_USER_PROFILE', payload)
    },
    loadMyProfilePost({ commit }, payload) {

      firebase.database().ref('posts').orderByChild("createorId").equalTo(payload).on("child_added", function (data) {

    

        const arrayOption = {
          data : data.val()
        }
        commit('LOAD_PROFILE_POST',arrayOption);
      });

    }
  },
  modules: {
  },
  getters: {
    loadUser(state){
      return state.userDatabase;
    },
    loadMeetUps(state) {
      return state.meetUps.slice().reverse();
    },
    loadMeetUp(state) {
      return (meetupid) => {
        return state.meetUps.find((meetup) => {
          return meetup.id == meetupid;
        })
      }
    },
    loadProfilePost(state) {
      return state.myProfile
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    }
  }
})