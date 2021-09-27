import React from 'react'
import Login from '../components/login';
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

it("renders login", async () => {
    let wrapper;
    wrapper = mount(
        <Login />
    )


    // const submitButton = wrapper.find("button");
    // await act(async() => submitButton.props().onSubmit());
    // console.log(wrapper.debug())
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual('Login');
})