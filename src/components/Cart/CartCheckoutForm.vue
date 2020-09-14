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
// GraphQL
import { CustomerDetailsQuery } from '@/graphql/customer'

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
      try {
        const { customer } = await this.$graphql.request(CustomerDetailsQuery, { accessToken: this.$store.getters.accessToken })
        if (customer) this.email = customer.email
      } catch (error) {
        console.log(error)
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
