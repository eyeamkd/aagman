const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    items: [Item!]!
    item(id: ID!): Item!
}

type Item {
    Id: String! 
    Name : String!
    Description : String!
    Availability : ItemAvailability!                 
    Type: Type!                        
    Price : Float!
    Rating : Float! 
    BestSeller : BestSellerItem!            
    Photo: String! 
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
    createItem(Name:String!,
               Description:String!,
               Availability:ItemAvailability!,
               Type:Type!,
               Price:Float!,
               Rating:Float!,
               BestSeller:BestSellerItem!,
               Photo:String!,
               CategoryId:String! ):String!
}


`