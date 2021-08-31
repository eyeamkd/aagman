const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    categories: [Category!]!
    category(id: ID!): Category!
}

type Category {
    Id: String! 
    Name : String! 
    Items : [Item!]!
}
type Mutation{
    createCategory(Name:String!,MenuId:String!):String!
    AddMenuItem(MenuId:String!,
               CategoryName:String!,
               ItemName:String!,
               Description:String!,
               Availability:ItemAvailability!,
               Type:Type!,
               Price:Float!,
               Rating:Float!,
               BestSeller:BestSellerItem!,
               Photo:String!):String!
}


`