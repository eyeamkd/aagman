const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    menus: [Menu!]!
    menu(id: ID!): Menu!
    displayMenu(MenuId:String!):Menu!
}

type Menu {
    Id: String! 
    Store: Store! 
    Categories: [Category!]!
}

type Mutation{
    createMenu(StoreId:String!):String!
}

`