import React from 'react'
import Login from '../components/login';
import { mount } from "enzyme"

it("renders login", async () => {
    let wrapper;
    wrapper = mount(
        <Login />
    )
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual('Login');
})