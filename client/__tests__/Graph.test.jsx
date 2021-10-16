import React from "react";
import Graph from "../components/Graph";
import { mount } from 'enzyme';

describe("Test for Graph", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Graph heading="Revenue" />)
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders Graph", () => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Revenue");
  });
})


