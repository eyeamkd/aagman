const {gql}=require("apollo-server-express");


module.exports= gql`
scalar GraphQLDateTime
type Query {
    orders: [Order!]!
    order(id: ID!): Order!
    
}

type Order {
    id: ID! 
    orderCode : Int! 
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
    createOrder(orderCode:String! ,orderStatus:StatusOfOrder!,storeId:ID!,dateAndTime:GraphQLDateTime! ):String!
    addOrder(orderCode:Int!,
             orderStatus:StatusOfOrder!,
             items:[ItemsListInput]!,
             storeId:ID!,
             totalCost:Float!,
             paymentMode:PaymentTypes! ,
             paymentStatus:PaymentStatusTypes!,
             dateAndTime:GraphQLDateTime!):String!
    updateOrderStatus(orderId:ID!,orderStatus:StatusOfOrder!):String!
    updatePaymentStatus(orderId:ID!,paymentStatus:PaymentStatusTypes!):String!
}


`