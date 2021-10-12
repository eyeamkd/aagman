import React from 'react'
import Signup from '../components/signup';
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {mockAddUserData} from '../mockData/user'

jest.mock('next/router', () => require('next-router-mock'));

window.alert = jest.fn();

const fakeEvent = { preventDefault: () => console.log('preventDefault') };

it("renders sign up", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockAddUserData]} addTypename={false}>
                <Signup />
            </MockedProvider>
        )
    })


    const submitButton = wrapper.find("form");
    await act(async () => submitButton.props().onSubmit(fakeEvent));

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual('Register');
    window.alert.mockClear();
})