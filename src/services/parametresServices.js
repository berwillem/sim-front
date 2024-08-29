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
export const createType = (data ) => {
  return axios.post(`${BASE_API_URL}/parametres/type`, data);
};

export const getAllFamilles = (pagination = false, page = 1) => {
  return axios.get(`${BASE_API_URL}/parametres/famille`, {
    params: {
      pagination: pagination.toString(),
      page,
    },
  });
};
export const getFamilleById = (familleId) => {
  return axios.get(`${BASE_API_URL}/parametres/famille/${familleId}`);
};

// Service to get all categories
export const getAllCategories = (pagination = false, page = 1) => {
  return axios.get(`${BASE_API_URL}/parametres/category`, {
    params: {
      pagination: pagination.toString(),
      page,
    },
  });
};

// Service to get all types
export const getAllTypes = (pagination = false, page = 1) => {
  return axios.get(`${BASE_API_URL}/parametres/type`, {
    params: {
      pagination: pagination.toString(),
      page,
    },
  });
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
