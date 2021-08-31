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

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        borderRadius: "20px",
        backgroundColor: "#90caf9",
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
        "&:hover": {
            backgroundColor: '#0d47a1',
        },
        color: "#ffffff",
    }
}));

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ProductCard = ({ product, setItem }) => {
    const [quantity, setQuantity] = useState(0);
    const [itemCard, setItemCard] = useState({})
    const classes = useStyles();

    useEffect(() => {
        updateOrder();
    }, [quantity])

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
        else {
            alert("Products quantity is already 0.");
        }
    }

    itemCard["itemName"] = product.Name
    itemCard["itemCost"] = product.Price

    const updateOrder = () => {
        itemCard["itemQuantity"] = quantity;
        setItemCard({ ...itemCard });
        setItem(itemCard);
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
                                title={product.Name}
                            />
                            <div className={classes.product}>
                                <Typography variant="subtitle1" color="inherit" style={{ fontWeight: "500" }}>
                                    ₹{product.Price}
                                </Typography>
                                <Typography component="h2" variant="h5" style={{ fontWeight: "500" }}>
                                    {product.Name}
                                </Typography>
                            </div>
                        </CardContent>
                    </div>
                    <div className={classes.productQuantity}>
                        <Typography variant="h6" color="inherit">
                            Quantity: {quantity}
                        </Typography>
                        <CardActions className={classes.cardActions}>
                            <IconButton variant="contained" color="secondary" aria-label="add" onClick={incrementQuantity} className={classes.iconButtons}>
                                <AddIcon />
                            </IconButton>
                            <IconButton variant="contained" color="secondary" aria-label="remove" onClick={decrementQuantity} className={classes.iconButtons}>
                                <RemoveIcon />
                            </IconButton>
                        </CardActions>
                    </div>
                </Card>
            </Grid>
        </ThemeProvider>
    );
}

export default ProductCard;