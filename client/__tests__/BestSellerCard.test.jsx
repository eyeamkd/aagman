//import 'jsdom-global/register';
import React from "react";
import{ BestSellerCard} from "../components/BestSellerCard";
import {mount} from 'enzyme';


describe("Test for Best Seller card",()=>{
  let wrapper;

  beforeEach(() => {
    wrapper=mount(<BestSellerCard  itemName="Coffee" numberOfOrders={7}/>)
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the Best Seller",() => {
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("CoffeeNumber Of Orders: 7");
  });
})


