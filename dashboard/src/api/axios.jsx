import axios from "axios";
const { VITE_API_LOCAL, VITE_API_PRODUCTION, DEV } = import.meta.env;
const BASE_URL = DEV === true ? VITE_API_LOCAL : VITE_API_PRODUCTION;

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
