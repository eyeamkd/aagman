import React from 'react'
import { render, screen } from '@testing-library/react'
import Menu from '../pages/menu'
import { MockedProvider } from '@apollo/client/testing'
import { DISPLAY_MENU } from '../GraphQL/Queries/MenuQueries';
import TestRenderer from 'react-test-renderer';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { menuId: "61447243b8d19037a889dce0" },
    }),
}));

describe('Menu', () => {
    it('should render menu', async () => {
        const menuMock =
        {
            request: {
                query: DISPLAY_MENU,
                variables: {
                    displayMenuMenuId: "61447243b8d19037a889dce0",
                },
            },
            result: {
                data: {
                    displayMenu: {
                        categories: [
                            {
                                name: "Fast Food",
                                items: [
                                    {
                                        id: "61447d701de60f3dc42bc930",
                                        name: "Pizza",
                                        description: "Italian Dish",
                                        availability: "InStock",
                                        type: "Veg",
                                        price: 150,
                                        rating: 5,
                                        bestSeller: "Yes",
                                        photo: "0"
                                    }
                                ]
                            }
                        ]
                    }
                },
            },
        }

        const component = TestRenderer.create(
            <MockedProvider mocks={[menuMock]} addTypename={false}>
                <Menu />
            </MockedProvider>,
        );

        await new Promise(resolve => setTimeout(resolve, 0))
        expect(component).toMatchSnapshot()
    })

    // test('renders one buttons', async () => {
    //     render
    //         (<MockedProvider addTypename={false}>
    //             <Menu />
    //         </MockedProvider>)
    //     const checkoutButton = await screen.findAllByRole('button')
    //     expect(checkoutButton).toHaveLength(1)
    // })

})