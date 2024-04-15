import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.1.95:8000',
    withCredentials: true,
    withXSRFToken: true,
});