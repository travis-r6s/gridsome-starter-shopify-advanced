<template>
  <div class="container has-text-centered">
    <h3 class="title is-family-secondary">
      Login
    </h3>
    <div class="columns is-centered">
      <div class="column is-4">
        <form
          class="form"
          @submit.prevent="login">
          <div class="field">
            <div class="control">
              <label
                class="label"
                for="email">Email
                <input
                  id="email"
                  v-model.trim="user.email"
                  class="input"
                  type="email"
                  placeholder="Your Email"
                  value="jane@does.com"
                  required>
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label
                class="label"
                for="password">Password
                <input
                  id="password"
                  v-model.trim="user.password"
                  class="input"
                  type="password"
                  placeholder="***********"
                  required>
              </label>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-white"
                type="submit"
                @click.prevent="$emit('change', 'register')"
                @keyup.prevent="$emit('change', 'register')">
                Register
              </button>
            </div>
            <div
              class="control"
              style="margin-left: auto;">
              <button
                :class="{'is-loading': isLoading}"
                class="button is-primary"
                type="submit">
                Login
              </button>
            </div>
          </div>
          <div class="buttons is-right">
            <button
              class="button is-text"
              type="submit"
              @click.prevent="$emit('change', 'reset')"
              @keyup.prevent="$emit('change', 'reset')">
              Forgotten Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// GraphQL
import { LoginMutation } from '@/graphql/auth'

export default {
  name: 'Login',
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
        const { data: { customerAccessTokenCreate } } = await this.$graphql.request(LoginMutation, { input: user })

        const { customerAccessToken, customerUserErrors } = customerAccessTokenCreate
        if (customerUserErrors.length) {
          const [{ message }] = customerUserErrors
          throw new Error(message)
        }

        await this.$store.dispatch('login', customerAccessToken)
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
