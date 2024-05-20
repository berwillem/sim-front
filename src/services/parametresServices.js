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

// Service to delete a famille
export const deleteFamille = (familleId) => {
  return axios.delete(`${BASE_API_URL}/parametres/famille/${familleId}`);
};

// Service to delete a category
export const deleteCategory = (categoryId) => {
  return axios.delete(`${BASE_API_URL}/parametres/category/${categoryId}`);
};

// Service to delete a type
export const deleteType = (typeId) => {
  return axios.delete(`${BASE_API_URL}/parametres/type/${typeId}`);
};

// Service to get familles count
export const getTotalFamillesCount = () => {
  return axios.get(`${BASE_API_URL}/parametres/famille/count`);
};

// Service to get categories count
export const getTotalCategoriesCount = () => {
  return axios.get(`${BASE_API_URL}/parametres/category/count`);
};

// Service to get types count
export const getTotalTypesCount = () => {
  return axios.get(`${BASE_API_URL}/parametres/type/count`);
};
