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
