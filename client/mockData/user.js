import { GET_USER_ID } from '../GraphQL/Queries/StoreQueries';
import { ADD_USERS } from '../GraphQL/Mutations/UsersMutation';

export const mockUserData = {
    request: {
        query: GET_USER_ID,
        variables: {
            getUserIdStoreId: "61447242b8d19037a889dcdb",
        },
    },
    result: {
        data: {
            getUserId: {
                owner: {
                    id: "61447242b8d19037a889dcda"
                }
            }
        }
    }
}

export const mockUserErrorData = {
    request: {
        query: GET_USER_ID,
        variables: {
            getUserIdStoreId: "61447242b8d19037a889dcdb",
        },
    },
    error: new Error("Network Error")
}

export const mockAddUserData = {
    request: {
        query: ADD_USERS,
        variables: {
            addUserEmail: "",
            addUserFullName: "",
            addUserGstNumber: "",
            addUserPhoneNumber: "",
            addUserStoreName: "",
            addUserCountry: "",
            addUserState: "",
            addUserCity: "",
            addUserArea: "",
            addUserLandMark: "",
            addUserOpenTime: "07:30",
            addUserCloseTime: "20:30",
            addUserStatusTime: "Open"
        },
    },
    result: {
        data: {
            addUser: "User Created"
        }
    }
}