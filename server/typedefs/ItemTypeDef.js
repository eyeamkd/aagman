import { gql } from 'apollo-server-express'

export default gql`

type Query {
    items: [Item!]!
    item(id: ID!): Item!
    getItemByCode(itemCode: Int!): Item
    
}
type ItemSubTopicList{
    itemList:[ItemList!]
}

input inputItemSubTopicList{
    itemList:[inputItemList]
}

input inputItemList{
    itemName:String!
    itemDescription:String!
    itemQuantity:Int!
    Status:String!
    Cost:Int!
}

type ItemList{
    itemName:String!
    itemDescription:String!
    itemQuantity:Int!
    Status:String!
    Cost:Int!
}

type Item {
    id: ID!
    itemCode:Int!
    itemSubTopicList:[ItemSubTopicList!]
}

type Mutation{
    createItem(itemCode:Int!,itemSubTopic:inputItemSubTopicList!):Item!
}



`