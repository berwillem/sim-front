import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const SignUpUser = (data) => {
  return axios.post(`${BASE_API_URL}/auth/signup`, data, {
    withCredentials: true,
  });
};
export const SignInUser = (data) => {
  return axios.post(`${BASE_API_URL}/auth/signin`, data, {
    withCredentials: true,
  });
};
export const PasswordForgot = (data) => {
  return axios.post(`${BASE_API_URL}/auth/passforgot`, { email: data });
};
export const PasswordReseting = ({ password, token, id }) => {
  const url = `${BASE_API_URL}/auth/resetpass?token=${token}&id=${id}`;
  return axios.post(url, { password });
};
