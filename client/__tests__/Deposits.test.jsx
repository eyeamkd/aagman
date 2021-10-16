import React from "react";
import Deposits from '../components/Deposits'
import { MockedProvider } from "@apollo/client/testing";
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {mockRevenueData} from '../mockData/revenue'

jest.mock('framer-motion', () => {
  const motion = {
    div: jest.fn(({ children }) => children),
  };
  return {
    motion,
  };
});

describe("Test for Deposits", () => {
  let wrapper;

  beforeEach(async () => {

    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mockRevenueData} addTypename={false}>
          <Deposits />
        </MockedProvider>)
    })
    await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the deposit component", () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();
  });
})


