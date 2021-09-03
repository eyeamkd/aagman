import React, { useState, useEffect, useContext} from 'react'
import Dashboard from '../components/Dashboard'
import Orders from '../components/Orders'
import Head from 'next/head'
import { StoreContext } from '../src/StoreContext'

const StoreOrders = () => {

    const { storeIdGlobal } = useContext(StoreContext); 

    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <Dashboard>
                {<Orders storeId={storeIdGlobal} />}
            </Dashboard>
        </>
    )
}

export default StoreOrders;

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}