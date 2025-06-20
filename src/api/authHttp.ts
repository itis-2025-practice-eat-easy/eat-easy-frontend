import axios from 'axios';

const authHttp = axios.create({
    baseURL: 'http://5.104.75.208:8080',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export default authHttp;
