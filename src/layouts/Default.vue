<template>
  <div class="container-fluid">
    <notifications />
    <Navbar />
    <Sidebar />
    <section class="section">
      <slot />
    </section>
  </div>
</template>

<script>
// Components
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default {
  components: { Navbar, Sidebar }
}
</script>

<style lang="scss" scoped>
.container {
  padding: var(--spacer-lg) var(--spacer-2xl);
  max-width: 1240px;
}
</style>
