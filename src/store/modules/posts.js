import * as firebase from 'firebase';

export const namespaced = true

export const state = {
      feeds: []
}

export const mutations = {
  CREATE_NEW_FEED(state, payload) {
    state.feeds.push(payload);
  },
  SET_LOADED_FEEDS(state, payload) {
    state.feeds = payload;
  },
}

export const actions = {
  createNewFeed({ commit }, payload) {
    const newFeed = {
      owner: payload.username,
      profileUrl : payload.profileUrl,
      title : payload.title,
      description: payload.description,
      position: payload.position,
      createorId: firebase.auth().currentUser.uid,
      createdTime: payload.createdTime.toString()
    }
    

    let imageUrl
    let key
    let ext
    firebase.database().ref('posts').push(newFeed)
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
        commit('CREATE_NEW_FEED', {
          ...newFeed,
          imageUrl: imageUrl,
          id: key
        });
      })
      .catch((error) => {
        console.log(error);
      })
  },

  //load posts
  loadFeeds({ commit }) {
    firebase.database().ref('posts').once('value')
      .then((data) => {
        const feeds = [];
        const obj = data.val()
        for (let key in obj) {
          feeds.push({
            id: key,
            profileUrl : obj[key].profileUrl,
            title : obj[key].title,
            description: obj[key].description,
            imgURL: obj[key].imageUrl,
            owner: obj[key].owner,
            position: obj[key].position,
            createdTime: obj[key].createdTime,
            creatorId: obj[key].createorId
          })
        }
        commit('SET_LOADED_FEEDS', feeds);
      })
      .catch(error => console.log(error))
  },
}


export const getters = {
  loadFeeds(state) {
    return state.feeds.slice().reverse();
  },
  loadFeed(state) {
    return (meetupid) => {
      return state.feeds.find((meetup) => {
        return meetup.id == meetupid;
      })
    }
  },
}
