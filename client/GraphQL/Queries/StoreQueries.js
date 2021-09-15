import {gql} from '@apollo/client'

export const GET_REVENUE=gql`
query Query($getRevenueStoreId: ID!) {
  getRevenue(storeId: $getRevenueStoreId) {
    revenue {
      totalIncome
      orders {
        orderCode
        dateAndTime
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
}`

export const GET_USER_ID=gql`
query Query($getUserIdStoreId: ID!) {
  getUserId(storeId: $getUserIdStoreId) {
    owner {
      id
    }
  }
}`

export const GET_STORE_MENU_ITEMS=gql`
query Query($ordersDashboardStoreId: ID!) {
  ordersDashboard(storeId: $ordersDashboardStoreId) {
    orders {
      id
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