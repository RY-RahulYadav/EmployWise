import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

export const login = (credentials) => axios.post(`${API_BASE_URL}/login`, credentials);

export const fetchUsers = (page) => axios.get(`${API_BASE_URL}/users?page=${page}`);

export const fetchUserById = (id) => axios.get(`${API_BASE_URL}/users/${id}`);

export const updateUser = (id, data) => axios.put(`${API_BASE_URL}/users/${id}`, data);

export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/users/${id}`);
