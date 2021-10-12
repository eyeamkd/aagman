import { VerifyOrder } from '../components/VerifyOrder';
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {itemList, paymentModes} from '../mockData/product'

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { menuId: "61447243b8d19037a889dce0" },
    }),
}));

it("renders verify order", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider>
                <VerifyOrder itemList={itemList} paymentModes={paymentModes} />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
})
