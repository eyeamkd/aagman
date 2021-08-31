const {gql}=require("apollo-server-express");

module.exports= gql`
type Query {
    locations: [Location]!
    location(id: ID!): Location!
}

type Location {
    Id : String! 
    Country : String!
    State: String!
    City : String!
    Area: String!
    LandMark: String!
}

type Mutation{
    createLocation(Country:String! , State:String!, City:String! , Area:String!, LandMark:String!,StoreId:String!):String!
}




`