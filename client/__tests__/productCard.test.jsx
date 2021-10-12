import React from 'react'
import ProductCard from '../components/ProductCard'
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {items, mockMenuData} from '../mockData/product'

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { menuId: "61447243b8d19037a889dce0" },
    }),
}));

const setItem = jest.fn();

it("renders product cards for the menu", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={mockMenuData} addTypename={false}>
                <ProductCard product={items} setItem={setItem}/>
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
})
