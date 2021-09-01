const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    categories: [Category!]!
    category(id: ID!): Category!
}

type Category {
    id: String! 
    name : String! 
    items : [Item!]!
}
type Mutation{
    createCategory(name:String!,menuId:String!):String!
    AddMenuItem(menuId:String!,
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