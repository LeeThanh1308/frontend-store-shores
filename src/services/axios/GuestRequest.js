import { isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

const GuestRequest = axios.create({
  baseURL: "http://localhost:8080/",
});

GuestRequest.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default GuestRequest;
