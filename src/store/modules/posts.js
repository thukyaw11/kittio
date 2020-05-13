import * as firebase from 'firebase';

export const namespaced = true

export const state = {
      meetUps: []
}

export const mutations = {
  CREATE_NEW_MEETUP(state, payload) {
    state.meetUps.push(payload);
  },
  SET_LOADED_MEETUP(state, payload) {
    state.meetUps = payload;
  },
}

export const actions = {
  createNewMeetup({ commit }, payload) {
    const newMeetUp = {
      owner: payload.username,
      petName: payload.petName,
      profileUrl : payload.profileUrl,
      petAge: payload.petAge,
      genetic: payload.genetic,
      gender: payload.gender,
      phNum: payload.phNum,
      address: payload.address,
      description: payload.description,
      position: payload.position,
      email: payload.email,
      createorId: firebase.auth().currentUser.uid,
      createdTime: payload.createdTime.toString()
    }
    console.log(newMeetUp);

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

  //load posts
  loadMeetUps({ commit }) {
    firebase.database().ref('posts').once('value')
      .then((data) => {
        const meetups = [];
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            petName: obj[key].petName,
            profileUrl : obj[key].profileUrl,
            petAge: obj[key].petAge,
            phNum: obj[key].phNum,
            address: obj[key].address,
            email: obj[key].email,
            gender: obj[key].gender,
            genetic: obj[key].genetic,
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
}


export const getters = {
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
}
