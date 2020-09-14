<template>
  <Layout>
    <div class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h3 class="title is-family-secondary">
            Your Account
          </h3>
          <div
            v-if="!customer"
            class="lds-ring">
            <div /><div /><div /><div />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="customer"
      class="columns">
      <account-orders :orders="orders" />
      <account-details :customer="customer" />
    </div>
  </Layout>
</template>

<script>
// GraphQL
import { CustomerOrdersQuery } from '@/graphql/customer'

// Components
import AccountOrders from '@/components/Account/AccountOrders'
import AccountDetails from '@/components/Account/AccountDetails'

export default {
  name: 'Account',
  components: { AccountOrders, AccountDetails },
  data: () => ({ customer: null }),
  computed: {
    orders () { return this.customer.orders.edges.map(({ node }) => node) }
  },
  async mounted () {
    const variables = { accessToken: this.$store.getters.accessToken }
    const { customer } = await this.$graphql.request(CustomerOrdersQuery, variables)

    this.customer = customer
  }
}
</script>
