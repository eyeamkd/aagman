import Head from 'next/head'
import { useForm } from "react-hook-form";
import styles from '../styles/SignUp.module.css';
import { motion } from "framer-motion";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { ADD_USERS } from '../GraphQL/Mutations/UsersMutation';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: "20px",
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "40px",
        textAlign: "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 220,
    },
}));

export default function Signup() {
    const classes = useStyles();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const variants = {
        hidden: { opacity: 0, x: 100, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    }

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [storeName, setStoreName] = useState("");
    const [rating, setRating] = useState(0);
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [openTime, setOpenTime] = useState("07:30");
    const [closeTime, setCloseTime] = useState("20:30");
    const [statusTypes, setStatusTypes] = useState(["Open", "Closed"]);
    const [status, setStatus] = useState("Open");
    const [createUser] = useMutation(ADD_USERS);
    const router = useRouter();

    const onSubmit = (e) => {
        e.preventDefault();
        createUser({
            variables: {
                addUserEmail: email,
                addUserFullName: fullName,
                addUserGstNumber: gstNumber,
                addUserPhoneNumber: phoneNumber,
                addUserStoreName: storeName,
                addUserCountry: country,
                addUserState: state,
                addUserCity: city,
                addUserArea: area,
                addUserLandMark: landmark,
                addUserOpenTime: openTime,
                addUserCloseTime: closeTime,
                addUserStatusTime: status
    }
})
alert("User has been registered successfully.")
router.push({
    pathname: '/orders',
    query: { email: email },
})
    }
const backHomePage = (e) => {

}

return (

    <>
        <Head>
            <title>Sign Up</title>
        </Head>
        <motion.main
            variants={variants}// Pass the variant object into Framer Motion 
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'linear' }} // Set the transition to linear

        >
            <h1 className={styles.heading}>Sign Up</h1>

            <form onSubmit={onSubmit}>
                <TextField label="Email" variant="outlined" color="primary" value={email} onChange={(e) => { setEmail(e.target.value); }} />
                <br /><br />
                <TextField label="Full Name" variant="outlined" color="primary" value={fullName} onChange={(e) => { setFullName(e.target.value); }} />
                <br /><br />
                <TextField label="Phone Number" variant="outlined" color="primary" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); }} />
                <br /><br />
                <TextField label="GST Number" variant="outlined" color="primary" value={gstNumber} onChange={(e) => { setGstNumber(e.target.value); }} />
                <br /><br />
                <TextField label="Store Name" variant="outlined" color="primary" value={storeName} onChange={(e) => { setStoreName(e.target.value); }} />
                <br /><br />
                <TextField label="Rating" variant="outlined" color="primary" value={rating} onChange={(e) => { setRating(e.target.value); }} />
                <br /><br />
                <TextField label="Area" variant="outlined" color="primary" value={area} onChange={(e) => { setArea(e.target.value); }} />
                <br /><br />
                <TextField label="Landmark" variant="outlined" color="primary" value={landmark} onChange={(e) => { setLandmark(e.target.value); }} />
                <br /><br />
                <TextField label="City" variant="outlined" color="primary" value={city} onChange={(e) => { setCity(e.target.value); }} />
                <br /><br />
                <TextField label="State" variant="outlined" color="primary" value={state} onChange={(e) => { setState(e.target.value); }} />
                <br /><br />
                <TextField label="Country" variant="outlined" color="primary" value={country} onChange={(e) => { setCountry(e.target.value); }} />
                <br /><br />
                <TextField
                    id="openTime"
                    label="Open Time"
                    type="time"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    value={openTime}
                    onChange={(e) => { setOpenTime(e.target.value); }}
                />
                <br /><br />
                <TextField
                    id="closeTime"
                    label="Close Time"
                    type="time"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    value={closeTime}
                    onChange={(e) => { setCloseTime(e.target.value); }}
                />
                <br /><br />
                <FormControl variant="outlined" className={classes.textField} required autoComplete="status" autoFocus>
                    <InputLabel htmlFor="status">Status</InputLabel>
                    <Select
                        native
                        name="status"
                        value={status}
                        onChange={(e) => { setStatus(e.target.value); }}
                        label="Status"
                    >
                        <option aria-label="None" value="" />
                        {statusTypes.map((status, index) =>
                            <option key={index} value={status}>{status}</option>
                        )}
                    </Select>
                </FormControl>
                <br /><br />
                <Button type="submit" variant="contained" color="secondary" className={classes.button}>Register</Button> <br />

            </form>


        </motion.main>
    </>);
};