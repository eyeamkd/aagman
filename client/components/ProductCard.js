import React, { useState, useEffect } from "react";
import { createTheme, makeStyles, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from '@material-ui/core/CardActions';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        borderRadius: "20px",
        backgroundColor: "#4dabf5",
        color: "black",
        margin: "10px 10px 0",
        padding: "10px"
    },
    cardActions: {
        justifyContent: "center",
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
        margin: "10px 0 0 0px"
    },
    cardContent: {
        padding: "16px"
    },
    productQuantity: {
        marginTop: "auto",
        padding: "16px",
        textAlign: "center",
    },
    iconButtons: {
        backgroundColor: "#0596f5",
        color: "#ffffff",
    }
}));

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ProductCard = ({ product, setItem }) => {
    const [quantity, setQuantity] = useState(0);
    const [itemCard, setItemCard] = useState({})
    const [disable, setDisable] = useState(false);
    const classes = useStyles();

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        quantity > 0 ? setQuantity(quantity - 1) : alert("Products quantity is already 0.");
    }

    useEffect(() => {
        if (quantity >= 0) {
            itemCard["itemName"] = product.name
            itemCard["itemCost"] = product.cost
            itemCard["itemQuantity"] = quantity
            setItemCard({ ...itemCard })
        }
    }, [quantity])

    const confirm = () => {
        if (quantity === 0) {
            alert("You can't place an order for 0 items. Add to the item's quantity to place the order.");
        }
        else {
            if (window.confirm(`Are you sure you want to place the order for ${quantity} ${product.name} worth ₹ ${product.cost * quantity}`)) {
                setItem(itemCard);
                setDisable(true);
            }
        }
    }

    return (
        <ThemeProvider theme={theme}>
        <Grid item xs={12} md={4}>
            <Card className={classes.card} variant="outlined">
                <div className={classes.cardDetails}>
                    <CardContent className={classes.cardContent}>
                        <CardMedia
                            className={classes.cardMedia}
                            image={"https://picsum.photos/50"}
                            title={product.name}
                        />
                        <div className={classes.product}>
                            <Typography variant="subtitle1" color="inherit" style={{ fontWeight: "500" }}>
                                ₹{product.cost}
                            </Typography>
                            <Typography component="h2" variant="h5" style={{ fontWeight: "500" }}>
                                {product.name}
                            </Typography>
                        </div>
                    </CardContent>
                </div>
                <div className={classes.productQuantity}>
                    <Typography variant="h6" color="inherit">
                        Quantity: {quantity}
                    </Typography>
                    <CardActions className={classes.cardActions}>
                        <IconButton disabled={disable} variant="contained" color="secondary" aria-label="add" onClick={incrementQuantity} className={classes.iconButtons}>
                            <AddIcon />
                        </IconButton>
                        <IconButton disabled={disable} variant="contained" color="secondary" aria-label="remove" onClick={decrementQuantity} className={classes.iconButtons}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton disabled={disable} variant="contained" color="secondary" aria-label="confirm" onClick={confirm} className={classes.iconButtons}>
                            <DoneIcon />
                        </IconButton>
                    </CardActions>
                </div>
            </Card>
        </Grid>
        </ThemeProvider>
    );
}

export default ProductCard;