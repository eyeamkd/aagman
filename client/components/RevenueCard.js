import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    horizontalLine:{
        width:"100%",
      }

}));

export const RevenueCard=(props)=>{
    const { heading,content } = props;
    const classes = useStyles();
    return (
        <>
        <div>
        <Typography component="p" variant="h5">
                    {heading}
                </Typography>
                <hr className={classes.horizontalLine}/>
                <Typography component="p" variant="h5"><b>
                    {content}
                    </b></Typography>
                    </div>
        </>
    )
}