import { gql } from 'apollo-server-express'

export default gql`

type Query {
    items: [Item!]!
    item(id: ID!): Item!
    getItemByCode(itemCode: String!): Item
   
}
type categories{
    categoryName:String!
    items:[Items]!
}

input inputCategories{
    categoryName:String!
    items:[inputItems]!
}

input inputItems{
    name:String!
    description:String!
    status:String!
    cost:Int!
}

type Items{
    name:String!
    description:String!
    status:String!
    cost:Int!
}

type Item {
    id: ID!
    itemCode:String!
    categories:[categories]!
}

type Mutation{
    createItem(itemCode:String!,categories:[inputCategories]!):Item!
    updateItem(itemCode:String!,categories:[inputCategories]!):Item
    deleteItem(itemCode:String!):String
    getItemByCategory(itemCode:String!,categoryName:String!):String

}

`