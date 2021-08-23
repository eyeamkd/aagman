import {gql} from '@apollo/client'
export const CREATE_ORDERS=gql`
mutation Mutation($createOrderOrderId: Int!, $createOrderTotalCost: Int!, $createOrderItemStatus: String!, $createOrderPaymentMode: String!, $createOrderItemList: [inputItemList!]!, $createOrderPaymentStatus: String!) {
  createOrder(orderId: $createOrderOrderId, totalCost: $createOrderTotalCost, itemStatus: $createOrderItemStatus, paymentMode: $createOrderPaymentMode, itemList: $createOrderItemList, paymentStatus: $createOrderPaymentStatus) {
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

export const UPDATE_ORDER_STATUS=gql`
mutation Mutation($updateOrderStatusOrderId: Int!, $updateOrderStatusItemStatus: String!) {
  updateOrderStatus(orderId: $updateOrderStatusOrderId, itemStatus: $updateOrderStatusItemStatus) {
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
export const UPDATE_PAYMENT_STATUS=gql`
mutation Mutation($updatePaymentStatusOrderId: Int!, $updatePaymentStatusPaymentStatus: String) {
  updatePaymentStatus(orderId: $updatePaymentStatusOrderId, paymentStatus: $updatePaymentStatusPaymentStatus) {
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

export const DELETE_ORDER=gql`
mutation Mutation($deleteOrderOrderId: Int!) {
  deleteOrder(orderId: $deleteOrderOrderId)
}
  `