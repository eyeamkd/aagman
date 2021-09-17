import React, { useState, useEffect, useContext} from 'react'
import Dashboard from '../components/Dashboard'
import Deposits from '../components/Deposits'
import Head from 'next/head'
import { StoreContext } from '../src/StoreContext'

const Revenue = () => {

    const { storeIdGlobal,userEmailGlobal } = useContext(StoreContext); 

    return (
        <>
            <Head>
                <title>Revenue</title>
            </Head>
            <Dashboard>
                {<Deposits storeId={storeIdGlobal} userEmail={userEmailGlobal} />}
            </Dashboard>
        </>
    )
}

export default Revenue;

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}