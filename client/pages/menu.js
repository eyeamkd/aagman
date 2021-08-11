import React from 'react';
import { useState } from "react";
import Head from 'next/head';
import styles from '../styles/Menu.module.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import MuiListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "rgb(255, 0, 0, 0.5)",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected:hover": {
            backgroundColor: "rgb(128, 0, 128, 0.5)",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&:hover": {
            backgroundColor: "rgb(0, 0, 255, 0.5)",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        }
    },
    selected: {}
})(MuiListItem);

const menu = () => {
    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Menu</title>
            </Head>
            <div className={styles.menuContainer}>
                <h1 className={styles.heading}>Menu</h1>
                <Grid container spacing={1} style={{width: "100%"}}>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                            <AppBar position="static" style={{ background: '#2E3B55' }}>
                                <Toolbar>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        Filters
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <List>
                                <ListItem
                                    button
                                    selected={selectedIndex === 0}
                                    onClick={(event) => handleListItemClick(event, 0)}
                                >
                                    <ListItemText primary="Appetizers"/>
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <ListItemText primary="Starters" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                >
                                    <ListItemText primary="Main Course" />
                                </ListItem>
                                <ListItem
                                    button
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                >
                                    <ListItemText primary="Deserts" />
                                </ListItem>
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={9} style={{width: "100%"}}>
                        <Paper className={classes.paper}> <div className={classes.root}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        Online Orders
                                    </Typography>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                </Toolbar>
                            </AppBar>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <ButtonBase className={classes.image}>
                                            <img className={classes.img} height="50px" width="50px" alt="complex" src="/images/frenchFries.jpg" />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1">
                                                    French Fries
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="contained" color="secondary">
                                                    Add
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1">₹155.00</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div></Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default menu