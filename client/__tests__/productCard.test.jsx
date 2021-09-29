import React from 'react'
import ProductCard from '../components/ProductCard'
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import { DISPLAY_MENU } from '../GraphQL/Queries/MenuQueries';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { menuId: "61447243b8d19037a889dce0" },
    }),
}));

const setItem = jest.fn();

const items = [
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

const mockedMenuData =[
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

it("renders product cards for the menu", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={mockedMenuData} addTypename={false}>
                <ProductCard product={items} setItem={setItem}/>
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    // console.log(wrapper.debug());
    expect(wrapper).toBeTruthy();
})
