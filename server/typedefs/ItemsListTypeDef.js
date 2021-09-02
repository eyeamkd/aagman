const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    itemslists: [ItemsList!]!
    itemslist(id: ID!): ItemsList!
}

type ItemsList {
    id: ID! 
    name: String!
    quantity: Int!
    price: Float!
    order: Order!
}



type Mutation{
    createItemsList(name:String!, quantity:Int! ,price:Float! , orderId:ID! ):String!
}


`