import Head from 'next/head'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import styles from '../styles/Login.module.css'
import { useState } from "react";
import Typography from '@material-ui/core/Typography';
import { motion } from "framer-motion";
import logo from '../public/images/3071357.jpg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Image from 'next/image';

export default function Login() {
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

    const onSubmit = (e) => {
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
<form className={styles.login}>
        <h1 className={styles.heading}>Login</h1><br/><br/>
        <TextField label="Email" variant="outlined" id="EmailInput" color= "primary"  value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                        <br/><br/>
                       
          <button className={styles.button1} onClick={onSubmit}>Login</button> <br/>
                 
          </form> 
  </motion.main>
        </>
    );
};