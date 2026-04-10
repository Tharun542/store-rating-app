import axios from "axios";

const API = "http://localhost:8089/api";

export const getAllStores = (token, search = "", order = "ASC") =>
  axios.get(`${API}/store/all?search=${search}&order=${order}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const addOrUpdateRating = (data, token) =>
  axios.post(`${API}/rating`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getOwnerDashboard = (token) =>
  axios.get(`${API}/owner/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getAdminDashboard = (token) =>
  axios.get(`${API}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const createUser = (data, token) =>
  axios.post(`${API}/admin/create-user`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getUsers = (token, filters) =>
  axios.get(`${API}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
    params: filters
  });

export const getStoresAdmin = (token) =>
  axios.get(`${API}/admin/stores`, {
    headers: { Authorization: `Bearer ${token}` }
  });