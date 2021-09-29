import { VerifyOrder } from '../components/VerifyOrder';
import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { menuId: "61447243b8d19037a889dce0" },
    }),
}));

const itemList = [
    {
        name: "Pizza",
        price: 200,
        quantity: 2
    },
    {
        name: "Burger",
        price: 100,
        quantity: 3
    }
]

const paymentModes = ["Cash", "CreditCard", "UPI", "DebitCard", "Check", "NetBanking"]

it("renders verify order", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider>
                <VerifyOrder itemList={itemList} paymentModes={paymentModes}/>
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
})
