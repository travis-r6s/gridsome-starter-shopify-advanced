<template>
  <Layout>
    <SfSection
      title-heading="Your Account"
      class="container">
      <SfLoader :loading="!customer">
        <div
          v-if="customer"
          class="account">
          <AccountOrders
            :orders="orders"
            class="account-orders" />
          <AccountDetails
            :customer="customer"
            class="account-customer" />
        </div>
      </SfLoader>
    </SfSection>
  </Layout>
</template>

<script>
// Components
import { SfLoader, SfSection } from '@storefront-ui/vue'
import AccountOrders from '@/components/Account/AccountOrders'
import AccountDetails from '@/components/Account/AccountDetails'

// GraphQL
import { CustomerOrdersQuery } from '@/graphql/customer'

export default {
  name: 'Account',
  components: { SfLoader, SfSection, AccountOrders, AccountDetails },
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

<style lang="scss">
.account {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &-orders {
    width: 60%;
  }
  &-customer {
    width: 30%;
  }
}
</style>
