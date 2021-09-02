const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    timings: [Timing!]!
    timing(id: ID!): Timing!
}

type Timing {
    id : ID! 
    openTime: String! 
    closeTime: String !
    status:  statusTiming!
    store: Store!
}

enum statusTiming{
    Open,
    Close
}

type Mutation{
    createTiming(openTime:String!,closeTime:String!,storeId:ID!,statusTime:statusTiming!):String!
}
`