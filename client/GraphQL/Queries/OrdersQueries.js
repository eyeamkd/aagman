import {gql} from '@apollo/client'

export const LOAD_ORDERS=gql`
query Query {
    orders {
      itemList {
        itemName
        itemCost
        itemQuantity
      }
      orderCode
      cost
      itemStatus
      paymentMode
      paymentStatus
    }
  }
    
`
export const ORDERS_GET_PAYMENT_STATUS=gql`
query Query($getOrderByPaymentStatusPaymentStatus: String!) {
    getOrderByPaymentStatus(paymentStatus: $getOrderByPaymentStatusPaymentStatus) {
      orderCode
      itemList {
        itemName
        itemCost
        itemQuantity
      }
      cost
      itemStatus
      paymentMode
      paymentStatus
    }
  }
`

export const ORDERS_GET_ORDERS_STATUS=gql`
query Query($getOrderByOrderStatusItemStatus: String!) {
    getOrderByOrderStatus(itemStatus: $getOrderByOrderStatusItemStatus) {
      orderCode
      itemList {
        itemName
        itemCost
        itemQuantity
      }
      cost
      itemStatus
      paymentMode
      paymentStatus
    }
  }
`

export const GET_ORDERS_BY_CODE=gql`
query Query($getOrderByCodeOrderCode: Int!) {
    getOrderByCode(orderCode: $getOrderByCodeOrderCode) {
      orderCode
      itemList {
        itemName
        itemCost
        itemQuantity
      }
      cost
      itemStatus
      paymentMode
      paymentStatus
    }
  }
`

