import axios from 'axios';
import environment from './environment';

// Create axios instance.
const axiosInstance = axios.create({
	baseURL: environment.graphqlUrl,
	withCredentials: true,
});

export default axiosInstance;
