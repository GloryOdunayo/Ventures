import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import styles from '../styles/Profile.module.scss';
import right from '../public/images/dashboard/arrow-right.png';
import left from '../public/images/dashboard/arrow-left.png';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
    const router = useRouter();
    const back=()=>{
        router.push("/profile")
    }
    return (
        <>
            <div className=''>
                <div className={styles.sidebar}>
                    <Image src={left} alt='' onClick={back} className='editImg'/>
                    <span className='edit'>Edit Profile</span>
                    <p className=''>Personalize and keep your profile up-to-date.</p>
                    <div className="d-flex justify-content-between">
                        <p>General</p>
                        <Image src={right} alt=''/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Password</p>
                        <Image src={right} alt=''/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Email Notifications</p>
                        <Image src={right} alt=''/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <p>Social Profiles</p>
                        <Image src={right} alt=''/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;