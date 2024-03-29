import * as React from 'react'
import Head from "next/head";
import Image from 'next/image'
import { useState } from "react";
import linkedIn from '../../public/images/dashboard/linkedln.png';
import facebook from '../../public/images/dashboard/facebook.png';
import twitter from '../../public/images/dashboard/twitter.png';
import instagram from '../../public/images/dashboard/instagram.png';
import share from '../../public/images/dashboard/share.png';
import styles from '../../styles/EditVenture.module.scss';
import Link from 'next/link';
import Nav from '../../components/Nav';
import axios, { AxiosResponse } from 'axios';
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import venture from '../../public/images/dashboard/create-venture.png'
import TagsDropdown from '../../components/TagsDropdown';
import TagDropdown from '../../components/TagDropdown';
interface Socials {
    facebook: string;
    linkedin: string;
    instagram: string;
    twitter: string;
}

interface FormValues {
    name: string;
    location: string;
    dateFounded: string;
    stage: string;
    description: string;
    sector: string[];
    link: string;
    tagline: string;
    businessModel:string[];
    // socials: {
    //     facebook: string;
    //     linkedin: string;
    //     instagram: string;
    //     twitter: string;
    // };
    socials: Socials;
}


let email:any;
let token:any;
if (typeof window !== "undefined") {
    email = localStorage.getItem('email');
    token = localStorage.getItem('token');
}

