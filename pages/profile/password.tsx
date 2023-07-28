import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import eye from '../../public/images/dashboard/eye.png';
import eyeslash from '../../public/images/dashboard/eyeslash.png';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import styles from '../../styles/Profile.module.scss';
import strong from '../../public/images/landingPage/strong.png';
import Profile from '../../components/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchUser } from '../redux/userSlide';
import { RootState } from '../redux/store';
import { User } from '../redux/types';

interface FormValues {
    currentPassword: string;
    password: string;
    confirmPassword: string;
}
const validationSchema = yup.object().shape({
    currentPassword: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required("Password is required")
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
    confirmPassword: yup.string().email('Invalid email address').required('Email is required'),
});

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const EditPassword: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const [show, setShow] = useState(false);
    const [shows, setShows] = useState(false);
    const [progressColor, setProgressColor] = useState<string>("#DC2626");
    const [progressStrength, setProgressStrength] = useState<string>("Weak");
    const [progress, setProgress] = useState<number>();
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector<RootState, User>((state) => state.user.users);
    React.useEffect(() => {
        dispatch(fetchUser())
    }, [])
    const [formValues, setFormValues] = useState<FormValues>({
        currentPassword: "",
        password: "",
        confirmPassword: "",
    });
    const validationSchema = yup.object({
        password: yup.string().required('Password is required')
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
        confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match the new password')
        .required('Confirm Password is required'),
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        errors.password = []
        errors.currentPassword = []
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
            const progress = Math.floor(
                (fulfilledConditions.length / validationConditions.length) * 100
            );
    
            setProgress(progress);
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
    const display = () => {
        setShow(!show);
    }
    const displays = () => {
        setShows(!shows);
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 
        validationSchema.validate(formValues, { abortEarly: false }).then(() => {
            axios.post(`https://api.venturenation.co/api/v1/auth/change-password`, formValues, {
            headers: {
                Authorization: `Bearer ${token}`,
            }}
            ).then((response: AxiosResponse) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data.errors[0].message);
                setErrors(error.response.data.errors[0].message);
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            })
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

    if (!user) {
        return <div>Loading...</div>; // Display loading indicator while fetching user data
    }
    return (
        <>
            <Head>
                <title>Edit Password</title>
            </Head>
            <Nav />
            <SideNav/>
            <div className={styles.section}>
                <div className="container-fluid">
                    <div className="">
                        <div className="row justify-content-center">
                            <div className='col-4'>
                                <Profile/>
                            </div>
                            <div className="col-7 shadows p-0">
                                <div className="px-5 shadows py-3 mb-3">
                                    <h3>Password</h3>
                                    <p style={{color: '#7E848E'}}>Manage your account password.</p>
                                </div>
                                <div className="col-10 mx-auto">
                                    {errors && <p className='text-danger'>{errors}</p>}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-4">
                                            <label htmlFor="currentPassword" className='form-label'>Old Password</label>
                                            <input type="password" className="form-control" name="currentPassword" id="currentPassword" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.currentPassword} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="form-label">New Password</label>
                                            {show?
                                                <input type="text" className="form-control" name="password" id="password" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.password} onChange={handleInputChange} /> 
                                                :
                                                <input type="password" className="form-control" name="password" id="password" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.password} onChange={handleInputChange} />
                                            }
                                            {show?
                                                <Image src={eyeslash} alt="" className={styles.image} onClick={display}/>:
                                                <Image src={eye} alt="" className={styles.image} onClick={display}/>
                                            }
                                            {errors.password && <div className=" text-danger" style={{
                                                marginTop: '-1.5rem'
                                            }}>{errors.password}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                            {shows?
                                                <input type="text" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.confirmPassword} onChange={handleInputChange} /> 
                                                :
                                                <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="&#42;&#42;&#42;&#42;&#42;&#42;&#42;&#42;" value={formValues.confirmPassword} onChange={handleInputChange} />
                                            }
                                            {shows?
                                                <Image src={eyeslash} alt="" className={styles.image} onClick={displays}/>:
                                                <Image src={eye} alt="" className={styles.image} onClick={displays}/>
                                            }
                                            {errors.confirmPassword && <div className=" text-danger" style={{
                                                marginTop: '-1.5rem'
                                            }}>{errors.confirmPassword}</div>}
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
                                            <button type="submit" className={styles.signup} disabled={isLoading} >{isLoading ? "Updating..." : "Update"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditPassword;