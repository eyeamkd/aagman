import { AddCategory } from '../components/AddCategory';
import React from 'react'
import { mount } from "enzyme"
import { act } from "react-dom/test-utils"

it("renders add category pop up", async () => {
    let wrapper;
    await act(async () => {
        wrapper = mount(
            <AddCategory />
        )
    })
    expect(wrapper).toBeTruthy();
})