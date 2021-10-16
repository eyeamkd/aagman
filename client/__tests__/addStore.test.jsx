import { AddStore } from '../components/AddStore';
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {mockUserData} from '../mockData/user'

const props = {
    title: "Add Store",
    openPopup: jest.fn(),
    setOpenPopup: jest.fn(),
    addStore: jest.fn()
};

it("renders user data", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockUserData]} addTypename={false}>
                <AddStore {...props} />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
})