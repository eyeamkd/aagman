import Head from 'next/head'
import Link from 'next/link'
import { useForm } from "react-hook-form";
import styles from '../styles/SignUp.module.css'
import { useState } from "react";

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const onSubmit = (e) => {
    }

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className={styles.signUpWrap}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.formSignUp}>
                    <div className="mb-3">
                        <label htmlFor="email" className={styles.formLabel}>
                            Email address
                        </label>
                        <input
                            type="text"
                            className="form-control my-3"
                            id="email"
                            name="email"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^[a-zA-Z0-9\.]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
                                    message: "Please enter a valid email.",
                                },
                            })}
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        {errors?.email && (
                            <span className={styles.errors}>{errors.email.message}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fullName" className={styles.formLabel}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control my-3"
                            id="fullName"
                            name="fullName"
                            {...register("fullName", {
                                required: "Full Name is required.",
                                pattern: {
                                    value: /^[a-zA-Z ]$/,
                                    message: "Please enter a valid full name.",
                                },
                            })}
                            value={fullName}
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                        />
                        {errors?.fullName && (
                            <span className={styles.errors}>{errors.fullName.message}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className={styles.formLabel}>
                            Phone Number
                        </label>
                        <input
                            type="text"
                            className="form-control my-3"
                            id="phoneNumber"
                            name="phoneNumber"
                            {...register("phoneNumber", {
                                required: "Phone Number is required.",
                                pattern: {
                                    value: /^[\d]{10}$/,
                                    message: "Please enter a valid phone number.",
                                },
                            })}
                            value={phoneNumber}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                        />
                        {errors?.phoneNumber && (
                            <span className={styles.errors}>{errors.phoneNumber.message}</span>
                        )}
                    </div>

                    <button type="submit" className="my-3 btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
