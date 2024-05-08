import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const getAllUsers = () => {
  return axios.get(`${BASE_API_URL}/users`);
};
export const deleteUser = (userId) => {
  return axios.get(`${BASE_API_URL}/users/${userId}`);
};
