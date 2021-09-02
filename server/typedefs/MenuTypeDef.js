const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    menus: [Menu!]!
    menu(id: ID!): Menu!
    displayMenu(menuId:ID!):Menu!
}

type Menu {
    id: ID! 
    store: Store! 
    categories: [Category!]!
}

type Mutation{
    createMenu(storeId:ID!):String!
}

`