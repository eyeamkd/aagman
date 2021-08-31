import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Orders from '../components/Orders'
import { useRouter } from 'next/router'
import Head from 'next/head'

const StoreOrders = () => {
    const [email, setEmail] = useState("");
    const { query } = useRouter();

    useEffect(() => {
        console.log("This is the email id received.", query.email);
        setEmail(query.email);
    }, [])

    return (
        <>
            <Head>
                <title>Orders</title>
            </Head>
            <Dashboard>
                {<Orders email={email} />}
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