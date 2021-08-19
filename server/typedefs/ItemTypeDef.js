import { gql } from 'apollo-server-express'

export default gql`

type Query {
    items: [Item!]!
    item(id: ID!): Item!
    getItemByCode(itemCode: String!): Item
    
}
type ItemSubTopic{
    itemsName:String!
    items:[Items]!
}

input inputItemSubTopic{
    itemsName:String!
    items:[inputItems]!
}

input inputItems{
    Name:String!
    Description:String!
    Quantity:Int!
    Status:String!
    Cost:Int!
}

type Items{
    Name:String!
    Description:String!
    Quantity:Int!
    Status:String!
    Cost:Int!
}

type Item {
    id: ID!
    itemCode:String!
    itemSubTopic:[ItemSubTopic]!
}

type Mutation{
    createItem(itemCode:String!,itemSubTopic:[inputItemSubTopic]!):Item!
    updateItem(itemCode:String!,itemSubTopic:[inputItemSubTopic]!):Item
    deleteItem(itemCode:String!):String
}

`