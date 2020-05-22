export const namespaced = true

export const state = {
      currentChannel : 'messages',
      messages : []
}


export const mutations = {
    CHANGE_CHANNEL(state, payload){
        console.log(state.currentChannel);
        state.currentChannel = payload     
    }
}

export const actions = {
    changeChannel({commit}, payload){
        commit('CHANGE_CHANNEL',payload)
    }
}

export const getters = {
    currentChannel(state){
        return state.currentChannel;
    }
}