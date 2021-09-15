const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    devices: [Device!]!
    device(id: ID!): Device!
}

type Device {
    id: ID! 
    fcmToken : String!
    active : Boolean!
    createdAt : String!
    user : User!
}

type Mutation{
    createDevice(fcmToken : String, active : Boolean , createdAt : String, userId: ID): String!
}
`