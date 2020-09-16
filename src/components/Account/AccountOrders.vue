<template>
  <div>
    <SfHeading
      :level="3"
      title="Order history" />
    <br>
    <p v-if="!orders.length">
      You have no orders.
    </p>
    <SfTable>
      <SfTableHeading>
        <SfTableHeader
          v-for="header in tableHeaders"
          :key="header">
          {{ header }}
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="order in orders"
        :key="order.id">
        <SfTableData>
          {{ order.name }}
        </SfTableData>
        <SfTableData>
          {{ formatDate(order.processedAt) }}
        </SfTableData>
        <SfTableData>
          {{ order.lineItems.edges.length }}
        </SfTableData>
        <SfTableData>
          {{ formatCurrency(order.totalPrice) }}
        </SfTableData>
        <SfTableData>
          <span>{{ order.fulfillmentStatus }}</span>
          <br>
          <a
            :href="order.statusUrl"
            target="_blank"
            rel="noreferrer">
            View Order
          </a>
        </SfTableData>
      </SfTableRow>
    </SfTable>
  </div>
</template>

<script>
// Components
import { SfHeading, SfTable } from '@storefront-ui/vue'

export default {
  components: { SfHeading, SfTable },
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    tableHeaders: ['Order #', 'Order Date', 'Total Items', 'Amount', 'Status']
  }),
  methods: {
    formatDate (date) {
      return new Intl.DateTimeFormat().format(new Date(date))
    },
    formatCurrency ({ currencyCode, amount }) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currencyCode }).format(amount)
    }
  }
}
</script>
