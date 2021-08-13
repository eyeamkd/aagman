import {gql} from '@apollo/client'

export const CREATE_USERS= gql`

mutation Mutation(
    $createUserEmail: String!
     $createUserFullName: String!
      $createUserRestaurantName: String!
       $createUserGstNumber: String!
        $createUserLocation: String!
         $createUserPhoneNumber: String!) {
    createUser(email: $createUserEmail 
        fullName: $createUserFullName 
        restaurantName: $createUserRestaurantName 
        GSTNumber: $createUserGstNumber
        location: $createUserLocation 
        phoneNumber: $createUserPhoneNumber) {
      email
      fullName
      restaurantName
      GSTNumber
      location
      phoneNumber
      id
    }
  }
  
  
`

export const UPDATE_USERS_PHONENUMBER=gql`
mutation Mutation($updatePhoneNumberEmail: String!, $updatePhoneNumberPhoneNumber: String!) {
    updatePhoneNumber(email: $updatePhoneNumberEmail, phoneNumber: $updatePhoneNumberPhoneNumber) {
      email
      fullName
      phoneNumber
    }
  }
`

export const UPDATE_USERS_LOCATION=gql`
mutation Mutation($updateLocationEmail: String!, $updateLocationLocation: String!) {
    updateLocation(email: $updateLocationEmail, location: $updateLocationLocation) {
      restaurantName
      fullName
      email
    }
  }
`

export const UPDATE_USERS_RESTAURANTNAME=gql`
mutation Mutation($updateRestaurantNameEmail: String!, $updateRestaurantNameRestaurantName: String!) {
    updateRestaurantName(email: $updateRestaurantNameEmail, restaurantName: $updateRestaurantNameRestaurantName) {
      email
      fullName
      restaurantName
    }
  }
`
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