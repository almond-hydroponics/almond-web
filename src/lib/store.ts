import {
	AnyAction,
	combineReducers,
	configureStore,
	ThunkAction,
	PreloadedState,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { snackSlice } from './slices/snack';

const combinedReducers = combineReducers({
	[snackSlice.name]: snackSlice.reducer,
});

export type OurStore = ReturnType<typeof combinedReducers>;

const rootReducer = (
	state: ReturnType<typeof combinedReducers>,
	action: AnyAction
) => {
	if (action.type === HYDRATE) {
		return {
			...state,
			...action.payload,
		};
	}
	return combinedReducers(state, action);
};

const makeStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		// @ts-expect-error
		reducer: rootReducer,
		devTools: true,
		// @ts-expect-error
		middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
		preloadedState,
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, {
	storeKey: 'key',
} as any);
