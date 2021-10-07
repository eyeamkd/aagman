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
import Image from 'next/image';
import {Rating} from '@material-ui/lab';
import { useQuery } from '@apollo/client';
import { GET_IMAGE } from '../GraphQL/Queries/ItemsQueries';
import Box from '@material-ui/core/Box';
import grey from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    inputMultiline : {
        "& .MuiInputBase-input" : {
            height : '100vh', //here add height of your container
          }},
    card: {
        display: "flex",
        borderRadius: "20px",
        backgroundColor: "#90caf9",
        color: "black",
        margin: "10px 10px 0",
        padding: "10px",
        height:"210px"
    },
    cardActions: {
        justifyContent: "center",
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        border: "2px solid white",
        borderRadius: "10px",
        width: 50,
        height: 50,
    },
    bestSellerMedia: {
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
    type:{
        display:"block"
    },
    iconButtons: {
        backgroundColor: "#0596f5",
        "&:hover": {
            backgroundColor: '#0d47a1',
        },
        color: "#ffffff",
    },
    disableDiv:{
        opacity:0.5,
        pointerEvents:'none'
        
    },
    ratingImage:{
        display:'inline'
    }
}));

let theme = createTheme();
theme = responsiveFontSizes(theme);

const ProductCard = ({ product, setItem }) => {
    const [quantity, setQuantity] = useState(0);
    const [itemCard, setItemCard] = useState({})
    const [bestSeller,setBestSeller]=useState(true);
    const classes = useStyles();
    const { data, loading, error } = useQuery(GET_IMAGE,
        {
            variables: {
                retrieveImageImageName: product.photo
            }
        });

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

    itemCard["name"] = product.name
    itemCard["price"] = product.price
    itemCard["itemId"]=product.id

    const updateOrder = () => {
        itemCard["quantity"] = quantity;
        setItemCard({ ...itemCard });
        setItem(itemCard);
    }

    console.log(product.availability)
    if(loading) return(<div>...</div>)
    if(error) return(<div>error</div>)
    const imageSource=(Object.values(data)[0])
    let srcImage
    if(imageSource=="0"){
        srcImage= "/images/food_images.jpg"
    }
    else{
        srcImage= `data:image/jpeg;base64,${imageSource}`
    }



    return (
        <ThemeProvider theme={theme}>
            <Grid item xs={12} md={4}>
            <div className={product.availability=="OutOfStock"?classes.disableDiv:null}>
                <Card className={classes.card} variant="outlined">
                    <div className={classes.cardDetails}>
                        <CardContent className={classes.cardContent}>
                            <Image
                                className={classes.cardMedia}
                                src={srcImage}
                                width={50}
                                height={50}
                                title={product.name}
                            />
                            <div className={classes.product}>
                                <Typography variant="subtitle1" color="inherit" style={{ fontWeight: "500" }}>
                                    ₹{product.price}                
                                </Typography>
                                <Typography className={classes.inputMultiline} component="h2" variant="h5" style={{ fontWeight: "500" }}>
                                    {product.name}
                                </Typography>
                                <div className={classes.ratingImage}>
                                <Rating name="read-only" value={product.rating} readOnly /><Image
                                 src={"/images/"+product.type+".jpeg"}
                                 alt="App Logo"
                                 width={20}
                                 height={20}
                                 className={classes.type}
                                />
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    <div className={classes.productQuantity}>
                   {product.bestSeller=="Yes"?<Image
                          src="/images/bestseller-removebg-preview.png"
                          alt="App Logo"
                          width={40}
                          height={40}
                    />:null} 
                        <Typography variant="h6" color="inherit">
                            Quantity: {quantity}
                        </Typography>
                        <CardActions className={classes.cardActions}>
                            <IconButton variant="contained" color="secondary" id="#incrementButton" aria-label="add" onClick={incrementQuantity} className={classes.iconButtons}>
                                <AddIcon />
                            </IconButton>
                            <IconButton variant="contained" color="secondary" aria-label="remove" onClick={decrementQuantity} className={classes.iconButtons}>
                                <RemoveIcon />
                            </IconButton>
                        </CardActions>
                    </div>    
                </Card>
                </div>
            </Grid>
        </ThemeProvider>
    );
}

export default ProductCard;