const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    orders: [Order!]!
    order(id: ID!): Order!
    
}

type Order {
    Id: String! 
    OrderCode : Int! 
    OrderStatus : StatusOfOrder!           
    ItemsList : [ItemsList!]!   
    Store: Store!               
    Bill : Bill!
}

type ItemsList {
    Id: String! 
    Name: String!
    Quantity: Int!
    Price: Float!

}

input ItemsListInput {
  
    Name: String!
    Quantity: Int!
    Price: Float!
}

enum StatusOfOrder{
    OrderReceived, Preparing, Completed
}

type Mutation{
    createOrder(OrderCode:String! ,OrderStatus:StatusOfOrder!,StoreId:String! ):String!
    addOrder(OrderCode:Int!,
             OrderStatus:StatusOfOrder!,
             items:[ItemsListInput]!,
             StoreId:String!,
             TotalCost:Float!,
             PaymentMode:PaymentTypes! ,
             PaymentStatus:PaymentStatusTypes!):String!
}


`