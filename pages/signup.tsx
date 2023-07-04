import * as React from 'react'
import Head from "next/head";
import styles from '../styles/Signup.module.scss';
import Image from 'next/image'
import { useState } from "react";
import logo from '../public/images/landingPage/nav-logo.png';
import eye from '../public/images/dashboard/eye.png';
import eyeslash from '../public/images/dashboard/eyeslash.png';
import strong from '../public/images/landingPage/strong.png';
import images from '../public/images/landingPage/1.png'
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import * as yup from 'yup';
import { useRouter } from 'next/router';

interface FormValues {
    fullname: string;
    email: string;
    password: string;
}

const validationSchema = yup.object().shape({
    fullname: yup.string()
    .required('Name is required'),
    email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
    password: yup.string()
    .required("Password is required")
    .matches(
        RegExp("(.*[a-z].*)"),
        "Password must contain at least one lowercase letter"
    )
    .matches(
        RegExp("(.*[A-Z].*)"),
        "Password must contain at least one Uppercase letter"
    )
    .matches(RegExp("(.*\\d.*)"), "Password must contain a Number")
    .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password must contain a Special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});


const Signup: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [progressColor, setProgressColor] = useState<string>("#DC2626");
    const [progressStrength, setProgressStrength] = useState<string>("Weak");
    const [progress, setProgress] = useState<string>();

    const display = () => {
        setShow(!show);
    }
    
    const [formValues, setFormValues] = useState<FormValues>({
        fullname: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if(name == 'password'){
            const validationConditions = [
                { condition: "Password is valid", isValid: !errors.password },
                {
                    condition: "Password is at least 8 characters long",
                    isValid: value.length >= 8,
                },
                {
                    condition: "Password contains at least one uppercase letter",
                    isValid: /[A-Z]/.test(value),
                },
                {
                    condition: "Password contains at least one lowercase letter",
                    isValid: /[a-z]/.test(value),
                },
                {
                    condition: "Password contains at least one number",
                    isValid: /\d/.test(value),
                },
                {
                    condition: "Password contains at least one special character",
                    isValid: /[!@#$%^&*(),.?":{}|<>]/.test(value),
                },
            ];
    
            const fulfilledConditions = validationConditions.filter(
                (condition) => condition.isValid
            );
    
              // let progress = 0;
            const progress = Math.floor(
                (fulfilledConditions.length / validationConditions.length) * 100
            );
    
            if (progress <= 25) {
                setProgressColor("#DC2626");
                setProgressStrength("Weak");
            } else if (progress > 25 && progress <= 50) {
                setProgressColor("#F59E0B");
                setProgressStrength("Fair");
            } else if (progress > 50 && progress <= 70) {
                setProgressColor("#22C55E");
                setProgressStrength("Good");
            } else if (progress > 70) {
                setProgressColor("#16A34A");
                setProgressStrength("Strong");
            }    
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 
        validationSchema.validate(formValues, { abortEarly: false }).then(() => {
            axios.post("https://api.venturenation.co/api/v1/auth/register", formValues).then((response: AxiosResponse) => {
                console.log(response.data);
                setFormValues({
                    fullname: '',
                    email: '',
                    password: '',
                });
                setErrors(response.data.message);
                router.push('/signin');
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
                <title>Sign up</title>
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
                    <div className={styles.row}>
                        <div className="col-md-6">
                            <div className={styles.form}>
                                <div className={styles.logo}>
                                    <Link href="/"><Image src={logo} alt="Logo" /></Link>
                                    <h1 >Create an account</h1>
                                    <p className={styles.txt}>Please filled all the required input fields.</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {errors && <p>{errors}</p>}
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="fullname">Full name</label>
                                        <input type="text" className="form-control" name="fullname" id="fullname" placeholder="Full name" value={formValues.fullname} onChange={handleInputChange} />
                                        {errors.fullname && <div className=" text-danger">{errors.fullname}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Enter your email address" value={formValues.email} onChange={handleInputChange} />
                                        {errors.email && <div className=" text-danger">{errors.email}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        {show?
                                            <input type="text" className="form-control" name="password" id="password" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.password} onChange={handleInputChange} /> :
                                            <input type="password" className="form-control" name="password" id="password" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.password} onChange={handleInputChange} />
                                        }
                                        {show?
                                            <Image src={eyeslash} alt="" className={styles.image} onClick={display}/>:
                                            <Image src={eye} alt="" className={styles.image} onClick={display}/>
                                        }
                                        {errors.password && <div className=" text-danger">{errors.password}</div>}
                                    </div>
                                    <div className={styles.password}>
                                        <p>Password strength:</p>
                                        <p>{progressStrength}</p>
                                    </div>
                                    <div
                                        className="progress"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={0}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                        >
                                        <div
                                            className={`progress-bar`}
                                            style={{
                                                width: `${progress}%`,
                                                backgroundColor: progressColor,
                                            }}
                                        ></div>
                                    </div>
                                    <div>
                                        <Image src={strong} alt="Strong password" />
                                        <span className="">Strong password must contain at least 8 characters, digits and uppercase letters.</span>
                                    </div>
                                    <div>
                                        <button type="submit" className={styles.signup} disabled={isLoading} >{isLoading ? "Signing up..." : "Sign Up"}</button>
                                    </div>
                                    <p className="text-center pt-2">Already have an account? <Link href="/signin" className={styles.login}>Log in</Link></p>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Image src={images} alt="" className={styles.images} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )}
export default Signup;