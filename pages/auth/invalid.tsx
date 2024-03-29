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


const Invalid: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <Head>
                <title>Invalid mail</title>
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
                                    <h1>Mail verification invalid</h1>
                                </div>
                                <div className="text-center">
                                    <Image src={mail} alt='mail icon'/>
                                </div>
                                <p>We are unable to find a user associated with this token. It is possible that the token has expired.</p>
                                <div className="text-center">
                                    <button className={styles.signup} disabled={isLoading}>Click to resend</button>
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
export default Invalid;