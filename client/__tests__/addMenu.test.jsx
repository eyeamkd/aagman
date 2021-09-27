import { AddMenu } from '../components/AddMenu';
import React from 'react'
import { GET_CATEGORIES } from '../GraphQL/Queries/CategoriesQueries';
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

const mockCategoryData = {
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

const mockCategoryErrorData = {
    request: {
        query: GET_CATEGORIES,
        variables: {
            getCategoryByMenuIdMenuId: "61447243b8d19037a889dce0"
        },
    },
    error: new Error("Network Error")
}


it("renders category data", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockCategoryData]} addTypename={false}>
                <AddMenu />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    console.log(wrapper.debug())
    expect(wrapper).toBeTruthy();
})

it("renders loading category data", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockCategoryData]} addTypename={false}>
                <AddMenu />
            </MockedProvider>
        )
    })

    console.log(wrapper.debug())
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Loading...");
})

it("renders category data with error", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockCategoryErrorData]} addTypename={false}>
                <AddMenu />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    console.log(wrapper.debug())
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Error loading data...");
})