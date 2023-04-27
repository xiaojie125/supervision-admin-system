import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import app from './modules/app'
import personal from './modules/personal'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // app,
    personal,
    user
  },
  getters
})

export default store
