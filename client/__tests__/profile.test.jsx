import React from 'react'
import Profile from '../components/Profile';
import { GET_USER_ID } from '../GraphQL/Queries/StoreQueries';
import { ADD_STORE } from '../GraphQL/Mutations/StoreMutations';
import { MockedProvider } from '@apollo/client/testing'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';
import TestRenderer from 'react-test-renderer';

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
    storeId: "61447242b8d19037a889dcdb"
};

it("renders user data", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider mocks={[mockedUserData]} addTypename={false}>
                <Profile storeId="61447242b8d19037a889dcdb" />
            </MockedProvider>
        )
    })

    await act(() => wait(0));
    wrapper.update();
    // console.log(wrapper.debug())
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button").text()).toEqual('Add Store');
})

it("renders loading user data", () => {
    let wrapper;
    act(() => {
        wrapper = mount(
            <MockedProvider mocks={[mockedUserData]} addTypename={false}>
                <Profile storeId="61447242b8d19037a889dcdb" />
            </MockedProvider>
        )
    })

    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Loading...")
})

it("renders with error", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <MockedProvider addTypename={false} mocks={[mockErrorData]}>
                <Profile storeId="61447242b8d19037a889dcdb" />
            </MockedProvider>
        );
    });

    await act(() => wait(0));
    wrapper.update();
    expect(wrapper).toBeTruthy();
    expect(wrapper.text()).toBe("Error loading data...");
})

// it("adds store data", async () => {
//     let wrapper;
//     await act(async () => {
//         wrapper = mount(
//             <MockedProvider mocks={[mockNewStore]} addTypename={false}>
//                 <Profile />
//             </MockedProvider>
//         )
//     })

//     console.log(wrapper)

//     const submitButton = wrapper.find("button");

//     await act(async () => submitButton.props().onClick());

//     await act(() => wait(0));
//     wrapper.update();

//     expect(wrapper).toBeTruthy();
//     expect(wrapper.find("classes.button")).toHaveLength(1);
// })

// // it("renders button", async () => {
// //     const component = TestRenderer.create(
// //         <MockedProvider mocks={[mockedUserData]} addTypename={false}>
// //             <Profile />
// //         </MockedProvider>,
// //     );

// //     await new Promise(resolve => setTimeout(resolve, 0))
// //     expect(component).toMatchSnapshot()
// //     //expect(wrapper.find(Button)).toHaveLength(1);
// // })
// // describe('Profile', () => {
// //     test('renders one button', async () => {
// //         render(<Profile />)
// //         const addStore = await screen.findAllByRole('button')
// //         expect(addStore).toHaveLength(1)
// //     })

// // })