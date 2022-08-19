import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

import { snackSlice } from './slices/snack';

const rootReducer = combineReducers({
	[snackSlice.name]: snackSlice.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
	middleware: [logger] as const,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
