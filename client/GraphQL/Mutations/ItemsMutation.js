import {gql} from '@apollo/client'


export const CREATE_ITEM=gql`
mutation Mutation($createItemItemCode: String!, $createItemEmail: String!) {
  createItem(itemCode: $createItemItemCode, email: $createItemEmail) {
    itemCode
  }
}
`
export const ADD_CATEGORY=gql`
mutation Mutation($addCategoryCategoryName: String!, $addCategoryItemCode: String!) {
  addCategory(categoryName: $addCategoryCategoryName, itemCode: $addCategoryItemCode) {
    categoryName
    id
  }
}
`
export const ADD_ITEMLIST=gql`
mutation Mutation($addItemsCategoryId: String!, $addItemsName: String!, $addItemsDescription: String!, $addItemsCost: Int!, $addItemsStatus: String!) {
  addItems(categoryId: $addItemsCategoryId, name: $addItemsName, description: $addItemsDescription, cost: $addItemsCost, status: $addItemsStatus) {
    name
    description
    status
    cost
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

