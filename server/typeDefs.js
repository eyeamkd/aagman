const { gql } = require('apollo-server-express')

const typeDefs = gql`

type Query {
    helloWorld: String!
    users: [User!]!
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
        phoneNumber: String!): User!
}

`

module.exports = {typeDefs}