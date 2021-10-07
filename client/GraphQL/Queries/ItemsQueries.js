import {gql} from '@apollo/client'


export const GET_IMAGE=gql`
query Query($retrieveImageImageName: String!) {
  retrieveImage(imageName: $retrieveImageImageName)
}`

export const LOAD_ITEMS=gql`
query Query {
    items {
      itemCode
      categories {
        categoryName
        items {
          name
          description
     
          status
          cost
        }
      }
    }
  }
`
export const GET_ITEMS=gql`

query Query($getItemByCodeItemCode: String!) {
  getItemByCode(itemCode: $getItemByCodeItemCode) {
    itemCode
    categories {
      categoryName
      items {
        name
        description
        status
        cost
      }
    }
  }
}
`
export const GET_ITEMS_BY_ID=gql`
query Query($itemId: ID!) {
  item(id: $itemId) {
    itemCode
    categories {
      categoryName
      items {
        name
        description
        status
        cost
      }
    }
  }
}
`