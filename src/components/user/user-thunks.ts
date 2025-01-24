import { isAxiosError } from 'axios';

import { AppThunk, createAppAsyncThunk } from '../../redux.ts';
import { removeToken } from '../../shared/token-provider.ts';
import { requestArticles } from '../articles/articles-thunks.ts';

import { userSlice } from './user.slice.ts';

export const register = createAppAsyncThunk(
  'user/register',
  async ({ email, password, username }: { email: string; password: string; username: string }, thunkAPI) => {
    try {
      return await thunkAPI.extra.api.register(email, password, username);
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ error: error.response?.data?.errors });
      }
      throw error;
    }
  }
);

export const login = createAppAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await thunkAPI.extra.api.login(email, password);
      await thunkAPI.dispatch(requestArticles({ refetch: true }));
      await thunkAPI.extra.router.navigate('/articles');
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ error: error.response?.data?.errors });
      }
      throw error;
    }
  }
);

export const getUser = createAppAsyncThunk('user/getUser', async (_, thunkAPI) => {
  try {
    return await thunkAPI.extra.api.getUser();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const logout = (): AppThunk => (dispatch) => {
  removeToken();
  dispatch(userSlice.actions.removeUser());
  dispatch(requestArticles({ refetch: true }));
};

export const updateUser = createAppAsyncThunk(
  'user/updateUser',
  async (
    user: {
      username?: string;
      email?: string;
      password?: string;
      image?: string;
    },
    thunkAPI
  ) => {
    try {
      return await thunkAPI.extra.api.updateUser(user);
    } catch (error) {
      if (isAxiosError(error)) {
        return thunkAPI.rejectWithValue({ error: error.response?.data?.errors });
      }
      throw error;
    }
  }
);
