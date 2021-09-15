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
    // navIcons: {
    //     color: rgb(192,174,246,255)
    // }
}));

const Menu = () => {
    const [openPopup, setOpenPopup] = useState(false)
    const [totalCost, setTotalCost] = useState(0)
    const [itemList, setItemList] = useState([]);
    let addOrderId=""
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
        return (<div>Loading...</div>);

    if (error)
        return (<div>Error! ${error.message}</div>);

    const productCards = Object.values(data);

    if (storeDataLoading)
        return (<div>Loading...</div>);

    if (storeDataError)
        return (<div>Error! ${storeDataError.message}</div>);

    const store = Object.values(storeData)[0].store;
    const storeId = store.id;
    const storeName = store.name;

    if (tokenDataLoading)
        return (<div>Loading...</div>);

    if (tokenDataError)
        return (<div>Error! ${tokenDataError.message}</div>);

    const tokens = Object.values(tokenData)[0];

    const verifyOrder = (order, resetForm) => {
        if (itemList.length === 0) {
            alert("No items have been added. Add items to place an order.")
        }
        else
        {
            placeOrder(order);
            resetForm();

        }
        setOpenPopup(false);
       
    }

    const placeOrder = (order) => {

            createOrders({
                variables: {
                    addOrderOrderCode: 0,
                    addOrderOrderStatus: "OrderReceived",
                    addOrderItems: itemList,
                    addOrderStoreId: storeId,
                    addOrderTotalCost: totalCost,
                    addOrderPaymentMode: order.paymentMode,
                    addOrderPaymentStatus: "NotPaid",
                    addOrderDateAndTime:new Date()
                }
            }).then(result=>{
                console.log(Object.values(result)[0].addOrder.id)
                addOrderId=Object.values(result)[0].addOrder.id
                console.log(addOrderId)
               
                router.push({
                 pathname: '/orderstatus',
                 query: { orderId: addOrderId },
             })
            })
            alert("Your order has been placed successfully.");
            if (tokens.length !== 0) {
                axios.post('http://localhost:5000/orderedsuccessfully', { tokens });
            }
        
    }

    const checkout = () => {
        let cost = 0;
        itemList.map(item => cost = cost + (item.price * item.quantity));
        setTotalCost(cost)
        setOpenPopup(true);
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