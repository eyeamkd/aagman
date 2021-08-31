const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    revenues: [Revenue!]!
    revenue(id: ID!): Revenue!
}

type Revenue {
    Id: String! 
    TotalIncome: Float! 
    Bill: [Bill]!  
    Store: Store! 
}

type Mutation{
    createRevenue(TotalIncome:Float!,StoreId:String!):String!
}

`