import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Title from './Title';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        backgroundColor: "#83c3f7",
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        borderRadius: "20px",
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    paper: {
        backgroundColor: "white",
        borderRadius: "20px",
        border: '1px solid #654ea3',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 3, 2),
    },
    formPaper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#0d47a1",
        color: "white"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "10px",
        borderRadius: "40px",
        textAlign: "center"
    },
    formControl: {
        margin: "5px 0"
    }
}));

export const VerifyOrder = (props) => {
    const classes = useStyles();
    const { title, openPopup, setOpenPopup, verifyOrder, itemList, paymentModes, paymentStatusTypes, totalCost } = props;
    const initialFValues = {
        id: '',
        paymentMode: '',
        paymentStatus: ''

    }

    const resetForm = () => {
        setItem(initialFValues);
    }

    const [item, setItem] = useState(initialFValues);

    const handleInputChange = e => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        verifyOrder(item, resetForm);

    }

    return (

        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1, textAlign: "center" }}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className={classes.paper}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className={classes.formPaper}>
                            <Avatar className={classes.avatar}>
                                <ShoppingCartIcon />
                            </Avatar>
                            <br/>
                            <Title>Your Order</Title>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Cost</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {itemList.map((item) => (
                                        <TableRow key={item.name}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>₹{item.price}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <br/>
                            <Typography component="h2" variant="h5" style={{ fontWeight: "500" }}>
                               Total Cost = ₹ {totalCost}
                            </Typography>
                            <br/>
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <FormControl variant="outlined" className={classes.formControl} fullWidth required autoComplete="paymentMode" autoFocus>
                                    <InputLabel htmlFor="paymentMode">Payment Mode</InputLabel>
                                    <Select
                                        native
                                        name="paymentMode"
                                        value={item.paymentMode}
                                        onChange={handleInputChange}
                                        label="Payment Mode"
                                    >
                                        <option aria-label="None" value="" />
                                        {paymentModes.map((paymentMode, index) =>
                                            <option key={index} value={paymentMode}>{paymentMode}</option>
                                        )}
                                    </Select>
                                </FormControl>
                                <Grid container spacing={2} direction="item" justifyContent="center" alignItems="center">
                                    <Grid container xs={12} sm={6} justifyContent="center" alignItems="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                        >
                                            Place Order
                                        </Button>
                                    </Grid>
                                    <Grid container xs={12} sm={6} justifyContent="center" alignItems="center">
                                        <Button
                                            type="reset"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}
                                            onClick={resetForm}
                                        >
                                            Reset
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Container>
                </div>
            </DialogContent>
        </Dialog>

    );
}
