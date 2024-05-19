import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const getAllProducts = (page) => {
  return axios.get(`${BASE_API_URL}/products?page=${page}`);
};
export const getProductById = (productId) => {
  return axios.get(`${BASE_API_URL}/products/${productId}`);
};
export const createProduct = (data) => {
  return axios.post(`${BASE_API_URL}/products`, data);
};
export const updateProduct = (productId, data) => {
  return axios.put(`${BASE_API_URL}/products/${productId}`, data);
};
export const deleteProduct = (productId) => {
  return axios.delete(`${BASE_API_URL}/products/${productId}`);
};
export const getTotalProductsCount = () => {
  return axios.get(`${BASE_API_URL}/products/count`);
};
