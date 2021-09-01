const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    revenues: [Revenue!]!
    revenue(id: ID!): Revenue!
}

type Revenue {
    id: String! 
    totalIncome: Float! 
    bill: [Bill]!  
    store: Store! 
}

type Mutation{
    createRevenue(totalIncome:Float!,storeId:String!):String!
}

`