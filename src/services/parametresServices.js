import { BASE_API_URL } from "../config/api";
import axios from "axios";

// Service to create a new famille
export const createFamille = (data) => {
  return axios.post(`${BASE_API_URL}/parametres/famille`, data);
};

// Service to create a new category
export const createCategory = (data) => {
  return axios.post(`${BASE_API_URL}/parametres/category`, data);
};

// Service to create a new type
export const createType = (data) => {
  return axios.post(`${BASE_API_URL}/parametres/type`, data);
};

// Service to get all familles
export const getAllFamilles = () => {
  return axios.get(`${BASE_API_URL}/parametres/famille`);
};

// Service to get all categories
export const getAllCategories = () => {
  return axios.get(`${BASE_API_URL}/parametres/category`);
};

// Service to get all types
export const getAllTypes = () => {
  return axios.get(`${BASE_API_URL}/parametres/type`);
};
