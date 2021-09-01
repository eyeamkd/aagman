const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    menus: [Menu!]!
    menu(id: ID!): Menu!
    displayMenu(menuId:String!):Menu!
}

type Menu {
    id: String! 
    store: Store! 
    categories: [Category!]!
}

type Mutation{
    createMenu(storeId:String!):String!
}

`