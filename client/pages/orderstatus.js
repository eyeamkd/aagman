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
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

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
        textAlign: "center",
        minHeight: "100vh"
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#0d47a1",
        color: "white",
        textAlign: "center"
    },
    paper: {
        borderRadius: "20px",
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        margin: "10px"
    },
    orderConfirmation: {
        margin: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}));

const OrderStatus = () => {
    const classes = useStyles();
    const router = useRouter();

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <Head>
                <title>Order Status</title>
            </Head>
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Order Status
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="lg">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Order Status
                            </Typography>
                            <Grid item xs={12}>
                                <Paper className={classes.paper} elevation={10} >
                                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                                        Order Code: 1234
                                    </Typography>
                                </Paper>
                            </Grid>
                            <div className={classes.orderConfirmation}>
                            <Avatar className={classes.avatar}>
                                <AssignmentTurnedInIcon />
                            </Avatar>
                            <Typography variant="h5" align="center" color="textPrimary" paragraph>
                                Super! Your order has been confirmed.
                            </Typography>
                            </div>
                            <CircularProgress variant="determinate" value={progress} />
                        </Container>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        </div>
    );
}

export default OrderStatus;