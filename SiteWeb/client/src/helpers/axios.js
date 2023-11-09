import axios from 'axios';
import { api } from '../urlConfig';

const axiosInstance = axios.create({
    baseURL: api,
    //headers: {
   //     'Content-Type': 'application/json'
   // }
})

export default axiosInstance;