import {gql} from '@apollo/client'


export const GET_ORDERS=gql`
query Query($getOrderOrderId: ID!) {
    getOrder(orderId: $getOrderOrderId) {
        id
      orderCode
      dateAndTime
      orderStatus
      itemsList {
        name
        quantity
        price
        itemId
      }
      bill {
        totalCost
        paymentMode
        paymentStatus
      }
      store {
        id
      }
    }
  }
`