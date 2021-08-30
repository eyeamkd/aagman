import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { PostAdd } from '@material-ui/icons';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
    appBar: {
        borderRadius: "20px",
        backgroundColor: "#0d47a1",
        color: "white"
    },
    data: {
        padding: "5px",
    },
});

export default function Deposits() {
    const classes = useStyles();
    let test = new Date();
    return (
        <React.Fragment>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Total Revenue
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.data}>
            <Typography component="p" variant="h4">
                ₹10000.00
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {test.toString()}
            </Typography>
            </div>
        </React.Fragment>
    );
}