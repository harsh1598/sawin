import axios from "axios";
import { toast } from 'react-toastify';

const LOGIN_BASE_URL = "https://sawin-basic-webapi-po.azurewebsites.net/";

// const LOGIN_BASE_URL = "https://sawinprov4-prospect-webapi-prospect.azurewebsites.net/"

const BASE_URL = LOGIN_BASE_URL + "api/";

export const GOOGLE_MAP_API_KEY = "AIzaSyAbGxCGRyI51IgjLi3sebel2fhLiMJ5Ygc";

interface PropData {
  action: string;
  body: any;
}

const WebService = {
  postAPI: function (props: PropData) {
    // eslint-disable-line
    return new Promise((resolve, reject) => {
      var bodyFormData = new URLSearchParams();
      for (let key in props.body) {
        bodyFormData.append(key, props.body[key]);
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .post(`${BASE_URL}${props.action}`, props.body, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(this.errorHandler(error));
        });
    });
  },
  putAPI: function (props: PropData) {
    // eslint-disable-line
    return new Promise((resolve, reject) => {
      var bodyFormData = new URLSearchParams();
      for (let key in props.body) {
        bodyFormData.append(key, props.body[key]);
      }
      const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .put(`${BASE_URL}${props.action}`, props.body, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(this.errorHandler(error));
        });
    });
  },

  getAccesstoken: function (props: PropData) {
    // eslint-disable-line
    return new Promise((resolve, reject) => {
      var bodyFormData = new URLSearchParams();
      for (let key in props.body) {
        bodyFormData.append(key, props.body[key]);
      }
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      axios
        .post(`${LOGIN_BASE_URL}${props.action}`, bodyFormData, {
          headers: headers,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          resolve(response.data);
        })
        .catch((error) => {
          reject(this.errorHandler(error));
        });
    });
  },

  getAPI: function (props: PropData) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .get(`${BASE_URL}${props.action}`, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(this.errorHandler(error));
        });
    });
  },

  multipleCall: function () {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .all([])
        .then(
          axios.spread((firstResponse, secondResponse, thirdResponse) => {
            resolve(firstResponse);
          })
        )
        .catch((error) => console.log(error));
    });
  },

  deleteAPI: function (props: PropData) {
    return new Promise((resolve, reject) => {
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .delete(`${BASE_URL}${props.action}`, {
          headers: headers,
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(this.errorHandler(error));
        });
    });
  },

  errorHandler: function (error: any) {
    if (error?.response !== null) {
      error = error.response;
    }
    var errorMessage;
    if (!error || !error.status) {
      errorMessage = "Server Not Responding";
    } else if (error.status === 401) {
      errorMessage =
        (error && error.data && error.data.message) || "Bad Response";
    } else if (error.status === 500) {
      errorMessage = (error && error.data && error.data.ErrorDetails && error.data.ErrorDetails.message) || "Server Error";
    } else {
      errorMessage = error.data.error_description;
    }
    toast.error(errorMessage);
    return errorMessage;
  },
};

export default WebService;
