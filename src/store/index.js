import { createStore } from 'vuex'
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
import createPersistedstate from 'vuex-persistedstate'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    category,
    cart,
    user
  },
  plugins: [
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    })
  ]
})
