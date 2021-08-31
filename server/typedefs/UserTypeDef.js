const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    users: [User!]!
    user(id: ID!): User!
}

type User {
    Id: String!
    Email : String!
    FullName : String!
    GSTNumber : String!
    PhoneNumber: String!
    Stores: [Store],
    otp: String,
}

type Mutation {
    createUser(Email: String!
               FullName: String!
               GSTNumber: String!
               phoneNumber: String!): String!,

    deleteUser(id: ID!): String,

    updateOtp(email: String!
              otp: String!): User!,

}

`