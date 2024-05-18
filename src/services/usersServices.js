import axios from "axios";
import { BASE_API_URL } from "../config/api";

export const getTotalUserCount = () => {
  return axios.get(`${BASE_API_URL}/users/count`);
};

export const getAllUsers = () => {
  return axios.get(`${BASE_API_URL}/users`);
};
export const deleteUser = (userId) => {
  return axios.delete(`${BASE_API_URL}/users/${userId}`);
};
