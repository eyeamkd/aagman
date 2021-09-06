const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    revenues: [Revenue!]!
    revenue(id: ID!): Revenue!
}

type Revenue {
    id: ID! 
    totalIncome: Float! 
    orders: [Order]!  
    store: Store! 
}

type Mutation{
    createRevenue(totalIncome:Float!,storeId:ID!):String!
}

`