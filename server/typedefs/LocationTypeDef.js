const {gql}=require("apollo-server-express");

module.exports= gql`
type Query {
    locations: [Location]!
    location(id: ID!): Location!
}

type Location {
    id : ID! 
    country : String!
    state: String!
    city : String!
    area: String!
    landMark: String!
}

type Mutation{
    createLocation(country:String! , state:String!, city:String! , area:String!, landMark:String!,storeId:ID!):String!
}




`