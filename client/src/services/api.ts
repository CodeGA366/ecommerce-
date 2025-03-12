import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed

// User authentication
export const loginUser = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
};

export const logoutUser = async () => {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
};

// Product management
export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const addProduct = async (product: { name: string; price: number; description: string }) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
};

// User profile
export const fetchUserProfile = async (userId: string) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
};