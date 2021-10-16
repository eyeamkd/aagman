import { VerifyUser } from '../components/VerifyUser';
import React from 'react'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

it("renders verify user pop up", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <VerifyUser />
        )
    })
    expect(wrapper).toBeTruthy();
})
