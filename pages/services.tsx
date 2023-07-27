import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import Nav from '../components/Nav';
import styles from '../styles/EditVenture.module.scss';
import { fetchUser } from './features/users/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const Services: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.users);
    const social = useAppSelector(state => state.user.users.socials);
    React.useEffect(() => {
        dispatch(fetchUser())
    }, [])
    

    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Head>
                <title>Upcoming Sessions</title>
            </Head>
            <Nav />
            <div className={styles.section}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <div className={styles.service}>
                                <div className="col-6">
                                    <h3>Connect to Expert Support for your Business Needs.</h3>
                                    <p>Find coaches, life-long mentorship, or expert services on a contract basis to meet any of your business needs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Services;