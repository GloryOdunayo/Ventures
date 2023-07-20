import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import eye from '../public/images/landingPage/Icon.png';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import styles from '../../styles/Profile.module.scss';
import profile from '../../public/images/dashboard/image change.png';
import Profile from '../../components/Profile';
import { fetchUser } from '.././features/users/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

interface FormValues {
    name: string;
    dob: string;
}
const validationSchema = yup.object().shape({
    password: yup.string().email('Invalid email address').required('Email is required'),
});

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const EmailNotification: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.users);
    React.useEffect(() => {
        dispatch(fetchUser())
    }, [])
    const [formValues, setFormValues] = useState<FormValues>({
        name: user.name,
        dob: user.dob
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        // e.preventDefault();
        // setIsLoading(true); 
        // axios.patch(`https://api.venturenation.co/api/v1/users/${email}`, formValues, {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }}
        // ).then((response: AxiosResponse) => {
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     setErrors(error.message);
        //     setIsLoading(false);
        // })
        // .finally(() => {
        //     setIsLoading(false);
        // })
    }

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Head>
                <title>Edit Email Notifications</title>
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
                                <div className="ps-5 shadows py-3">
                                    <h3>Email Notification</h3>
                                    <p style={{color: '#7E848E'}}>Customize the notifications you receive in your inbox.</p>
                                </div>
                                <div className="col-10 mx-auto mt-3">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-11">
                                                <h5>System Notifications</h5>
                                                <p style={{color: '#7E848E'}}>System update notifications and announcements made by the administrator</p>
                                            </div>
                                            <div className="form-group col-1">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-11">
                                                <h5>Group Notifications</h5>
                                                <p style={{color: '#7E848E'}}>Happenings and information passed across in the groups you belong to.</p>
                                            </div>
                                            <div className="form-group col-1">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-11">
                                                <h5>Reminders</h5>
                                                <p style={{color: '#7E848E'}}>Reminders on your courses, progress, and applications.</p>
                                            </div>
                                            <div className="form-group col-1">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-11">
                                                <h5>Chat Notifications</h5>
                                                <p style={{color: '#7E848E'}}>Chats from groups and communities you belong to.</p>
                                            </div>
                                            <div className="form-group col-1">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
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
export default EmailNotification;