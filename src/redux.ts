import { createAsyncThunk, type UnknownAction } from '@reduxjs/toolkit';
import type { ThunkAction } from 'redux-thunk';
import { useDispatch, useSelector } from 'react-redux';

import { extraArgument } from './app/extra-argument.ts';
import store from './app/store.ts';

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, AppState, typeof extraArgument, UnknownAction>;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: typeof extraArgument;
}>();
