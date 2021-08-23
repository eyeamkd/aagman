import {gql} from '@apollo/client'

export const CREATE_USERS= gql`

mutation CreateUserMutation($createUserEmail: String!, 
  $createUserFullName: String!, 
  $createUserStoreName: String!,
   $createUserGstNumber: String!,
    $createUserLocation: String!, 
    $createUserPhoneNumber: String!) {
  createUser(email: $createUserEmail, fullName: $createUserFullName, storeName: $createUserStoreName, GSTNumber: $createUserGstNumber, location: $createUserLocation, phoneNumber: $createUserPhoneNumber) {
    email
    fullName
    storeName
    GSTNumber
    location
    phoneNumber
  }
}
  
`

export const UPDATE_USERS_PHONENUMBER=gql`
mutation Mutation($updatePhoneNumberEmail: String!, $updatePhoneNumberPhoneNumber: String!) {
  updatePhoneNumber(email: $updatePhoneNumberEmail, phoneNumber: $updatePhoneNumberPhoneNumber) {
    email
    fullName
    storeName
    GSTNumber
    location
    phoneNumber
  }
}
`

export const UPDATE_USERS_LOCATION=gql`
mutation Mutation($updateLocationEmail: String!, $updateLocationLocation: String!) {
  updateLocation(email: $updateLocationEmail, location: $updateLocationLocation) {
    email
    fullName
    storeName
    GSTNumber
    location
    phoneNumber
  }
}
`

export const UPDATE_USERS_RESTAURANTNAME=gql`
mutation Mutation($updateRestaurantNameEmail: String!, $updateRestaurantNameStoreName: String!) {
  updateRestaurantName(email: $updateRestaurantNameEmail, storeName: $updateRestaurantNameStoreName) {
    email
    fullName
    storeName
    GSTNumber
    location
    phoneNumber
  }
}
`
export const DELETE_USER=gql`
mutation Mutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
`