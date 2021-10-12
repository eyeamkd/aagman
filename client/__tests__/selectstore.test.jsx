import React from "react";
import SelectStorePage from "../pages/selectstore";
import { MockedProvider } from "@apollo/client/testing";
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import { StoreContext } from '../src/StoreContext'
import {mockStoreData} from '../mockData/store'

jest.mock('framer-motion', () => {
  const motion = {
    div: jest.fn(({ children }) => children),
  };
  return {
    motion,
  };
});



jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { email: 'greeta1999kavitha@gmail.com' },
  }),
}));


describe("Test for select Store", () => {
  let wrapper;

  beforeEach(async () => {
    const setStoreIdGlobal = jest.fn()
    const setUserEmailGlobal = jest.fn()
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mockStoreData} addTypename={false}>
          <StoreContext.Provider value={{ setStoreIdGlobal, setUserEmailGlobal }}>
            <SelectStorePage />
          </StoreContext.Provider>
        </MockedProvider>)
    })
    await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the selector store data", async () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Store SelectorSelect the store you want to login.Store *BurgerManStoreSubmitCopyright © Aagman 2021.");
  });
})


