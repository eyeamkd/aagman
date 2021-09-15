import React from 'react';
import Typography from '@material-ui/core/Typography';

export const RevenueCard=(props)=>{
    const { heading,content } = props;
    return (
        <>
        <Typography component="p" variant="h4">
                    {heading}
                </Typography>
                <Typography component="p" variant="h3">
                    {content}
                    </Typography>
        </>
    )
}