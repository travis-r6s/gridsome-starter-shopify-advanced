// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Plugins
import Notifications from 'vue-notification/dist/ssr.js'
import VueApollo from 'vue-apollo'
import createStore from './store'

// Dependencies
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'

// Styles
import '@storefront-ui/vue/styles.scss'

export default function (Vue, { appOptions, isClient, router }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Import global plugins
  Vue.use(Notifications)
  Vue.use(VueApollo)

  // Create Apollo client
  const apolloClient = new ApolloClient({
    fetch,
    uri: `https://${process.env.GRIDSOME_SHOPIFY_STOREFRONT}.myshopify.com/api/2020-10/graphql.json`,
    headers: {
      'X-Shopify-Storefront-Access-Token': process.env.GRIDSOME_SHOPIFY_STOREFRONT_TOKEN
    }
  })

  // Add client to vue-apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient
  })

  // Add provider to vue app
  appOptions.apolloProvider = apolloProvider

  // Add Vuex store
  const store = createStore(Vue, { isClient })
  appOptions.store = store

  // Authentication & Route handling
  if (isClient) {
    router.beforeEach((to, from, next) => {
      const tokenExists = store.getters.isAuthenticated
      if (to.path.includes('/account') && !tokenExists) next('/login')
      else if (to.path.includes('/login') && tokenExists) next('/')
      else next()
    })
  }
}
