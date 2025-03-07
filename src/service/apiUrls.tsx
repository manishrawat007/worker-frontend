import { FormData } from '@/component/login/Login';
import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:7777',
  baseURL: 'https://worker-lytn.onrender.com',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    console.error('Error in the api:', error);
    return Promise.reject(error);
  }
);

// Login api 

export const loginapi = (payload: FormData) => {
  return api.post('/login', payload)
}

export const signUp = (payload: any) => {
  return axios.post('https://worker-lytn.onrender.com/signup', payload)
}

export const feeds = (page: number) => {
  return api.get(`/users?page=${page}&limit=10`)
}

export const passlike = (status: string, id: string) => {
  return api.post(`send/connection/${status}/${id}`)
}

export const pendingRequest = () => {
  return api.get('/user/connection/pending')
}

export const AcceptRejectRequest = (status: string, id: string) => {
  return api.patch(`/user/connection/interested/${status}/${id}`)
}

export const logout = () => {
  return api.post('/logout')
}

export const getfollowers = () => {
  return api.get('/user/followers')
}

export const getProfile = () => {
  return api.get('/profile')
}

export const getUsersDetails = (id: string) => {
  return api.get(`/posts/${id}`)
}

export const editProfile = (payload: any) => {
  return api.patch('profile/update', payload)
}

export const uploadPost = (payload: any) => {
  return api.post('/post/upload', payload)
}

export const sendMessage = (recieverId: any, payload: { message: string }) => {
  return api.post(`/send/message/${recieverId}`, payload)
}

export const getUserMessage = (recieverId: any,) => {
  return api.get(`/user/message/${recieverId}`)
}

export const verifyOtp = (payload: any) => {
  return api.post(`/verify-otp`, payload)
}

export const userMessagesList = () => {
  return api.get(`/users/message/list`)
}

export const updateProfileAndCoverPic = (payload: any) => {
  return api.patch(`/profile/update/cover`, payload)
}

