import Head from 'next/head'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import styles from '../styles/Login.module.css'
import { useState } from "react";
import Typography from '@material-ui/core/Typography';
import logo from '../public/images/3071357.jpg';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Image from 'next/image';

export default function Login() {
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
        <div className={styles.loginWrap}>
        <div className={styles.formSignInWrapper}>
        <div className={styles.formSignIn}>
        <Image
                            src="/../public/images/3071357.jpg"
                            alt="App Logo"
                            width={400}
                            height={400}
                        />
        </div>
        <div className={styles.formSignIn}><br/>
        <h1 className={styles.heading}>Login</h1><br/><br/>
        <TextField label="Email" variant="outlined" id="EmailInput" color= "primary"  value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}/>
                        <br/><br/>
          <Button className={styles.button1} onClick={onSubmit}>Submit</Button> <br/>
          <Button className={styles.button1} onClick={backHomePage}>Back to Home</Button>            
            </div></div>
        </div>
        </>
    );
};
