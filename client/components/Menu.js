import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Toolbar from '@material-ui/core/Toolbar';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AddMenu } from './AddMenu';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


// Generate Order Data
function createData(id, name, description, status, cost, category) {
    return { id, name, description, status, cost, category };
}

const rows = [
    createData("1", "Pizza", "Italian Dish", 'Available', '150.00', 'Fast Food')
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    toolbar: {
        background: "linear-gradient(to right, #5c258d, #4389a2)",
        borderRadius: "20px"
    },
    iconButton: {
        marginLeft: "auto",
        background: "linear-gradient(to right, #654ea3, #eaafc8)",
        '&:hover': {
            background: "linear-gradient(to right, #2bc0e4, #eaecc6)"
        },
    },
    tableIconButton: {
        margin: "3px",
        background: "linear-gradient(to right, #654ea3, #eaafc8)",
        '&:hover': {
            background: "linear-gradient(to right, #2bc0e4, #eaecc6)"
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
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
    },
    menuTable: {
        margin: "20px",
    }
}));

export default function Menu() {
    const classes = useStyles();
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const addOrEdit = (item, resetForm) => {
        // if (employee.id === "")
        // {
        //     menuService.addMenu(item)
        // }
        // else
        // {
        //     menuService.updateMenu(item)
        // }

        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
    }

    const deleteItem = (id) => {
        console.log("Delete the item with id ", id);
    }

    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
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
                <IconButton aria-label="add" className={[classes.margin,classes.tableIconButton]} onClick={() => { setOpenPopup(true) }}>
                    <AddIcon fontSize="small" />
                </IconButton>
            </Toolbar>
            <div className={classes.menuTable}>
                <Title>Menu Items</Title>
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
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>₹{row.cost}</TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" className={[classes.margin,classes.tableIconButton]} onClick={() => { openInPopup(row) }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton aria-label="delete" className={[classes.margin,classes.tableIconButton]} onClick={() => deleteItem(row.id)}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <AddMenu
                title="Menu Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                recordForEdit={recordForEdit}
                setRecordForEdit={setRecordForEdit}
                addOrEdit={addOrEdit}
            />
        </React.Fragment>
    );
}