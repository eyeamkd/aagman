const {gql}=require("apollo-server-express");

module.exports= gql`

type Query {
    items: [Item!]!
    item(id: ID!): Item!
    getItemByCode(itemCode: String!): Item 
}

type Categories{
    id: ID!
    categoryName:String!
    items:[ItemsList]!
}

type categoryId{
    id:ID!
}

input inputCategories{
    categoryName:String!
    items:[inputItemsList]!
}

input inputItemsList{
    name:String!
    description:String!
    status:String!
    cost:Int!
}

type ItemsList{
    id: ID!
    name:String!
    description:String!
    status:String!
    cost:Int!
}

type Item {
    id: ID!
    itemCode:String!
    ownerUser:[User!]
    categories:[Categories]!
}

type Mutation{
    createItem(itemCode:String!,email:String!):Item!
    addCategory(categoryName:String!,itemCode:String!):Categories!
    addItems(categoryId:String!,name:String!,description:String!,cost:Int!,status:String!):ItemsList!
}

`