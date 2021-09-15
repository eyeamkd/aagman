import {gql} from '@apollo/client'

export const ADD_STORE=gql`
mutation Mutation($addStoreStoreName: String!,
     $addStoreCountry: String!,
      $addStoreState: String!,
       $addStoreCity: String!,
        $addStoreArea: String!,
         $addStoreLandMark: String!,
          $addStoreOpenTime: String!,
           $addStoreCloseTime: String!,
            $addStoreStatusTime: statusTiming!,
             $addStoreUserId: ID!) {
    addStore(storeName: $addStoreStoreName,
         country: $addStoreCountry,
          state: $addStoreState,
           city: $addStoreCity,
            area: $addStoreArea,
             landMark: $addStoreLandMark,
              openTime: $addStoreOpenTime,
               closeTime: $addStoreCloseTime,
                statusTime: $addStoreStatusTime,
                 userId: $addStoreUserId)
  }
`