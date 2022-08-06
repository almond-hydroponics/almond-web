import { Middleware, MiddlewareAPI } from 'redux';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { displaySnackMessage } from './slices/snack';

export const rtkQueryErrorSnack: Middleware =
	(api: MiddlewareAPI) => (next) => (action) => {
		if (isRejectedWithValue(action)) {
			api.dispatch(
				displaySnackMessage({
					message: action.error.data.message,
					severity: 'error',
				})
			);
		}

		return next(action);
	};
