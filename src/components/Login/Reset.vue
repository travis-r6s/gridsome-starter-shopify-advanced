<template>
  <div class="container has-text-centered">
    <h3 class="title is-family-secondary">
      Reset Password
    </h3>
    <div class="columns is-centered">
      <div class="column is-4">
        <form
          class="form"
          @submit.prevent="reset">
          <div class="field">
            <div class="control">
              <label
                class="label"
                for="email">Email
                <input
                  id="email"
                  v-model.trim="email"
                  class="input"
                  type="email"
                  placeholder="Your Email"
                  value="jane@does.com"
                  required>
              </label>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-white"
                type="submit"
                @click.prevent="$emit('change', 'login')"
                @keyup.enter.space.prevent="$emit('change', 'login')">
                Back to Login
              </button>
            </div>
            <div
              class="control"
              style="margin-left: auto;">
              <button
                :class="{'is-loading': isLoading}"
                class="button is-primary"
                type="submit">
                Reset Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// GraphQL
import { ResetMutation } from '@/graphql/auth'

export default {
  name: 'Reset',
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
