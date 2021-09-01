const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    bills: [Bill!]!
    bill(id: ID!): Bill!
}

type Bill {
    id: String! 
    totalCost: Float!
    paymentMode: PaymentTypes!       
    paymentStatus: PaymentStatusTypes!  
    order : Order!
}

enum PaymentTypes{
    Cash, CreditCard, UPI, DebitCard, Check, NetBanking
}

enum PaymentStatusTypes{
    Paid , NotPaid 
}

type Mutation{
    createBill(totalCost:Float!,
               paymentMode:PaymentTypes! ,
               paymentStatus:PaymentStatusTypes!,
               orderId:String!,
               revenueId:String! ):String!
}


`