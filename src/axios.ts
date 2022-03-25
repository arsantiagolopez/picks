import axiosStatic, { AxiosInstance } from "axios";

const axios: AxiosInstance = axiosStatic.create({
  baseURL: process.env.NEXTAUTH_URL,
  withCredentials: true,
  responseType: "json",
});

export default axios;
