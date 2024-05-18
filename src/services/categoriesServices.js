import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const CreateCategory = (data) => {
  return axios.post(`${BASE_API_URL}/categories/category`, data);
};
export const CreateMarque = (data) => {
  return axios.post(`${BASE_API_URL}/categories/marque`, data);
};
export const getAllMarques = () => {
  return axios.get(`${BASE_API_URL}/categories/marque`);
};
export const CreateGamme = (data) => {
  return axios.post(`${BASE_API_URL}/categories/gamme`, data);
};
export const getAllCategories = () => {
  return axios.get(`${BASE_API_URL}/categories/category`);
};

export const getAllGammes = () => {
  return axios.get(`${BASE_API_URL}/categories/gamme`);
};
