import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const createDevis = (data) => {
  return axios.post(`${BASE_API_URL}/devis`, data);
};

export const getAllDevis = () => {
  return axios.get(`${BASE_API_URL}/devis`);
};

export const getDevisById = (devisId) => {
  return axios.get(`${BASE_API_URL}/devis/${devisId}`);
};

export const updateDevis = (devisId, data) => {
  return axios.put(`${BASE_API_URL}/devis/${devisId}`, data);
};

export const addfileToDevis = (orderId, formData) => {
  return axios.put(`${BASE_API_URL}/devis/addfile/${orderId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const removeFileFromDevis = (devisId, data) => {
  return axios.put(`${BASE_API_URL}/devis/removefile/${devisId}`, data);
};

export const deleteDevis = (devisId) => {
  return axios.delete(`${BASE_API_URL}/devis/${devisId}`);
};

export const getDevisCount = () => {
  return axios.get(`${BASE_API_URL}/devis/count`);
};
