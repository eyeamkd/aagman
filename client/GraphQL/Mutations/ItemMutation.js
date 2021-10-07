import {gql} from '@apollo/client'

export const DELETE_ITEM=gql`
mutation Mutation($deleteItemItemId: ID!, $deleteItemCategoryId: ID!) {
  deleteItem(itemId: $deleteItemItemId, categoryId: $deleteItemCategoryId)
}`

export const UPLOAD_IMAGE=gql`
mutation Mutation($uploadImageFile: Upload!) {
  uploadImage(file: $uploadImageFile) {
    id
    generatedFileName
  }
}
`


export const UPDATE_UPLOADED_IMAGE=gql`
mutation Mutation($uploadUpdatedImageFile: Upload!, $uploadUpdatedImageOldfilename: String!) {
  uploadUpdatedImage(file: $uploadUpdatedImageFile, oldfilename: $uploadUpdatedImageOldfilename) {
    id
    generatedFileName
  }
}`

export const UPDATE_ITEM=gql`
mutation Mutation(
    $updateItemName: String!, 
    $updateItemDescription: String!, 
    $updateItemAvailability: ItemAvailability!, 
    $updateItemType: Type!, 
    $updateItemPrice: Float!, 
    $updateItemRating: Float!, 
    $updateItemBestSeller: BestSellerItem!, 
    $updateItemPhoto: String!, 
    $updateItemItemId: ID!) {
  updateItem(
    name: $updateItemName, 
    description: $updateItemDescription, 
    availability: $updateItemAvailability, 
    type: $updateItemType, 
    price: $updateItemPrice, 
    rating: $updateItemRating, 
    bestSeller: $updateItemBestSeller, 
    photo: $updateItemPhoto, 
    itemId: $updateItemItemId)
}`

export const ADD_ITEM=gql`
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

