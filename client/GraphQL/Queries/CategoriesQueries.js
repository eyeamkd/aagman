import {gql} from '@apollo/client'

export const GET_CATEGORIES=gql`
query Query($getCategoryByMenuIdMenuId: ID!) {
    getCategoryByMenuId(menuId: $getCategoryByMenuIdMenuId) {
      categories {
        id
        name
      }
    }
  }
`