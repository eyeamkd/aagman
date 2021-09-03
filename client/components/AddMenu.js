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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AddCategory } from './AddCategory';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_CATEGORIES } from '../GraphQL/Queries/CategoriesQueries';
import { ADD_CATEGORY } from '../GraphQL/Mutations/CategoryMutation'


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

export const AddMenu = (props) => {
    const classes = useStyles();
    const [openCategoryPopup, setOpenCategoryPopup] = useState(false)
    const { title, openPopup, setOpenPopup, recordForEdit, addOrEdit, setRecordForEdit,menuId } = props;
    const [availabilityStatusTypes, setAvailabilityStatusTypes] = useState(["InStock", "OutOfStock"]);
    const [types, setTypes] = useState(["Veg", "NonVeg", "Egg", "NonEdible"]);
    const [choices, setChoices] = useState(["Yes", "No"]);
    const { data, loading, error, refetch } = useQuery(GET_CATEGORIES,
        {
            variables: {
                getCategoryByMenuIdMenuId: menuId
            }
        });
    const [addCategoryMenu] = useMutation(ADD_CATEGORY);


    const initialFValues = {
        id: '',
        name: '',
        description: '',
        availability: 'InStock',
        type: 'Veg',
        price: '',
        rating: 0,
        bestSeller: 'No',
        category: ''
    }

    const resetForm = () => {
        setItem(initialFValues);
        setRecordForEdit(null);
    }

    const [item, setItem] = useState(initialFValues);

    useEffect(() => {
        if (recordForEdit != null) {
            setItem({
                ...recordForEdit
            })

        }
    }, [recordForEdit])

    const handleInputChange = e => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        addOrEdit(item, resetForm);

    }

    const addCategory = (item, resetForm) => {
        //  setCategories(categories => [...categories, {"id": item.id , "name": item.name}])
        addCategoryMenu({
            variables: {
                createCategoryMenuId: "612e2c129748de1394a1ee42",
                createCategoryName: item.name,

            }
        }).then(refetch)
        resetForm()
        setOpenCategoryPopup(false)
    }

    if (loading)
        return (<div>Loading...</div>);

    if (error)
        return (<div>Error! ${error.message}</div>);

    const categories = Object.values(data)[0].categories;

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
                                    <AddShoppingCartIcon />
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
                                        label="Name"
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        id="description"
                                        value={item.description}
                                        onChange={handleInputChange}
                                        label="Description"
                                        type="text"
                                        name="description"
                                        autoComplete="description"
                                        autoFocus
                                    />
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth required autoComplete="availability" autoFocus>
                                        <InputLabel htmlFor="availability">Availability</InputLabel>
                                        <Select
                                            native
                                            name="availability"
                                            value={item.availability}
                                            onChange={handleInputChange}
                                            label="Availability"
                                        >
                                            <option aria-label="None" value="" />
                                            {availabilityStatusTypes.map((availability, index) =>
                                                <option key={index} value={availability}>{availability}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth required autoComplete="type" autoFocus>
                                        <InputLabel htmlFor="type">Type</InputLabel>
                                        <Select
                                            native
                                            name="type"
                                            value={item.type}
                                            onChange={handleInputChange}
                                            label="Type"
                                        >
                                            <option aria-label="None" value="" />
                                            {types.map((type, index) =>
                                                <option key={index} value={type}>{type}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="price"
                                        label="Price"
                                        type="text"
                                        id="price"
                                        value={item.price}
                                        onChange={handleInputChange}
                                        autoComplete="price"
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="rating"
                                        label="Rating"
                                        type="text"
                                        id="rating"
                                        value={item.rating}
                                        onChange={handleInputChange}
                                        autoComplete="rating"
                                    />
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth required autoComplete="bestSeller" autoFocus>
                                        <InputLabel htmlFor="bestSeller">BestSeller</InputLabel>
                                        <Select
                                            native
                                            name="bestSeller"
                                            value={item.bestSeller}
                                            onChange={handleInputChange}
                                            label="BestSeller"
                                        >
                                            <option aria-label="None" value="" />
                                            {choices.map((bestSeller, index) =>
                                                <option key={index} value={bestSeller}>{bestSeller}</option>
                                            )}
                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" className={classes.formControl} fullWidth required autoComplete="status" autoFocus>
                                        <InputLabel htmlFor="category">Category</InputLabel>
                                        <Select
                                            native
                                            name="category"
                                            value={item.category}
                                            onChange={handleInputChange}
                                            label="Category"
                                        >
                                            <option aria-label="None" value="" />
                                            {categories.map((category, index) =>
                                                <option key={index} value={category.id}>{category.name}</option>
                                            )}
                                        </Select>
                                        <Button color="primary" onClick={() => { setOpenCategoryPopup(true) }}>Add Category (If not already existing.)</Button>
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
            <AddCategory
                title="Add Category"
                openCategoryPopup={openCategoryPopup}
                setOpenCategoryPopup={setOpenCategoryPopup}
                addCategory={addCategory}
            />
        </>
    );
}
