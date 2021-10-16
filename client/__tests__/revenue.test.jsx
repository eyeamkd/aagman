import React from "react";
import Revenue from "../pages/revenue";
import { MockedProvider } from "@apollo/client/testing";
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import { StoreContext } from '../src/StoreContext'
import {mockRevenueData} from '../mockData/revenue'

jest.mock('framer-motion', () => {
  const motion = {
    div: jest.fn(({ children }) => children),
  };
  return {
    motion,
  };
});

describe("Test for Revenue", () => {
  let wrapper;

  beforeEach(async () => {
    const storeIdGlobal = jest.fn()
    const userEmailGlobal = jest.fn()
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mockRevenueData} addTypename={false}>
          <StoreContext.Provider value={{ storeIdGlobal, userEmailGlobal }}>
            <Revenue />
          </StoreContext.Provider>
        </MockedProvider>)
    })
    await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the revenue page data", async () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();

  });
})


