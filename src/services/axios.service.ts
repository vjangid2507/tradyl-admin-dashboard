import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import { authenticationService } from "./authentication.service";

export const axiosInstance = axios.create({
  baseURL: "http://dev.tradyl.com",
});

axiosInstance.interceptors.request.use(
  (request) => {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${authenticationService.tokenValue}`,
    };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    if (response.data && response.data.success === false) {
      toast.error(
        "Error" + response.data.error.code + ", " + response.data.error.message
      );
    }
    return response;
  },
  (error) => {
    if (
      !error.response ||
      error.response.status == 401 ||
      error.response.status == 403
    ) {
      toast.error("Session expired. Retry after login.");
      /**
       * auto logout if 401 Unauthorized
       * or 403 Forbidden response returned from api
       */
      authenticationService.logout();
    }
    return Promise.reject(error);
  }
);
