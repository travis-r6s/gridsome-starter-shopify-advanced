import { gql } from 'graphql-request'

export const LoginMutation = gql`mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken {
      accessToken
      expiresAt
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const RegisterMutation = gql`mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      firstName
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}`

export const ResetMutation = gql`mutation customerRecover($email: String!) {
  customerRecover(email: $email) {
    customerUserErrors {
      code
      field
      message
    }
  }
}`
