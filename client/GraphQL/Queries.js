import {gql} from '@apollo/client'

export const LOAD_USERS= gql`
query Query {
    users {
      id
      email
      fullName
      restaurantName
      GSTNumber
      location
      phoneNumber
    }
  }

`
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
export const GET_USER_BY_CODE=gql`
query Query($userExistsEmail: String!) {
    userExists(email: $userExistsEmail) {
      email
      fullName
      restaurantName
      GSTNumber
      location
      phoneNumber
    }
  }
`