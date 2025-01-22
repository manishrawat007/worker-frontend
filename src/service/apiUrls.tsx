import { FormData } from '@/component/login/Login';
import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:7777',
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['token'] = token;
    }

    console.log('Request Sent:', config);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Login api 

export const loginapi=(payload:FormData)=>{
    return api.post('/login',payload,{withCredentials: true})
}

export const feeds=(page:number)=>{
  return api.get(`/users?page=${page}&limit=10`)
}

export const passlike=(status:string,id:string)=>{
  return api.post(`send/connection/${status}/${id}`)
}