import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchKeyword: ''
  },
  mutations,
  actions: {
  },
  modules: {
  }
})
