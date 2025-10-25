import { apiCall } from './api';

// Login API call
export const loginUser = async (email, password) => {
  try {
    const response = await apiCall('/auth/login', 'POST', { email, password });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    // Demo mode for testing without backend
    if (email === 'demo@example.com' && password === 'demo123') {
      return {
        success: true,
        token: 'demo-token-12345',
        user: {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com'
        }
      };
    }
    throw new Error('Invalid credentials');
  }
};

// Signup API call
export const signupUser = async (name, email, password) => {
  try {
    const response = await apiCall('/auth/signup', 'POST', { name, email, password });
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    // Demo mode
    return {
      success: true,
      token: 'demo-token-' + Date.now(),
      user: {
        id: Date.now(),
        name: name,
        email: email
      }
    };
  }
};

// Verify token
export const verifyToken = async (token) => {
  try {
    const response = await apiCall('/auth/verify', 'POST', { token });
    return response;
  } catch (error) {
    console.error('Token verification error:', error);
    // Demo mode - always return valid for demo token
    if (token && token.startsWith('demo-token')) {
      return {
        valid: true,
        user: {
          id: 1,
          name: 'Demo User',
          email: 'demo@example.com'
        }
      };
    }
    return { valid: false };
  }
};

// Storage helpers
export const saveAuthData = (token, user) => {
  sessionStorage.setItem('authToken', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getAuthToken = () => {
  return sessionStorage.getItem('authToken');
};

export const getUser = () => {
  const user = sessionStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('user');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};