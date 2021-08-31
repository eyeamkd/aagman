const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    bills: [Bill!]!
    bill(id: ID!): Bill!
}

type Bill {
    Id: String! 
    TotalCost: Float!
    PaymentMode: PaymentTypes!       
    PaymentStatus: PaymentStatusTypes!  
    Order : Order!
}

enum PaymentTypes{
    Cash, CreditCard, UPI, DebitCard, Check, NetBanking
}

enum PaymentStatusTypes{
    Paid , NotPaid 
}

type Mutation{
    createBill(TotalCost:Float!,
               PaymentMode:PaymentTypes! ,
               PaymentStatus:PaymentStatusTypes!,
               OrderId:String!,
               RevenueId:String! ):String!
}


`