const {gql}=require("apollo-server-express");


module.exports= gql`
scalar GraphQLDateTime
type Query {
    orders: [Order!]!
    order(id: ID!): Order!
    getOrder(orderId:ID!):Order!
    getOrderDemo(storeId:ID!):Store!
    
}

type OrderId{
    id:ID!
}

type Order {
    id: ID! 
    orderCode : String! 
    dateAndTime:GraphQLDateTime!
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
    itemId:ID!

}

input ItemsListInput {
  
    name: String!
    quantity: Int!
    price: Float!
    itemId:ID!
}

enum StatusOfOrder{
    OrderReceived, Preparing, Completed
}


type Mutation{
    createOrder(orderCode:String! ,orderStatus:StatusOfOrder!,storeId:ID!,dateAndTime:GraphQLDateTime! ):String!
    addOrder(orderCode:String!,
             orderStatus:StatusOfOrder!,
             items:[ItemsListInput]!,
             storeId:ID!,
             totalCost:Float!,
             paymentMode:PaymentTypes! ,
             paymentStatus:PaymentStatusTypes!,
             dateAndTime:GraphQLDateTime!):OrderId!
    updateOrderStatus(orderId:ID!,orderStatus:StatusOfOrder!):String!
    updatePaymentStatus(orderId:ID!,paymentStatus:PaymentStatusTypes!):String!
}


`