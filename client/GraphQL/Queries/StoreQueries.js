import {gql} from '@apollo/client'

export const GET_STORE_MENU_ITEMS=gql`
query Query($ordersDashboardStoreId: String!) {
    ordersDashboard(StoreId: $ordersDashboardStoreId) {
      Orders {
        OrderCode
        OrderStatus
        ItemsList {
          Name
          Quantity
          Price
        }
        Bill {
          TotalCost
          PaymentMode
          PaymentStatus
        }
      }
    }
  }
`