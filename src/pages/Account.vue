<template>
  <Layout>
    <div class="hero">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h3 class="title is-family-secondary">
            Your Account
          </h3>
          <div
            v-if="!customer || $apollo.loading"
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
// Packages
import gql from 'graphql-tag'
// Components
import AccountOrders from '@/components/Account/AccountOrders'
import AccountDetails from '@/components/Account/AccountDetails'

export default {
  name: 'Account',
  components: { AccountOrders, AccountDetails },
  computed: {
    orders () { return this.customer.orders.edges.map(({ node }) => node) }
  },
  apollo: {
    customer: {
      query: gql`query customerOrders ($accessToken: String!) {
        customer (customerAccessToken: $accessToken) {
          displayName
          firstName
          lastName
          email
          defaultAddress {
            address1
            address2
            city
            country
            zip
            formatted(withName: true)
          }
          orders (first: 10) {
            edges {
              node {
                id
                name
                statusUrl
                lineItems (first: 100) {
                  edges {
                    node {
                      title
                      quantity
                    }
                  }
                }
                totalPrice: totalPriceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }`,
      skip () {
        // Skip query if we have no token - i.e at build time
        return !this.$store.getters.isAuthenticated
      },
      variables () {
        const accessToken = this.$store.getters.accessToken
        return { accessToken }
      }
    }
  }
}
</script>
