import Head from 'next/head'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import styles from '../../styles/Form.module.css';
import { motion } from "framer-motion";
import slides from '../../styles/slides.module.css';
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Image from 'next/image';
import Signup from '../../components/signup';
import Login from '../../components/login';
import cx from 'classnames';
import {useRouter} from 'next/router';

export default function Form() {
  

    const [signUp, setSignUp] = useState(true);
  
   const changeSignUp=()=>{
   
    setSignUp(!signUp);
   }






    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
    
            
            <div className={styles.signUpWrap}>
            
            <div className={styles.formSignInWrapper}>
            <div className={slides.switchescontainer}>
    <input type="radio" id="switchMonthly" name="switchPlan" value="SignUp" onChange={changeSignUp}  />
    <input type="radio" id="switchYearly" name="switchPlan" value="SignIn" onChange={changeSignUp}/>
    <label htmlFor="switchMonthly" >SignUp</label>
    <label htmlFor="switchYearly" >Login</label>
    <div className={slides.switchwrapper}>
      <div className={slides.switch}>
        <div>SignUp</div>
        <div>Login</div>
      </div>
    </div>
  </div>
  
  
  <div className={styles.signInImages}>
        <Image src="/../public/images/3071357.jpg"    alt="App Logo"    width={400}    height={400}    />
        </div>
       
        
        <div  className={cx(styles.signup)}><br/>
        
       {signUp&&<Signup/>}
       {!signUp&&<Login/>}
        
                
            </div></div>
            </div>
            
        </>
    );
};
