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
import Image from 'next/image';
import { motion } from "framer-motion";
import Typography from '@material-ui/core/Typography';

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
    loader:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:"center"
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
    return (<div className={classes.loader}>
        <div>
           <motion.div animate={{
              y: 30, y: -30,
              transition: { yoyo: Infinity, duration: 1.5, },
           }}>
           <Image
             src="/images/logo.png"
             alt="App Logo"
             width={100}
             height={100}
           />
          </motion.div>
          <Typography variant="h5"><b>Loading...</b></Typography>
        </div>
      </div>);

    if (error)
    return (<div className={classes.loader}>
        <div>
           <Image
             src="/images/logo.png"
             alt="App Logo"
             width={100}
             height={100}
           />
          <Typography variant="h5"><b>Sorry for the Inconvenience :(<br/>There has been a problem</b></Typography>
        </div>
      </div>);

    const userId = Object.values(data)[0].owner.id;
    console.log(userId)

    return (
        <>
            <div className={classes.buttons}>
                <Button startIcon={<AddIcon />} onClick={() => { setOpenPopup(true) }} variant="contained" color="secondary" className={classes.button}>
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
