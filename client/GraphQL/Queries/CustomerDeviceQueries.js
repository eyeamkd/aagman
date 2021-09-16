import {gql} from '@apollo/client'

export const GET_CUSTOMER_TOKEN=gql`
query Query($getCustomerTokenOrderId: ID!) {
  getCustomerToken(orderId: $getCustomerTokenOrderId)
}
`