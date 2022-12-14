import axios from "axios";
import {
  API_BASE_URL,
  SESSION_HEADER_KEY,
  SESSION_TOKEN,
} from "../constants/common";

// import store from "../redux/store/index";
// import { START_LOADING, STOP_LOADING } from "../redux/action-types";

const service = axios.create({
  baseURL: API_BASE_URL,
});

let messageHide = null;

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = SESSION_TOKEN;

    if (["patch", "put", "delete", "post"].indexOf(config.method) >= 0) {
      //   store.dispatch({ type: START_LOADING });
      //   messageHide = message.loading("Loading...");
    }

    if (jwtToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers[SESSION_HEADER_KEY] = "Bearer " + jwtToken;
    }

    return config;
  },
  (error) => {
    // Do something with Request error here
    // notification.error({
    //   message: "Error",
    // });
    Promise.reject(error);
  }
);

// API response interceptor
service.interceptors.response.use(
  (response) => {
    if (messageHide) {
      messageHide();
    }

    if (["patch", "put"].indexOf(response.config.method) >= 0) {
      //   message.success(
      //     response.config.extraParams?.responseMsg ||
      //       response.data.message ||
      //       "Updated successfully",
      //     2
      //   );
    }
    if (["delete"].indexOf(response.config.method) >= 0) {
      //   message.error(
      //     response.config.extraParams?.responseMsg ||
      //       response.data.message ||
      //       "Deleted successfully",
      //     2
      //   );
    }
    if (["post"].indexOf(response.config.method) >= 0) {
      //   message.success(
      //     response.config.extraParams?.responseMsg ||
      //       response.data.message ||
      //       "Created successfully",
      //     2
      //   );
    }

    // store.dispatch({ type: STOP_LOADING });

    return response.data;
  },
  (error) => {
    if (messageHide) {
      messageHide();
    }

    const notificationParam = {
      message: "Error occurred",
    };

    console.log(error, "responseresponse");

    // Remove token and redirect
    if (error.response.status === 401) {
      notificationParam.message = "Authentication Failed";
      notificationParam.description = "Please login again";
      //   localStorage.removeItem(SESSION_ID_KEY);
      //   window.location = AUTH_PREFIX_PATH;
    }
    if (error.response.status === 403) {
      notificationParam.description = "Permission denied";
    }

    if (error.response.status === 404) {
      notificationParam.description = "Unable to find";
    }

    if (error.response.status === 500) {
      notificationParam.description = "Internal Server Error";
    }

    if (error.response.status === 504) {
      notificationParam.description = "Request Timed Out";
    }
    if (error.response.status === 400) {
      if (error.response.data.message) {
        notificationParam.description = error.response.data.message;
      } else {
        notificationParam.description = `${
          Object.keys(error.response.data)[0]
        }: ${error.response.data[Object.keys(error.response.data)[0]]}`;
      }
    }

    if (notificationParam.description && !error.response.data.code) {
      //   notification.error(notificationParam);
    }

    // store.dispatch({ type: STOP_LOADING });
    return Promise.reject(error.response.data);
  }
);

export default service;
