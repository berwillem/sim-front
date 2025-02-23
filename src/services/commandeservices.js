import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const getAllCommandes = (page, isValid = "") => {
  return axios.get(`${BASE_API_URL}/commandes?page=${page}&isValid=${isValid}`);
};

export const getCommandeById = (orderId) => {
  return axios.get(`${BASE_API_URL}/commandes/${orderId}`);
};

export const createCommande = (data) => {
  return axios.post(`${BASE_API_URL}/commandes/create`, data);
};

export const updateCommande = (orderId) => {
  return axios.get(`${BASE_API_URL}/commandes/validate/${orderId}`);
};

export const deleteCommande = (orderId) => {
  return axios.delete(`${BASE_API_URL}/commandes/${orderId}`);
};

export const getTotalCommandesCount = () => {
  return axios.get(`${BASE_API_URL}/commandes/count`);
};

export const getValidCommandesCount = () => {
  return axios.get(`${BASE_API_URL}/commandes/validatedcount`);
};

export const getPendingCommandesCount = () => {
  return axios.get(`${BASE_API_URL}/commandes/pendingcount`);
};

export const getOrdersByFamily = () => {
  return axios.get(`${BASE_API_URL}/commandes/getbyfamily`);
};

export const addFileToOrder = async (orderId, file) => {
  const formData = new FormData();
  formData.append("image", file);

  return axios.put(`${BASE_API_URL}/commandes/addfile/${orderId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
