import React from 'react';
import Typography from '@material-ui/core/Typography';

export const BestSellerCard=(props)=>{
    const { itemName,category,price,numberOfOrders } = props;
    return (
        <>
        <Typography component="p" variant="h3">
                    {itemName}
                </Typography>
                <Typography component="p" variant="h5">
                    Category:{category}<br/>
                    Price:{price}<br/>
                    Number Of Orders:{numberOfOrders}<br/>
                    </Typography>
        </>
    )
}