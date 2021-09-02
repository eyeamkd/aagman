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
    id: ID!
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

    addUser(email:String!,
            fullName:String!,
            gstNumber:String!,
            phoneNumber:String!,
            storeName:String!,
            country:String! ,
            state:String!,
            city :String!,
            area:String!,
            landMark:String!
            openTime:String!,
            closeTime:String!,
            statusTime:statusTiming!):String!

    deleteUser(id: ID!): String,

    updateOtp(email: String!
              otp: String!): User!,

}

`