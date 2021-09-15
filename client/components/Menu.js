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
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import { GET_MENU } from '../GraphQL/Queries/MenuQueries';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { ADD_ITEM,UPDATE_ITEM,DELETE_ITEM } from '../GraphQL/Mutations/ItemMutation';
import QRCode from 'qrcode';
import Button from '@material-ui/core/Button';
import Image from 'next/image';

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
    },
    tableCell: {
        width: 200,
        borderWidth: "thin", 
        borderColor: '#D3D3D3',
        borderStyle: 'solid'
    },
    generateQr: {
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    },
    buttons: {
        textAlign: "center"
    },
    button: {
        margin: theme.spacing(2, 0, 1),
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "40px",
        textAlign: "center",
        width: "fit-content"
    },
    bolderFont: {
        fontWeight: 600
    },
    categoryTable:
    {
        margin: "10px 0"
    }
}));

export default function MenuTable({ storeId }) {
    const classes = useStyles();

    const [items, setItems] = useState([]);
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [addItemsMenu] = useMutation(ADD_ITEM);
    const { data, loading, error, refetch } = useQuery(GET_MENU,
        {
            variables: {
                getMenuStoreId: storeId
            }
        });
    const [updateItemsMenu]=useMutation(UPDATE_ITEM)
    const [deleteItemsMenu]=useMutation(DELETE_ITEM)
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const [qrCode, setQrCode] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const createItemsFunction = async () => {

        try {
            setQrCode(await QRCode.toDataURL("https://aagman-client.herokuapp.com/menu?menuId=" + menuId));
            setImageUrl(qrCode);
        }
        catch (error) {
            console.log(error);
        }


    }

    const addOrEdit = (item, resetForm) => {
        if (item.id === "") {
            // let menuItem = {
            //     name: item.name,
            //     description: item.description,
            //     status: item.status,
            //     cost: item.cost,
            //     category: item.category
            // }
            // setItems(items => [...items, menuItem])
            console.log(item.category)
            addItemsMenu({

                variables: {
                    createItemName: item.name,
                    createItemDescription: item.description,
                    createItemAvailability: item.availability,
                    createItemType: item.type,
                    createItemPrice: parseFloat(item.price),
                    createItemRating: parseFloat(item.rating),
                    createItemBestSeller: item.bestSeller,
                    createItemPhoto: "0",
                    createItemCategoryId: item.category
                }
            }).then(refetch)
        }
        else {
           // menuService.updateMenu(item)
           updateItemsMenu({

            variables: {
                updateItemName: item.name, 
                updateItemDescription: item.description, 
                updateItemAvailability: item.availability, 
                updateItemType: item.type, 
                updateItemPrice: parseFloat(item.price), 
                updateItemRating: parseFloat(item.rating), 
                updateItemBestSeller: item.bestSeller, 
                updateItemPhoto: "0", 
                updateItemItemId: item.id
            }
        }).then(refetch)

        }

        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const deleteItem = (id,category) => {
        // console.log(category);
        // console.log("Delete the item with id ", id);
        deleteItemsMenu({

            variables: {
                deleteItemItemId: id, 
                deleteItemCategoryId: category
            }
        }).then(refetch)
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

    if (loading)
        return (<div>Loading...</div>);

    if (error)
        return (<div>Error! ${error.message}</div>);

    const menu = Object.values(data)[0].menu;
    const categories=menu.categories;
    const menuId=menu.id;

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
                    <TableBody>
                      
                            {categories.map(category =>
                                <div key={category.id} className={classes.categoryTable}>
                                    <TableCell className={classes.bolderFont} >{category.name}</TableCell>
                                    <TableCell>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Name</TableCell>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Description</TableCell>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Availability</TableCell>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Type</TableCell>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Price</TableCell>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Rating</TableCell>
                                                <TableCell className={[classes.tableCell, classes.bolderFont]} >Best Seller</TableCell>
                                                <TableCell align="right" className={[classes.tableCell, classes.bolderFont]}>Modify/Delete</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {category.items.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell className={classes.tableCell} >{row.name}</TableCell>
                                                <TableCell className={classes.tableCell} >{row.description}</TableCell>
                                                <TableCell className={classes.tableCell} >{row.availability}</TableCell>
                                                <TableCell className={classes.tableCell} >{row.type}</TableCell>
                                                <TableCell className={classes.tableCell} >₹{row.price}</TableCell>
                                                <TableCell className={classes.tableCell} >{row.rating}</TableCell>
                                                <TableCell className={classes.tableCell} >{row.bestSeller}</TableCell>
                                                <TableCell className={classes.tableCell} align="right">
                                                    <IconButton aria-label="edit" onClick={() => { openInPopup(row) }} color="inherit">
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={() => deleteItem(row.id,category.id)} color="inherit">
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton></TableCell>
                                            </TableRow>
                                        ))
                                        }
                                    </TableCell>
                                </div>
                            )}

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
                menuId={menuId}

            />
            <div className={classes.generateQr}>
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => createItemsFunction()}
                        className={classes.button}
                    >
                        Generate QR Code
                    </Button>
                </div>
                {qrCode ? (<a href={qrCode} download><Image src={qrCode} alt="image" width={150} height={150}/></a>) : null}
            </div>
        </React.Fragment>
    );
}