const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    notifications: [Notification!]!
    notification(id: ID!): Notification!
}

type Notification {
    id: ID! 
    title : String!
    message : String!
    readAt : String!
    sentAt : String!
    createdAt : String!
    user : User!
}

type Mutation{
    createNotification( title : String, message : String, readAt : String, sentAt : String, createdAt : String, userId: ID): String!
}
`