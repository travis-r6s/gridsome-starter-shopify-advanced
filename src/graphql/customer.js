import { gql } from 'graphql-request'

export const CustomerDetailsQuery = gql`query CustomerDetails ($accessToken: String!) {
  customer (customerAccessToken: $accessToken) {
    id
    email
  }
}`

export const CustomerOrdersQuery = gql`query customerOrders ($accessToken: String!) {
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
          processedAt
          fulfillmentStatus
          lineItems (first: 10) {
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
}`
