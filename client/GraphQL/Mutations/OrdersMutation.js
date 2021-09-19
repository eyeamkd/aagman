import {gql} from '@apollo/client'



export const ADD_ORDERS=gql`
mutation Mutation($addOrderOrderCode: Int!, $addOrderOrderStatus: StatusOfOrder!, $addOrderItems: [ItemsListInput]!, $addOrderStoreId: ID!, $addOrderTotalCost: Float!, $addOrderPaymentMode: PaymentTypes!, $addOrderPaymentStatus: PaymentStatusTypes!, $addOrderDateAndTime: GraphQLDateTime!) {
  addOrder(orderCode: $addOrderOrderCode, orderStatus: $addOrderOrderStatus, items: $addOrderItems, storeId: $addOrderStoreId, totalCost: $addOrderTotalCost, paymentMode: $addOrderPaymentMode, paymentStatus: $addOrderPaymentStatus, dateAndTime: $addOrderDateAndTime) {
    id
  }
}
`

export const CREATE_ORDERS=gql`
mutation Mutation($createOrderEmail: String!, $createOrderOrderId: Int!, $createOrderTotalCost: Int!, $createOrderItemStatus: String!, $createOrderPaymentMode: String!, $createOrderItemList: [inputItemList!]!, $createOrderPaymentStatus: String!) {
  createOrder(email: $createOrderEmail, orderId: $createOrderOrderId, totalCost: $createOrderTotalCost, itemStatus: $createOrderItemStatus, paymentMode: $createOrderPaymentMode, itemList: $createOrderItemList, paymentStatus: $createOrderPaymentStatus) {
    orderId
    itemList {
      itemName
      itemCost
      itemQuantity
    }
  }
}
`

// export const UPDATE_ORDER_STATUS=gql`
// mutation Mutation($updateOrderStatusOrderId: Int!, $updateOrderStatusItemStatus: String!) {
//   updateOrderStatus(orderId: $updateOrderStatusOrderId, itemStatus: $updateOrderStatusItemStatus) {
//     orderId
//     itemList {
//       itemName
//       itemCost
//       itemQuantity
//     }
//     totalCost
//     itemStatus
//     paymentMode
//     paymentStatus
//   }
// }
// `

export const UPDATE_ORDER_STATUS=gql`
mutation Mutation($updateOrderStatusOrderId: ID!, $updateOrderStatusOrderStatus: StatusOfOrder!) {
  updateOrderStatus(orderId: $updateOrderStatusOrderId, orderStatus: $updateOrderStatusOrderStatus)
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

