import * as firebase from 'firebase';

export const namespaced = true

export const state = {
  user: null,
  userDatabase: [],
  myProfile: []
}

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  STORE_USER_IN_DATABASE(state, payload) {
    state.userDatabase.push(payload);
  },
  LOAD_PROFILE_POST(state, payload) {
    state.myProfile.push(payload.data);
  },
  CHANGE_USER_PROFILE(state, payload) {
    const filteredValue = (data) => {
      return data.filter(function (meetup) {
        return meetup.creatorId == payload.userId;
      })

    }
    const toChange = filteredValue(this.state.posts.feeds);

    toChange.forEach(element => {
      element.owner = payload.userName
    });
  },
  CHANGE_USER_PROFILE_PIC(state, payload) {
    this.state.user.profileUrl = payload.url;

    const filteredValue = (data) => {
      return data.filter(function (meetup) {
        return meetup.creatorId == payload.userId
      })
    }

    const toChange = filteredValue(this.state.posts.feeds);

    toChange.forEach(element => {
      element.profileUrl = payload.url
    });
  },

}

export const actions = {

  // user sign in
  signUserIn({ commit }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.user.uid,
            position: "User",
            displayName: user.user.providerData[0].displayName,
            profileUrl: user.user.photoURL
          }


          commit('SET_USER', newUser)
        }
      ).catch(error => {
        console.log(error);
      })
  },
  autoSignIn({ commit }, payload) {
    commit('SET_USER', { id: payload.uid, position: "User", displayName: payload.providerData[0].displayName, profileUrl: payload.photoURL })
  },

  //user sign up
  signUserUp({ commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          user.user.updateProfile({
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
            .then(() => {
              //add user to database
              const newUserDatabase = {
                userName: payload.username,
                email: payload.email,
                creatorId: user.user.uid
              }
              firebase.database().ref('users').push(newUserDatabase)
                .then(() => {
                  commit('STORE_USER_IN_DATABASE', newUserDatabase);
                })
            })
        }
      )
      .catch(error => {
        console.log(error)
      })
  },

  //load users
  loadUser({ commit }) {
    firebase.database().ref('users').once('value')
      .then((data) => {
        const users = [];
        const obj = data.val();
        for (let key in obj) {
          users.push({
            userName: obj[key].userName,
            email: obj[key].email,
            creatorId: obj[key].creatorId,
            profileUrl: obj[key].profileUrl
          })
        }
        commit('STORE_USER_IN_DATABASE', users)
      })
      .catch((err) => {
        console.log(err);
      })
  },
  //load profile posts
  loadMyProfilePost({ commit }, payload) {
    firebase.database().ref('posts').orderByChild("createorId").equalTo(payload).on("child_added", function (data) {
      const arrayOption = {
        data: data.val()
      }
      commit('LOAD_PROFILE_POST', arrayOption);
    });
  },
  //change user profile name
  changeuserprofile({ commit }, payload) {
    firebase.database().ref('posts').orderByChild("createorId").equalTo(payload.userId).on("child_added", function (data) {
      data.ref.update({
        owner: payload.userName
      });
    })

    firebase.database().ref('users').orderByChild("createorId").equalTo(payload.userId).on("child_added", function (data) {
      data.ref.update({
        userName: payload.userName
      });
    })
    commit('CHANGE_USER_PROFILE', payload)
  },
  //change user profile picture
  changeProfilePicture({ commit }, payload) {
    console.log(commit);
    let key
    let ext
    let imageUrl
    firebase.database().ref('users').push(payload.image)
      .then((data) => {
        key = data.key;
        return key
      })
      .then(key => {
        const filename = payload.image.name
        ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('userProfiles/' + key + ext).put(payload.image)
      })
      .then(fileData => {
        console.log(fileData);
        return firebase.storage().ref('userProfiles/' + key + ext).getDownloadURL()
      })
      .then(URL => {
        imageUrl = URL
        firebase.database().ref('users').orderByChild("creatorId").equalTo(payload.userId).on("child_added", function (data) {
          data.ref.update({
            profileUrl: imageUrl
          });
        })
        let currentUser = firebase.auth().currentUser;
        currentUser.updateProfile({
          photoURL: imageUrl
        });
        return imageUrl;
      })
      .then((url) => {
        firebase.database().ref('posts').orderByChild("createorId").equalTo(payload.userId).on("child_added", function (data) {
          data.ref.update({
            profileUrl: url
          });
        })
        const user_pp_pic = {
          userId: firebase.auth().currentUser.uid,
          url: url
        }
        commit('CHANGE_USER_PROFILE_PIC', user_pp_pic)
      })



  },

}

export const getters = {
  user(state) {
    return state.user
  },
  loadUser(state) {
    return state.userDatabase;
  },
  loadProfilePost(state) {
    return state.myProfile
  },
}
