import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import styles from '../styles/Signup.module.scss';
import { useState } from "react";
import logo from '../public/images/landingPage/nav-logo.png';
import images from '../public/images/landingPage/1.png'
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import eye from '../public/images/landingPage/Icon.png';
import * as yup from 'yup';
import { useRouter } from 'next/router';

interface FormValues {
    email: string;
    password: string;
}
const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 6 characters').required('Password is required').matches(
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).*$/,
        'Password must include capital letter, special character, and number'
    ),
});

const Signin: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const router = useRouter();

    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 
        validationSchema.validate(formValues, { abortEarly: false }).then(() => {
            axios.post("https://venturesnation.onrender.com/user/signin", formValues).then((response: AxiosResponse) => {
                console.log(response.data);
                setFormValues({
                    email: '',
                    password: '',
                });
                setErrors(response.data.message);
                localStorage.setItem('token', response.data.myToken);
                router.push('/dashboard')
            })
            .catch((error) => {
                setErrors(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }).catch((error) => {
            error.inner.forEach((error: { path: string; errors: any; }) => {
                if (error.path) {
                    errors[error.path] = error.errors;
                } else {
                    errors.general = error.errors;
                }
            })
            setIsLoading(false); 
        })
    }
    return (
        <>
            <Head>
                <title>Sign in</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
                ></link>
            </Head>
            <div className={styles.wrapper}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="container col-md-6">
                            <div className={styles.form}>
                                <div className={styles.logo}>
                                    <Link href="/"><Image src={logo} alt="Logo" /></Link>
                                    <h1>Welcome Back!</h1>
                                    <p className={styles.txt}>Kindly input your details to access your account.</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {errors && <p>{errors}</p>}
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email address" value={formValues.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.password} onChange={handleInputChange} />
                                        <Image src={eye} alt="" className={styles.image} />
                                    </div>
                                    <div className={styles.fpassword}>
                                        <a href="">Forgot Password?</a>
                                    </div>
                                    <div className={styles.signup}>
                                        <button type="submit" className="btn border-0 text-white" disabled={isLoading} >{isLoading ? "Signing in..." : "Sign in"}</button>
                                    </div>
                                    <p className="text-center pt-2">Don&apos;t have an account? <Link href="/signin" className={styles.login}>Log in</Link></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Image src={images} alt="" className={styles.imgs} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signin;