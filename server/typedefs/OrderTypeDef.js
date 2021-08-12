import { gql } from 'apollo-server-express'

export default gql`

type Query {
    orders: [Order!]!
    order(id: ID!): Order!
    getOrderByCode(orderCode: Int!): Order
    getOrderByPaymentStatus(paymentStatus:String!):[Order]
    getOrderByOrderStatus(itemStatus:String!):[Order]
   
}

type Order {
    id: ID!
    orderCode:Int!
    itemList:[ItemList!]!
    cost:Int!
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
    createOrder( orderCode:Int!,
        cost:Int!,
        itemStatus:String!,
        paymentMode:String!,
        itemList:[inputItemList!]!,
        paymentStatus:String!): Order!,
    updateOrderStatus(orderCode:Int!,itemStatus:String!):Order!,
    updatePaymentStatus(orderCode:Int!,paymentStatus:String):Order!,
    deleteOrder(orderCode:Int!):String,
   
   
}

`