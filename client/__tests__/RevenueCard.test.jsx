//import 'jsdom-global/register';
import React from "react";
import{ RevenueCard} from "../components/RevenueCard";
import {mount} from 'enzyme';


describe("Test for Revenue Card",()=>{
  let wrapper;

  beforeEach(() => {
    wrapper=mount(<RevenueCard heading="Today's Total Orders" content={10}/>)
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the Revenue Card",() => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Today's Total Orders10");
  });
})


