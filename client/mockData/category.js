import { GET_CATEGORIES } from '../GraphQL/Queries/CategoriesQueries';

export const mockCategoryData = {
    request: {
        query: GET_CATEGORIES,
        variables: {
            getCategoryByMenuIdMenuId: "61447243b8d19037a889dce0"
        },
    },
    result: {
        data: {
            getCategoryByMenuId: {
                categories: [
                    {
                        id: "61447d6c1de60f3dc42bc927",
                        name: "Fast Food"
                    }
                ]
            }
        }
    }
}

export const mockCategoryErrorData = {
    request: {
        query: GET_CATEGORIES,
        variables: {
            getCategoryByMenuIdMenuId: "61447243b8d19037a889dce0"
        },
    },
    error: new Error("Network Error")
}
