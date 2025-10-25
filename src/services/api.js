import { API_BASE_URL } from '../utils/constants';
import { getAuthToken } from './authService';

// Generic API call function with authentication
export const apiCall = async (endpoint, method = 'GET', body = null) => {
  const token = getAuthToken();
  
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authorization header if token exists
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        throw new Error('Unauthorized');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};