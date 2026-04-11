import axios from "axios";

const API = "https://store-rating-app-x0zo.onrender.com/api/rating";

export const rateStore = (data, token) =>
  axios.post(`${API}/rate`, data, { headers: { Authorization: `Bearer ${token}` } });