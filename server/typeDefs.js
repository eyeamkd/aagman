import { gql } from 'apollo-server-express'

export const typeDefs = gql`

type Query {
    users: [User!]!
    user(id: ID!): User!
    deleteUser(id: ID!): User
}

type User {
    id: ID!
    email: String!
    fullName: String!
    phoneNumber: String!
}

type Mutation {
    createUser(email: String!
               fullName: String!
               phoneNumber: String!): User!,

    deleteUser(id: ID!): String
}

`