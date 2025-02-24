import { FormData } from '@/component/login/Login';
import axios from 'axios';
import Cookies from 'js-cookie';

export const api = axios.create({
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

export const signUp =(payload:any)=>{
  return axios.post('http://localhost:7777/signup',payload)
}

export const feeds=(page:number)=>{
  return api.get(`/users?page=${page}&limit=10`)
}

export const passlike=(status:string,id:string)=>{
  return api.post(`send/connection/${status}/${id}`)
}

export const pendingRequest=()=>{
  return api.get('/user/connection/pending')
}

export const AcceptRejectRequest=(status:string,id:string)=>{
  return api.patch(`/user/connection/interested/${status}/${id}`)
}

export const logout=()=>{
  return api.post('/logout')
}

export const getfollowers=()=>{
  return api.get('/user/followers')
}

export const getProfile=()=>{
  return api.get('/profile')
}

export const getUsersDetails =(id:string)=>{
  return api.get(`/posts/${id}`)
}

export const editProfile=(payload:any)=>{
  return api.patch('profile/update',payload)
}