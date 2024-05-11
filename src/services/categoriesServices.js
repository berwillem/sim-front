import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const CreateMarque = (data) => {
  return axios.post(`${BASE_API_URL}/categories/marque`, data);
};
export const CreateGamme = (data) => {
  return axios.post(`${BASE_API_URL}/categories/gamme`, data);
};
export const CreateCategory = (data) => {
  return axios.post(`${BASE_API_URL}/categories/category`, data);
};
export const getAllMarques = () => {
  return axios.get(`${BASE_API_URL}/categories/marque`);
};
export const getAllGammes = () => {
  return axios.get(`${BASE_API_URL}/categories/gamme`);
};
export const getAllCategories = () => {
  return axios.get(`${BASE_API_URL}/categories/category`);
};
