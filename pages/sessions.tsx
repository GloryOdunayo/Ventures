import * as React from "react";
import Head from "next/head";
import { useState } from "react";
import Nav from "../components/Nav";
import styles from "../styles/Sessions.module.scss";
import SideNav from "../components/SideNav";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../helpers/redux/store";
import { fetchUser } from "../helpers/redux/userSlide";
import { RootState } from "../helpers/redux/store";
import { User } from "../helpers/redux/types";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

let email: any;
let token: any;
if (typeof window !== "undefined") {
  email = localStorage.getItem("email");
  token = localStorage.getItem("token");
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Sessions: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>([]);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, User>((state) => state.user.users);
  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>Upcoming Sessions</title>
      </Head>
      <Nav />
      <SideNav />
      <div className={styles.section}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-10">
              <div className={styles.session}>
                <p>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>Back to
                  profile
                </p>
                <div className={styles.session__header}>
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Upcoming" {...a11yProps(0)} />
                        <Tab label="Cancelled" {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                      <div className="shadows col-10 p-3 my-3">
                        <div className="d-flex justify-content-between">
                          <h6 className="">
                            Mentorship with <span>Gilda Charles</span>
                          </h6>
                          <div className="">
                            <p>
                              Details{" "}
                              <i className="fa-solid fa-chevron-right"></i>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <p className="me-4">
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            Wed
                          </p>
                          <p>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                            10:00am - 11:00am
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-md-3 col-sm-6">
                            <button className={styles.session__btn}>
                              <Link
                                href=""
                                className={`btn text-decoration px-3 py-2 ${styles.session__btn}`}
                              >
                                Join Meeting
                              </Link>
                            </button>
                          </div>
                          <div className="col-3">
                            <button className={styles.section__info__text}>
                              <Link
                                href=""
                                className={`btn text-decoration px-3 py-2 btn-outline-${styles.clr}`}
                              >
                                Send Message
                              </Link>
                            </button>
                          </div>
                          <p className="col-2 pt-2">
                            <a href="" className="text-decoration text-danger">
                              Cancel
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="shadows col-10 p-3 my-3">
                        <div className="d-flex justify-content-between">
                          <h6 className="">
                            Mentorship with <span>Gilda Charles</span>
                          </h6>
                          <div className="">
                            <p>
                              Details{" "}
                              <i className="fa-solid fa-chevron-right"></i>
                            </p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <p className="me-4">
                            <i
                              className="fa fa-calendar"
                              aria-hidden="true"
                            ></i>{" "}
                            Wed{" "}
                          </p>
                          <p className="">
                            <i className="fa fa-clock-o" aria-hidden="true"></i>{" "}
                            10:00am - 11:00am
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-md-3 col-sm-6">
                            <button className={styles.session__btn}>
                              <Link
                                href=""
                                className={`btn text-decoration px-3 py-2 ${styles.session__btn}`}
                              >
                                Join Meeting
                              </Link>
                            </button>
                          </div>
                          <div className="col-3">
                            <button className={styles.section__info__text}>
                              <Link
                                href=""
                                className={`btn text-decoration px-3 py-2 btn-outline-${styles.clr}`}
                              >
                                Send Message
                              </Link>
                            </button>
                          </div>
                          <p className="col-2 pt-2">
                            <a href="" className="text-decoration text-danger">
                              Cancel
                            </a>
                          </p>
                        </div>
                      </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                      Item Two
                    </CustomTabPanel>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sessions;
