//import 'jsdom-global/register';
import React,{ useState, useEffect, useContext } from "react";
import { render, screen,cleanup } from "@testing-library/react";
import Graph from "../components/Graph";
import {mount,unmount} from 'enzyme';







describe("Test for Graph",()=>{
  let wrapper;

  beforeEach(() => {
    wrapper=mount(<Graph  heading="Revenue"/>)
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders Graph",() => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Revenue");
  });
})


