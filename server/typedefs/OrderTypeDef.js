import { gql } from 'apollo-server-express'

export default gql`

type Query {
    orders: [Order!]!
    order(id: ID!): Order!
    getOrderByCode(orderId: Int!): Order
    getOrderByPaymentStatus(paymentStatus:String!):[Order]
    getOrderByOrderStatus(itemStatus:String!):[Order]
   
}

type Order {
    id: ID!
    orderId:Int!
    itemList:[ItemList!]!
    totalCost:Int!
    itemStatus:String!
    paymentMode:String!
    paymentStatus:String!
}

type ItemList{
    itemName:String!
    itemCost:Int!
    itemQuantity:Int!
}

input inputItemList{
    itemName:String!
    itemCost:Int!
    itemQuantity:Int!
}

type Mutation {
    createOrder( orderId:Int!,
        totalCost:Int!,
        itemStatus:String!,
        paymentMode:String!,
        itemList:[inputItemList!]!,
        paymentStatus:String!): Order!,
    updateOrderStatus(orderId:Int!,itemStatus:String!):Order!,
    updatePaymentStatus(orderId:Int!,paymentStatus:String):Order!,
    deleteOrder(orderId:Int!):String,
   
   
}

`