import { createStore } from 'vuex'

export default createStore({
  state: {
    dados: {
      cpfAccess: null,
      nameAccess: null,
      idAccess: null,
      saldoAccess: null
    }
  },
  getters: {
  },
  mutations: {
    AccessUser(state, data) {
      state.dados = data
    }
  },
  actions: {
  },
  modules: {
  }
})
