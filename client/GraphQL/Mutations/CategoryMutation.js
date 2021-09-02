import {gql} from '@apollo/client'

export const ADD_CATEGORY=gql`
mutation Mutation($createCategoryName: String!, $createCategoryMenuId: String!) {
    createCategory(name: $createCategoryName, menuId: $createCategoryMenuId)
  }
`