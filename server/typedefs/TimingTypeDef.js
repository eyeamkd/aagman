const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    timings: [Timing!]!
    timing(id: ID!): Timing!
}

type Timing {
    id : String! 
    openTime: String! 
    closeTime: String !
    availability:  TimingAvailability!
    store: Store!
}

enum TimingAvailability{
    Open,
    Close
}

type Mutation{
    createTiming(openTime:String!,closeTime:String!,storeId:String!,availability:TimingAvailability!):String!
}
`