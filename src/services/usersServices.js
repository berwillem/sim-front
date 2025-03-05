import axios from "axios";
import { BASE_API_URL } from "../config/api";
// const token = localStorage.getItem("token");
// if(token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export const getTotalUserCount = () => {
  return axios.get(`${BASE_API_URL}/users/count`);
};

export const getAllUsers = (page) => {
  return axios.get(`${BASE_API_URL}/users?page=${page}`);
};
export const getUserCommandes = (userId) => {
  return axios.get(`${BASE_API_URL}/users/commandes/${userId}`);
};
export const getUserDevis = (userId) => {
  return axios.get(`${BASE_API_URL}/users/devis/${userId}`);
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
export const updateUserTour = (userId) => {
  return axios.put(`${BASE_API_URL}/users/tour/${userId}`);
};

export const getAllUserLevels = () => {
  return axios.get(`${BASE_API_URL}/users/levels`);
};

export const attributeUser = (userId, data) => {
  return axios.put(`${BASE_API_URL}/users/type/${userId}`, data);
};

export const getAllpendingUsers = () => {
  return axios.get(`${BASE_API_URL}/users/pendingType`);
};

export const validateAttribution = (userId, validate) => {
  return axios.put(`${BASE_API_URL}/users/validate-attribution/${userId}`, {
    validate,
  });
};

export const AddCodeClient = (userId, code) => {
  return axios.put(`${BASE_API_URL}/users/add-code-client/${userId}`, { code });
};
