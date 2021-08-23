import { gql } from 'apollo-server-express'

export default gql`

type Query {
    users: [User!]!
    user(id: ID!): User!
    deleteUser(id: ID!): User
    userExists(email: String!): User
    getUsersByLocation(location:String!):[User]
}

type User {
    id: ID!
    email: String!
    fullName: String!
    storeName:String!
    GSTNumber:String!
    location:String!
    phoneNumber: String!
    otp: String!
}

type Mutation {
    createUser(email: String!
               fullName: String!
               storeName: String!
               GSTNumber: String!
               location:String!
               phoneNumber: String!): User!,

    deleteUser(id: ID!): String,
    updateOtp(email: String!
              otp: String!): User!,
    updateRestaurantName(email:String!
        storeName:String!):User!,
    updateLocation(email:String!,location:String!):User!,
    updatePhoneNumber(email:String!,phoneNumber:String!):User!
}

`