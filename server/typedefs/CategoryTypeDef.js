const {gql}=require("apollo-server-express");

module.exports= gql`
scalar Upload
type Query {
    categories: [Category!]!
    category(id: ID!): Category!
}

type Category {
    id: ID! 
    name : String! 
    items : [Item!]!
}
type Mutation{
    createCategory(name:String!,menuId:String!):String!
    AddMenuItem(menuId:ID!,
               categoryName:String!,
               itemName:String!,
               description:String!,
               availability:ItemAvailability!,
               type:Type!,
               price:Float!,
               rating:Float!,
               bestSeller:BestSellerItem!,
               photo:String!):String!
}


`