import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { AddStore } from './AddStore';
import { GET_USER_ID } from '../GraphQL/Queries/StoreQueries';
import { ADD_STORE } from '../GraphQL/Mutations/StoreMutations';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
        padding: theme.spacing(6, 0, 4),
    },
    cardGrid: {
        background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
        borderRadius: "20px",
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
    },
    card: {
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
    },
    buttons: {
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        margin: "20px",
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "40px",
        textAlign: "center"
    },
}));


export default function Profile({ storeId }) {
    const classes = useStyles();
    const router = useRouter();
    const [openPopup, setOpenPopup] = useState(false)
    const [addUserStore] = useMutation(ADD_STORE);
    const { data, loading, error } = useQuery(GET_USER_ID,
        {
            variables: {
                getUserIdStoreId: storeId
            }
        });

    const addStore = (item, resetForm) => {
        setOpenPopup(false)
        addUserStore({
            variables: {
                addStoreStoreName:item.storeName,
                addStoreCountry: item.country,
                addStoreState: item.state,
                addStoreCity: item.city,
                addStoreArea: item.area,
                addStoreLandMark: item.landmark,
                addStoreOpenTime: item.openTime,
                addStoreCloseTime: item.closeTime,
                addStoreStatusTime: item.status,
                addStoreUserId: userId
                
            }
        })

    }
    if (loading)
    return (<div>Loading...</div>);

    if (error)
    return (<div>Error loading data...</div>);

    const userId = Object.values(data)[0].owner.id;
    console.log(userId)

    return (
        <>
            <div className={classes.buttons}>
                <Button id="button" startIcon={<AddIcon />} onClick={() => { setOpenPopup(true) }} variant="contained" color="secondary" className={classes.button}>
                    Add Store
                </Button>
            </div>
            <AddStore
                title="Add Store"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                addStore={addStore}
            />
        </>
    );
}
