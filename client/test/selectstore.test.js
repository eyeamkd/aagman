import 'jsdom-global/register';
import React,{ useState, useEffect, useContext } from "react";
import { render, screen,cleanup } from "@testing-library/react";
import SelectStorePage from "../pages/selectstore";
import { MockedProvider } from "@apollo/client/testing";
import {shallow,configure,mount,unmount} from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {StoreContext} from './../src/StoreContext'
import Typography from '@material-ui/core/Typography';
import { GET_USERS_STORES_FROM_EMAIL, GET_USER_FROM_EMAIL } from './../GraphQL/Queries/UsersQueries'
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";



const mocks =
[  {
    request: {
      query:GET_USERS_STORES_FROM_EMAIL,
      variables: {
        getUserStoreIdEmail: "greeta1999kavitha@gmail.com"
    },
    },
    result: {
      "data": {
        "getUserStoreId": {
          "stores": [
            {
              "name": "BurgerMan",
              "id": "61447a3bce2ffd3bc0f1f71b"
            }
          ]
        }
      }
    },
  },
  {
    request: {
      query:GET_USER_FROM_EMAIL,
      variables: {
        getUserByMailEmail: "greeta1999kavitha@gmail.com"
    }
    },
    result: {
      "data": {
        "getUserByMail": {
          "id": "61447a3bce2ffd3bc0f1f71a"
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



jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { email: 'greeta1999kavitha@gmail.com' },
  }),
}));

configure({ adapter: new Adapter() })

describe("Test for select Store",()=>{
  let wrapper;

  beforeEach(async () => {
    const setStoreIdGlobal=jest.fn()
    const setUserEmailGlobal=jest.fn()
    await act(async () => {wrapper=mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <StoreContext.Provider value={{  setStoreIdGlobal ,setUserEmailGlobal}}>
      <SelectStorePage/>
      </StoreContext.Provider>
     </MockedProvider>)
     })
     await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the selector store data",async () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Store SelectorSelect the store you want to login.Store *BurgerManStoreSubmitCopyright © Aagman 2021.");
  });
})


