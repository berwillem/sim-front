import { BASE_API_URL } from "../config/api";
import axios from "axios";

export const getAllNewsletters = (page) => {
  return axios.get(`${BASE_API_URL}/newsletter?page=${page}`);
};

export const createNewsletter = (data) => {
  return axios.post(`${BASE_API_URL}/newsletter/create`, data);
};
