import React, { useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AddMenu } from './AddMenu';
import {ADD_MENU_ITEMS} from "../GraphQL/Mutations/MenuMutation";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.3),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.5),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
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
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        color: "black"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuTable: {
        margin: "20px 0",
    },
    appBar: {
        borderRadius: "20px",
        backgroundColor: "#0d47a1",
        color: "white"
    },
    menuItem: {
        backgroundColor: "#83c3f7"
    }
}));

export default function MenuTable() {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (item, resetForm) => {
         if (item.id === "")
         {
            let menuItem = {
                name : item.name,
                description : item.description,
                status : item.status,
                cost : item.cost,
                category : item.category
            }
            setItems(items => [...items, menuItem] )
        }
        else
        {
            menuService.updateMenu(item)
        }

        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const deleteItem = (id) => {
        console.log("Delete the item with id ", id);
    }

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={() => { setOpenPopup(true) }} color="inherit" className={classes.menuItem}>
                <IconButton aria-label="add">
                    <AddIcon />
                </IconButton>
                <p>Add Item</p>
            </MenuItem>
        </Menu>
    );

    return (
        <React.Fragment>
            <div className={classes.grow}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Menu Items
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
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton aria-label="add" onClick={() => { setOpenPopup(true) }} color="inherit">
                                <AddIcon />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </div>
            <div className={classes.menuTable}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Modify/Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>₹{row.cost}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => { openInPopup(row) }} color="inherit">
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => deleteItem(row.id)} color="inherit">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AddMenu
                title="Menu"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                recordForEdit={recordForEdit}
                setRecordForEdit={setRecordForEdit}
                addOrEdit={addOrEdit}
                categories={categories}
                setCategories={setCategories}
            />
        </React.Fragment>
    );
}