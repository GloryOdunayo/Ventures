import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import styles from '../../styles/Signup.module.scss';
import { useState } from "react";
import logo from '../../public/images/landingPage/nav-logo.png';
import images from '../../public/images/landingPage/1.png'
import Link from 'next/link';
import mail from '../../public/images/dashboard/mail.png'
import { useRouter } from 'next/router';


const Confirm: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const nest =()=>{
        router.push('/pages/auth/passwordMail.tsx');
    }
    return (
        <>
            <Head>
                <title>Confirm mail</title>
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
                                    <h1>Forget Password?</h1>
                                    <p className={styles.txt}>No worries, we&apos;ll send reset instructions to you.</p>
                                </div>
                                <div className="text-center">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="email">Enter email address</label>
                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email address"/>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className={styles.signup} onClick={nest}>Next</button>
                                    <p>Back to Login</p>
                                </div>
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
export default Confirm;