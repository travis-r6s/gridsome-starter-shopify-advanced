<template>
  <div>
    <notifications />
    <Navbar @change="isAuthVisible = $event" />
    <AuthModal
      :visible="isAuthVisible"
      @change="isAuthVisible = $event" />
    <Sidebar />
    <slot />
    <Footer />
  </div>
</template>

<script>
// Components
import Navbar from '@/components/Navbar'
import AuthModal from '@/components/Login/Modal'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

// Packages
import cookie from 'cookie'

export default {
  components: { Navbar, AuthModal, Sidebar, Footer },
  data: () => ({ isAuthVisible: false }),
  mounted () {
    const { shopifyToken } = cookie.parse(document.cookie)
    if (shopifyToken) this.$store.dispatch('login', shopifyToken)
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1240px;
  padding: var(--spacer-lg) var(--spacer-2xl);
  margin: auto;
}
</style>
