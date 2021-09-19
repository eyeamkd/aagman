const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    customerdevices: [CustomerDevice!]!
    customerdevice(id: ID!): CustomerDevice!
    getCustomerToken(orderId: ID!): String!
}

type CustomerDevice {
    id: ID! 
    fcmToken : String!
    active : Boolean!
    createdAt : String!
    order: Order!
}

type Mutation{
    createCustomerDevice(fcmToken : String, active : Boolean , createdAt : String, orderId: ID ): String!
}
`