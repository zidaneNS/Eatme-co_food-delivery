import axios, { AxiosInstance } from "axios";

const BASE_URL: string = 'http://localhost:3000';

export const axiosPrivate: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})