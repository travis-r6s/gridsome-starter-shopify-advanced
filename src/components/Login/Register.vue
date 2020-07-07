<template>
  <div class="container has-text-centered">
    <h3 class="title is-family-secondary">
      Register
    </h3>
    <div class="columns is-centered">
      <div class="column is-4">
        <form
          class="form"
          @submit.prevent="register">
          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <label
                    class="label"
                    for="first-name">First Name
                    <input
                      id="first-name"
                      v-model.trim="user.firstName"
                      class="input"
                      type="text"
                      placeholder="First Name"
                      value="Jane"
                      required>
                  </label>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label
                    class="label"
                    for="last-name">Last Name
                    <input
                      id="last-name"
                      v-model.trim="user.lastName"
                      class="input"
                      type="text"
                      placeholder="Last Name"
                      value="Doe"
                      required>
                  </label>
                </div>
              </div>
            </div>
          </div>
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
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input
                  v-model="user.acceptsMarketing"
                  type="checkbox">
                Please please please let us email you...?
              </label>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button
                class="button is-white"
                type="submit"
                @click.prevent="$emit('change', 'login')"
                @keyup.prevent="$emit('change', 'login')">
                Login
              </button>
            </div>
            <div
              class="control"
              style="margin-left: auto;">
              <button
                :class="{'is-loading': isLoading}"
                class="button is-primary"
                type="submit">
                Register
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
// Packages
import gql from 'graphql-tag'

export default {
  name: 'Register',
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
        const { data: { customerCreate } } = await this.$apollo.mutate({
          mutation: gql`mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                firstName
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }`,
          variables: { input: user }
        })
        const { customer, customerUserErrors } = customerCreate
        if (customerUserErrors.length) {
          const [firstError] = customerUserErrors
          throw new Error(firstError.message)
        }

        this.$notify({
          group: 'auth',
          title: `Welcome, ${customer.firstName}!`,
          text: 'Thank you for creating an account - please login.',
          type: 'success'
        })
        this.$emit('change', 'login')
      } catch (error) {
        this.isLoading = false
        console.error(error)
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
