import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust the URL as needed

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

export const addProduct = async (product: { name: string; price: number; description: string; image: File | null }) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  console.log('Token sent:', token);

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('price', product.price.toString());
  if (product.image) {
    formData.append('image', product.image);
  }

  const response = await axios.post(`${API_URL}/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchUserProducts = async () => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const response = await axios.get(`${API_URL}/user/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return the entire response data
};

export const buyProduct = async (productId: string) => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  const response = await axios.post(`${API_URL}/products/${productId}/buy`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// User profile
export const fetchUserProfile = async (userId: string) => {
  const response = await axios.get(`${API_URL}/users/${userId}`);
  return response.data;
};