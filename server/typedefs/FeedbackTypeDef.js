const {gql}=require("apollo-server-express");

module.exports= gql`

type Feedback{
    id:ID!
    orderServiceRating:Float!
    deliveryServiceRating:Float!
    comments:[String]
}
type Mutation{
    addFeedback(orderServiceRating:Float!,
                deliveryServiceRating:Float!,
                comment:String!,storeId:ID!,
                overallStoreRating:Float!,
                foodRating:Float!,
                itemsList:[ID]!):String!
}

`