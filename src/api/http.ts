import axios, {  type AxiosError} from 'axios';

const http = axios.create({
    baseURL: '',
    headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

export default http;
