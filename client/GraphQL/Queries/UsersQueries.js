import {gql} from '@apollo/client'

export const LOAD_USERS= gql`
query Query {
    users {
      id
      email
      fullName
      storeName
      GSTNumber
      location
      phoneNumber
    }
  }

`
export const GET_USER_BY_CODE=gql`
query Query($userExistsEmail: String!) {
  userExists(email: $userExistsEmail) {
    email
    fullName
    storeName
    GSTNumber
    location
    phoneNumber
    orders {
      id
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
}
`
export const GET_USERS_BY_LOCATION=gql`
query Query($getUsersByLocationLocation: String!) {
  getUsersByLocation(location: $getUsersByLocationLocation) {
    email
    fullName
    storeName
    GSTNumber
    location
    phoneNumber
  }
}
`
export const CHECK_IF_USER_EXISTS=gql`
query Query($checkIfUserExistsEmail: String!) {
  checkIfUserExists(email: $checkIfUserExistsEmail)
}
`

export const CHECK_IF_OTP_MATCHES=gql`
query Query($checkIfOtpMatchesEmail: String!, $checkIfOtpMatchesOtp: String!) {
  checkIfOtpMatches(email: $checkIfOtpMatchesEmail, otp: $checkIfOtpMatchesOtp)
}
`