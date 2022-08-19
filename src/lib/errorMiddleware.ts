import { isRejectedWithValue } from '@reduxjs/toolkit';
import { displaySnackMessage } from '@store/slices/snack';
import { Middleware, MiddlewareAPI } from 'redux';

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
