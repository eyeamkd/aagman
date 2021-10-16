import { DISPLAY_MENU } from '../GraphQL/Queries/MenuQueries';

export const itemList = [
    {
        name: "Pizza",
        price: 200,
        quantity: 2
    },
    {
        name: "Burger",
        price: 100,
        quantity: 3
    }
]

export const paymentModes = ["Cash", "CreditCard", "UPI", "DebitCard", "Check", "NetBanking"]

export const items = [
    {
        id: "61447d701de60f3dc42bc930",
        name: "Pizza",
        description: "Italian Dish",
        availability: "InStock",
        type: "Veg",
        price: 150,
        rating: 5,
        bestSeller: "Yes",
        photo: "0"
    }
]

export const mockMenuData =[
{
    request: {
        query: DISPLAY_MENU,
        variables: {
            displayMenuMenuId: "61447243b8d19037a889dce0",
        },
    },
    result: {
        data: {
            displayMenu: {
                categories: [
                    {
                        name: "Fast Food",
                        items
                    }
                ]
            }
        }
    }
}]