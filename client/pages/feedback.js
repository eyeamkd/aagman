import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from "../components/Footer";
import { useRouter } from 'next/router';
import Head from 'next/head';
import Paper from '@material-ui/core/Paper';
import {Rating} from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";
import { GET_ORDERS } from '../GraphQL/Queries/OrdersQueries';
import { ADD_FEEDBACK } from '../GraphQL/Mutations/FeedbackMutation';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
    },
    heroContent: {
        background: "linear-gradient(to right, #1c92d2, #f2fcfe)",
        padding: theme.spacing(6, 0, 4),
        textAlign: "center",
        minHeight: "100vh",
    
    },
   thankYouMessage:{
       padding:"20px"
   },
    paper: {
        borderRadius: "20px",
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: "10px",
        textAlign:'center',
    },
    content:{
      
        textAlign: "center",
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "40px",
        textAlign: "center"
    },
    ratingContent:{
        textAlign:'center'
    }


}));

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

const Feedback = () => {
    const [feedbackForm,setFeedBackForm]=React.useState(true)
    const [comment,setComment]=React.useState("")
    const itemListId=[]
    const { query } = useRouter();
    const classes = useStyles();
    const [orderService, setOrderService] = React.useState(0);
    const [deliveryService, setDeliveryService] = React.useState(0);
    const [food, setFood] = React.useState(0);
    const [store, setStore] = React.useState(0);
    const [hoverOrder, setHoverOrder] = React.useState(-1);
    const [hoverDelivery, setHoverDelivery] = React.useState(-1);
    const [hoverFood, setHoverFood] = React.useState(-1);
    const [hoverStore, setHoverStore] = React.useState(-1);
    const [addFeedback] = useMutation(ADD_FEEDBACK);
    const { data, loading, error } = useQuery(GET_ORDERS,
        {
            variables: {
                getOrderOrderId: query.orderId
            }
        });
    const router = useRouter();
    

    const handleClick=()=>{
        if(orderService==0||deliveryService==0||store==0||food==0){
            alert("Please fill in the feedback form");
            return
        }
        addFeedback({
            variables: {
                addFeedbackOrderServiceRating: orderService,
                addFeedbackDeliveryServiceRating: deliveryService,
                addFeedbackComment: comment,
                addFeedbackStoreId: storeId,
                addFeedbackOverallStoreRating: store,
                addFeedbackFoodRating: food,
                addFeedbackItemsList: itemListId
            }
        })
     setFeedBackForm(false)
    }
    const variants = {
        hidden: { opacity: 0, x: 0, y: -100 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 100 },
    }
  
    if (loading)
    return (<div>Loading...</div>);

    if (error)
    return (<div>Error! ${error.message}</div>);
    const storeId=Object.values(data)[0].store.id
    const itemsList = Object.values(data)[0].itemsList;
    for(let i=0;i<itemsList.length;i++){
        itemListId.push(itemsList[i].itemId)
    }    

    return (
        <div className={classes.root}>
            <Head>
                <title>Feedback</title>
            </Head>
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Feedback Form
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="lg">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Feedback Form
                            </Typography>
                            {feedbackForm&&
                                    <motion.main
                                    variants={variants}// Pass the variant object into Framer Motion 
                                    initial="hidden" // Set the initial state to variants.hidden
                                    animate="enter" // Animated state to variants.enter
                                    exit="exit" // Exit state (used later) to variants.exit
                                    transition={{ type: 'linear' }} // Set the transition to linear
                        
                                >
                            <Grid item xs={12} >
                            <div className={classes.content}>
                                <Paper className={classes.paper} elevation={10} >
                                <Typography variant="h5">How is the Order Service?</Typography>
                                <div className={classes.rating}>
                                <Rating
                                size="large"
                                      value={orderService}
                                      precision={0.5}
                                      onChange={(event, newValue) => {
                                      setOrderService(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                      setHoverOrder(newHover);
                                      }}
                                />
                                </div>
                                </Paper>
                                <Paper className={classes.paper} elevation={10} >
                                <Typography variant="h5">How is the Delivery Service?</Typography>
                                <div className={classes.rating}>
                                <Rating
                                     size="large"
                                      value={deliveryService}
                                      precision={0.5}
                                      onChange={(event, newValue) => {
                                      setDeliveryService(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                      setHoverDelivery(newHover);
                                      }}
                                />
                                </div>
                                </Paper>
                                <Paper className={classes.paper} elevation={10} >
                                <Typography variant="h5">How is the Food?</Typography>
                                <div className={classes.rating}>
                                <Rating
                                 
                                       size="large"
                                      value={food}
                                      precision={0.5}
                                      onChange={(event, newValue) => {
                                      setFood(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                      setHoverFood(newHover);
                                      }}
                                />
                                </div>
                                </Paper>
                                <Paper className={classes.paper} elevation={10} >
                                <Typography variant="h5">Overall Store Rating</Typography>
                                <div className={classes.rating}>
                                <Rating
                                      size="large"
                                      value={store}
                                      precision={0.5}
                                      onChange={(event, newValue) => {
                                      setStore(newValue);
                                      }}
                                      onChangeActive={(event, newHover) => {
                                      setHoverStore(newHover);
                                      }}
                                />
                                </div>
                                </Paper>
                                <Paper className={classes.paper} elevation={10} >
                                <Typography variant="h5">Add any comments(Optional)</Typography>
                                <TextField
                                    placeholder="Add Comment Here"
                                    multiline
                                    rows={2}
                                    rowsMax={4}
                                    value={comment}
                                    onChange={(event, newValue) => {
                                        setComment(newValue);
                                        }}
                                    />
                                 </Paper>
                                </div>
                                <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={handleClick}

                                    > 
                                    Submit Feedback
                                    </Button>

                            </Grid>
                            </motion.main>
                            }
                            {!feedbackForm&&                                    
                            <motion.main
                                    variants={variants}
                                    initial="hidden" 
                                    animate="enter" 
                                    exit="exit" 
                                    transition={{ type: 'linear' }} 
                            ><Paper className={classes.thankYouMessage}><Typography variant="h5">Thank You for your Feedback!</Typography></Paper>
                                </motion.main>
                                }
                        </Container>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        </div>
    );
}

export default Feedback;