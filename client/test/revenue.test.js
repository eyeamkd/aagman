import 'jsdom-global/register';
import React,{ useState, useEffect, useContext } from "react";
import { render, screen,cleanup } from "@testing-library/react";
import Revenue from "../pages/revenue";
import { MockedProvider } from "@apollo/client/testing";
import {shallow,configure,mount,unmount} from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {StoreContext} from './../src/StoreContext'
import Typography from '@material-ui/core/Typography';
import { GET_USERS_STORES_FROM_EMAIL } from './../GraphQL/Queries/UsersQueries'
import {GET_REVENUE} from './../GraphQL/Queries/StoreQueries';
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";

const mocks =
[  {
    request: {
      query:GET_REVENUE,
      variables: {
        getRevenueStoreId: "61447a3bce2ffd3bc0f1f71b"
    },
    },
    result: {
        "data": {
            "getRevenue": {
              "revenue": {
                "totalIncome": 30,
                "orders": [
                  {
                    "orderCode": 8429,
                    "dateAndTime": "2021-09-17T12:53:29.951Z",
                    "orderStatus": "OrderReceived",
                    "itemsList": [
                      {
                        "name": "Cheese burger",
                        "quantity": 1,
                        "price": 30
                      }
                    ],
                    "bill": {
                      "totalCost": 30,
                      "paymentMode": "DebitCard",
                      "paymentStatus": "NotPaid"
                    }
                  }
                ]
              }
            }
          }
    },
  },
  {
    request: {
      query:GET_USERS_STORES_FROM_EMAIL,
      variables: {
        getUserStoreIdEmail: "greeta1999kavitha@gmail.com"
    }
    },
    result: {
        "data": {
            "getUserStoreId": {
              "stores": [
                {
                  "id": "61447a3bce2ffd3bc0f1f71b",
                  "name": "BurgerMan"
                }
              ]
            }
          }
    },
  }
];

jest.mock('framer-motion', () => {
  const motion = {
    div: jest.fn(({ children }) => children),
  };
  return {
    motion,
  };
});


configure({ adapter: new Adapter() })

describe("Test for Revenue",()=>{
  let wrapper;

  beforeEach(async () => {
    const storeIdGlobal=jest.fn()
    const userEmailGlobal=jest.fn()
    await act(async () => {wrapper=mount(
        <MockedProvider mocks={mocks} addTypename={false}>
      <StoreContext.Provider value={{  storeIdGlobal ,userEmailGlobal}}>
      <Revenue/>
      </StoreContext.Provider>
      </MockedProvider>)
     })
     await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the revenue page data",async () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();
    
  });
})


