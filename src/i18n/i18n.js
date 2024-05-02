import { BASE_API_URL } from "../../../config/api";
import axios from "axios";
axios.defaults.withCredentials = true;

export const createUser = (data) => {
  return axios.post(`${BASE_API_URL}/auth/user/signup`, data);
};
export const loginUser = (data) => {
  return axios.post(`${BASE_API_URL}/auth/user/login`, data);
};

export const logoutUser = () => {
  return axios.post(`${BASE_API_URL}/auth/user/logout`, {
    withCredentials: true,
  });
};
export const createMagasin = (data) => {
  return axios.post(`${BASE_API_URL}/auth/magasin/signup`, data);
};
export const loginMagasin = (data) => {
  return axios.post(`${BASE_API_URL}/auth/magasin/login`, data);
};

export const logoutMagasin = () => {
  return axios.post(`${BASE_API_URL}/auth/magasin/logout`, {
    withCredentials: true,
  });
};
// password forgot and reset
export const ForgetUser = (email) => {
  return axios.post(`${BASE_API_URL}/auth/user/passforgot`, { email });
};
export const ForgetMagasin = (email) => {
  return axios.post(`${BASE_API_URL}/auth/magasin/passforgot`, { email });
};
