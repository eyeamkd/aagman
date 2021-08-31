const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    timings: [Timing!]!
    timing(id: ID!): Timing!
}

type Timing {
    Id : String! 
    OpenTime: String! 
    CloseTime: String !
    Availability:  TimingAvailability!
    Store: Store!
}

enum TimingAvailability{
    Open,
    Close
}

type Mutation{
    createTiming(OpenTime:String!,CloseTime:String!,StoreId:String!,Availability:TimingAvailability!):String!
}
`