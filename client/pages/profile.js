import React, { useContext} from 'react'
import Head from 'next/head';
import Profile from '../components/Profile';
import { StoreContext } from '../src/StoreContext'
import Dashboard from '../components/Dashboard';

const UserProfile = () => {
    const { storeIdGlobal } = useContext(StoreContext); 

    return (
        <>
            <Head>
                <title>User Profile</title>
            </Head>
            <Dashboard>
                {<Profile storeId={storeIdGlobal}/>}
            </Dashboard>

        </>
    );
}

export default UserProfile;