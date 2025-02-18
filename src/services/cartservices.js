import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const getCart = (id) => {
  return axios.get(`${BASE_API_URL}/cart/${id}`);
};
export const addCart = ( data) => {
  return axios.post(`${BASE_API_URL}/cart/add`,data);
};
export const removeCart = ( data) => {
  return axios.post(`${BASE_API_URL}/cart/remove`,data);
};
export const clearCart = (data) => {
  return axios.post(`${BASE_API_URL}/cart/clear`,data);
};
