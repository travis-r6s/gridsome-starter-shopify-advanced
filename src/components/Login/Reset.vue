<template>
  <div>
    <SfHeading
      :level="3"
      title="Reset Password" />
    <br>
    <form
      class="form"
      @submit.prevent="reset">
      <SfInput
        v-model="email"
        type="email"
        label="Email Address"
        name="email"
        required />
      <br>
      <SfButton
        class="sf-button--full-width loading-button"
        type="submit">
        <SfLoader
          class="loader"
          :loading="isLoading">
          <span>reset</span>
        </SfLoader>
      </SfButton>
    </form>
    <div class="modal-bottom">
      <SfButton
        class="sf-button--text"
        @click="$emit('change', 'login')"
        @keyup.enter.space="$emit('change', 'login')">
        Back to login
      </SfButton>
    </div>
  </div>
</template>

<script>
// Components
import { SfHeading, SfInput, SfButton, SfLoader } from '@storefront-ui/vue'

// GraphQL
import { ResetMutation } from '@/graphql/auth'

export default {
  name: 'Reset',
  components: { SfHeading, SfInput, SfButton, SfLoader },
  data: () => ({
    isLoading: false,
    email: ''
  }),
  methods: {
    async reset () {
      const email = this.email
      this.isLoading = true

      try {
        const { customerRecover } = await this.$graphql.request(ResetMutation, { email })

        const { customerUserErrors } = customerRecover
        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
        }

        this.$notify({
          group: 'auth',
          title: `On its way...`,
          text: 'Please check your inbox, and follow the instructions in the email to reset your password.',
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
