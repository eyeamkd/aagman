import { VerifyUser } from '../components/VerifyUser';
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

it("renders verify user pop up", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
                <VerifyUser/>
        )
    })
    expect(wrapper).toBeTruthy();
})
