import {gql} from '@apollo/client'

export const LOAD_ITEMS=gql`
query Query {
    items {
      itemCode
      itemSubTopic {
        itemsName
        items {
          Name
          Description
          Quantity
          Status
          Cost
        }
      }
    }
  }
`
export const GET_ITEMS=gql`
query Query($getItemByCodeItemCode: String!) {
  getItemByCode(itemCode: $getItemByCodeItemCode) {
    itemCode
    itemSubTopic {
      itemsName
      items {
        Name
        Description
        Quantity
        Status
        Cost
      }
    }
  }
}
`