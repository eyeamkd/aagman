import {gql} from '@apollo/client'
export const CREATE_ORDERS=gql`
mutation Mutation($createOrderOrderCode: Int!, $createOrderCost: Int!, $createOrderItemStatus: String!, $createOrderPaymentMode: String!, $createOrderItemList: [inputItemList!]!, $createOrderPaymentStatus: String!) {
    createOrder(orderCode: $createOrderOrderCode, cost: $createOrderCost, itemStatus: $createOrderItemStatus, paymentMode: $createOrderPaymentMode, itemList: $createOrderItemList, paymentStatus: $createOrderPaymentStatus) {
      orderCode
      itemStatus
      cost
    }
  }
`

export const UPDATE_ORDER_STATUS=gql`
mutation Mutation($updateOrderStatusOrderCode: Int!, $updateOrderStatusItemStatus: String!) {
    updateOrderStatus(orderCode: $updateOrderStatusOrderCode, itemStatus: $updateOrderStatusItemStatus) {
      orderCode
      cost
      itemStatus
    }
  }
`
export const UPDATE_PAYMENT_STATUS=gql`
mutation Mutation($updatePaymentStatusOrderCode: Int!, $updatePaymentStatusPaymentStatus: String) {
    updatePaymentStatus(orderCode: $updatePaymentStatusOrderCode, paymentStatus: $updatePaymentStatusPaymentStatus) {
      orderCode
      paymentStatus
    }
  }
`

export const DELETE_ORDER=gql`
mutation Mutation($deleteOrderOrderCode: Int!) {
    deleteOrder(orderCode: $deleteOrderOrderCode)
  }`