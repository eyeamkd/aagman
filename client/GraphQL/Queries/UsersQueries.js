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