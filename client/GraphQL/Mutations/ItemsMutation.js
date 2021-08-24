import {gql} from '@apollo/client'


export const CREATE_ITEMS=gql`
mutation Mutation($createItemItemCode: String!, $createItemCategories: [inputCategories]!) {
  createItem(itemCode: $createItemItemCode, categories: $createItemCategories) {
    itemCode
    categories {
      categoryName
      items {
        name
        description
        status
        cost
      }
    }
  }
}

`

export const UPDATE_ITEMS=gql`
mutation Mutation($updateItemItemCode: String!, $updateItemCategories: [inputCategories]!) {
  updateItem(itemCode: $updateItemItemCode, categories: $updateItemCategories) {
    id
    itemCode
    categories {
      categoryName
      items {
        name
        description
        status
        cost
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

