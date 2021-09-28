import 'jsdom-global/register';
import React,{ useState, useEffect, useContext } from "react";
import { render, screen,cleanup } from "@testing-library/react";
import{ RevenueCard} from "../components/RevenueCard";
import { MockedProvider } from "@apollo/client/testing";
import {shallow,configure,mount,unmount} from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {StoreContext} from './../src/StoreContext'
import Typography from '@material-ui/core/Typography';
import { GET_USERS_STORES_FROM_EMAIL, GET_USER_FROM_EMAIL } from './../GraphQL/Queries/UsersQueries'
import Button from '@material-ui/core/Button';




configure({ adapter: new Adapter() })

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


