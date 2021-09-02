import {gql} from '@apollo/client'

export const ADD_MENU_ITEMS=gql`
mutation Mutation($addMenuItemMenuId: String!,
                  $addMenuItemCategoryName: String!,
                 $addMenuItemItemName: String!,
                  $addMenuItemDescription: String!,
                   $addMenuItemAvailability: ItemAvailability!,
                    $addMenuItemType: Type!,
                     $addMenuItemPrice: Float!,
                      $addMenuItemRating: Float!,
                       $addMenuItemBestSeller: BestSellerItem!,
                        $addMenuItemPhoto: String!) {
    AddMenuItem(MenuId: $addMenuItemMenuId,
         CategoryName: $addMenuItemCategoryName,
          ItemName: $addMenuItemItemName,
           Description: $addMenuItemDescription,
            Availability: $addMenuItemAvailability,
             Type: $addMenuItemType,
              Price: $addMenuItemPrice,
               Rating: $addMenuItemRating,
                BestSeller: $addMenuItemBestSeller,
                 Photo: $addMenuItemPhoto)
  }
`