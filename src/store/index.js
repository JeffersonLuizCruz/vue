import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: {},
        access: {},
        avatar: {}
        
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        setAccess(state, payload) {
            state.access = payload
        },
        setAvatar(state, payload) {
            state.avatar = payload
        }
    },
    actions: {
        setUser(context, payload) {
            context.commit('setUser', payload)
        },
        setAccess(context, payload) {
            context.commit('setAccess', payload)
        },
        setAvatar(context, payload) {
            context.commit('setAvatar', payload)
        }

    },
    getters: {
        getUser(state) {
            return state.user
        },
        getAccess(state) {
            return state.access
        },
        getAvatar(state) {
            return state.avatar
        }
    },

})  
