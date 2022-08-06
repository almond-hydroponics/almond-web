// third-party libraries
import Cookies from 'js-cookie';
// helpers
import authService from '@utils/auth';
import store from '../store';
import { axiosMockAdapter, expiredToken, token } from '../testHelpers';
import http from './http';

describe('The http axios instance helper function', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'location', {
			writable: true,
			value: { assign: jest.fn() },
		});

		Object.defineProperty(window.location, 'replace', {
			writable: true,
			value: { assign: jest.fn() },
		});

		authService.logoutUser = jest.fn();
		authService.redirectUser = jest.fn();
		window.location.replace = jest.fn();
	});

	const response = {
		status: 200,
		data: {},
		headers: {},
	};

	const error = {
		response: {
			status: 500,
			data: {
				message: 'token has expired',
			},
			headers: {},
		},
	};
	const serverErrorMock = {
		response: {
			status: 500,
			data: {
				message: 'Internal Server Error',
			},
			headers: {},
		},
	};

	it.skip('should NOT log user out or redirect user to root (/) when the token is NOT expired', (done) => {
		Cookies.set('accessToken', token);
		axiosMockAdapter(response, null);

		http('/my-device').then(() => {
			expect(authService.logoutUser).not.toHaveBeenCalled();
			expect(window.location.replace).not.toHaveBeenCalled();
			done();
		});
	});

	it.skip('should log user out and redirect user to root (/) when the token is expired', (done) => {
		Cookies.set('accessToken', expiredToken);
		axiosMockAdapter(response, null);

		http('/dashboard').then(() => {
			expect(authService.redirectUser).toHaveBeenCalled();
			done();
		});
	});

	it.skip('should log user out and redirect user to root (/) when a server error (500) is returned', (done) => {
		Cookies.set('accessToken', token);
		axiosMockAdapter(null, error);

		http('/dashboard').catch(() => {
			expect(authService.redirectUser).toHaveBeenCalled();
			done();
		});
	});

	it.skip('should render 500 error components', (done) => {
		Cookies.set('accessToken', token);
		axiosMockAdapter(null, serverErrorMock);

		http('/dashboard').catch(() => {
			expect(store.dispatch).toHaveBeenCalled();
			done();
		});
	});
});
