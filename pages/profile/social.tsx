import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import linkedln from '../../public/images/dashboard/linkedln.png';
import facebook from '../../public/images/dashboard/facebook.png';
import twitter from '../../public/images/dashboard/twitter.png';
import instagram from '../../public/images/dashboard/instagram.png';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import styles from '../../styles/Profile.module.scss';
import profile from '../../public/images/dashboard/image change.png';
import Profile from '../../components/Profile';
import { fetchUser } from '.././features/users/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

interface FormValues {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
}
const validationSchema = yup.object().shape({
    password: yup.string().email('Invalid email address').required('Email is required'),
});

let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const EditSocial: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.users);
    const social = useAppSelector(state => state.user.users.socials);
    React.useEffect(() => {
        dispatch(fetchUser())
    }, [])
    
    const [formValues, setFormValues] = useState<FormValues>({
        facebook: social.facebook,
        linkedin: social.linkedin,
        instagram: social.instagram,
        twitter: social.twitter,
    });
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true); 
        axios.patch(`https://api.venturenation.co/api/v1/users/${email}`, {socials:formValues}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }}
        ).then((response: AxiosResponse) => {
            console.log(response.data);
        })
        .catch((error) => {
            setErrors(error.message);
            setIsLoading(false);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }
    if (!user) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Head>
                <title>Edit Social Profile</title>
            </Head>
            <Nav />
            <SideNav/>
            <div className={styles.section}>
                <div className="container-fluid">
                    <div className="">
                        <div className="row justify-content-center">
                            <div className='col-4'>
                                <Profile/>
                            </div>
                            <div className="col-7 shadows p-0">
                                <div className="shadow-sm ps-5 py-3">
                                    <h3>Social Profiles</h3>
                                    <p style={{color: '#7E848E'}}>Attach social media accounts to your venture.</p>
                                </div>
                                <div className="mt-4 col-10 mx-auto">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label className="form-label" htmlFor="linkedin">LinkedIn profile link</label>
                                                <input type="text" className="form-control ps-5" name="linkedin" id="linkedin" placeholder="https://" value={formValues.linkedin} onChange={handleInputChange} />
                                                <Image src={linkedln} alt='linkedln logo' className={styles.icons}/>
                                            </div>
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label htmlFor="twitter" className="form-label">Twitter profile link</label>
                                                <input type="text" className="form-control ps-5" name="twitter" id="twitter" placeholder="https://" value={formValues.twitter} onChange={handleInputChange} />
                                                <Image src={twitter} alt='twitter logo' className={styles.icons}/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label className="form-label" htmlFor="instagram">Instagram profile link</label>
                                                <input type="text" className="form-control ps-5" name="instagram" id="instagram" placeholder="https://" value={formValues.instagram} onChange={handleInputChange} />
                                                <Image src={instagram} alt='instagram logo' className={styles.icons}/>
                                            </div>
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label htmlFor="facebook" className="form-label">Facebook profile link</label>
                                                <input type="text" className="form-control ps-5" name="facebook" id="facebook" placeholder="https://" value={formValues.facebook} onChange={handleInputChange} />
                                                <Image src={facebook} alt='facebook logo' className={styles.icons}/>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className={styles.save} disabled={isLoading} >{isLoading ? "Updating..." : "Save changes"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default EditSocial;