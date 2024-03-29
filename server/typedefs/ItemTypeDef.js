const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    items: [Item!]!
    item(id: ID!): Item!
}

type Item {
    id: ID! 
    name : String!
    description : String!
    availability : ItemAvailability!                 
    type: Type!                        
    price : Float!
    rating : Float! 
    bestSeller : BestSellerItem!            
    photo: String! 
}

enum ItemAvailability{
    InStock,OutOfStock
}

enum Type{
    Veg,NonVeg,Egg,NonEdible
}

enum BestSellerItem{
    Yes,No
}

type Mutation{
    createItem(name:String!,
               description:String!,
               availability:ItemAvailability!,
               type:Type!,
               price:Float!,
               rating:Float!,
               bestSeller:BestSellerItem!,
               photo:String!,
               categoryId:ID! ):String!
}


`