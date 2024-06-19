import axios from "axios";
import { BASE_API_URL } from "../config/api";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export const getTotalUserCount = () => {
  return axios.get(`${BASE_API_URL}/users/count`);
};

export const getAllUsers = (page) => {
  return axios.get(`${BASE_API_URL}/users?page=${page}`);
};
export const getUserCommandes = (userId) => {
  return axios.get(`${BASE_API_URL}/users/commandes/${userId}`);
};
export const getUserById = (id) => {
  return axios.get(`${BASE_API_URL}/users/${id}`);
};
export const deleteUser = (userId) => {
  return axios.delete(`${BASE_API_URL}/users/${userId}`);
};
export const getUserLevelInfos = (userId) => {
  return axios.get(`${BASE_API_URL}/users/level/${userId}`);
};
