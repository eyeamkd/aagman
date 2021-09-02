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
import { DISPLAY_MENU } from '../GraphQL/Queries/MenuQueries';
import { ADD_ORDERS } from '../GraphQL/Mutations/OrdersMutation';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head'
import { VerifyOrder } from '../components/VerifyOrder';

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
    const [item, setItem] = useState({});
    const classes = useStyles();
    const { query } = useRouter();
    const [value, setValue] = useState(0);
    const [menuId, setmenuId] = useState("");
    const [paymentModes, setPaymentModes] = useState(["Cash", "CreditCard", "UPI", "DebitCard", "Check", "NetBanking"])
    const [paymentStatusTypes, setPaymentStatusTypes] = useState(["Paid", "NotPaid"])
    const [paymentMode, setPaymentMode] = useState("")
    const [paymentStatus, setPaymentStatus] = useState("")
    const [orderStatusTypes, setOrderStatustypes] = useState(["Order", "Received", "Preparing", "Completed"])
    const [orderCodes, setOrderCodes] = useState([1,2,3,4])
    const { data, loading, error } = useQuery(DISPLAY_MENU,
        {
            variables: {
                displayMenuMenuId: menuId
            }
        });
    const [createOrders] = useMutation(ADD_ORDERS);

    useEffect(() => {
        console.log("This is the menu's document id received.", query.menuId);
        setmenuId(query.menuId);
    }, [])

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
    console.log(productCards);

    const verifyOrder = (order, resetForm) => {
        placeOrder(order);
        resetForm()
        setOpenPopup(false)
    }

    const placeOrder = (order) => {
        console.log(itemList);
        if (itemList.length === 0) {
            alert("No items have been added. Add items to place an order.")
        }
        else {
            createOrders({
                variables: {
                    addOrderOrderCode: 0,
                    addOrderOrderStatus: "OrderReceived",
                    addOrderItems: itemList,
                    addOrderStoreId: "612ce82e79045644d4ea287f",
                    addOrderTotalCost: totalCost,
                    addOrderPaymentMode: order.paymentMode,
                    addOrderPaymentStatus: order.paymentStatus
            }
            })
            alert("Your order has been placed successfully.");
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
                <StoreCover />
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
                    totalCost = {totalCost}
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