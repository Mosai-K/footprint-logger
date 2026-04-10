import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
    baseURL: config.backendUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// inject the JWT token later
apiClient.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem('ecotrack_user'));
    if (user && user.token) {
        //to handle tpken
        req.headers.Authorization = `Bearer ${user.token}`;
    }
    return req;
});

export const api = {
    auth: {
        register: async (email, password) => {
            const res = await apiClient.post('/auth/register', { email, password });
            return res.data;
        },
        login: async (email, password) => {
            const res = await apiClient.post('/auth/login', { email, password });
            return res.data;
        },
    },
    logs: {
        getByUser: async (userId) => {
            const res = await apiClient.get(`/logs/${userId}`);
            return res.data;
        },
        add: async (logData) => {
            const res = await apiClient.post('/logs', logData);
            return res.data;
        },
        delete: async (id) => {
            await apiClient.delete(`/logs/${id}`);
        },
    },
    community: {
        getAverage: async () => {
            const res = await apiClient.get('/community/average');
            return res.data;
        },
    },
};