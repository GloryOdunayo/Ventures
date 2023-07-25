import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import axios, { AxiosResponse } from 'axios';
import eye from '../public/images/landingPage/Icon.png';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import styles from '../../styles/Profile.module.scss';
import profile from '../../public/images/dashboard/image change.png';
import Profile from '../../components/Profile';
import { fetchUser } from '.././features/users/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { capitalize } from 'lodash';
import TagsInput from '../../components/TagsInput';

interface FormValues {
    name: string;
    dob: string;
    bio: string;
    skills: string[];
    phone: string;
    nationality: string;
    gender: string;
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

const EditProfile: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>([]);
    const [bio, setBio] = useState('');
    const [tags, setTags] = useState<any>();
    // const [skills, setSkills] = useState<any>('');
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.users);
    React.useEffect(() => {
        dispatch(fetchUser())
        setBio(user.bio);
    }, [])
    
    const [formValues, setFormValues] = useState<FormValues>({
        name: user.name,
        dob: user.dob,
        bio: bio|| user.bio,
        skills: tags || user.skills,
        phone: user.phone,
        nationality: user.nationality,
        gender: user.gender,
    });

    const selectedTags = (tags: string[]) => setTags(tags);
    // console.log(tags);
    
    const handleBioChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setBio(event.target.value);
        setFormValues((prevValues) => ({
            ...prevValues,
            bio: bio,
        }));
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {     
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };
    setFormValues((prevValues) => ({
        ...prevValues,
        skills: tags,
    }));


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(formValues);
        axios.patch(`https://api.venturenation.co/api/v1/users/${email}`, formValues, {
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
        return <div>Loading...</div>; // Display loading indicator while fetching user data
    }
    return (
        <>
            <Head>
                <title>Edit Profile</title>
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
                                <div className="ps-5 shadows py-3">
                                    <h3>General</h3>
                                    <p style={{color: '#7E848E'}}>Personalize and keep your profile up-to-date.</p>
                                </div>
                                <div className='ms-5 pt-3'>
                                    <p>Profile Image</p>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={user.avatar} alt='Profile Image' className={styles.section__info__profile__image} />
                                    <Image src={profile} alt='' className={styles.change} />
                                </div>
                                <div className="col-10 mx-auto">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="name">Full name</label>
                                            <input type="text" className="form-control" name="name" id="name" placeholder="Full name" value={formValues.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-6">
                                                <label className="form-label" htmlFor="phone">Phone Number</label>
                                                <input type="text" className="form-control" name="phone" id="phone" placeholder="+234 908 745 3451" value={formValues.phone} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="nationality" className="form-label">Nationality</label>
                                                <input type="text" className="form-control" name="nationality" id="nationality" placeholder="Nigerian" value={formValues.nationality} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-6">
                                                <label className="form-label" htmlFor="gender">Gender</label>
                                                <select name="gender" id="gender" className='form-select'>
                                                    {formValues.gender && <option value={formValues.gender}>{capitalize(formValues.gender)}</option>}
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="dob" className="form-label">Date of Birth</label>
                                                <input type="date" className="form-control" name="dob" id="dob" value={formValues.dob} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="website">Personal Website</label>
                                            {/* <textarea name="website" id="website" cols={100} rows={10} className='form-control' onChange={handleInputChange}></textarea> */}
                                            {/* <input type="url" className="form-control" name="website" id="website" placeholder="https://" value={} onChange={handleInputChange} /> */}
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="skills">Skills</label>
                                            <TagsInput selectedTags={selectedTags} />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label" htmlFor="bio">Bio (Brief description about your Profile)</label>
                                            {/* <input type="text" className="form-control" name="bio" id="bio" placeholder="Passionate Entrepreneur with a drive to innovate and disrupt industries" value={formValues.bio} onChange={handleInputChange} /> */}
                                            <textarea name="bio" id="" cols={10} rows={5} className='form-control' placeholder="Passionate Entrepreneur with a drive to innovate and disrupt industries" onChange={handleBioChange} value={bio}></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className={styles.signup} disabled={isLoading} >{isLoading ? "Updating..." : "Update"}</button>
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
export default EditProfile;