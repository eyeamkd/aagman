import React, { useState, useEffect, useContext } from 'react'
import Dashboard from '../components/Dashboard'
import MenuTable from '../components/Menu'
import Head from 'next/head'
import { StoreContext } from '../src/StoreContext'

const MenuItems = () => {

    const { storeIdGlobal } = useContext(StoreContext); 

    return (
        <>
            <Head>
                <title>Menu Items</title>
            </Head>
            <Dashboard>
                {<MenuTable storeId={storeIdGlobal} />}
            </Dashboard>
        </>
    )
}

export default MenuItems;

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}