import axios from "axios";
import { BASE_API_URL } from "../config/api";

export const getTotalUserCount = () => {
  return axios.get(`${BASE_API_URL}/users/count`);
};

export const getAllUsers = (page) => {
  return axios.get(`${BASE_API_URL}/users?page=${page}`);
};
export const deleteUser = (userId) => {
  return axios.delete(`${BASE_API_URL}/users/${userId}`);
};
