import axios from "axios";

const baseURL = "https://api.venturenation.co/api/v1";
// const baseURL = "https://venture-nation-api.onrender.com/api/v1";

let token: string | null = "";

if (typeof window !== "undefined") {
  // Perform localStorage action
//   if (localStorage && localStorage.getItem("VNUsrToken")) {
//     localStorage.removeItem("VNAdmToken");
//     localStorage.removeItem("VNEspToken");
//     token = localStorage.getItem("VNUsrToken");
//   } else if (localStorage && localStorage.getItem("VNAdmToken")) {
//     localStorage.removeItem("VNUsrToken");
//     localStorage.removeItem("VNEspToken");
//     token = localStorage.getItem("VNAdmToken");
//   } else if (localStorage && localStorage.getItem("VNEspToken")) {
//     localStorage.removeItem("VNUsrToken");
//     localStorage.removeItem("VNAdmToken");
//     token = localStorage.getItem("VNEspToken");
//   } else {
    if(localStorage && localStorage.getItem("token")){
        token = localStorage.getItem("token");
    }
}
export const getToken = () => (token ? token : null);

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: getAuthorizationHeader(),
    Accept: "application/json",
    // "Accept-Encoding": "identity",
  },
});
// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   function (error) {
//     // console.log({ error });
//     var status = error.response.status;
//     var resBaseURL = error.response.config.baseURL;
//     if (resBaseURL === baseURL && (status === 403 || status === 401)) {
//       localStorage.removeItem("VNUsrToken");
//       localStorage.removeItem("VNAdmToken");
//       window.location.href = "/auth/signin";
//     }
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.request.use(
//   (config) => {
//     config.headers["Authorization"] = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (!token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log("request config", config);
//     return config;
//   },
//   (error) => {
//     // console.log("request error", error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;