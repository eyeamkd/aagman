const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    stores: [Store!]!
    store(id: ID!): Store!
    ordersDashboard(StoreId:String!):Store!
}

type Store {
    Id: String!
    Name : String!
    Rating:Float!
    Address : Location!
    Orders : [Order]!
    Owner : User!
    Timings: Timing!
    Menu : Menu!
    Revenue: Revenue!
}

type Mutation{
    createStore(Name:String!,UserId:String!): String!
}



`