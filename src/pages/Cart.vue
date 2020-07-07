<template>
  <Layout>
    <div class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h3 class="title is-family-secondary">
            Cart
          </h3>
        </div>
      </div>
    </div>
    <div class="container cart">
      <cart-items-table :cart="cart" />
      <br>
      <cart-checkout-form
        v-if="cart.length"
        :is-loading="isLoading"
        @checkout="checkout" />
      <div
        v-else
        class="container has-text-centered">
        <p>To checkout, add some items to cart.</p>
        <br>
        <g-link
          to="/"
          class="button is-primary is-outlined">
          Browse
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<script>
// Packages
import gql from 'graphql-tag'
// Components
import CartItemsTable from '@/components/Cart/CartItemsTable'
import CartCheckoutForm from '@/components/Cart/CartCheckoutForm'

export default {
  metaInfo: {
    title: 'Your Cart'
  },
  components: { CartItemsTable, CartCheckoutForm },
  data: () => ({ isLoading: false }),
  computed: {
    cart () { return this.$store.state.cart }
  },
  methods: {
    async checkout (email) {
      if (!this.cart.length) return alert('No items in cart')
      const lineItems = this.cart.map(item => ({ quantity: item.qty, variantId: item.variantId }))

      const checkoutInput = { email, lineItems }

      try {
        this.isLoading = true
        const { data: { checkoutCreate } } = await this.$apollo.mutate({
          mutation: gql`mutation checkoutCreate($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
              checkout {
                id
                webUrl
              }
              checkoutUserErrors {
                code
                field
                message
              }
            }
          }`,
          variables: { input: checkoutInput }
        })
        if (checkoutCreate.checkoutUserErrors.length) throw new Error(checkoutCreate.checkoutUserErrors[ 0 ].message)

        window.location = checkoutCreate.checkout.webUrl
      } catch (error) {
        this.isLoading = false
        console.error(error)
        this.$notify({
          title: 'Whoops...',
          type: 'danger',
          message: 'Something went wrong - please try again.'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
tr {
  height: 150px;
  // display: flex;
}
</style>
