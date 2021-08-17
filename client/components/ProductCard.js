import React, {useState} from "react";
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
        backgroundColor: "rgb(235, 52, 168, 0.7)",
        color: "white",
        textAlign: "center",
        margin: "10px",
    },
    cardActions:{
        justifyContent: "center"
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 200,
    },
});

const ProductCard = ({ product }) => {
    const [counter, setCounter] = useState(0);

    const classes = useStyles();

    const incrementCounter = () => {
        setCounter(counter + 1);
    }

    const decrementCounter = () => {
        counter>0 ? setCounter(counter - 1) : alert("Products quantity is already 0.");
    }

    return (
        <Grid item xs={12} md={6}>
            <Card className={classes.card} variant="outlined">
                <div className={classes.cardDetails}>
                    <CardContent>
                        <Typography component="h2" variant="h4" style={{fontWeight: "900"}}>
                            {product.title}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            {product.price}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h6" style={{ color: "skyblue" }}>
                           Quantity: {counter}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <IconButton color="primary" aria-label="add to shopping cart" onClick={incrementCounter}>
                            <AddShoppingCartIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={decrementCounter}>
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </div>
                <Hidden xsDown>
                    <CardMedia
                        className={classes.cardMedia}
                        image={product.image}
                        title={product.imageTitle}
                    />
                </Hidden>
            </Card>
        </Grid>
    );
}

export default ProductCard;