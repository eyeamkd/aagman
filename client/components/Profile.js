import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { AddStore } from './AddStore';

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

    const addStore = () => {

    }

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
