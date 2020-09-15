<template>
  <SfHeader
    :title="metadata.siteName"
    :cart-items-qty="cartItems"
    @click:cart="cart"
    @click:account="login">
    <template #logo>
      <g-link
        to="/"
        class="navbar-item">
        <g-image
          src="../favicon.png"
          width="28"
          height="28"
          alt="Gridsome Logo" />
      </g-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem
        v-for="(item, i) in navigation"
        :key="i">
        <template slot="desktop-navigation-item">
          <g-link
            :to="item.path"
            style="width: max-content;">
            {{ item.title }}
          </g-link>
        </template>
      </SfHeaderNavigationItem>
    </template>
    <template #search>
      <div>
        <SfSearchBar
          v-model="searchTerm"
          placeholder="Search for items" />
        <SfMegaMenu
          :visible="!!searchTerm.length && !!searchResults.length"
          title="Search Results"
          style="z-index: 10;"
          is-absolute>
          <SfMegaMenuColumn
            v-for="(chunk, i) in searchResults"
            :key="i">
            <SfList>
              <SfListItem
                v-for="({ id, node, path }) in chunk"
                :key="id">
                <SfMenuItem
                  :label="node.title"
                  :link="path" />
              </SfListItem>
            </SfList>
          </SfMegaMenuColumn>
        </SfMegaMenu>
      </div>
    </template>
  </SfHeader>
</template>

<script>
// Components
import { SfHeader, SfSearchBar, SfMegaMenu, SfList, SfMenuItem } from '@storefront-ui/vue'

export default {
  components: { SfHeader, SfSearchBar, SfMegaMenu, SfList, SfMenuItem },
  data: () => ({
    searchTerm: ''
  }),
  computed: {
    metadata () { return this.$static.metadata },
    navigation () {
      const pages = this.$static.allShopifyPage.edges.map(({ node }) => node)
      const home = { title: 'Home', path: '/' }
      const collections = { title: 'Collections', path: '/collections' }
      return [home, collections, ...pages]
    },
    isAuthenticated () { return this.$store.getters.isAuthenticated },
    cartItems () { return this.$store.state.cart.length.toString() },
    searchResults () {
      const searchTerm = this.searchTerm
      if (searchTerm.length < 1) return []

      const results = this.$search.search({ query: searchTerm, limit: 15, suggest: true })
      return Array.from({ length: Math.ceil(results.length / 5) }, (v, i) =>
        results.slice(i * 5, i * 5 + 5)
      )
    }
  },
  watch: {
    $route (to, from) {
      this.searchTerm = ''
    }
  },
  methods: {
    login () {
      if (this.isAuthenticated) return this.$router.push('/account')
      return this.$emit('change', true)
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    },
    cart () {
      this.$store.commit('updateSidebar', true)
    }
  }
}
</script>

<static-query>
query {
  metadata {
    siteName
    siteDescription
    siteUrl
  }
  allShopifyPage {
    edges {
      node {
        title
        path
      }
    }
  }
}
</static-query>
