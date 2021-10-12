import { GET_USERS_STORES_FROM_EMAIL } from '../GraphQL/Queries/UsersQueries'
import { GET_REVENUE } from '../GraphQL/Queries/StoreQueries';

export const mockRevenueData =
  [{
    request: {
      query: GET_REVENUE,
      variables: {
        getRevenueStoreId: "61447a3bce2ffd3bc0f1f71b"
      },
    },
    result: {
      "data": {
        "getRevenue": {
          "revenue": {
            "totalIncome": 30,
            "orders": [
              {
                "orderCode": 8429,
                "dateAndTime": "2021-09-17T12:53:29.951Z",
                "orderStatus": "OrderReceived",
                "itemsList": [
                  {
                    "name": "Cheese burger",
                    "quantity": 1,
                    "price": 30
                  }
                ],
                "bill": {
                  "totalCost": 30,
                  "paymentMode": "DebitCard",
                  "paymentStatus": "NotPaid"
                }
              }
            ]
          }
        }
      }
    },
  },
  {
    request: {
      query: GET_USERS_STORES_FROM_EMAIL,
      variables: {
        getUserStoreIdEmail: "greeta1999kavitha@gmail.com"
      }
    },
    result: {
      "data": {
        "getUserStoreId": {
          "stores": [
            {
              "id": "61447a3bce2ffd3bc0f1f71b",
              "name": "BurgerMan"
            }
          ]
        }
      }
    },
  }
  ];