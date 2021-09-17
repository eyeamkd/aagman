import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useRouter } from 'next/router'
import Footer from "../components/Footer";
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { GET_USERS_STORES_FROM_EMAIL, GET_USER_FROM_EMAIL } from '../GraphQL/Queries/UsersQueries'
import { useQuery } from '@apollo/client';
import { StoreContext } from '../src/StoreContext';
import { firebaseCloudMessaging } from "../utils/webPush";
import { motion } from "framer-motion";
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
    },
    form: {
        width: '50%', // Fix IE 11 issue.
        margin: theme.spacing(10),
        textAlign: "center"
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "40px",
        textAlign: "center"
    },
    formControl: {
        margin: "5px 0"
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
        display: 'flex',
        textAlign: "center",
        justifyContent: "center"
    },
    loader:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:"center"
      },
}));

const SelectStore = () => {
    const classes = useStyles();

    const [storeId, setStoreId] = useState("");

    const router = useRouter();

    const { query } = useRouter();

    const { setStoreIdGlobal,setUserEmailGlobal } = useContext(StoreContext); 

    const { data, loading, error } = useQuery(GET_USERS_STORES_FROM_EMAIL,
        {
            variables: {
                getUserStoreIdEmail: query.email
            }
        });

    useEffect(()=>{
            localStorage.setItem("emailId",query.email);
            setUserEmailGlobal(query.email);
    },[])
    const { data: userData, loading: userDataLoading, error: userDataError } = useQuery(GET_USER_FROM_EMAIL,
        {
            variables: {
                getUserByMailEmail: query.email
            }
        });
    // useEffect(() => {
    //     console.log("useEffect is called")
    //     firebaseCloudMessaging.init();
    // }, [])

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

    const stores = Object.values(data)[0].stores

    if (userDataLoading)
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

    if (userDataError)
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

    const user = Object.values(userData)[0];

    const handleSubmit = e => {
        e.preventDefault()
        router.push('/orders')

    }


    const handleInputChange = e => {
        setStoreId(e.target.value);
        setStoreIdGlobal(e.target.value);
        localStorage.setItem("storeId", e.target.value);
        firebaseCloudMessaging.init(user.id);
    }

    return (
        <>
            <div className={classes.root}>
                <Head>
                    <title>Select Store</title>
                </Head>
                <React.Fragment>
                    <CssBaseline />
                    <AppBar position="relative">
                        <Toolbar>
                            <Typography variant="h6" color="inherit" noWrap>
                                Store Selector
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main>
                        <div className={classes.heroContent}>
                            <Container maxWidth="sm">
                                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                    Select the store you want to login.
                                </Typography>
                            </Container>
                        </div>
                        <Container className={classes.cardGrid} maxWidth="sm">
                            <Grid container alignItems="center" spacing={0}>
                                <Grid item xs={12}>
                                    <Card className={classes.card}>
                                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                            <FormControl variant="outlined" className={classes.textField} fullWidth required autoComplete="store" autoFocus>
                                                <InputLabel htmlFor="store">Store</InputLabel>
                                                <Select
                                                    native
                                                    name="store"
                                                    value={storeId}
                                                    onChange={handleInputChange}
                                                    label="Store"
                                                >
                                                    <option aria-label="None" value="" />
                                                    {stores.map((store, index) =>
                                                        <option key={index} value={store.id}>{store.name}</option>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="secondary"
                                                className={classes.submit}
                                            >
                                                Submit
                                            </Button>
                                        </form>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </React.Fragment>
            </div>
            <Footer />
        </>
    )
}

export default SelectStore;

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}