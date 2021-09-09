import React from 'react';
import Typography from '@material-ui/core/Typography';

export const BestSellerCard=(props)=>{
    const { itemName,category,price,numberOfOrders } = props;
    return (
        <>
        <Typography component="p" variant="h4">
                    {itemName}
                </Typography>
                <Typography component="p" variant="h5">
                    Price: <b>{price}</b><br/>
                    Number Of Orders: <b>{numberOfOrders}</b><br/>
                    </Typography>
        </>
    )
}