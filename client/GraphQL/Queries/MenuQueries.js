import {gql} from '@apollo/client'


export const DISPLAY_MENU=gql`
query Query($displayMenuMenuId: ID!) {
  displayMenu(menuId: $displayMenuMenuId) {
    categories {
      name
      items {
        name
        description
        availability
        type
        price
        rating
        bestSeller
        photo
      }
    }
  }
}
`

export const GET_STORE_ID=gql`query Query($getStoreIdMenuId: ID!) {
  getStoreId(menuId: $getStoreIdMenuId) {
    store {
      id
    }
  }
}`