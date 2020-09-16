<template>
  <div>
    <SfHeading
      :level="3"
      title="Register" />
    <br>
    <form
      class="form"
      @submit.prevent="register">
      <SfInput
        v-model="user.firstName"
        type="text"
        label="First Name"
        name="first-name"
        required />
      <SfInput
        v-model="user.lastName"
        type="text"
        label="Last Name"
        name="last-name"
        required />
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
      <SfCheckbox
        v-model="user.acceptsMarketing"
        name="accpets-marketing"
        label="Do you want us to keep you updated with offers?" />
      <br>
      <SfButton
        class="sf-button--full-width loading-button"
        type="submit">
        <SfLoader
          class="loader"
          :loading="isLoading">
          <span>Register</span>
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
      <SfButton
        @click="$emit('change', 'register')"
        @keyup.enter.space="$emit('change', 'register')">
        Login
      </SfButton>
    </div>
  </div>
</template>

<script>
// Components
import { SfHeading, SfInput, SfButton, SfLoader, SfCheckbox } from '@storefront-ui/vue'

// GraphQL
import { RegisterMutation } from '@/graphql/auth'

export default {
  name: 'Register',
  components: { SfHeading, SfInput, SfButton, SfLoader, SfCheckbox },
  data: () => ({
    isLoading: false,
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      acceptsMarketing: false
    }
  }),
  methods: {
    async register () {
      const user = this.user
      this.isLoading = true

      try {
        const { customerCreate } = await this.$graphql.request(RegisterMutation, { input: user })

        const { customer, customerUserErrors } = customerCreate
        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
        }

        this.$notify({
          group: 'auth',
          title: `Welcome, ${customer.firstName}!`,
          text: 'Thank you for creating an account - please login.',
          type: 'success'
        })
        this.$emit('change', 'login')
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
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: var(--spacer-lg) 0;
}
</style>
