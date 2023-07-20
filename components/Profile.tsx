import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import styles from '../styles/Profile.module.scss';
import right from '../public/images/dashboard/arrow-right.png';
import left from '../public/images/dashboard/arrow-left.png';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Profile: React.FC = () => {
    const router = useRouter();
    const back=()=>{
        router.push("/profile")
    }
    return (
        <>
            <div className=''>
                <div className={styles.sidebar}>
                    <div className={styles.pad}>
                        <Image src={left} alt='' onClick={back} className='editImg'/>
                        <span className='edit'>Edit Profile</span>
                        <p className='pt-2' style={{
                            color: '#7E848E'
                        }}>Personalize and keep your profile up-to-date.</p>
                    </div>

                    <div className={`text-decoration-none ${
                        router.pathname === '/profile/edit' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href="/profile/edit" className={`text-decoration-none ${
                            router.pathname === '/profile/edit' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p className=''>General</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                    <div className={`text-decoration-none ${
                        router.pathname === '/profile/password' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href='/profile/password' className={`text-decoration-none ${
                            router.pathname === '/profile/password' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p>Password</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                    <div className={`text-decoration-none ${
                        router.pathname === '/profile/email' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href='/profile/email' className={`text-decoration-none ${
                            router.pathname === '/profile/email' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p>Email Notifications</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                    <div className={`text-decoration-none ${
                        router.pathname === '/profile/social' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href='/profile/social' className={`text-decoration-none ${
                            router.pathname === '/profile/social' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p>Social Profiles</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile;