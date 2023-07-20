import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import styles from '../styles/Profile.module.scss';
import { fetchUser } from './features/users/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const UpcomingSessions: React.FC = () => {
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
            <SideNav/>
            <div className={styles.section}>
                <div className="container-fluid">
                    <div className="">
                        <div className="row justify-content-center">
                            <h3>Upcoming Sessions</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UpcomingSessions;