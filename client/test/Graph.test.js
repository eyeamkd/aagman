import 'jsdom-global/register';
import React,{ useState, useEffect, useContext } from "react";
import { render, screen,cleanup } from "@testing-library/react";
import Graph from "../components/Graph";
import {shallow,configure,mount,unmount} from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




configure({ adapter: new Adapter() })

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


