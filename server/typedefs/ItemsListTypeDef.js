const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    itemslists: [ItemsList!]!
    itemslist(id: ID!): ItemsList!
}

type ItemsList {
    id: String! 
    name: String!
    quantity: Int!
    price: Float!
    order: Order!
}



type Mutation{
    createItemsList(name:String!, quantity:Int! ,price:Float! , orderId:String! ):String!
}


`