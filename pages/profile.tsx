import * as React from 'react'
import Nav from '../components/Nav'
import Head from 'next/head'
import Image from 'next/image'
import profile from '../public/images/dashboard/frame.png';
import image1 from '../public/images/dashboard/image 1.png';
import image2 from '../public/images/dashboard/image 2.png';
import styles from '../styles/User.module.scss'
import Link from 'next/link';
import SideNav from '../components/SideNav';
// import share from '../public/images/dashboard/share.png';
import phone from '../public/images/dashboard/call.png';
import website from '../public/images/dashboard/web.png';
import mail from '../public/images/dashboard/mail.png';
import location2 from '../public/images/dashboard/location2.png';
import team from '../public/images/dashboard/team.png';
import company from '../public/images/dashboard/company.png';
import company2 from '../public/images/dashboard/company2.png';
import { fetchUser } from './features/users/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { useRouter } from 'next/router';
import { capitalize } from 'lodash';
// let token: any;
let email:any;
if (typeof window !== "undefined") {
    // token = localStorage.getItem("token");
    email = localStorage.getItem('email');
}

const Profile: React.FC = () => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(state => state.user.loading);
    const user = useAppSelector(state => state.user.users);
    const social = useAppSelector(state => state.user.users.socials);
    const router = useRouter();
    // let dateOfBirth:any = user.dob.toLocaleDateString();

    React.useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const venture = ()=>{
        console.log('venture');
        
        router.push('/venture')
    }
    
    const dateOfBirth = new Date (user.dob).toDateString();
    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="container-fluid">
                <Nav />
                <SideNav />
                <div className={styles.section}>
                    <div className="row">
                        <div className="col-lg-9 mb-4">
                            <div className={styles.section__info}>
                                <div className="p-2">
                                    <div className={styles.section__info__profile}>
                                        <div className='ps-3'>
                                            {
                                                // eslint-disable-next-line @next/next/no-img-element
                                                user.avatar ? <img src={user.avatar} alt='Profile Image' className={styles.section__info__profile__image} /> :
                                                <Image src={profile} alt='Profile Image' className={styles.section__info__profile__image} />
                                            }
                                        </div>
                                    </div>
                                </div> 
                                <div className="float-end pe-3 d-flex">
                                    <div className={styles.section__info__text}>
                                        <Link href='/profile/edit' className={`btn text-decoration px-3 py-2 btn-outline-${styles.clr}`}><i className="fa fa-edit" aria-hidden="true"></i> Edit Profile</Link>
                                    </div>
                                    <div className={styles.section__info__text}>
                                        <Link href='/profile/share' className={`btn text-decoration px-3 py-2 btn-outline-${styles.clr}`}><i className="fa-regular fa-share-from-square" aria-hidden="true"></i> Share Profile</Link>
                                    </div>
                                </div>
                                <div className="px-4 pt-4">
                                    <br />
                                    <h5 className="">{user.name}</h5>
                                    <p className="">{user.email}</p>
                                    {user.bio && <p className="">{user.bio}</p>}
                                    <div className="d-flex">
                                        {user.nationality && 
                                            <div className="d-flex me-4">
                                                <p><i className="fa fa-location-dot" aria-hidden="true" style={{color: '#5A27D5'}}></i> {user.nationality}</p>
                                            </div>
                                        }
                                        {user.dob &&
                                            <div className="d-flex me-4">
                                                <p> <i className="fa fa-calendar" aria-hidden="true" style={{color: '#5A27D5'}}></i> {dateOfBirth.slice(4,)}</p>
                                            </div>
                                        }
                                        {user.gender &&
                                            <div className="d-flex">
                                                <p> <i className="fa fa-transgender-alt" aria-hidden="true" style={{color: '#5A27D5'}}></i> {capitalize(user.gender)}</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="row">
                                        <h4>Skills</h4>
                                        <div className={styles.skill}>
                                            {user.skills && user.skills.map((skill: any, index: number) => (
                                                <div className="me-2" key={index}>
                                                    <p className={styles.skills}>{skill}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-lg-5 mt-sm-3">
                                    <div className={styles.section__info__end}>
                                        <div className={styles.section__info__end__header}>
                                            <div className="d-flex justify-content-between">
                                                <h5>My Ventures</h5>
                                                <div className="float-end pe-3">
                                                    <div className={styles.section__info__text}>
                                                        <Link href='ventures/add' className={`btn px-3 py-2 text-decoration btn-outline-${styles.clr}`}><i className="fa fa-plus" aria-hidden="true"></i> Add Ventures</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between px-4">
                                            <div className="col-md-4 col-sm-6 shadows ps-4" onClick={venture}>
                                                <Image src={image2} alt='venture banner' className={styles.section__info__end__venture} />
                                                <Image src={company} alt='venture logo' className={styles.section__info__end__venture__logo}/>
                                                <h4 className={styles.venture__text}>Venture Name</h4>
                                                <p className={styles.venture__text__p}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, eos ex dolor accusamus eaque omnis</p>
                                                <div className={styles.icons}>
                                                    <div className="d-flex me-4">
                                                        <Image src={location2} alt='location icon' className='mt-2'/>
                                                        {user.nationality ? <p className='pt-1'>{user.nationality}</p> : <p className='pt-1'>Lagos, Nigeria</p>}
                                                    </div>
                                                    <div className="d-flex">
                                                        <Image src={team} alt='team icon' className='mt-2'/> <span className='pt-1'>18 Team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6 shadows ps-3 pe-3" onClick={venture}>
                                                <Image src={image2} alt='venture banner' className={styles.section__info__end__venture} />
                                                <Image src={company} alt='venture logo' className={styles.section__info__end__venture__logo}/>
                                                <h4 className={styles.venture__text}>Venture Name</h4>
                                                <p className={styles.venture__text__p}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, eos ex dolor accusamus eaque omnis</p>
                                                <div className={styles.icons}>
                                                    <div className="d-flex me-4">
                                                        <Image src={location2} alt='location icon' className='mt-2'/>
                                                        {user.nationality ? <p className='pt-1'>{user.nationality}</p> : <p className='pt-1'>Lagos, Nigeria</p>}
                                                    </div>
                                                    <div className="d-flex">
                                                        <Image src={team} alt='team icon' className='mt-2'/> <span className='pt-1'>18 Team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6 shadows pe-4" onClick={venture}>
                                                <Image src={image1} alt='venture banner' className={styles.section__info__end__venture} />
                                                <Image src={company2} alt='venture logo' className={styles.section__info__end__venture__logo}/>
                                                <h4 className={styles.venture__text}>Venture Name</h4>
                                                <p className={styles.venture__text__p}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum, eos ex dolor accusamus eaque omnis</p>
                                                <div className={styles.icons}>
                                                    <div className="d-flex me-4">
                                                        <Image src={location2} alt='location icon' className='mt-2'/>
                                                        {user.nationality ? <p className='pt-1'>{user.nationality}</p> : <p className='pt-1'>Lagos, Nigeria</p>}
                                                    </div>
                                                    <div className="d-flex">
                                                        <Image src={team} alt='team icon' className='mt-2'/> <span className='pt-1'>18 Team members</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={styles.profile}>
                                <div className="shadows p-3 mt-3">
                                    <div className=''>
                                        <div className={styles.section__session__header}>
                                            <h5>Contact Info</h5>
                                        </div>
                                        <div className={styles.section__session__body}>
                                            {
                                                user.phone?
                                                <div className="p-2 px-4">
                                                    <Image src={phone} alt='phone icon'/> <span className='text-dark ps-1'>Phone</span>
                                                    <div className="d-flex justify-content-between">
                                                        <p className='ps-4'> {user.phone ? user.phone : '(+234) 809 000 0000'} </p>
                                                    </div>
                                                </div>:""
                                            }
                                            {
                                                user.website?
                                                <div className="p-2 px-4">
                                                    <Image src={website} alt='phone icon'/> <span className='text-dark ps-1'>Website</span>
                                                    <div className="d-flex justify-content-between">
                                                        <p className='ps-4'> {user.website ? user.website : 'samplewebsite.com'} </p>
                                                    </div>
                                                </div>:""
                                            }
                                            {
                                                user.email?
                                                <div className="p-2 px-4 mb-3">
                                                    {/* <span><i className="fa-regular fa-envelope"></i></span> */}
                                                    <Image src={mail} alt='phone icon'/> <span className='text-dark ps-1'>Email address</span>
                                                    <div className="d-flex justify-content-between">
                                                        <p className='ps-4'> {user.email} </p>
                                                    </div>
                                                </div>:""
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-2 shadows">
                                    <div className={styles.section__end}>
                                        <div className={styles.section__session__header}>
                                            <h5>Socials</h5>
                                        </div>
                                            <div className={styles.section__session__body}>
                                                <div className="">
                                                    {
                                                        social.linkedin?
                                                        <div className='pb-4'>
                                                            <div className="d-flex">
                                                            {/* <Image src={linkedIn} alt='Linkedln icon'/> */}
                                                                <div className="text-white px-2 py-1 rounded-1" style={{
                                                                    backgroundColor: '#3B5998'
                                                                }}>
                                                                    <i className="fa fa-linkedin" aria-hidden="true"></i>   
                                                                </div>
                                                                <div className='ps-3 pt-1'>
                                                                    <p className='mb-0'>LinkedIn</p>
                                                                </div>
                                                                    
                                                            </div>
                                                            <Link href={social.linkedin.includes('https://')? `${social.linkedin}` :`https://${social.linkedin}`} className='text-decoration ps-5'>view likened profile <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                                                        </div>
                                                        :""
                                                    }
                                                    {
                                                        social.twitter?
                                                        <div className='pb-4'>
                                                            <div className="d-flex">
                                                            {/* <Image src={linkedIn} alt='Linkedln icon'/> */}
                                                                <div className="text-white px-2 py-1 rounded-1 bg-info">
                                                                    <i className="fa fa-twitter" aria-hidden="true"></i>   
                                                                </div>
                                                                <div className='ps-3 pt-1'>
                                                                    <p className='mb-0'>Twitter</p>
                                                                </div>
                                                                    
                                                            </div>
                                                            <Link href={social.twitter.includes('https://')? `${social.twitter}` :`https://${social.twitter}`}  className='text-decoration ps-5'>view twitter profile <i className="fa-solid fa-arrow-up-right-from-square"></i></Link> 
                                                        </div>
                                                        :""
                                                    }
                                                    {
                                                        social.instagram?
                                                        <div className='pb-4'>
                                                            <div className="d-flex">
                                                            {/* <Image src={linkedIn} alt='Linkedln icon'/> */}
                                                                <div className="text-white px-2 py-1 rounded-1" style={{
                                                                    background: 'radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf)',
                                                                }}>
                                                                    <i className="fa fa-instagram" aria-hidden="true"></i>   
                                                                </div>
                                                                <div className='ps-3 pt-1'>
                                                                    <p className='mb-0'>Instagram</p>
                                                                </div>
                                                                    
                                                            </div>
                                                            <Link href={social.instagram.includes('https://')? `${social.instagram}` :`https://${social.instagram}`} className='text-decoration ps-5'>view instagram profile <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                                                        </div>: ""
                                                    }
                                                    {
                                                        social.facebook?
                                                        <div className='pb-4'>
                                                            <div className="d-flex">
                                                            {/* <Image src={linkedIn} alt='Linkedln icon'/> */}
                                                                <div className="text-white px-2 py-1 rounded-1" style={{
                                                                    backgroundColor: '#3B5998'
                                                                }}>
                                                                    <i className="fa fa-linkedin" aria-hidden="true"></i>   
                                                                </div>
                                                                <div className='ps-3 pt-1'>
                                                                    <p className='mb-0'>Facebook</p>
                                                                </div>
                                                                    
                                                            </div>
                                                            <Link href={social.facebook.includes('https://')? `${social.facebook}` :`https://${social.facebook}`} className='text-decoration ps-5'>view facebook profile <i className="fa-solid fa-arrow-up-right-from-square"></i></Link>
                                                        </div>:""
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default Profile;