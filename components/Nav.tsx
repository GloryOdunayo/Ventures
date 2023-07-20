import Link from "next/link";
import Image from 'next/image';
import logo from '../public/images/landingPage/nav-logo.png';
import React from "react";
import profile from '../public/images/dashboard/frame.png';
import { useAppDispatch, useAppSelector } from "../pages/hooks";
import { fetchUser } from "../pages/features/users/userSlice";

const Nav: React.FC = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.users)
    React.useEffect(() => {
        dispatch(fetchUser())
    }, [])
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/signin';
    }
    return (
    <>
        <div className="navr">
            <nav className="navbar navbar-expand-lg bg-body-medium shadows px-3" style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                zIndex: 100,
                backgroundColor: '#fff',
            }}
                >
                <div className="container-fluid mx-auto">
                    <Link className="navbar-brand" href="/">
                        <div className="col-2 d-flex">
                            <Image src={logo} width={30} alt='logo' />
                            <span style={{
                                fontSize: '1.25rem',
                                fontWeight: '600',
                                marginLeft: '0.5rem',
                            }}>Venture</span>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center justify-content-sm-end" id="navbar-menu">
                        <ul className="navbar-nav">
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 w-auto text-decoration-none " href="">
                                    Learning Hub
                                </a>
                            </li>
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 w-auto text-decoration-none " href="">
                                    Resources Hub
                                </a>
                            </li>
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 w-auto text-decoration-none " href="">
                                    Events
                                </a>
                            </li>
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 w-auto text-decoration-none " href="">
                                    Services
                                </a>
                            </li>
                            <div className="" style={{
                                borderLeft: '1px solid #D9D9D9',
                                marginTop: '5px',
                                height: '35px',
                            }}></div>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold border-left-1" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {/* <img src={user.avatar} alt="Profile Image" width={40} height={40} className="border rounded-circle me-2"/>{user.name} */}
                                    {
                                        // eslint-disable-next-line @next/next/no-img-element
                                        user.avatar ? <img src={user.avatar} alt='Profile Image' width={30} height={30} className="border rounded-circle me-2" /> :
                                        <Image src={profile} alt='Profile Image' width={30} height={30} className="border rounded-circle me-2" />
                                    }
                                    {user.name}
                                
                                </a>
                                <ul className="dropdown-menu border-0 shadow">
                                    <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" href='/signin' onClick={logout}>Log out</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </>
);
};

export default Nav;
