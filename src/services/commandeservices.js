import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const getAllCommandes = () => {
  return axios.get(`${BASE_API_URL}/commandes`);
};

export const getCommandeById = (orderId) => {
  return axios.get(`${BASE_API_URL}/commandes/${orderId}`);
};

export const createCommande = (data) => {
  return axios.post(`${BASE_API_URL}/commandes`, data);
};

export const updateCommande = (orderId) => {
  return axios.get(`${BASE_API_URL}/commandes/${orderId}`);
};

export const deleteCommande = (orderId) => {
  return axios.delete(`${BASE_API_URL}/commandes/${orderId}`);
};

export const getTotalCommandesCount = () => {
  return axios.get(`${BASE_API_URL}/commandes/count`);
};
