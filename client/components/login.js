import Head from 'next/head'
import { useForm } from "react-hook-form";
import styles from '../styles/Login.module.css'
import { useState } from "react";
import { motion } from "framer-motion";
import TextField from '@material-ui/core/TextField';
import { checkIfUserExists, postOtp, verifyUser } from '../lib/auth';
import { VerifyUser } from './VerifyUser';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    button: {
        margin: "20px",
        backgroundColor: "#0596f5",
        color: "#ffffff",
        padding: "20px",
        borderRadius: "40px",
        textAlign: "center"
    }
});

export default function Login() {
    const classes = useStyles();

    const [openPopup, setOpenPopup] = useState(false)
    const router = useRouter();

    const variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    }
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [email, setEmail] = useState("");

    const verifyOtp = (item, resetForm) => {
        verifyUser(email, item.otp).then(res => {
            if (res) {
                router.push({
                    pathname: '/orders',
                    query: { email: email },
                })
            }
            else {
                alert("OTP entered does not match. Try logging in again.")
            }
        });
        resetForm();
        setOpenPopup(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        checkIfUserExists(email).then(res => {
            if (res) {
                postOtp(email).then(res => {
                    if (res) {
                        alert("Email has been sent along with the verification otp.");
                        setOpenPopup(true);
                    }
                    else {
                        alert("Email has not been sent due to some error.");
                    }
                });
            }
            else {
                alert("Email id does not exist already sign up to continue.");
            }
        })
    }
    const backHomePage = (e) => {
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <motion.main
                variants={variants}// Pass the variant object into Framer Motion 
                initial="hidden" // Set the initial state to variants.hidden
                animate="enter" // Animated state to variants.enter
                exit="exit" // Exit state (used later) to variants.exit
                transition={{ type: 'linear' }} // Set the transition to linear

            >
                <form onSubmit={onSubmit} className={styles.login}>
                    <h1 className={styles.heading}>Login</h1><br /><br />
                    <TextField label="Email" variant="outlined" id="EmailInput" color="primary" value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                    <br /><br />

                    <Button type="submit" variant="contained" color="secondary" className={classes.button}>Login</Button> <br />
                </form>
            </motion.main>
            <VerifyUser
                title="OTP Verification"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
                verifyOtp={verifyOtp}
            />
        </>
    );
};