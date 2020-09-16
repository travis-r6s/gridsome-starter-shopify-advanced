// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Plugins
import Notifications from 'vue-notification/dist/ssr.js'
import GraphQL from './graphql'
import createStore from './store'

// Styles
import '@storefront-ui/vue/styles.scss'

export default function (Vue, { appOptions, isClient, router }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  // Import global plugins
  Vue.use(Notifications)
  Vue.use(GraphQL)

  // Add Vuex store
  const store = createStore(Vue, { isClient })
  appOptions.store = store

  // Authentication & Route handling
  if (isClient) {
    router.beforeEach((to, from, next) => {
      const tokenExists = store.getters.isAuthenticated
      if (to.path.includes('/account') && !tokenExists) next('/')
      else next()
    })
  }
}
