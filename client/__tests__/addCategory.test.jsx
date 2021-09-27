import { AddCaregory, AddCategory } from '../components/AddCategory';
import React from 'react'
import { mount, shallow } from "enzyme"
import { act } from "react-dom/test-utils"
import wait from 'waait';

it("renders add category pop up", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
                <AddCategory />
        )
    })
    expect(wrapper).toBeTruthy();
})