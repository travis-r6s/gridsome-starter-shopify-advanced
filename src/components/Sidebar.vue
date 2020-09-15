<template>
  <SfSidebar
    :visible="isVisible"
    title="Your cart"
    class="sf-sidebar--right"
    overlay
    button
    @close="closeSidebar">
    <template #default>
      <SfHeading
        v-if="!cart.length"
        :level="4"
        class="sf-heading--left"
        title="Empty..."
        subtitle="There is nothing here yet - try searching for some products with the searchbar." />
      <SfCollectedProduct
        v-for="item in cart"
        :key="item.id"
        :qty="item.qty"
        :image="item.image.thumbnail"
        :image-width="150"
        :image-height="150"
        :title="item.productTitle"
        :regular-price="item.total"
        @input="updateItemQty(item, $event)"
        @click:remove="removeFromCart(item)">
        <template #configuration>
          <div :style="{ margin: '1rem 0 0 0' }">
            <SfProperty
              v-for="(option, i) in item.options"
              :key="i"
              :name="option.name"
              :value="option.value" />
          </div>
        </template>
      </SfCollectedProduct>
    </template>
    <template #content-bottom>
      <SfButton
        class="sf-button--full-width sf-button--outline"
        :disabled="!cart.length ||isLoading"
        @click="checkout">
        Checkout
      </SfButton>
    </template>
  </SfSidebar>
</template>

<script>
// Components
import { SfSidebar, SfHeading, SfCollectedProduct, SfProperty, SfButton } from '@storefront-ui/vue'

// GraphQL
import { CheckoutCreateMutation } from '@/graphql/checkout'

export default {
  name: 'CartSidebar',
  components: { SfSidebar, SfHeading, SfCollectedProduct, SfProperty, SfButton },
  data: () => ({ isLoading: false }),
  computed: {
    isVisible () { return this.$store.getters.isSidebarVisible },
    cart () { return this.$store.getters.cart }
  },
  methods: {
    closeSidebar () {
      this.$store.commit('updateSidebar', false)
    },
    updateItemQty ({ variantId }, qty) {
      this.$store.dispatch('updateItemQty', { variantId, qty })
    },
    removeFromCart ({ variantId }) {
      this.$store.dispatch('removeFromCart', variantId)
    },
    async checkout () {
      if (!this.cart.length) return alert('No items in cart')
      this.isLoading = true

      const lineItems = this.cart.map(item => ({ quantity: item.qty, variantId: item.variantId }))
      const checkoutInput = { lineItems }

      try {
        const { checkoutCreate } = await this.$graphql.request(CheckoutCreateMutation, { input: checkoutInput })
        const { checkout, checkoutUserErrors } = checkoutCreate

        if (checkoutUserErrors.length) {
          const [{ message }] = checkoutUserErrors
          throw new Error(message)
        }

        window.location = checkout.webUrl
      } catch (error) {
        console.error(error)
        this.isLoading = false

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
