import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Deposits from '../components/Deposits'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Revenue = () => {
    const [email, setEmail] = useState("");
    const { query } = useRouter();

    useEffect(() => {
        console.log("This is the email id received.", query.email);
        setEmail(query.email);
    }, [])

    return (
        <>
            <Head>
                <title>Revenue</title>
            </Head>
            <Dashboard>
                {<Deposits email={email} />}
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