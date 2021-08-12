import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles'
import StoreCover from "../components/StoreCover";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { productCards } from "../Data/Data";
import Footer from "../components/Footer";
import styles from "../styles/Menu.module.css"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    button: {
        margin: "10px",
        borderRadius: "50px",
    }
}));

const menu = () => {
    const lightTheme = createTheme({
        palette: {
            type: "light",
        },
    });

    const classes = useStyles();

    return (
        <div className={styles.menu}>
            <ThemeProvider theme={lightTheme}>
                <Container>
                    <Header />
                    <StoreCover />
                    <br />
                    <Grid container spacing={4}>
                        {productCards.map((product) => (
                            <ProductCard key={product.title} product={product} />
                        ))}
                    </Grid>
                    <div className={styles.navigateButtons}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<Icon>home</Icon>}
                                    className={classes.button}
                                >
                                    Back to homepage
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon>send</Icon>}
                                    className={classes.button}
                                >
                                    Proceed to checkout
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
                <Footer />
            </ThemeProvider>
        </div>
    );
}


export default menu
