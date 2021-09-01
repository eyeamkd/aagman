const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    users: [User!]!
    user(id: ID!): User!
    checkIfUserExists(email: String!): Boolean!
    checkIfOtpMatches(email: String!
                      otp: String!): Boolean!
}

type User {
    id: String!
    email : String!
    fullName : String!
    gstNumber : String!
    phoneNumber: String!
    stores: [Store],
    otp: String,
}

type Mutation {
    createUser(email: String!
               fullName: String!
               gstNumber: String!
               phoneNumber: String!): String!,

    deleteUser(id: ID!): String,

    updateOtp(email: String!
              otp: String!): User!,

}

`