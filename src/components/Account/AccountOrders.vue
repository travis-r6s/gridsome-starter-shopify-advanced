<template>
  <div class="column is-half">
    <h4 class="subtitle is-family-secondary">
      Order history
    </h4>
    <div>
      <p v-if="!orders.length">
        You have no orders.
      </p>
      <table
        v-else
        class="table is-fullwidth">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Total Items</th>
            <th>Total Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id">
            <th>{{ order.name }}</th>
            <th>{{ order.lineItems.edges.length }}</th>
            <th>{{ formatCurrency(order.totalPrice) }}</th>
            <th>
              <a
                :href="order.statusUrl"
                target="_blank"
                rel="noreferrer">
                View Order
              </a>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    }
  }
}
</script>
