import {gql} from '@apollo/client'


export const DISPLAY_MENU=gql`
query Query($displayMenuMenuId: String!) {
    displayMenu(menuId: $displayMenuMenuId) {
      categories{
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
  }`