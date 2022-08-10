import environment from '@lib/environment';
import axios from 'axios';

// Create axios instance.
const axiosInstance = axios.create({
	baseURL: environment.graphqlUrl,
	withCredentials: true,
});

export default axiosInstance;
