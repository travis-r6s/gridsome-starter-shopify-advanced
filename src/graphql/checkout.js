import { gql } from 'graphql-request'

export const CheckoutCreateMutation = gql`mutation checkoutCreate($input: CheckoutCreateInput!) {
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
}`
