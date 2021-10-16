import { AddMenu } from '../components/AddMenu';
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {mockCategoryData, mockCategoryErrorData} from '../mockData/category'

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
    wrapper.update();
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
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Sorry for the Inconvenience :(There has been a problem");
})