<template>
  <div>
    <notifications />
    <Navbar />
    <Sidebar />
    <slot />
    <Footer />
  </div>
</template>

<script>
// Components
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default {
  components: { Navbar, Sidebar, Footer }
}
</script>

<style lang="scss" scoped>
.container {
  padding: var(--spacer-lg) var(--spacer-2xl);
  max-width: 1240px;
}
</style>
