import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import StoreCover from "../components/StoreCover";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { DISPLAY_MENU, GET_STORE_ID, GET_TOKENS } from '../GraphQL/Queries/MenuQueries';
import { ADD_ORDERS } from '../GraphQL/Mutations/OrdersMutation';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { VerifyOrder } from '../components/VerifyOrder';
import axios from 'axios';
import { firebaseCloudMessaging } from "../utils/customerPush";
import { motion } from "framer-motion";
import Image from 'next/image';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
    },
    bottomNav: {
        backgroundColor: "#bbdefb",
        borderRadius: "20px",
        position: "fixed",
        bottom: "0px",
        margin: "10px",
        boxSizing: "border-box",
        width: "calc(100% - 52px)",
        padding: "10px 0",
        textAlign: "center",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    navigateButtons: {
        textAlign: "center"
    },
    button: {
        margin: "20px",
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "40px",
        textAlign: "center"
    },
    loader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    },
    // navIcons: {
    //     color: rgb(192,174,246,255)
    // }
}));

const Menu = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    const [itemList, setItemList] = useState([]);
    let addOrderId = ""
    const [item, setItem] = useState({});
    const classes = useStyles();
    const router = useRouter();
    const { query } = useRouter();
    const [value, setValue] = useState(0);
    const [paymentModes, setPaymentModes] = useState(["Cash", "CreditCard", "UPI", "DebitCard", "Check", "NetBanking"])
    const [paymentStatusTypes, setPaymentStatusTypes] = useState(["Paid", "NotPaid"])
    const { data, loading, error } = useQuery(DISPLAY_MENU,
        {
            variables: {
                displayMenuMenuId: query.menuId
            }
        });
    const { data: storeData, loading: storeDataLoading, error: storeDataError } = useQuery(GET_STORE_ID,
        {
            variables: {
                getStoreIdMenuId: query.menuId
            }
        });
    const { data: tokenData, loading: tokenDataLoading, error: tokenDataError } = useQuery(GET_TOKENS,
        {
            variables: {
                getTokenMenuId: query.menuId
            }
        });
    const [createOrders] = useMutation(ADD_ORDERS);

    useEffect(() => {
        if (Object.entries(item).length !== 0) {
            const objIndex = itemList.findIndex((obj => obj.name == item.name));
            if (objIndex == -1) {
                if (item.quantity !== 0) {
                    setItemList(itemList => [...itemList, item]);
                }
            }
            else {
                if (item.quantity === 0) {
                    itemList.splice(objIndex, 1);
                }
                else {
                    itemList[objIndex].quantity = item.quantity;
                }
            }
        }
    }, [item])

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
                <div className={classes.logoError}>

                    <Image
                        src="/images/logo.png"
                        alt="App Logo"
                        width={100}
                        height={100}
                    />

                </div>
                <Typography variant="h5"><b>Sorry for the Inconvenience :(<br />There has been a problem</b></Typography>
            </div>
        </div>);

    const productCards = Object.values(data);

    if (storeDataLoading)
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

    if (storeDataError)
        return (<div className={classes.loader}>
            <div>
                <Image
                    src="/images/logo.png"
                    alt="App Logo"
                    width={100}
                    height={100}
                />
                <Typography variant="h5"><b>Sorry for the Inconvenience :(<br />There has been a problem</b></Typography>
            </div>
        </div>);

    const store = Object.values(storeData)[0].store;
    const storeId = store.id;
    const storeName = store.name;

    if (tokenDataLoading)
        return (<div className={classes.loader}>
            <div>
                <div className={classes.logo}>
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
                </div>
                <Typography><b>Loading...</b></Typography>
            </div>
        </div>);

    if (tokenDataError)
        return (<div className={classes.loader}>
            <div>
                <Image
                    src="/images/logo.png"
                    alt="App Logo"
                    width={100}
                    height={100}
                />
                <Typography variant="h5"><b>Sorry for the Inconvenience :(<br />There has been a problem</b></Typography>
            </div>
        </div>);

    const tokens = Object.values(tokenData)[0];

    const verifyOrder = (order, generatedOrderId, paymentId, resetForm) => {
        if (itemList.length === 0) {
            alert("No items have been added. Add items to place an order.")
        }
        else {
            placeOrder(order, generatedOrderId, paymentId);
            resetForm();

        }
        setOpenPopup(false);

    }

    const placeOrder = async (order, generatedOrderId, paymentId) => {
        
        let status = "NotPaid";

        if(generatedOrderId !== "")
        {
            status = "Paid";
        }

        createOrders({
            variables: {
                addOrderOrderCode: generatedOrderId,
                addOrderPaymentId: paymentId,
                addOrderOrderStatus: "OrderReceived",
                addOrderItems: itemList,
                addOrderStoreId: storeId,
                addOrderTotalCost: totalCost,
                addOrderPaymentMode: order.paymentMode,
                addOrderPaymentStatus: status,
                addOrderDateAndTime: new Date()
            }
        }).then(result => {
            console.log(Object.values(result)[0].addOrder.id)
            addOrderId = Object.values(result)[0].addOrder.id
            console.log(addOrderId)
            firebaseCloudMessaging.init(addOrderId);
            router.push({
                pathname: '/orderstatus',
                query: { orderId: addOrderId },
            })
        })
        alert("Your order has been placed successfully.");
        if (tokens.length !== 0) {
            await axios.post('http://localhost:5000/orderedsuccessfully', { tokens });
        }

    }

    const checkout = () => {
        let cost = 0;
        if (itemList.length === 0) {
            alert("Add items to place an order!")
        }
        else {
            itemList.map(item => cost = cost + (item.price * item.quantity));
            setTotalCost(cost)
            setOpenPopup(true);
        }
    }

    return (
        <>
            <div className={classes.root}>
                <Head>
                    <title>Menu</title>
                </Head>
                <Header />
                <StoreCover storeName={storeName} />
                <Container>
                    <br />
                    <Grid container spacing={1}>
                        {productCards.map(value =>
                            value.categories.map(category =>
                                category.items.map((product) =>
                                    (<ProductCard key={product.name} product={product} setItem={setItem} />)
                                )
                            )
                        )}
                    </Grid>
                    <div className={classes.navigateButtons}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    endIcon={<Icon>send</Icon>}
                                    onClick={checkout}
                                >
                                    Proceed to checkout
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        showLabels
                        className={classes.bottomNav}
                    >
                        <BottomNavigationAction icon={<HomeIcon />} />
                        <BottomNavigationAction icon={<MenuIcon />} />
                        <BottomNavigationAction icon={<PersonIcon />} />
                        <BottomNavigationAction icon={<ArrowBackIosIcon />} />
                    </BottomNavigation>
                </Container>
                <VerifyOrder
                    title="Verify Order"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    verifyOrder={verifyOrder}
                    itemList={itemList}
                    paymentModes={paymentModes}
                    paymentStatusTypes={paymentStatusTypes}
                    totalCost={totalCost}
                />
            </div>
            <Footer />
        </>
    );
}


export default Menu

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}