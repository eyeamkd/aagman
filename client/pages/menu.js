import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import StoreCover from "../components/StoreCover";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Menu.module.css"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    GET_ITEMS_BY_ID,
    GET_ITEMS
} from '../GraphQL/Queries/ItemsQueries';
import { CREATE_ORDERS } from '../GraphQL/Mutations/OrdersMutation';
import { useMutation } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    root: {
        background: "linear-gradient(to right, #c9d6ff, #e2e2e2)",
        borderRadius: "20px",
        position: "fixed",
        bottom: "0px",
        margin: "10px",
        boxSizing: "border-box",
        width: "calc(100% - 52px)",
        paddingTop: "10px",
        display: "block",
        textAlign: "center",
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: "10px",
        borderRadius: "50px",
    },
    navIcons: {
        color: "rgba(192,174,246,255)"
    }
}));

const Menu = () => {
    const lightTheme = createTheme({
        palette: {
            type: "light",
        },
    });

    const [itemList, setItemList] = useState([]);
    const [item, setItem] = useState({});
    const classes = useStyles();
    const router = useRouter();
    const { query } = useRouter();
    const [value, setValue] = useState(0);
    const [menuId, setmenuId] = useState("");
    const { data, loading, error } = useQuery(GET_ITEMS,
        {
            variables: {
                getItemByCodeItemCode: menuId
            }
        });
    const [createOrders] = useMutation(CREATE_ORDERS);

    useEffect(() => {
        console.log("This is the menu's document id received.", query.menuId);
        setmenuId(query.menuId);
    }, [])

    useEffect(() => {
        if (Object.entries(item).length !== 0) {
            setItemList(itemList => [...itemList, item]);
        }
    }, [item])

    const placeOrder = () => {
        console.log(itemList);
        let totalCost = 0;
        itemList.map(item => totalCost = totalCost + (item.itemCost * item.itemQuantity));
        createOrders({
            variables: {
                createOrderEmail: "kunal.viper99@gmail.com",
                createOrderOrderId: 10938,
                createOrderTotalCost: totalCost,
                createOrderItemStatus: "Order Received",
                createOrderPaymentMode: "Cash",
                createOrderItemList: itemList,
                createOrderPaymentStatus: "Not Done"
            }
        })
        alert("Your order has been placed successfully.");
    }

    if (loading)
        return (<div>Loading...</div>);

    if (error)
        return (<div>Error! ${error.message}</div>);

    const productCards = Object.values(data);

    return (
        <div className={styles.menu}>

            <ThemeProvider theme={lightTheme}>
                <Container>
                    <Header />
                    <StoreCover />
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
                    <div className={styles.navigateButtons}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon>send</Icon>}
                                    onClick={placeOrder}
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
                        className={classes.root}
                    >
                        <BottomNavigationAction icon={<HomeIcon />} className={classes.navIcons} />
                        <BottomNavigationAction icon={<MenuIcon />} className={classes.navIcons} />
                        <BottomNavigationAction icon={<PersonIcon />} className={classes.navIcons} />
                        <BottomNavigationAction icon={<ArrowBackIosIcon />} className={classes.navIcons} />
                    </BottomNavigation>
                </Container>
                <Footer />
            </ThemeProvider>

        </div>
    );
}


export default Menu

export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    };
}