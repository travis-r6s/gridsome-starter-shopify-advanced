<template>
  <SfSidebar
    :visible="isVisible"
    title="Your cart"
    class="sf-sidebar--right"
    overlay
    button
    @close="closeSidebar">
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
  </SfSidebar>
</template>

<script>
// Components
import { SfSidebar, SfHeading, SfCollectedProduct, SfProperty } from '@storefront-ui/vue'

export default {
  name: 'CartSidebar',
  components: { SfSidebar, SfHeading, SfCollectedProduct, SfProperty },
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
    }
  }
}
</script>
