import * as React from 'react'
import Nav from '../components/Nav'
import Head from 'next/head'
import Image from 'next/image'
import complete from '../public/images/dashboard/Checkbox.png';
import communities from '../public/images/dashboard/communities.png';
import progress from '../public/images/dashboard/course.png';
import calender from '../public/images/dashboard/calendar.png';
import clock from '../public/images/dashboard/clock.png';
import strength from '../public/images/dashboard/strength.png';
import learn from '../public/images/dashboard/learn.png';
import time from '../public/images/dashboard/time.png';
import learnings from '../public/images/dashboard/learning.png';
import left from '../public/images/dashboard/left.png';
import right from '../public/images/dashboard/right.png';
import image1 from '../public/images/dashboard/image 1.png';
import image2 from '../public/images/dashboard/image 2.png';
import image3 from '../public/images/dashboard/image 3.png';
import love from '../public/images/dashboard/Vector.png';
import styles from '../styles/Dashboard.module.scss'
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import SideNav from '../components/SideNav';
import urban from '../public/images/dashboard/urban.png';
import wild from '../public/images/dashboard/wild.png';
import home from '../public/images/dashboard/home.png';
import { useAppDispatch, useAppSelector } from './hooks';
import { useRouter } from 'next/router';
import { fetchCourse } from './features/courses/courseSlice';

let token: any;
let email: any
if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
    email = localStorage.getItem('email')
}

