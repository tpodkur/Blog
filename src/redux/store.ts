import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import { useSelector } from 'react-redux';

import { api } from '../shared/api.ts';

import { articlesSlice } from './articles.slice.ts';

const extraArgument = {
  api,
};

const reducer = combineSlices(articlesSlice);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument },
    }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>();

export default store;
