
import {gql} from '@apollo/client'

export const ADD_FEEDBACK=gql`mutation Mutation(
    $addFeedbackOrderServiceRating: Float!,
     $addFeedbackDeliveryServiceRating: Float!,
      $addFeedbackComment: String!,
       $addFeedbackStoreId: ID!,
        $addFeedbackOverallStoreRating: Float!,
         $addFeedbackFoodRating: Float!
         , $addFeedbackItemsList: [ID]!) {
    addFeedback(orderServiceRating: $addFeedbackOrderServiceRating,
         deliveryServiceRating: $addFeedbackDeliveryServiceRating,
          comment: $addFeedbackComment,
           storeId: $addFeedbackStoreId,
            overallStoreRating: $addFeedbackOverallStoreRating
            , foodRating: $addFeedbackFoodRating,
             itemsList: $addFeedbackItemsList)
  }`