const Dashboard: React.FC = () => {
    // const dispatch = useAppDispatch();
    // const isLoading = useAppSelector(state => state.course.loading);
    // const course = useAppSelector(state => state.course.courses);
    const router = useRouter();
    const [course, setCourse] = React.useState<any>([]);
    const [completed, setCompleted] = React.useState<any>([]);

    // React.useEffect(() => {
    //     dispatch(fetchCourse())
    //     console.log(course);
    // }, [])

    React.useEffect(()=>{
        axios.get(`https://api.venturenation.co/api/v1/users/${email}/courses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response)=>{
            // console.log(response.data.data);
            setCourse(response.data.data);
        });
        if(course.length !== 0){
            course.map((data: { slug: string; })=>{
                // console.log(data.slug);
                axios.get(`https://api.venturenation.co/api/v1/users/${email}/course/${data.slug}/has-completed-course`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response)=>{
                    // console.log(response.data.data);
                    setCompleted(response.data.data)
                }).catch((error)=>{
                    console.log(error);
                }
                )
            })
        }
    },[])

    const add=(e:any)=>{
        console.log(e);
    }

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="container-fluid">
                <Nav />
                <SideNav />
                <div className={styles.section}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={styles.section__info}>
                                <div className={styles.section__info__title}>
                                    <div className={styles.section__info__header}>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="d-flex shadow-sm ps-3 pt-3 bg-white">
                                                    <div className="pe-2">
                                                        <Image src= {complete} alt=""/>
                                                    </div>
                                                    <div className="">
                                                        <h6>Completed</h6>
                                                        <p className='course'>{completed? completed.length:0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="d-flex shadow-sm ps-3 pt-3 bg-white">
                                                    <div className="pe-2">
                                                        <Image src= {progress} alt=""/>
                                                    </div>
                                                    <div className="">
                                                        <h6>Course in Progress</h6>
                                                        <p className='course'>{course? course.length : 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="d-flex shadow-sm ps-3 pt-3 bg-white">
                                                    <div className="pe-2">
                                                        <Image src= {communities} alt=""/>
                                                    </div>
                                                    <div className="">
                                                        <h6>Total Communities</h6>
                                                        <p className='course'>27</p>
                                                    </div>
                                                </div>                                  
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white mt-4">
                                        <div className={styles.section__info__body}>
                                            <div className={styles.section__info__body__header}>
                                                <div className="d-flex justify-content-between">
                                                    <h5>Course in Progress</h5>
                                                    <div className="d-flex">
                                                        <Image src={right} alt='Arrow Left' />
                                                        <Image src={left} alt='Arrow Right' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row px-4">
                                                {                                                  
                                                    course?.map((data: { creator: React.ReactNode; image: string | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; },i: React.Key | null | undefined| number)=>{
                                                        return (
                                                            <div className="col-md-4 col-sm-6" key={i}>
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                <img src={data.image} alt="" className='card-img-top' height={150} />
                                                                {/* <Image src={learn} className="card-img-top" alt="..." /> */}
                                                                <div className="card-body">
                                                                    <h6 className="card-title pt-3 pb-2">{data.title}</h6>
                                                                    <p className="card-text">{data.creator}</p>
                                                                    <Image src={strength} alt="Progress bar" style={
                                                                        {
                                                                            width : '100%'
                                                                        }
                                                                    }/>
                                                                    <div className="d-flex justify-content-between">
                                                                        <p>Your Progress</p>
                                                                        <p>37%</p>
                                                                    </div>
                                                                <a href="#" className='text-decoration-none float-end'>Rate this course</a>
                                                            </div>
                                                        </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="bg-white ms-3">
                                    <div className={styles.section__info__end}>
                                        <div className={styles.section__info__end__header}>
                                            <div className="d-flex justify-content-between">
                                                <h5>Recommended Course</h5>
                                                <div className="d-flex">
                                                    <Image src={right} alt='Arrow Left' />
                                                    <Image src={left} alt='Arrow Right' />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 col-sm-6 ps-4">
                                                <Image src={image1} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h6 className="card-title pt-3">Understanding your target customers. </h6>
                                                    <p className="card-text">Venture Nation.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex">
                                                            <Image src={calender} alt="Calender" />
                                                            <p>8 Lessons</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <Image src={clock} alt="Clock" />
                                                            <p>18 Hours</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className=''>Free</p>
                                                        <Image src={love} alt='Favorite icon' />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6 ps-3 pe-3">
                                                <Image src={image2} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h6 className="card-title pt-3">Understanding your target customers. </h6>
                                                    <p className="card-text">Venture Nation.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex">
                                                            <Image src={calender} alt="Calender" />
                                                            <p>8 Lessons</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <Image src={clock} alt="Clock" />
                                                            <p>18 Hours</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className=''>Free</p>
                                                        <Image src={love} alt='Favorite icon' onClick={(e)=>add(1)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6 pe-4">
                                                <Image src={image3} className="card-img-top" alt="..." />
                                                <div className="card-body">
                                                    <h6 className="card-title pt-3">Understanding your target customers. </h6>
                                                    <p className="card-text">Venture Nation.</p>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex">
                                                            <Image src={calender} alt="Calender" />
                                                            <p>8 Lessons</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <Image src={clock} alt="Clock" />
                                                            <p>18 Hours</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className=''>Free</p>
                                                        <Image src={love} alt='Favorite icon' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-8 mx-auto">
                            <div className="bg-white me-3">
                                <div className={styles.section__session}>
                                    <div className={styles.section__session__header}>
                                        <h6 className='mt-2'>Upcoming sessions</h6>
                                    </div>
                                    <div className={styles.section__session__body}>
                                        <div className="p-2 shadows px-4 mb-4">
                                            <h6>Mentorship with <span>Gilda Charles</span></h6>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex">
                                                    <Image src={calender} alt='calender'/>
                                                    <p className='tym'>Wed, Jun 28</p>
                                                </div>
                                                <div className="d-flex">
                                                    <Image src={clock} alt='clock'/>
                                                    <p className='tym'>3:00 pm WAT</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 shadows px-4 mb-4">
                                            <h6>Mentorship with <span>James Mary</span></h6>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex">
                                                    <Image src={calender} alt='calender'/>
                                                    <p className='tym'>Wed, Jun 28</p>
                                                </div>
                                                <div className="d-flex">
                                                    <Image src={clock} alt='clock'/>
                                                    <p className='tym'>3:00 pm WAT</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 shadows px-4 mb-2">
                                            <h6>Mentorship with <span>Travis Crosby</span></h6>
                                            <div className="d-flex justify-content-between">
                                                <div className="d-flex">
                                                    <Image src={calender} alt='calender'/>
                                                    <p className='tym'>Wed, Jun 28</p>
                                                </div>
                                                <div className="d-flex">
                                                    <Image src={clock} alt='clock'/>
                                                    <p className='tym'>3:00 pm WAT</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.btn}>
                                            <button className="btn">View all Coaching Sessions</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white me-3">
                                <div className={styles.section__end}>
                                        <div className={styles.section__session__header}>
                                            <h6>Communities</h6>
                                        </div>
                                        <div className={styles.section__session__body}>
                                            <div className="px-3">
                                                    <div className="d-flex mb-3 shadows">
                                                        <Image src={urban} alt='Urban communities'/>
                                                        <div>
                                                            <p className='ps-2'>UrbanCommunity</p>
                                                            <p className='ps-2'>325 Members</p>
                                                        </div>
                                                    </div>
                                                <div>
                                                </div>
                                                    <div className="d-flex mb-3 shadows">
                                                        <Image src={wild} alt='Wild Ones'/>
                                                        <div>
                                                            <p className='ps-2'>Wild Ones</p>
                                                            <p className='ps-2'>2.4k Members</p>
                                                        </div>
                                                    </div>
                                                <div>
                                                </div>
                                                    <div className="d-flex mb-2 shadows">
                                                        <Image src={home} alt='Home Protectors'/>
                                                        <div>
                                                            <p className='ps-2'>Home Protectors</p>
                                                            <p className='ps-2'>375 Members</p>
                                                        </div>
                                                    </div>
                                                <div>
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
export default Dashboard;