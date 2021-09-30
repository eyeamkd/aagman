//import 'jsdom-global/register';
import React,{ useState, useEffect, useContext } from "react";
import { render, screen,cleanup } from "@testing-library/react";
import Feedback from "../pages/feedback";
import { MockedProvider } from "@apollo/client/testing";
import {shallow,configure,mount,unmount} from 'enzyme';
import { act } from "react-dom/test-utils"
import wait from 'waait';
import { GET_ORDERS } from '../GraphQL/Queries/OrdersQueries'
import { ADD_FEEDBACK } from '../GraphQL/Mutations/FeedbackMutation';
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";


const mocks =
[  {
    request: {
      query:GET_ORDERS,
      variables: {
        getOrderOrderId: "6144a388578b923258a33c80"
    },
    },
    result: {
        "data": {
            "getOrder": {
              "id": "6144a388578b923258a33c80",
              "orderCode": 1138,
              "dateAndTime": "2021-09-17T14:17:44.722Z",
              "orderStatus": "Completed",
              "itemsList": [
                {
                  "name": "Pizza",
                  "quantity": 20,
                  "price": 150,
                  "itemId": "61447d701de60f3dc42bc930"
                }
              ],
              "bill": {
                "totalCost": 3000,
                "paymentMode": "UPI",
                "paymentStatus": "NotPaid"
              },
              "store": {
                "id": "61447242b8d19037a889dcdb"
              }
            }
          }
    },
  },
  {
    request: {
      query:ADD_FEEDBACK,
      variables: {
        addFeedbackOrderServiceRating: 4,
        addFeedbackDeliveryServiceRating: 3,
        addFeedbackComment: "Great",
        addFeedbackStoreId: "61447a3bce2ffd3bc0f1f71b",
        addFeedbackOverallStoreRating: 3,
        addFeedbackFoodRating: 7,
        addFeedbackItemsList:["61448fb4ce2ffd3bc0f2135d"]
    }
    },
    result: {
        "data": {
            "addFeedback": "Feedback Added"
          }
    },
  }
];

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
    query: { orderId:  "6144a388578b923258a33c80" },
  }),
}));


describe("Test for feedback",()=>{
  let wrapper;

  beforeEach(async () => {
    await act(async () => {wrapper=mount(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Feedback/>
     </MockedProvider>)
     })
     await act(() => wait(0));
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it("Properly renders the feedback page",async () => {
    wrapper.update();
    expect(wrapper).toBeTruthy();
    
  });
})

