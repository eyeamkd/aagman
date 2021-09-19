import React from 'react';
import ReactDom from 'react-dom';
import {render,fireEvent,cleanup,screen,container} from '@testing-library/react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import "@testing-library/jest-dom/extend-expect";
import {shallow,configure} from 'enzyme';
import renderer from "react-test-renderer";

configure({ adapter: new Adapter() })

afterEach(() => {
    jest.clearAllMocks();
  });

  it("Check if Add Quantity Button works",()=>{
    const incrementQuantity=jest.fn();
    const wrapper=shallow(ProductCard);
    wrapper.find("#incrementButton").simulate("click");
    expect(ClickerTick.mock.calls.length).toEqual(1);
  })

import ProductCard from './../ProductCard';