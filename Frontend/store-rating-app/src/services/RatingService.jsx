import axios from "axios";

const API = "http://localhost:8089/api/rating";

export const rateStore = (data, token) =>
  axios.post(`${API}/rate`, data, { headers: { Authorization: `Bearer ${token}` } });