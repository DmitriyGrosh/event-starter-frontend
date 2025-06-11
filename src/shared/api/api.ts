import axios from 'axios';
import { API_BASE_URL, AUTH_HEADER, AUTH_TOKEN_PREFIX } from '@/shared/const';
import { getAuthHeader } from '@/shared/lib/auth';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
    (config) => {
        const authHeader = getAuthHeader();
        if (authHeader[AUTH_HEADER]) {
            config.headers[AUTH_HEADER] = authHeader[AUTH_HEADER];
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors here
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request setup error:', error.message);
        }
        return Promise.reject(error);
    }
); 