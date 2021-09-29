import React from 'react'
import Header from '../components/Header'
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
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
                <Header />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("h6").text()).toBe("Aagman Menu");
    expect(wrapper.find("button")).toHaveLength(2);
})
