const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    stores: [Store!]!
    store(id: ID!): Store!
    ordersDashboard(storeId:String!):Store!
}

type Store {
    id: String!
    name : String!
    rating:Float!
    address : Location!
    orders : [Order]!
    owner : User!
    timings: Timing!
    menu : Menu!
    revenue: Revenue!
}

type Mutation{
    createStore(name:String!,userId:String!): String!
}



`