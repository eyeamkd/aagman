import React, { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import MenuTable from '../components/Menu'
import { useRouter } from 'next/router'
import Head from 'next/head'

const MenuItems = () => {
    const [email, setEmail] = useState("");
    const { query } = useRouter();

    useEffect(() => {
        console.log("This is the email id received.", query.email);
        setEmail(query.email);
    }, [])

    return (
        <>
            <Head>
                <title>Menu Items</title>
            </Head>
            <Dashboard>
                {<MenuTable email={email} />}
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