import Link from "next/link";
import Image from 'next/image';
import logo from '../public/images/landingPage/nav-logo.png';
import React from "react";
import axios, { AxiosResponse } from "axios";
import profile from '../public/images/landingPage/logo.png';
import styles from '../styles/Dashboard.module.scss';

let email:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
}
const Nav: React.FC = () => {
    const [data, setData] = React.useState<any>([]);
    React.useEffect(() => {
        axios.post("http://localhost:5000/user/dashboard", {email})
        .then((response: AxiosResponse) => {
            setData(response.data.result);
        })
        
    }, []);
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        window.location.href = '/signin';
    }
    return (
    <>
        <div className="navr">
            <nav className="navbar navbar-expand-lg bg-body-large" style={{
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
                            <span>Venture</span>
                        </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center justify-content-md-end" id="navbar-menu">
                        <ul className="navbar-nav">
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 py-3 w-auto text-decoration-none " href="">
                                    Learning Hub
                                </a>
                            </li>
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 py-3 w-auto text-decoration-none " href="">
                                    Resources Hub
                                </a>
                            </li>
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 py-3 w-auto text-decoration-none " href="">
                                    Events
                                </a>
                            </li>
                            <li className="nav-item flex-row justify-content-start align-items-center pt-2">
                                <a className="text-dark px-md-3 py-3 w-auto text-decoration-none " href="">
                                    Services
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle fw-bold border-left-1" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <Image src={profile} alt="Profile Image" width={35} height={35} className="border rounded-circle border-danger me-2"/>{data.fullname}
                                </a>
                                <ul className="dropdown-menu border-0 shadow">
                                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                    <li><a className="dropdown-item" onClick={logout}>Log out</a></li>
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
