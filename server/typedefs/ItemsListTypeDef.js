const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    itemslists: [ItemsList!]!
    itemslist(id: ID!): ItemsList!
}

type ItemsList {
    Id: String! 
    Name: String!
    Quantity: Int!
    Price: Float!
    Order: Order!
}



type Mutation{
    createItemsList(Name:String!, Quantity:Int! ,Price:Float! , OrderId:String! ):String!
}


`