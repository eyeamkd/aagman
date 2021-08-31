import {gql} from '@apollo/client'


export const DISPLAY_MENU=gql`
query Query($displayMenuMenuId: String!) {
    displayMenu(MenuId: $displayMenuMenuId) {
      Categories {
        Name
        Items {
          Name
          Description
          Availability
          Type
          Price
          Rating
          BestSeller
          Photo
        }
      }
    }
  }`