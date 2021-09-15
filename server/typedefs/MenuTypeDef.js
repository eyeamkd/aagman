const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    menus: [Menu!]!
    menu(id: ID!): Menu!
    displayMenu(menuId:ID!):Menu!
    getCategoryByMenuId(menuId:ID!):CategoryMenu
    getStoreId(menuId:ID!):Menu!
    getToken(menuId:ID!):[String!]!
}

type CategoryMenu{
    categories:[CategoryName]
}

type CategoryName{
    id:ID!
    name:String!
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