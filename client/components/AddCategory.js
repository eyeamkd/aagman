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
import CategoryIcon from '@material-ui/icons/Category';
import CloseIcon from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';
import {ADD_CATEGORY} from '../GraphQL/Mutations/CategoryMutation'

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
}));

export const AddCategory = (props) => {
    const classes = useStyles();
    const { title, openCategoryPopup, setOpenCategoryPopup, addCategory } = props;

    const initialFValues = {
        id: '',
        name: ''
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

        addCategory(item, resetForm);

    }

    return (

        <Dialog open={openCategoryPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 , textAlign: "center"}}>
                        {title}
                    </Typography>
                    <Button
                        color="secondary"
                        onClick={() => { setOpenCategoryPopup(false) }}>
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
                                <CategoryIcon />
                            </Avatar>
                            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    value={item.name}
                                    onChange={handleInputChange}
                                    label="Category Name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                />
                                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Grid container xs={12} sm={6} justifyContent="center" alignItems="center">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Submit
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
