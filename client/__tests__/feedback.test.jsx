import React from "react";
import Feedback from "../pages/feedback";
import { MockedProvider } from "@apollo/client/testing";
import { mount } from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import {mockFeedbackData} from '../mockData/feedback'

jest.mock('framer-motion', () => {
  const motion = {
    div: jest.fn(({ children }) => children),
    main: jest.fn(({ children }) => children)
  };
  return {
    motion,
  };
});


jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { orderId: "6144a388578b923258a33c80" },
  }),
}));


describe("Test for feedback", () => {
  let wrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mockFeedbackData} addTypename={false}>
          <Feedback />
        </MockedProvider>)
    })
    await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the feedback page", async () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();

  });
})


