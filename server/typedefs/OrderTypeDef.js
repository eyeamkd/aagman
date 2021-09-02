const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    orders: [Order!]!
    order(id: ID!): Order!
    
}

type Order {
    id: ID! 
    orderCode : Int! 
    orderStatus : StatusOfOrder!           
    itemsList : [ItemsList!]!   
    store: Store!               
    bill : Bill!
}

type ItemsList {
    id: ID! 
    name: String!
    quantity: Int!
    price: Float!

}

input ItemsListInput {
  
    name: String!
    quantity: Int!
    price: Float!
}

enum StatusOfOrder{
    OrderReceived, Preparing, Completed
}

type Mutation{
    createOrder(orderCode:String! ,orderStatus:StatusOfOrder!,storeId:ID! ):String!
    addOrder(orderCode:Int!,
             orderStatus:StatusOfOrder!,
             items:[ItemsListInput]!,
             storeId:ID!,
             totalCost:Float!,
             paymentMode:PaymentTypes! ,
             paymentStatus:PaymentStatusTypes!):String!
}


`