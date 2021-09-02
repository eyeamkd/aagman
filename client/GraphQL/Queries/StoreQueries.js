import {gql} from '@apollo/client'

export const GET_STORE_MENU_ITEMS=gql`
query Query($ordersDashboardStoreId: ID!) {
  ordersDashboard(storeId: $ordersDashboardStoreId) {
    orders {
      orderCode
      orderStatus
      itemsList {
        name
        quantity
        price
      }
      bill {
        totalCost
        paymentMode
        paymentStatus
      }
    }
  }
}
`