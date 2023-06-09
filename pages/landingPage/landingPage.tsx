import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import image1 from '../../public/images/landingPage/Group frame.png'
import image2 from '../../public/images/landingPage/gifs/https___lottiefiles.com_91955-social-media-network.gif';
import image3 from '../../public/images/landingPage/gifs/https___lottiefiles.com_137681-networking (2).gif';
import image4 from '../../public/images/landingPage/gifs/https___lottiefiles.com_98297-book-idea.gif';
import icon1 from '../../public/images/landingPage/icon1.png';
import icon2 from '../../public/images/landingPage/icon2.png';
import icon3 from '../../public/images/landingPage/icon3.png';
import icon4 from '../../public/images/landingPage/icon4.png';
import logo from '../../public/images/landingPage/logo.png';
import twitter from '../../public/images/landingPage/twitter.png';
import facebook from '../../public/images/landingPage/facebook.png';
import linkedln from '../../public/images/landingPage/linkedln.png';
import instagram from '../../public/images/landingPage/instagram.png';
import { useState } from "react";
import MyComponent from '../../components/MyComponent';
import Navbar from '../../components/NavBar';
type Props = {
    // savePost: (e: React.FormEvent, formData: IPost) => void
    content: string;
    image: string;
}
const LandingPage: React.FC<Props> = () => {
    const [selectedButton, setSelectedButton] = useState<string>("Button 1");
    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    };

    return (
        <>
            <Head>
                <title>Landing Page</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
                ></link>
            </Head>
            <Navbar />
            <div className="bg-light text-dark">
                <div className="col-10 row justify-content-between mx-auto py-5">
                    <div className="col-lg-6 col-sm-10 py-3 position-sticky top-0">
                        <h1>Venture Nation!<br/> Where ventures meet <span style={{color: "#5A27D5"}}>resources.</span></h1>
                        <p className='fs-5'>At Venture Nation, we believe in the potential of business enterprises to shape a better future. We are a dynamic and inclusive platform dedicated to supporting entrepreneurs, startups, and investors in their journey to success.</p>
                        <button className="btn py-2 ps-3 text-white" style={{ backgroundColor: "#5A27D5"}}>Venture with us</button>
                    </div>
                    <div className="col-lg-4 venture">
                        <Image src={image1} height={300} alt="venture"/>
                    </div>
                </div>
            </div>
            <div className='bg-light'>
                <div className="col-10 ms-5 pb-5">
                    <div className='text-dark ms-5 ps-2 col-lg-7 col-sm-10'>
                        <h3>Discover, Connect and Grow</h3>
                        <p>We&apos;re a dynamic platform connecting ambitious founders with the resources, expertise, and networks they need to bring their visions to life.</p>
                    </div>
                </div>
                <div className='ps-5 py-5 bground row col-10 mx-auto mb-5'>
                    <div className="row">
                        <div className='col-lg-4 col-sm-12 ms-5 py-5'>
                            <h2>Extensive Network</h2>
                            <p className='fs-5'>Gain access to a vast network of like-minded individuals, industry experts, mentors, and potential investors.</p>
                        </div>
                        <div className='col-lg-5 col-sm-10 text-end ms-lg-5 ps-lg-5'>
                            <Image src={image2} width={250} alt='Extensive Network image' className=''/>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 justify-content-between mx-auto col-10 pb-5">
                    <div className='col-lg-5 col-sm-7 text-center border rounded-2 text-dark me-3 p-5' style={{background: "#EDF5FE"}}>
                        <h3>Curated Opportunities</h3>
                        <p>We offer a robust pipeline of high-potential startups across various industries ensuring you find the perfect match for your investment portfolio.</p>
                        <Image src={image3} width={200} alt='Curated opportunity image' className=''/>
                    </div>
                    <div className="text-white text-center col-lg-5 col-sm-7 border rounded-2 p-5" style={{background: "#4198F7"}}>
                        <h3>Knowledge Sharing</h3>
                        <p>Access valuable resources, educational content, and thought leadership pieces from industry pioneers.</p>
                        <Image src={image4} width={200} alt='Knowledge sharing image'/>
                    </div>
                </div>
            </div>
            <div className='bg-light'>
                <div className="text-center text-dark p-5 justify-content-center">
                    <h3>Explore Venture Nation</h3>
                    <p className='col-lg-6 col-sm-12 mx-auto'>Fuel your venture&apos;s success with our comprehensive suite of features and services designed to empower you at every step of your journey.</p>
                </div>
                <div className='border rounded-2 col-lg-10 col-sm-12 mx-auto p-5 mb-5' style={{background: "#EDF5FE"}}>
                <div className=''>
                    <button className='btn me-2' onClick={() => handleButtonClick("Button 1")} style={{
                        background: selectedButton === "Button 1" ? "#5A27D5" : "#EDF5FE",
                        color: selectedButton === "Button 1" ? "white" : "black",
                    }}>Learning Hub</button>
                    <button className='btn me-2' onClick={() => handleButtonClick("Button 2")}
                    style={{
                        background: selectedButton === "Button 2" ? "#5A27D5" : "#EDF5FE",
                        color: selectedButton === "Button 2" ? "white" : "black",
                    }} >Resources Hub</button>
                    <button className='btn me-2' onClick={() => handleButtonClick("Button 3")}
                    style={{
                        background: selectedButton === "Button 3" ? "#5A27D5" : "#EDF5FE",
                        color: selectedButton === "Button 3" ? "white" : "black",
                    }}>Programs and Events</button>
                    <button className='btn me-2' onClick={() => handleButtonClick("Button 4")}style={{
                        background: selectedButton === "Button 4" ? "#5A27D5" : "#EDF5FE",
                        color: selectedButton === "Button 4" ? "white" : "black",
                    }}>Coaching services</button>
                    <button className='btn' onClick={() => handleButtonClick("Button 5")}style={{
                        background: selectedButton === "Button 5" ? "#5A27D5" : "#EDF5FE",
                        color: selectedButton === "Button 5" ? "white" : "black",
                    }}>Community</button>
                    <MyComponent selectedButton={selectedButton}/>
                    </div>
                </div>
                <div className="started px-4 py-5">
                    <div className="pb-4 row justify-content-center">
                        <h3 className="col-10">Get Started</h3>
                        <div className="account col-10">
                            <div className="text-dark p-3">
                                <Image src={icon1} width={30} alt="" />
                                <h5>Create an account</h5>
                                <p>We only ask for your name, email, and password</p>
                                <button className="btn px-2 text-white" style={{backgroundColor: "#5A27D5"}}>Venture with us</button>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between mx-auto text-dark col-10">
                        <div className="col-lg-3 col-sm-8 bg-light rounded-2 mt-2 pt-2">
                            <Image src={icon2} width={30} alt=""/>
                            <h5 className='mt-2'>Create Your Profile</h5>
                            <p>Create a simple profile that tells us about you and your ventures.</p>
                        </div>
                        <div className="col-lg-3 col-sm-8 bg-light rounded-2 mt-2 pt-2">
                        <Image src={icon3} width={30} alt="" />
                            <h5 className='mt-2'>Assess Your Venture</h5>
                            <p>Embark on a strategic journey of consistent growth with our expert recommendations.</p>
                        </div>
                        <div className="col-lg-3 col-sm-8 bg-light rounded-2 mt-2 pt-2">
                        <Image src={icon4} width={30} alt="" />
                            <h5 className='mt-2'>Grow your venture</h5>
                            <p>Leverage our curated resources, expert services, and explore investment opportunities.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-dark py-5 pb-2">
                    <div className="my-5 pb-5">
                        <h1 className="text-white text-center">Start building with venture nation</h1>
                        <p className="text-white col-lg-5 col-sm-8 text-center mx-auto">Join our community of entrepreneurs, investors, and industry experts to gain access to a wealth of resources and opportunities.</p>
                        <div className="text-center">
                            <button className="btn px-2 text-white" style={{backgroundColor: "#5A27D5"}}>Venture with us</button>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="bg-dark ps-lg-5 row justify-content-around">
                    <div className="row ms-lg-5 ps-lg-5">
                        <div className="col-2 d-flex">
                            <Image src={logo} alt='logo' />
                            <span>Venture</span>
                        </div>
                        <div className="col-4">
                            <p>© 2023 Venture nation. All rights reserved.</p>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className='col-2 d-flex'>
                                    <Image src={twitter} alt='Twitter icon' width={20} className='pt-2'/>
                                    <span>Twitter</span>
                                </div>
                                <div className='col-2 d-flex'>
                                    <Image src={linkedln} alt='Linkedln icon' width={20} className='pt-2'/>
                                    <span>Linkedln</span>
                                </div>
                                <div className='col-2 d-flex'>
                                    <Image src={facebook} alt='Facebook icon' width={12} className='pt-2' />
                                    <span>Facebook</span>
                                </div>
                                <div className='col-2 d-flex'>
                                    <Image src={instagram} alt='Instagram icon' width={20} className='pt-2' />
                                    <span>Instagram</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage;