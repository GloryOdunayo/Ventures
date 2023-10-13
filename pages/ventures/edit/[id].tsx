import * as React from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import * as yup from "yup";
import { useRouter } from "next/router";
import Nav from "../../../components/Nav";
import SideNav from "../../../components/SideNav";
import styles from "../../../styles/EditVenture.module.scss";
import profile from "../../../public/images/dashboard/image change.png";
import Profile from "../../../components/Profile";
import { capitalize, set } from "lodash";
import TagsInput from "../../../components/TagsInput";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import TagsDropdown from "../../../components/TagsDropdown";
import TagDropdown from "../../../components/TagDropdown";
import Venture from "../../../components/Venture";
import axiosInstance from "../../../helpers/axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../helpers/redux/store";
import { fetchUser } from "../../../helpers/redux/userSlide";
import { RootState } from "../../../helpers/redux/store";
import { User } from "../../../helpers/redux/types";

interface FormValues {
  name: string;
  location: string;
  dateFounded: string;
  stage: string;
  description: string;
  sector: string[];
  link: string;
  tagline: string;
  businessModel: string[];
}
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

let email: any;
let token: any;
if (typeof window !== "undefined") {
  email = localStorage.getItem("email");
  token = localStorage.getItem("token");
}

const EditVentures: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>([]);
  const [bio, setBio] = useState("");
  const [tags, setTags] = useState<any>();
  const [roe, setRoe] = useState("");
  const [tag, setTag] = useState<any>();
  const [data, setData] = useState<any>([]);
  const [stage, setStage] = useState("choose");
  const [currency, setCurrency] = useState("choose");
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, User>((state) => state.user.users);
  const router = useRouter();
  const image = React.useRef<any>(null);
  const logo = React.useRef<any>(null);

  let slug: any;
  if (typeof window !== "undefined") {
    slug = localStorage.getItem("slug");
  }
  React.useEffect(() => {
    dispatch(fetchUser());
    setBio(user.bio);
    axios
      .get(`https://api.venturenation.co/api/v1/ventures/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setFormValues((prevValues) => ({
          ...prevValues,
          name: data.name,
          location: data.location,
          dateFounded: data.dateFounded,
          description: data.description,
          link: data.link,
          sector: tag || data.sector,
          tagline: data.tagline,
          businessModel: tags || data.businessModel,
        }));
        setStage(data.stage);
        setRoe(data.description);
        setTag(data.sector);
        setTags(data.businessModel);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [formValues, setFormValues] = useState<FormValues>({
    name: data.name,
    location: data.location,
    dateFounded: data.dateFounded,
    description: roe || data.description,
    link: data.link,
    sector: tag || data.sector,
    stage: data.stage,
    tagline: data.tagline,
    businessModel: tags || data.businessModel,
  });
  // console.log(formValues);

  const selectedTags = (tags: string[]) => setTags(tags);
  const selectedTag = (tag: string[]) => setTag(tag);

  const handleBioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
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
    setFormValues((prevValues) => ({
      ...prevValues,
      skills: tags,
    }));
  };
  console.log(slug);

  const upload = async () => {
    // const handleBannerSubmit = async () => {
    const bannerImg = image?.current.files[0];

    const formData = new FormData();
    formData.append("image", bannerImg);
    // dispatch(updateUserbanner(formData));
    image.current.value = "";
    axiosInstance
      .patch(`/ventures/${slug}/update-banner`, formData)
      .then((res: any) => {
        console.log(res.data);

        // NotifySuccess(
        //   res?.data?.message
        //     ? res?.data?.message
        //     : "Banner updated successfully"
        // );
        window.location.reload();
      })
      .catch((err: any) =>
        err?.response?.data?.errors?.map((item: any) => {
          //   NotifyError(
          //     item?.message
          //       ? item?.message
          //       : "Something went wrong please try again"
          //   );
          setErrors(item?.message);
        })
      );
  };
  const uploadLogo = async () => {
    // const handleBannerSubmit = async () => {
    const bannerImg = logo?.current.files[0];

    const formData = new FormData();
    formData.append("image", bannerImg);
    // dispatch(updateUserbanner(formData));
    logo.current.value = "";
    axiosInstance
      .patch(`/ventures/${slug}/update-logo`, formData)
      .then((res: any) => {
        console.log(res.data);
        // NotifySuccess(
        //   res?.data?.message
        //     ? res?.data?.message
        //     : "Banner updated successfully"
        // );
        window.location.reload();
      })
      .catch((err: any) =>
        err?.response?.data?.errors?.map((item: any) => {
          //   NotifyError(
          //     item?.message
          //       ? item?.message
          //       : "Something went wrong please try again"
          //   );
          setErrors(item?.message);
        })
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(formValues);
    axiosInstance
      .patch(`/ventures/${router.query.venture}`, formValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: AxiosResponse) => {
        console.log(response.data);
      })
      .catch((error) => {
        setErrors(error.message);
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Nav />
      <SideNav />
      <div className={styles.section}>
        <div className="container-fluid">
          <div className="">
            <div className="row justify-content-center">
              <div className="col-4">
                <Venture />
              </div>
              <div className="col-7 shadows p-0">
                <div className="ps-5 shadows py-3">
                  <h3>General</h3>
                  <p style={{ color: "#7E848E" }}>
                    Keep your venture information and data up-to-date.
                  </p>
                </div>
                <div className="mt-3 px-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.banner}
                    alt="Profile Image"
                    className={styles.banners}
                  />
                  <label
                    htmlFor="image"
                    className={styles.change}
                    onChange={upload}
                    ref={image}
                  >
                    <Image src={profile} alt="" />
                  </label>
                  <input
                    type="file"
                    className="border-0"
                    name="image"
                    id="image"
                    style={{ display: "none" }}
                    ref={image}
                    onChange={upload}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data.logo}
                    alt="venture-logo"
                    className={styles.logo}
                  />
                  <label
                    htmlFor="logo"
                    className={styles.chan}
                    onChange={uploadLogo}
                    ref={logo}
                  >
                    <Image src={profile} alt="" />
                  </label>
                  <input
                    type="file"
                    className="border-0"
                    name="logo"
                    id="logo"
                    style={{ display: "none" }}
                    ref={logo}
                    onChange={uploadLogo}
                  />
                </div>
                <div className="shadows">
                  <div className="col-10 mx-auto">
                    <form onSubmit={handleSubmit}>
                      <div className="row justify-content-center mb-4">
                        <div className="form-group col-6">
                          <label className="form-label" htmlFor="name">
                            Venture name{" "}
                            <sup>
                              <i
                                className="fa fa-asterisk"
                                aria-hidden="true"
                                style={{ color: "red", fontSize: "10px" }}
                              ></i>
                            </sup>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Venture name"
                            value={formValues.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="dateFounded" className="form-label">
                            Date founded{" "}
                            <sup>
                              <i
                                className="fa fa-asterisk"
                                aria-hidden="true"
                                style={{ color: "red", fontSize: "10px" }}
                              ></i>
                            </sup>
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="dateFounded"
                            id="dateFounded"
                            placeholder="Date founded"
                            value={formValues.dateFounded}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className=" mb-4">
                        <label className="" htmlFor="tagline">
                          Venture tagline
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="tagline"
                          id="tagline"
                          placeholder="Tagline"
                          value={formValues.tagline}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label className="form-label" htmlFor="name">
                          Description{" "}
                          <sup>
                            <i
                              className="fa fa-asterisk"
                              aria-hidden="true"
                              style={{ color: "red", fontSize: "10px" }}
                            ></i>
                          </sup>{" "}
                        </label>
                        <ReactQuill
                          theme="snow"
                          placeholder="Compose an epic..."
                          modules={{
                            toolbar: [
                              [{ header: [6, false] }],
                              [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                              ],
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
                          value={roe}
                          onChange={(contentHtml) => setRoe(contentHtml)}
                          className=""
                        />
                      </div>
                      <div className="row justify-content-center mb-4">
                        <div className="form-group col-6">
                          <label className="form-label" htmlFor="stage">
                            Stage{" "}
                            <sup>
                              <i
                                className="fa fa-asterisk"
                                aria-hidden="true"
                                style={{ color: "red", fontSize: "10px" }}
                              ></i>
                            </sup>{" "}
                          </label>
                          <select
                            name="stage"
                            id="stage"
                            className="form-select"
                            value={stage}
                            onChange={(e) => {
                              setStage(e.target.value);
                            }}
                          >
                            <option value="choose" disabled>
                              Choose...
                            </option>
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
                          <label htmlFor="location" className="form-label">
                            Location
                            <sup>
                              <i
                                className="fa fa-asterisk"
                                aria-hidden="true"
                                style={{ color: "red", fontSize: "10px" }}
                              ></i>
                            </sup>{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            id="location"
                            placeholder="City, Country"
                            value={formValues.location}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row justify-content-center mb-4">
                        <div className="form-group col-6">
                          <label className="form-label" htmlFor="phone">
                            Sector{" "}
                            <sup>
                              <i
                                className="fa fa-asterisk"
                                aria-hidden="true"
                                style={{ color: "red", fontSize: "10px" }}
                              ></i>
                            </sup>
                          </label>
                          <TagDropdown
                            selectedTag={selectedTag}
                            data={[
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
                            ]}
                            value={tag}
                          />
                        </div>
                        <div className="form-group col-6">
                          <label htmlFor="model" className="form-label">
                            Customer model{" "}
                            <sup>
                              <i
                                className="fa fa-asterisk"
                                aria-hidden="true"
                                style={{ color: "red", fontSize: "10px" }}
                              ></i>
                            </sup>{" "}
                          </label>
                          <TagsDropdown
                            selectedTags={selectedTags}
                            data={[
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
                            ]}
                            value={tags}
                          />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="form-label" htmlFor="currency">
                          Currency
                        </label>
                        <select
                          name="currency"
                          id="currency"
                          className="form-select"
                          value={currency}
                          onChange={(e) => {
                            setCurrency(e.target.value);
                          }}
                        >
                          <option value="choose" disabled>
                            Choose...
                          </option>
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
                      <div className="form-group mb-4">
                        <label className="form-label" htmlFor="link">
                          Link (website or pitch deck)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="link"
                          id="link"
                          placeholder="https://"
                          value={formValues.link}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <button
                          type="submit"
                          className={styles.signup}
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving Changes..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditVentures;
