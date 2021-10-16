import React from 'react'
import Profile from '../components/Profile';
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {mockUserData, mockUserErrorData} from '../mockData/user'

it("renders user data", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockUserData]} addTypename={false}>
                <Profile storeId="61447242b8d19037a889dcdb" />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual('Add Store');
})

it("renders loading user data", () => {
    let wrapper;
    act(() => {
        wrapper = mount(
            <MockedProvider mocks={[mockUserData]} addTypename={false}>
                <Profile storeId="61447242b8d19037a889dcdb" />
            </MockedProvider>
        )
    })

    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Loading...")
})

it("renders with error", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider addTypename={false} mocks={[mockUserErrorData]}>
                <Profile storeId="61447242b8d19037a889dcdb" />
            </MockedProvider>
        );
    });

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Sorry for the Inconvenience :(There has been a problem");
})