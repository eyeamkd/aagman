import Head from 'next/head'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import styles from '../../styles/Form.module.css';
import { motion } from "framer-motion";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import Signup from '../../components/signup';
import Login from '../../components/login';
import cx from 'classnames';
import {useRouter} from 'next/router';

export default function Form() {
  
    const [signIn, setSignIn] = useState(true);
    const [signUp, setSignUp] = useState(false);
   const changeSignIn=()=>{
       setSignIn(false);
       setSignUp(true);
   }
   const changeSignUp=()=>{
    setSignIn(true);
    setSignUp(false);
   }






    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
    
            
            <div className={styles.signUpWrap}>
            
            <div className={styles.formSignInWrapper}>
            <div class="switches-container">
    <input type="radio" id="switchMonthly" name="switchPlan" value="SignUp" checked="checked" />
    <input type="radio" id="switchYearly" name="switchPlan" value="SignIn" />
    <label for="switchMonthly" onClick={changeSignUp}>SignUp</label>
    <label for="switchYearly" onClick={changeSignIn}>Login</label>
    <div class="switch-wrapper">
      <div class="switch">
        <div>SignUp</div>
        <div>Login</div>
      </div>
    </div>
  </div>
  
  
  <div className={styles.signInImages}>
        <Image src="/../public/images/3071357.jpg"    alt="App Logo"    width={400}    height={400}    />
        </div>
       
        
        <div  className={cx(styles.signup)}><br/>
        
       {signIn&&<Signup/>}
       {signUp&&<Login/>}
        
                
            </div></div>
            </div>
            
        </>
    );
};
