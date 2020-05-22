import moment from 'moment';
import fb from "@/firebase/init";
import store from '../index'

export const namespaced = true

export const state = {
      currentChannel : 'messages',
      messages : []
}


export const mutations = {
    CHANGE_CHANNEL(state, payload){
        state.messages = [];
        state.currentChannel = payload     
    },
    LOAD_MESSAGES(state){
        state.messages = [];
        let ref = fb
          .firestore()
          .collection(state.currentChannel)
          .orderBy("timestamp");
    
        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              let doc = change.doc;
              state.messages.push({
                id: doc.id,
                name: doc.data().name,
                message: doc.data().message,
                timestamp: moment(doc.data().timestamp).format("LTS")
              });
            }
          });
        });
    
    },
    ON_CREATE_MESSAGE(state,payload){
     
        if (payload) {
            fb.firestore()
              .collection(state.currentChannel)
              .add({
                message: payload,
                name: store.getters['users/user'].displayName,
                timestamp: Date.now()
              })
              .then(() => {
                console.log("sent");
              })
              .catch(err => {
                console.log(err);
              });
          }
    }
}

export const actions = {
    changeChannel({commit}, payload){
        commit('CHANGE_CHANNEL',payload)
    },
    loadMessages({commit}){
        commit('LOAD_MESSAGES');   
    },
    onCreateMessage({commit} ,payload){
        commit('ON_CREATE_MESSAGE',payload);
    }
}

export const getters = {
    currentChannel(state){
        return state.currentChannel;
    },
    messages(state){
        return state.messages;
    }
}