import React from 'react'
import Signup from '../components/signup';
import { ADD_USERS } from '../GraphQL/Mutations/UsersMutation';
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

jest.mock('next/router', () => require('next-router-mock'));

window.alert = jest.fn();

const mockedUserData = {
    request: {
        query: ADD_USERS,
        variables: {
            // addUserEmail: "k@gmail.com",
            // addUserFullName: "Kunal Sharma",
            // addUserGstNumber: "GSTQWE321",
            // addUserPhoneNumber: "7896541230",
            // addUserStoreName: "Cafe Coffee Day",
            // addUserCountry: "India",
            // addUserState: "Himachal Pradesh",
            // addUserCity: "Shimla",
            // addUserArea: "Phagli",
            // addUserLandMark: "Near ISBT",
            // addUserOpenTime: "07:30",
            // addUserCloseTime: "20:30",
            // $addUserStatusTime: "Open"
            addUserEmail:"",
            addUserFullName :"",
            addUserGstNumber:"",
            addUserPhoneNumber:"",
            addUserStoreName:"",
            addUserCountry:"",
            addUserState:"",
            addUserCity:"",
            addUserArea:"",
            addUserLandMark:"",
            addUserOpenTime:"07:30",
            addUserCloseTime:"20:30",
            addUserStatusTime:"Open"
        },
    },
    result: {
        data: {
            addUser: "User Created"
        }
    }
}

const fakeEvent = { preventDefault: () => console.log('preventDefault') };

it("renders sign up", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockedUserData]} addTypename={false}>
                <Signup />
            </MockedProvider>
        )
    })


    const submitButton = wrapper.find("form");
    await act(async () => submitButton.props().onSubmit(fakeEvent));

    await act(() => wait(0));
    wrapper.update();
    // console.log(wrapper.debug())
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual('Register');
      window.alert.mockClear();
})