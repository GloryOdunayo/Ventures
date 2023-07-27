import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import styles from '../styles/Profile.module.scss';
import right from '../public/images/dashboard/arrow-right.png';
import left from '../public/images/dashboard/arrow-left.png';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Venture: React.FC = () => {
    const router = useRouter();
    
    const back=()=>{
        router.push(`/ventures/${router.query.id}`);
    }
    return (
        <>
            <div className=''>
                <div className={styles.sidebar}>
                    <div className={styles.pad}>
                        <Link href={`/ventures/${router.query.id}`}><Image src={left} alt='' onClick={back} className='editImg'/></Link>
                        {/* <Image src={left} alt='' onClick={back} className='editImg'/> */}
                        <span className='edit'>Edit Venture</span>
                        <p className='pt-2' style={{
                            color: '#7E848E'
                        }}>Personalize and keep your Venture up-to-date.</p>
                    </div>

                    <div className={`text-decoration-none ${
                        router.pathname === '/Venture/edit' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href="/Venture/edit" className={`text-decoration-none ${
                            router.pathname === '/Venture/edit' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p className=''>General</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                    <div className={`text-decoration-none ${
                        router.pathname === '/Venture/overview' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href='/Venture/overview' className={`text-decoration-none ${
                            router.pathname === '/Venture/overview' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p>Overview</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                    <div className={`text-decoration-none ${
                        router.pathname === '/Venture/team' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href='/Venture/team' className={`text-decoration-none ${
                            router.pathname === '/Venture/team' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p>Team members</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                    <div className={`text-decoration-none ${
                        router.pathname === '/Venture/social' && 'active' ? 'activePro' : 'activeProNot'
                    }`}>
                        <Link href='/Venture/social' className={`text-decoration-none ${
                            router.pathname === '/Venture/social' && 'active' ? 'activePro' : 'activeNt'
                        }`}>
                            <div className="d-flex justify-content-between px-3 pt-3">
                                <p>Social profiles</p>
                                <Image src={right} alt=''/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Venture;