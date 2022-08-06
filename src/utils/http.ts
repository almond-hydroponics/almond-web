// third-party libraries
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
// helpers
import authService from '@utils/auth';

const cacheAdapter = setupCache({
	maxAge: 15 * 60 * 1000,
});

const token = authService.getToken();
const headers = {
	Authorization: `Bearer ${token}`,
};

// create axios instance
const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_ALMOND_API,
	headers: authService.isAuthenticated() ? headers : undefined,
	// withCredentials: true,
	adapter: cacheAdapter.adapter,
});

http.interceptors.request.use((config) => {
	if (token && authService.isExpired()) {
		return authService.redirectUser();
	}
	return config;
});

export default http;
