<template>
  <SfModal
    :visible="visible"
    overlay
    cross
    @close="$emit('change', false)">
    <transition-group name="fade">
      <Login
        v-if="active === 'login'"
        key="login"
        @change="active = $event" />
      <Register
        v-if="active === 'register'"
        key="register"
        @change="active = $event" />
      <Reset
        v-if="active === 'reset'"
        key="reset"
        @change="active = $event" />
    </transition-group>
  </SfModal>
</template>

<script>
// Components
import { SfModal } from '@storefront-ui/vue'
import Login from './Login'
import Register from './Register'
import Reset from './Reset'

export default {
  components: { SfModal, Login, Register, Reset },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    active: 'login'
  })
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
