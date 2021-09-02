import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chart from './Chart';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
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
    paper: {
        borderRadius: "20px",
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Deposits() {

    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
            <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12}>
                    <Paper className={fixedHeightPaper}>
                        <Chart />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}