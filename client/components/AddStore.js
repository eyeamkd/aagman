import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddBoxIcon from '@material-ui/icons/AddBox';

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
        margin: "10px 0"
    }
}));

export const AddStore = (props) => {
    const classes = useStyles();
    const { title, openPopup, setOpenPopup, addStore } = props;

    const [statusTypes, setStatusTypes] = useState(["Open", "Closed"]);

    const initialFValues = {
        id: '',
        storeName: '',
        phoneNumber: '',
        gstNumber: '',
        rating: '',
        area: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        openTime: '07:30',
        closeTime: '20:30',
        status: 'Open'
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

        addStore(item, resetForm);

    }

    return (
        <>
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
                                    <AddBoxIcon />
                                </Avatar>
                                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                    <TextField name="storeName" label="Store Name" variant="outlined" color="primary" margin="normal" required fullWidth type="text" autoFocus value={item.storeName} onChange={handleInputChange} />

                                    <TextField name="area" label="Area" variant="outlined" color="primary" margin="normal" required fullWidth type="text" autoFocus value={item.area} onChange={handleInputChange} />

                                    <TextField name="landmark" label="Landmark" variant="outlined" color="primary" margin="normal" required fullWidth type="text" autoFocus value={item.landmark} onChange={handleInputChange} />

                                    <TextField name="city" label="City" variant="outlined" color="primary" margin="normal" required fullWidth type="text" autoFocus value={item.city} onChange={handleInputChange} />

                                    <TextField name="state" label="State" variant="outlined" color="primary" margin="normal" required fullWidth type="text" autoFocus value={item.state} onChange={handleInputChange} />

                                    <TextField name="country" label="Country" variant="outlined" color="primary" margin="normal" required fullWidth type="text" autoFocus value={item.country} onChange={handleInputChange} />

                                    <TextField
                                        id="openTime"
                                        name="openTime"
                                        label="Open Time"
                                        type="time"
                                        margin="normal" required fullWidth autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        value={item.openTime}
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        id="closeTime"
                                        name="closeTime"
                                        label="Close Time"
                                        type="time"
                                        margin="normal" required fullWidth autoFocus
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                        value={item.closeTime}
                                        onChange={handleInputChange}
                                    />

                                    <FormControl variant="outlined" className={classes.formControl} fullWidth required autoComplete="status" autoFocus>
                                        <InputLabel htmlFor="status">Status</InputLabel>
                                        <Select
                                            native
                                            name="status"
                                            value={item.status}
                                            onChange={handleInputChange}
                                            label="Status"
                                        >
                                            <option aria-label="None" value="" />
                                            {statusTypes.map((status, index) =>
                                                <option key={index} value={status}>{status}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        type="reset"
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        className={classes.submit}
                                        onClick={resetForm}
                                    >
                                        Reset
                                    </Button>
                                </form>
                            </div>
                        </Container>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
