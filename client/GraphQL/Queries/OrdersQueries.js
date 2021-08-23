import {gql} from '@apollo/client'

export const LOAD_ORDERS=gql`
query Query {
  orders {
    orderId
    itemList {
      itemName
      itemCost
      itemQuantity
    }
    totalCost
    itemStatus
    paymentMode
    paymentStatus
  }
}
    
`
export const ORDERS_GET_PAYMENT_STATUS=gql`
query Query($getOrderByPaymentStatusPaymentStatus: String!) {
  getOrderByPaymentStatus(paymentStatus: $getOrderByPaymentStatusPaymentStatus) {
    orderId
    itemList {
      itemName
      itemCost
      itemQuantity
    }
    totalCost
    itemStatus
    paymentMode
    paymentStatus
  }
}
`

export const ORDERS_GET_ORDERS_STATUS=gql`
query Query($getOrderByOrderStatusItemStatus: String!) {
  getOrderByOrderStatus(itemStatus: $getOrderByOrderStatusItemStatus) {
    orderId
    itemList {
      itemName
      itemCost
      itemQuantity
    }
    totalCost
    itemStatus
    paymentMode
    paymentStatus
  }
}
`

export const GET_ORDERS_BY_CODE=gql`
query Query($getOrderByCodeOrderId: Int!) {
  getOrderByCode(orderId: $getOrderByCodeOrderId) {
    orderId
    itemList {
      itemName
      itemCost
      itemQuantity
    }
    totalCost
    itemStatus
    paymentMode
    paymentStatus
  }
}
`

