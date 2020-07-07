<template>
  <form @submit.prevent="checkout">
    <div class="field is-grouped is-grouped-right">
      <div class="field has-addons">
        <div class="control">
          <label
            for="email"
            class="label">
            <input
              id="email"
              v-model="email"
              class="input"
              type="email"
              placeholder="Your email address"
              required>
          </label>
        </div>
        <div class="control">
          <button
            :class="{'is-loading': isLoading}"
            type="submit"
            class="button is-primary">
            Checkout
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
// Packages
import gql from 'graphql-tag'

export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({ email: '' }),
  async mounted () {
    if (this.$store.getters.isAuthenticated) {
      const { data } = await this.$apollo.query({
        query: gql`query CustomerDetails ($accessToken: String!) {
          customer (customerAccessToken: $accessToken) {
            id
            email
          }
        }`,
        variables: { accessToken: this.$store.getters.accessToken }
      })
      if (data && data.customer) {
        this.email = data.customer.email
      }
    }
  },
  methods: {
    checkout () {
      this.$emit('checkout', this.email)
    }
  }
}
</script>
