<template>
  <table class="table is-fullwidth">
    <tbody>
      <tr
        v-for="item in cart"
        :key="item.variantId">
        <td width="150">
          <figure class="image is-square">
            <img
              :src="item.image.thumbnail"
              :alt="item.image.altText || item.title">
          </figure>
        </td>
        <td>
          <g-link
            :to="item.path"
            class="is-uppercase has-text-weight-medium">
            {{ item.productTitle }}
          </g-link>
          <p>
            <small>
              {{ item.variantTitle !== 'Default Title' ? item.variantTitle : '' }}
            </small>
          </p>
          <p>
            <small>
              {{ item.price }}
            </small>
          </p>
        </td>
        <td />
        <td width="300">
          <div class="field has-addons">
            <div class="control">
              <button
                class="button is-white"
                @click="removeItem(item.variantId)"
                @keyup="removeItem(item.variantId)">
                <small>Remove</small>
              </button>
            </div>
            <div class="control">
              <button
                class="button is-light"
                @click="decreaseItemQty(item)"
                @keyup="decreaseItemQty(item)">
                -
              </button>
            </div>
            <div class="control">
              <label for="qty">
                <input
                  :value="item.qty"
                  class="input has-text-centered"
                  type="number"
                  placeholder="Enter a quantity"
                  min="1"
                  @change="e => updateItemQty(item, e.target.valueAsNumber)">
              </label>
            </div>
            <div class="control">
              <button
                class="button is-light"
                @click="increaseItemQty(item)"
                @keyup="increaseItemQty(item)">
                +
              </button>
            </div>
          </div>
        </td>
        <td width="150">
          <p class="has-text-right item-total">
            {{ item.total }}
          </p>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="cart.length">
      <tr>
        <th />
        <th />
        <th />
        <th />
        <th class="has-text-right">
          <p>Cart Total: {{ cartTotal }}</p>
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    cartTotal () { return this.$store.getters.cartTotal.format() }
  },
  methods: {
    async removeItem (itemId) {
      await this.$store.dispatch('removeFromCart', itemId)
      this.$notify({
        title: 'Item removed from cart',
        type: 'primary'
      })
    },
    async decreaseItemQty (item) {
      if (item.qty === 1) return
      const qty = item.qty - 1
      await this.$store.dispatch('updateItemQty', { itemId: item.variantId, qty })
    },
    async increaseItemQty (item) {
      const qty = item.qty + 1
      await this.$store.dispatch('updateItemQty', { itemId: item.variantId, qty })
    },
    async updateItemQty (item, qty) {
      if (qty <= 0) return
      await this.$store.dispatch('updateItemQty', { itemId: item.variantId, qty })
    }
  }
}
</script>
