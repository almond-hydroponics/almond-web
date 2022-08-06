import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Severity = 'success' | 'error';

export interface SnackMessage {
	message: string;
	severity?: Severity;
}

const snackInitialState: SnackMessage = {
	message: '',
	severity: 'success',
};

export const snackSlice = createSlice({
	name: 'snack',
	initialState: snackInitialState,
	reducers: {
		displaySnackMessage(state, action: PayloadAction<SnackMessage>) {
			state.message = action.payload.message;
			state.severity = action.payload.severity;
		},
	},
});

export const { displaySnackMessage } = snackSlice.actions;
