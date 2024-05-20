import { BASE_API_URL } from "../config/api";
import axios from "axios";
const createProductFormData = (data) => {
  console.log(data);
  const fd = new FormData();
  fd.append("title", data.Titre);
  fd.append("price", data.Prix);
  fd.append("description", data.Description);
  fd.append("famille", data.Famille);
  fd.append("category", data.Categorie);
  fd.append("type", data.Type);
  fd.append("gamme", data.Gamme);
  fd.append("marque", data.Marque);
  data.images.forEach((image) => {
    fd.append("images", image.file);
  });
  return fd;
};
export const getAllProducts = (page) => {
  return axios.get(`${BASE_API_URL}/products?page=${page}`);
};
export const getProductById = (productId) => {
  return axios.get(`${BASE_API_URL}/products/${productId}`);
};
export const createProduct = (productData) => {
  const fd = createProductFormData(productData);
  return axios.post(`${BASE_API_URL}/products`, fd);
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
