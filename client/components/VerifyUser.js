import React, { useState } from 'react';
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
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        background: "linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)",
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
        borderRadius: "20px",
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    paper: {
        background: "linear-gradient(to right, #d9a7c7, #fffcdc)",
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
        background: "linear-gradient(to right, #8e2de2, #4a00e0)",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
        borderRadius: "50px",
        background: "linear-gradient(to right, #654ea3, #eaafc8)"
    },
}));

export const VerifyUser = (props) => {
    const classes = useStyles();
    const { title, openPopup, setOpenPopup, verifyOtp } = props;

    const initialFValues = {
        otp: ''
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

        verifyOtp(item, resetForm);

    }

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
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
                                <VerifiedUserIcon />
                            </Avatar>
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    value={item.otp}
                                    onChange={handleInputChange}
                                    label="OTP"
                                    type="text"
                                    name="otp"
                                    autoComplete="otp"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Submit
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
    );
}
