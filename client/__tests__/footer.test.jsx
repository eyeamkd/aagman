import React from 'react'
import Footer from '../components/Footer'
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

it("renders footer", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider>
                <Footer />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Copyright © Aagman 2021.");
})
