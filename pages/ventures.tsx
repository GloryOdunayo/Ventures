import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import styles from '../styles/Ventures.module.scss';
import phone from '../public/images/dashboard/call.png';
import website from '../public/images/dashboard/web.png';
import mail from '../public/images/dashboard/mail.png';
import { fetchUser } from './features/users/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import Link from 'next/link';

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const Ventures: React.FC = () => {
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
                <title>Venture Profile</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
                ></link>
            </Head>
            <div className="container-fluid">
                <Nav />
                <SideNav />
                <div className={styles.section}>
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between px-3">
                                <h4>My Ventures</h4>
                                <div className={styles.section__info__text}>
                                    <Link href='ventures/add' className={`btn text-decoration px-3 py-2 btn-outline-${styles.clr}`}><i className="fa fa-plus" aria-hidden="true"></i> Add venture</Link>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Ventures;