const AddVentures: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [roe, setRoe] = useState("");
    const [stage, setStage] = useState("choose");
    const [errors, setErrors] = useState<any>([]);
    const [tags, setTags] = useState<any>();
    const [tag, setTag] = useState<any>();
    // const dispatch = useAppDispatch();
    // const user = useAppSelector(state => state.user.users);
    // React.useEffect(() => {
    //     dispatch(fetchUser())
    // }, [])
    const [formData, setFormData] = useState<Socials>({
        facebook: "",
        instagram: "",
        twitter: "",
        linkedin: ""
    })
    const [formValues, setFormValues] = useState<FormValues>({
        name: '',
        location: '',
        dateFounded: '',
        description: roe || '',
        link: '',
        sector: tag|| [],
        stage: '',
        tagline: '',
        businessModel: tags || [],
        // socials: {
        //     facebook: 'formData.facebook',
        //     instagram: 'formData.instagram',
        //     twitter: 'formData.twitter',
        //     linkedin: 'formData.linkedin',
        // },
        socials: formData,
    });
    const selectedTags = (tags: string[]) => setTags(tags);
    const selectedTag = (tag: string[]) => setTag(tag);
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {     
        const { name, value } = event.target;
        let formValues = {...formData};
        setFormData((prevValues) => ({
            ...prevValues,
            [name] : value,
        }))
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));           
        setFormValues((prevValues) => ({
            ...prevValues,
            businessModel: tags,
            description: roe,
            sector: tag,
            stage: stage,
            socials: formValues,
        }));
        
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post("https://api.venturenation.co/api/v1/ventures", formValues, {
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
    // if (!user) {
    //     return <div>Loading...</div>; // Display loading indicator while fetching user data
    // }
    return (
        <>
            <Head>
                <title>Add venture</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
                crossOrigin="anonymous"
                ></link>
            </Head>
            <div className="container-fluid">
                <Nav />
                <div className={styles.section}>
                    <div className="row px-5 justify-content-between">
                        <div className="col-5">
                            <Link href='/profile' className='text-decoration-none text-dark'><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to profile</Link>
                            <h2>Add a new venture</h2>
                            <div className='fs-5' style={{
                                color: '#7E848E'
                            }}>
                                Create a new venture profile that tells the world about what you do to impact it. Share your data and information to gain access to a pool of resources, tools, perks, and services tailored just for you. Open yourself up to investment opportunities.
                            </div>
                            <div className="">
                                <Image src={venture} alt='' />
                            </div>
                        </div>
                        <div className="col-7 ps-4">
                            <div className="col-11">
                                <form onSubmit={handleSubmit}>                                       
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-6">
                                                <label className="form-label" htmlFor="name">Venture name <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup></label>
                                                <input type="text" className="form-control" name="name" id="name" placeholder="Venture name" value={formValues.name} onChange={handleInputChange} />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="dateFounded" className="form-label">Date founded <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup></label>
                                                <input type="date" className="form-control" name="dateFounded" id="dateFounded" placeholder="Date founded" value={formValues.dateFounded} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <div className=" mb-4">
                                            <label className="" htmlFor="tagline">Venture tagline</label>
                                            <input type="text" className="form-control" name="tagline" id="tagline" placeholder="Tagline" value={formValues.tagline} onChange={handleInputChange} />
                                        </div>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-6">
                                                <label className="form-label" htmlFor="stage">Stage <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup> </label>
                                                <select name="stage" id="stage" className='form-select' value={stage} onChange={(e) => {setStage(e.target.value)}}>
                                                    <option value="choose" disabled>Choose...</option>
                                                    <option value="explore">Explore</option>
                                                    <option value="idea">Idea</option>
                                                    <option value="concept">Concept</option>
                                                    <option value="product">Product</option>
                                                    <option value="revenue">Revenue</option>
                                                    <option value="growth">Growth</option>
                                                    <option value="stability">Stability</option>
                                                    <option value="decline">Decline</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="location" className="form-label">Location<sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup> </label>
                                                <input type="text" className="form-control" name="location" id="location" placeholder="City, Country" value={formValues.location} onChange={handleInputChange} />
                                            </div>
                                        </div>
                                        <h4 className='py-3'>Overview</h4>
                                        <div className="row justify-content-center mb-4">
                                            <div className="form-group col-6">
                                                <label className="form-label" htmlFor="phone">Sector <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup></label>                                              
                                                <TagDropdown selectedTag={selectedTag} data={[
                                                    "Agriculture",
                                                    "Automotive",
                                                    "Banking and Finance",
                                                    "Beauty, Cosmetics, and Personal Care",
                                                    "Construction",
                                                    "Education",
                                                    "Energy and Utilities",
                                                    "Entertainment and Media",
                                                    "Healthcare",
                                                    "Hospitality and Tourism",
                                                    "Information Technology (IT)",
                                                    "Manufacturing",
                                                    "Mining and Extraction",
                                                    "Pharmaceuticals",
                                                    "Real Estate",
                                                    "Retail",
                                                    "Telecommunications",
                                                    "Transportation and Logistics",
                                                ]} />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="model" className="form-label">Customer model <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup> </label>
                                                <TagsDropdown selectedTags={selectedTags} data={[
                                                    "B2B",
                                                    "B2C",
                                                    "B2B2C",
                                                    "B2G",
                                                    "C2C",
                                                    "B2N",
                                                    "G2B",
                                                    "B2E",
                                                    "P2P",
                                                    "B2D",
                                                ]} />
                                            </div>
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="name">Description <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup> </label>
                                            <ReactQuill
                                                theme="snow"
                                                placeholder="Compose an epic..."
                                                modules={{
                                                toolbar: [
                                                    [{ header: [6, false] }],
                                                    ["bold", "italic", "underline", "strike", "blockquote"],
                                                    [
                                                    { list: "ordered" },
                                                    { list: "bullet" },
                                                    { indent: "-1" },
                                                    { indent: "+1" },
                                                    ],
                                                    ["link"],
                                                    ["clean"],
                                                ],
                                                }}
                                                formats={[
                                                "header",
                                                "bold",
                                                "italic",
                                                "underline",
                                                "strike",
                                                "blockquote",
                                                "list",
                                                "bullet",
                                                "indent",
                                                "link",
                                                "image",
                                                ]}
                                                onChange={(contentHtml) => setRoe(contentHtml)}
                                                className=""
                                            />
                                            
                                        </div>
                                        <div className="form-group mb-4">
                                            <label className="form-label" htmlFor="link">Link (website or your pitch deck) <sup><i className="fa fa-asterisk" aria-hidden="true" style={{color: "red", fontSize:"10px"}}></i></sup> </label>
                                            <input type="text" className="form-control" name="link" id="link" placeholder="https://" value={formValues.link} onChange={handleInputChange} />
                                        </div>
                                        <h4 className='py-3'>Social profiles</h4>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label className="form-label" htmlFor="linkedin">LinkedIn profile link</label>
                                                <input type="text" className="form-control ps-5" name="linkedin" id="linkedin" placeholder="https://" value={formData.linkedin} onChange={handleInputChange} />
                                                {/* <div className={`text-white py-1 rounded-1 ${styles.icons}`} style={{
                                                    backgroundColor: '#3B5998'
                                                }}>
                                                    <i className="fa fa-linkedin" aria-hidden="true"></i>   
                                                </div> */}
                                                <Image src={linkedIn} alt='linkedIn logo' className={styles.icons}/>
                                            </div>
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label htmlFor="twitter" className="form-label">Twitter profile link</label>
                                                <input type="text" className="form-control ps-5" name="twitter" id="twitter" placeholder="https://" value={formData.twitter} onChange={handleInputChange} />
                                                {/* <div className={`text-white py-1 bg-info rounded-1 ${styles.icons}`} >
                                                    <i className="fa fa-twitter" aria-hidden="true"></i>   
                                                </div> */}
                                                <Image src={twitter} alt='twitter logo' className={styles.icons}/>
                                            </div>
                                        </div>
                                        <div className="row justify-content-center">
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label className="form-label" htmlFor="instagram">Instagram profile link</label>
                                                <input type="text" className="form-control ps-5" name="instagram" id="instagram" placeholder="https://" value={formData.instagram} onChange={handleInputChange} />
                                                {/* <div className={`text-white py-1 rounded-1 ${styles.icons}`} style={{
                                                    background: 'radial-gradient(circle at 33% 100%, #fed373 4%, #f15245 30%, #d92e7f 62%, #9b36b7 85%, #515ecf)',
                                                }}>
                                                    <i className="fa fa-instagram" aria-hidden="true"></i>   
                                                </div> */}
                                                <Image src={instagram} alt='instagram logo' className={styles.icons}/>
                                            </div>
                                            <div className="form-group col-md-6 col-sm-10">
                                                <label htmlFor="facebook" className="form-label">Facebook profile link</label>
                                                <input type="text" className="form-control ps-5" name="facebook" id="facebook" placeholder="https://" value={formValues.socials.facebook} onChange={handleInputChange} />
                                                {/* <div className={`text-white py-1 rounded-1 ${styles.icons}`} style={{
                                                    backgroundColor: '#3B5998'
                                                }}>
                                                    <i className="fa fa-facebook" aria-hidden="true"></i>   
                                                </div> */}
                                                <Image src={facebook} alt='facebook logo' className={styles.icons}/>
                                            </div>
                                        </div>
                                        <div>
                                            <button type="submit" className={styles.signup} disabled={isLoading} >{isLoading ? "Creating Venture..." : "Create Venture"}</button>
                                        </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AddVentures;