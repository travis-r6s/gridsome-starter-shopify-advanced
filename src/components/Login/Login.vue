<template>
  <div>
    <SfHeading
      :level="3"
      title="Login" />
    <br>
    <form
      class="form"
      @submit.prevent="login">
      <SfInput
        v-model="user.email"
        type="email"
        label="Email Address"
        name="email"
        required />
      <SfInput
        v-model="user.password"
        type="password"
        label="Password"
        name="password"
        has-show-password
        required />
      <br>
      <SfButton
        class="sf-button--full-width loading-button"
        type="submit">
        <SfLoader
          class="loader"
          :loading="isLoading">
          <span>Login</span>
        </SfLoader>
      </SfButton>
    </form>
    <div class="modal-bottom">
      <SfButton
        class="sf-button--text"
        @click="$emit('change', 'reset')"
        @keyup.enter.space="$emit('change', 'reset')">
        Forgotten Password?
      </SfButton>
      <br>
      <div class="modal-bottom--aside">
        <SfHeading
          title="Don't have an account yet?"
          :level="4" />
        <br>
        <SfButton
          class="sf-button--text"
          @click="$emit('change', 'register')"
          @keyup.enter.space="$emit('change', 'register')">
          Register
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import { SfHeading, SfInput, SfButton, SfLoader } from '@storefront-ui/vue'

// GraphQL
import { LoginMutation } from '@/graphql/auth'

export default {
  name: 'Login',
  components: { SfHeading, SfInput, SfButton, SfLoader },
  data: () => ({
    isLoading: false,
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    async login () {
      const user = this.user
      this.isLoading = true

      try {
        const { customerAccessTokenCreate } = await this.$graphql.request(LoginMutation, { input: user })
        const { customerAccessToken, customerUserErrors } = customerAccessTokenCreate

        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
        }

        await this.$store.dispatch('login', customerAccessToken.accessToken)
        this.$router.push('/account')
      } catch (error) {
        console.error(error)
        this.isLoading = false

        this.$notify({
          group: 'auth',
          title: error.message,
          type: 'error'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-button {
  height: 51px;

  .loader {
    --loader-spinner-stroke: var(--c-light);
    --loader-overlay-background: var(--c-primary);
  }
}

.modal-bottom {
  margin: var(--spacer-lg) 0;
  text-align: center;

  &--aside {
    --heading-title-color:var(--c-primary);

    margin-top: var(--spacer-lg);
    text-align: center;
  }
}
</style>
