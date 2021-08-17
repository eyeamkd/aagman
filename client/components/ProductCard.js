import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    card: {
        display: "flex",
        borderRadius: "50px",
        backgroundColor: "rgba(247,120,186,255)",
        color: "white",
        margin: "10px",
        padding: "10px"
    },
    cardActions: {
        justifyContent: "center"
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        border: "2px solid white",
        borderRadius: "100px",
        width: 50,
        height: 50,
    },
    product: {
        margin: "10px 0 0 10px" 
    },
    cardContent: {
        padding: "16px"
    },
    productQuantity: {
        marginTop: "auto",
        padding: "16px",
        textAlign: "center",
    }
});

const ProductCard = ({ product }) => {
    const [counter, setCounter] = useState(0);

    const classes = useStyles();

    const incrementCounter = () => {
        setCounter(counter + 1);
    }

    const decrementCounter = () => {
        counter > 0 ? setCounter(counter - 1) : alert("Products quantity is already 0.");
    }

    return (
        <Grid item xs={12} md={4}>
            <Card className={classes.card} variant="outlined">
                <div className={classes.cardDetails}>
                    <CardContent className={classes.cardContent}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={product.image}
                            title={product.imageTitle}
                        />
                        <div className={classes.product}>
                        <Typography variant="subtitle1" color="textSecondary" style={{ fontWeight: "500" }}>
                            {product.price}
                        </Typography>
                        <Typography component="h2" variant="h5" style={{ fontWeight: "500" }}>
                            {product.title}
                        </Typography>
                        </div>
                    </CardContent>
                </div>
                <div className={classes.productQuantity}>
                    <Typography variant="h6" style={{ color: "skyblue" }}>
                        Quantity: {counter}
                    </Typography>
                    <CardActions className={classes.cardActions}>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={incrementCounter}>
                            <AddShoppingCartIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={decrementCounter}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </div>
            </Card>
        </Grid>
    );
}

export default ProductCard;