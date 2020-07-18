import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultActive: "3-1",
  
  },
  getter:{
    doneTodos: state => {
        return state.defaultActive
      }
  },
  actions: {}
})
