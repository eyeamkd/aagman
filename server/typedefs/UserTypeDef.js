import { gql } from 'apollo-server-express'

export default gql`

type Query {
    users: [User!]!
    user(id: ID!): User!
    deleteUser(id: ID!): User
    userExists(email: String!): User
}

type User {
    id: ID!
    email: String!
    fullName: String!
    phoneNumber: String!
    otp: String!
}

type Mutation {
    createUser(email: String!
               fullName: String!
               phoneNumber: String!): User!,

    deleteUser(id: ID!): String,
    updateOtp(email: String!
              otp: String!): User!
}

`