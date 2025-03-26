import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isContentActive: false
  },
  mutations: {
    SET_CONTENT_ACTIVE(state, active) {
      state.isContentActive = active
    }
  },
  actions: {
    setContentActive({ commit }, active) {
      commit('SET_CONTENT_ACTIVE', active)
    }
  },
  getters: {
    isContentActive: state => state.isContentActive
  }
}) 