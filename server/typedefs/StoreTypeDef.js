const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    stores: [Store!]!
    store(id: ID!): Store!
    ordersDashboard(storeId:ID!):Store!
    getMenu(storeId:ID!):StoreMenu!
    getRevenue(storeId:ID!):StoreRevenue!
    getUserId(storeId:ID!):StoreUser!
}

type StoreUser{
    id:ID!
    owner:User!
}

type StoreRevenue{
    id:ID!
    revenue:Revenue!
}

type StoreMenu{
    id:ID!
    menu:Menu!
}

type Store {
    id: ID!
    name : String!
    rating:Float!
    address : Location!
    orders : [Order]!
    owner : User!
    timings: Timing!
    menu : Menu!
    revenue: Revenue!
    feedback:Feedback!
}

type Subscription{
    getRevenue(storeId:ID!):StoreRevenue!
}

type Mutation{
    createStore(name:String!,userId:ID!): String!
    addStore(storeName:String!,
        country:String! ,
        state:String!,
        city:String! ,
        area:String!,
        landMark:String!,
        openTime:String!,
        closeTime:String!,
        statusTime:statusTiming!,
        userId:ID!):String!

}



`