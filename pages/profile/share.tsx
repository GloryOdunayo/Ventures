import * as React from "react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import SideNav from "../../components/SideNav";
import styles from "../../styles/Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../helpers/redux/store";
import { fetchUser } from "../../helpers/redux/userSlide";
import { RootState } from "../../helpers/redux/store";
import { User } from "../../helpers/redux/types";

let email: any;
let token: any;
if (typeof window !== "undefined") {
  email = localStorage.getItem("email");
  token = localStorage.getItem("token");
}

const ShareProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector<RootState, User>((state) => state.user.users);
  const social = user.socials;
  React.useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>Share Profile</title>
      </Head>
      <Nav />
      <SideNav />
      <div className={styles.section}>
        <div className="container-fluid">
          <div className="">
            <div className="row justify-content-center">
              <h4>Share Your Profile</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ShareProfile;
