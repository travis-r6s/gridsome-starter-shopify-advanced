// Plugins
import currency from 'currency.js'
import Vuex from 'vuex'

export default function createStore (Vue, { isClient }) {
  // Use Vuex plugin
  Vue.use(Vuex)

  // Create Vuex store
  const store = new Vuex.Store({
    state: {
      cart: [],
      token: '',
      sidebarVisible: false
    },
    mutations: {
      updateCart: (state, cart) => { state.cart = cart },
      setToken: (state, token) => { state.token = token },
      updateSidebar: (state, active) => { state.sidebarVisible = active }
    },
    actions: {
      addToCart: ({ state, commit }, newItem) => {
        const cart = state.cart
        const itemExists = cart.find(item => item.variantId === newItem.variantId)

        if (itemExists) itemExists.qty += newItem.qty
        else cart.push(newItem)

        const updatedCart = cart.map(item => {
          const total = currency(item.price, { formatWithSymbol: true, symbol: '£' }).multiply(item.qty).format()
          return { ...item, total }
        })

        commit('updateCart', updatedCart)
      },
      updateItemQty: ({ state, commit }, { variantId, qty }) => {
        const cart = state.cart
        const item = cart.find(item => item.variantId === variantId)

        item.qty = qty
        item.total = currency(item.price, { formatWithSymbol: true, symbol: '£' }).multiply(qty).format()

        commit('updateCart', cart)
      },
      removeFromCart: ({ state, commit }, itemId) => {
        const cart = state.cart
        const updatedCart = cart.filter(item => item.variantId !== itemId)

        commit('updateCart', updatedCart)
      },
      login: ({ commit }, token) => {
        commit('setToken', token)
      },
      logout: ({ commit }) => {
        commit('setToken', {})
        commit('updateCart', [])
      }
    },
    getters: {
      cart: ({ cart }) => cart,
      isSidebarVisible: ({ sidebarVisible }) => sidebarVisible,
      isAuthenticated: ({ token }) => !!token.accessToken,
      accessToken: ({ token }) => token.accessToken,
      isAddedToCart: ({ cart }) => id => !!cart.find(({ variantId }) => variantId === id),
      cartTotal: ({ cart }) => cart.reduce((total, item) => total.add(currency(item.price).multiply(item.qty)), currency(0, { formatWithSymbol: true, symbol: '£' }))
    }
  })

  return store
}
