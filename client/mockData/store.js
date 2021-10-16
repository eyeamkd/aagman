import { GET_USERS_STORES_FROM_EMAIL, GET_USER_FROM_EMAIL } from '../GraphQL/Queries/UsersQueries'

export const mockStoreData =
  [{
    request: {
      query: GET_USERS_STORES_FROM_EMAIL,
      variables: {
        getUserStoreIdEmail: "greeta1999kavitha@gmail.com"
      },
    },
    result: {
      "data": {
        "getUserStoreId": {
          "stores": [
            {
              "name": "BurgerMan",
              "id": "61447a3bce2ffd3bc0f1f71b"
            }
          ]
        }
      }
    },
  },
  {
    request: {
      query: GET_USER_FROM_EMAIL,
      variables: {
        getUserByMailEmail: "greeta1999kavitha@gmail.com"
      }
    },
    result: {
      "data": {
        "getUserByMail": {
          "id": "61447a3bce2ffd3bc0f1f71a"
        }
      }
    },
  }
  ];