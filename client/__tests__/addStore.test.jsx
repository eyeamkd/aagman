import { AddStore } from '../components/AddStore';
import React from 'react'
import { GET_USER_ID } from '../GraphQL/Queries/StoreQueries';
import { ADD_STORE } from '../GraphQL/Mutations/StoreMutations';
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import { jssPreset } from '@material-ui/styles';

const mockNewStore = {
    request: {
        query: ADD_STORE,
        variables: {
            addStoreStoreName: "Cafe Coffee Day",
            addStoreCountry: "India",
            addStoreState: "Himachal Pradesh",
            addStoreCity: "Shimla",
            addStoreArea: "Phagli",
            addStoreLandMark: "Near ISBT",
            addStoreOpenTime: "09:30",
            addStoreCloseTime: "09:30",
            addStoreStatusTime: "Open",
            addStoreUserId: "61447242b8d19037a889dcda"
        },
    },
    response: {
        data: {
            addStore: "Store Added"
        }
    }
}

const mockErrorData = {
    request: {
        query: GET_USER_ID,
        variables: {
            getUserIdStoreId: "61447242b8d19037a889dcdb",
        },
    },
    error: new Error("Network Error")
}

const mockedUserData = {
    request: {
        query: GET_USER_ID,
        variables: {
            getUserIdStoreId: "61447242b8d19037a889dcdb",
        },
    },
    result: {
        data: {
          getUserId: {
            owner: {
              id: "61447242b8d19037a889dcda"
            }
          }
        }
      }
}

const props = {
    title: "Add Store", 
    openPopup: jest.fn(),
    setOpenPopup: jest.fn(),
    addStore: jest.fn()
};

it("renders user data", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockedUserData]} addTypename={false}>
                <AddStore {...props}/>
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
})