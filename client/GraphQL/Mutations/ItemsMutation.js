import {gql} from '@apollo/client'


export const CREATE_ITEMS=gql`
mutation CreateItemMutation($createItemItemCode: String!, $createItemItemSubTopic: [inputItemSubTopic]!) {
  createItem(itemCode: $createItemItemCode, itemSubTopic: $createItemItemSubTopic) {
    itemCode
  }
}
`

export const UPDATE_ITEMS=gql`
mutation Mutation($updateItemItemCode: String!, $updateItemItemSubTopic: [inputItemSubTopic]!) {
  updateItem(itemCode: $updateItemItemCode, itemSubTopic: $updateItemItemSubTopic) {
    itemCode
    itemSubTopic {
      itemsName
      items {
        Name
        Description
        Status
        Quantity
        Cost
      }
    }
  }
}
`

export const DELETE_ITEMS=gql`
mutation Mutation($deleteItemItemCode: String!) {
  deleteItem(itemCode: $deleteItemItemCode)
}
`

