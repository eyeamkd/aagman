import React from 'react'
import StoreCover from '../components/StoreCover'
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { menuId: "61447243b8d19037a889dce0" },
    }),
}));

it("renders header for the menu", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider>
                <StoreCover />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe("Description of the store.");
})
