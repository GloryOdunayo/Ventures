import BtnLoader from "@/components/buttons/BtnLoader";
import axiosInstance from "@/helpers/axios";
import NotifyError from "@/helpers/notifications/NotifyError";
import { clearData, RegisterUser } from "@/state/auth/register";
import { AppDispatch, RootState } from "@/state/store";
import { Formik, ErrorMessage, Field, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

interface valueTypes {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<any[]>([]);
  const [errorActive, setErrorActive] = useState<any>({
    email: false,
    password: false,
  });
  const [emailState, setEmailState] = useState<string>();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [progressColor, setProgressColor] = useState<string>("#DC2626");
  const [progressStrength, setProgressStrength] = useState<string>("Weak");
  const togglePassword = () => {
    setShowPass(showPass ? false : true);
  };
  const initialValues: valueTypes = {
    name: "",
    email: "",
    password: "",
  };

  // VALIDATION
  const SignUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        RegExp("(.*[a-z].*)"),
        "Password must contain at least one lowercase letter"
      )
      .matches(
        RegExp("(.*[A-Z].*)"),
        "Password must contain at least one Uppercase letter"
      )
      .matches(RegExp("(.*\\d.*)"), "Password must contain a Number")
      .matches(
        RegExp('[!@#$%^&*(),.?":{}|<>]'),
        "Password must contain a Special character"
      )
      .min(8, "Password must be at least 8 characters long"),
  });

  const {
    register: { data, loading },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (data) {
      if (data?.name === "AxiosError") {
        data?.response?.data?.errors?.map((item: any) => {
          if (item.message.includes("mailbox")) {
            router.push(`/auth/confirm-mail/${emailState}`);
          }
          item?.message &&
          (item?.message.includes("name") ||
            item?.message.includes("email") ||
            item?.message.includes("password"))
            ? setFieldErrors((prev: any) => [...prev, item])
            : NotifyError(
                item?.message
                  ? item?.message
                  : "Something went wrong please try again"
              );
        });
      }
      if (data?.message === "Network Error") {
        NotifyError(
          data?.message
            ? data?.message
            : "Something went wrong please try again"
        );
      }
      if (data?.status === "success") {
        if (
          data?.msg ===
          "A confirmation code has been sent to your email address."
        ) {
          router.push(`/auth/confirm-mail/${emailState}`);
        }
      }
    }
    return () => {
      if (router.isReady) {
        dispatch(clearData());
      }
    };
  }, [data]);

  const onSubmit = (values: valueTypes) => {
    // console.log(values);
    setFieldErrors([]);
    setEmailState(values.email);
    dispatch(RegisterUser(values));
  };
  return (
    <div className="auth__form">
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        // validateOnChange={true}
        validateOnBlur={true}
        onSubmit={onSubmit}
      >
        {(props) => {
          const { errors, touched, isValid, dirty, values } = props;
          const validationConditions = [
            { condition: "Password is valid", isValid: !errors.password },
            {
              condition: "Password is at least 8 characters long",
              isValid: values.password.length >= 8,
            },
            {
              condition: "Password contains at least one uppercase letter",
              isValid: /[A-Z]/.test(values.password),
            },
            {
              condition: "Password contains at least one lowercase letter",
              isValid: /[a-z]/.test(values.password),
            },
            {
              condition: "Password contains at least one number",
              isValid: /\d/.test(values.password),
            },
            {
              condition: "Password contains at least one special character",
              isValid: /[!@#$%^&*(),.?":{}|<>]/.test(values.password),
            },
          ];

          const fulfilledConditions = validationConditions.filter(
            (condition) => condition.isValid
          );

          // let progress = 0;
          const progress = Math.floor(
            (fulfilledConditions.length / validationConditions.length) * 100
          );

          if (progress <= 25) {
            setProgressColor("#DC2626");
            setProgressStrength("Weak");
          } else if (progress > 25 && progress <= 50) {
            setProgressColor("#F59E0B");
            setProgressStrength("Fair");
          } else if (progress > 50 && progress <= 70) {
            setProgressColor("#22C55E");
            setProgressStrength("Good");
          } else if (progress > 70) {
            setProgressColor("#16A34A");
            setProgressStrength("Strong");
          }
          // console.log(fulfilledConditions);
          return (
            <Form className="">
              <div className="row w-100 m-0">
                <div className="col-md-12 my-2 my-lg-2 w-100 px-0 text-start">
                  <label htmlFor="name" className="auth__form--label mb-2  ">
                    Full name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className={
                      errors.name && touched.name
                        ? "w-100 py-3 px-3 is-invalid form-control shadow-none w-100"
                        : "w-100 py-3 px-3 "
                    }
                    placeholder="Full name"
                    type="text"
                  />
                  <>
                    {fieldErrors.length !== 0 &&
                      fieldErrors.map(
                        (item: any) =>
                          (item?.message?.includes("name") ||
                            item?.field === "name") && (
                            <>
                              <div className="error mt-1">
                                {item?.message && item?.message}
                              </div>
                            </>
                          )
                      )}
                  </>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error  mt-1"
                  />
                </div>
                <div className="col-md-12 my-2 my-lg-2 w-100 px-0 text-start">
                  <label htmlFor="email" className="auth__form--label mb-2  ">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    className={
                      errors.email && touched.email
                        ? "w-100 py-3 px-3 is-invalid form-control shadow-none w-100"
                        : "w-100 py-3 px-3 "
                    }
                    placeholder="Email address"
                    type="email"
                  />
                  <>
                    {fieldErrors.length !== 0 &&
                      fieldErrors.map(
                        (item: any) =>
                          (item?.message?.includes("email") ||
                            item?.field === "email") && (
                            <>
                              {/* {setErrorActive((prev: any) => ({
                                email: true,
                                password: prev.password,
                              }))} */}
                              <div className="error mt-1">
                                {item?.message && item?.message}
                              </div>
                            </>
                          )
                      )}
                  </>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error  mt-1"
                  />
                </div>
                <div className="col-md-12 my-2 my-lg-2 w-100 px-0 text-start">
                  <label htmlFor="password" className="mb-2">
                    Password
                  </label>
                  <Field
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className={
                      errors.password && touched.password
                        ? " password  py-3 px-3 shadow-none w-100"
                        : " password py-3 px-3 shadow-none w-100"
                    }
                  />
                  <>
                    {fieldErrors.length !== 0 &&
                      fieldErrors.map(
                        (item: any) =>
                          (item?.message?.includes("password") ||
                            item?.field === "password") && (
                            <>
                              {/* {setErrorActive((prev: any) => ({
                                email: true,
                                password: prev.password,
                              }))} */}
                              <div className="error mt-1">
                                {item?.message && item?.message}
                              </div>
                            </>
                          )
                      )}
                  </>
                  <i
                    className={
                      showPass
                        ? "fa-regular fa-eye fa-fw"
                        : "fa-regular fa-eye-slash fa-fw"
                    }
                    onClick={togglePassword}
                  ></i>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error  mt-1"
                  />
                  {/* {!(errors.password && touched.password) && (
                    <i
                      className={
                        showPass
                          ? "fa-regular fa-eye fa-fw"
                          : "fa-regular fa-eye-slash fa-fw"
                      }
                      onClick={togglePassword}
                    ></i>
                  )} */}
                  <div className="auth__form--validation mt-3 ">
                    <div className="row justify-space-between">
                      <div className="col">
                        <p className="mb-2">
                          <small>Password strength:</small>
                        </p>
                      </div>
                      <div className="col text-end">
                        <p className="mb-2">
                          <small>{progressStrength}</small>
                        </p>
                      </div>
                    </div>
                    <div
                      className="progress"
                      role="progressbar"
                      aria-label="Basic example"
                      aria-valuenow={0}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`progress-bar`}
                        style={{
                          width: `${progress}%`,
                          backgroundColor: progressColor,
                        }}
                      ></div>
                    </div>
                    <div className="d-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-info-circle mt-2 pt-1"
                        width="60"
                        height="50"
                        viewBox="0 0 23 23"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="12" cy="12" r="9" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                        <polyline points="11 12 12 12 12 16 13 16" />
                      </svg>{" "}
                      <p className="pt-2 mx-2">
                        <small>
                          Password must contain at least 8 characters, digits,
                          which includes special characters, lowercase and
                          uppercase letters.
                        </small>
                      </p>
                    </div>
                  </div>
                </div>

                <div className=" my-2 my-lg- px-0 my-3 my-lg-3">
                  {loading ? (
                    <button
                      type="submit"
                      className={
                        !(dirty && isValid)
                          ? "disabled-btn contact__form--submit py-3 ms-0 w-100 fw-bold"
                          : "contact__form--submit py-3 ms-0 w-100 fw-bold"
                      }
                      disabled
                    >
                      <BtnLoader />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className={
                        !(dirty && isValid)
                          ? "disabled-btn contact__form--submit py-3 ms-0 w-100 fw-bold"
                          : "contact__form--submit py-3 ms-0 w-100 fw-bold"
                      }
                    >
                      Sign up
                    </button>
                  )}
                </div>
              </div>
            </Form>
            // </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignupForm;
