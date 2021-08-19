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
export const DELETE_USER=gql`
mutation Mutation($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
}
`