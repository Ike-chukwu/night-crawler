import { LoginService } from "@/services/login";
import axios from "axios";

import { getCookie } from "cookies-next";

export const USER_TOKEN_KEY = "niteCrawler_user_token";
export const USER_REFRESH_TOKEN_KEY = "niteCrawler_refresh_token";
export const TOKEN_EXPIRY_DATE_KEY = "niteCrawler_token_expiry_date";
export const USER_INFO_KEY = "niteCrawler_user_info";

export const API_URL_V1 = process.env.NEXT_PUBLIC_API_URL_V1;

export enum AuthState {
    LOGGED_OUT,
    EXPIRED,
    LOGGED_IN,
}


export const axiosInstance = axios.create({
    baseURL: API_URL_V1,
    // headers: { Authorization: `Bearer ${getCookie(USER_TOKEN_KEY)}` },
    //TODO: Add Interceptor for re-authenticating and retrying request
});
axiosInstance.interceptors.request.use((config) => {
    const token = getCookie(USER_TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Headers before request:", config.headers);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const token = await LoginService.reAuthenticate();

            if (token) {
                axiosInstance.defaults.headers.common["Authorization"] =
                    `Bearer ${token}`;

                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    },
);
export enum SearchParams {
    EVENT_ID = "eventId",
    PLAN_ID = "planId",
    SUBCONTRACTOR_ID = "subcontructorId",
    ACTION = "action",
    FORM_ACTION = "form_action",
    FORM_ACTION_2 = "form_action_2",
    PAGE="page",
    FILTER="filter",
    SEARCHED_TERM="searchedTerm",
    USER_ID="userId"
} 


// axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       // Check if `error.response` exists to avoid TypeError
//       if (error?.response) {
//         const originalRequest = error.config;
  
//         // Only retry if status is 401 and `_retry` flag is not set
//         if (error.response.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
  
//           // Call reAuthenticate function
//           const token = await LoginService.reAuthenticate();
  
//           if (token) {
//             // Set the Authorization header with the new token
//             axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
//             // Retry the original request with the new token
//             return axiosInstance(originalRequest);
//           }
//         }
//       }
  
//       // If no `error.response`, reject with the error
//       return Promise.reject(error);
//     }
//   )