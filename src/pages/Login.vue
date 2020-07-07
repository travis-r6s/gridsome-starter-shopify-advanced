<template>
  <Layout>
    <notifications
      group="auth"
      position="top center" />
    <transition-group name="fade">
      <LoginForm
        v-if="form ==='login'"
        key="login"
        @change="form = $event" />
      <RegisterForm
        v-if="form ==='register'"
        key="register"
        @change="form = $event" />
      <ResetForm
        v-if="form ==='reset'"
        key="reset"
        @change="form = $event" />
    </transition-group>
  </Layout>
</template>

<script>
// Components
import LoginForm from '@/components/Login/Login'
import RegisterForm from '@/components/Login/Register'
import ResetForm from '@/components/Login/Reset'

export default {
  name: 'Login',
  components: { LoginForm, RegisterForm, ResetForm },
  data: () => ({
    form: 'login'
  })
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
