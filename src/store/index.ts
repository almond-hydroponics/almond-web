import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { notificationsSlice } from '@/store/slices/notifications';
import { snackSlice } from '@/store/slices/snack';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';

const rootReducer = combineReducers({
	[snackSlice.name]: snackSlice.reducer,
	[notificationsSlice.name]: notificationsSlice.reducer,
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
