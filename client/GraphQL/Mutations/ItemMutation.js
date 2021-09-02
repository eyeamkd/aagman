import {gql} from '@apollo/client'

export const ADD_CATEGORY=gql`
mutation Mutation($createItemName: String!,
     $createItemDescription: String!,
      $createItemAvailability: ItemAvailability!,
       $createItemType: Type!,
        $createItemPrice: Float!,
         $createItemRating: Float!,
          $createItemBestSeller: BestSellerItem!,
           $createItemPhoto: String!,
            $createItemCategoryId: ID!) {
    createItem(name: $createItemName,
         description: $createItemDescription,
          availability: $createItemAvailability,
           type: $createItemType,
            price: $createItemPrice,
             rating: $createItemRating,
              bestSeller: $createItemBestSeller,
               photo: $createItemPhoto,
                categoryId: $createItemCategoryId)
  }
`