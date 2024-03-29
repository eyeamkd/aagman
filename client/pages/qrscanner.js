import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from "../components/Footer";
import dynamic from 'next/dynamic';
const QrReader = dynamic(() => import('react-qr-scanner'), {
    ssr: false
});
import { useRouter } from 'next/router';
import Head from 'next/head';

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
}));

const QrScanner = () => {
    const classes = useStyles();
    const router = useRouter();

    const handleErrorFile = (error) => {
        console.log(error);
    }

    const handleScanFile = (result) => {

        if (result) {
            router.push({
                pathname: '/menu',
                query: { menuId: result.text },
            })
        }
    }

    return (
        <div className={classes.root}>
            <Head>
                <title>QR Scanner</title>
            </Head>
            <React.Fragment>
                <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <CameraIcon className={classes.icon} />
                        <Typography variant="h6" color="inherit" noWrap>
                            QR Code Scanner
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                QR Code Scanner
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Scan the QR code below to get redirected to the menu page of the store.
                            </Typography>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth="sm">
                        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={0}>
                            <Grid item xs={12}>
                                <Card className={classes.card}>
                                    <QrReader

                                        delay={300}
                                        style={{ width: '100%' }}
                                        onError={handleErrorFile}
                                        onScan={handleScanFile}
                                    />
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
                <Footer />
            </React.Fragment>
        </div>
    );
}

export default QrScanner;