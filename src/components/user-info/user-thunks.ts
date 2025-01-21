import { AppThunk, createAppAsyncThunk } from '../../redux.ts';

import { userSlice } from './user.slice.ts';

export const register = createAppAsyncThunk(
  'user/register',
  async ({ email, password, username }: { email: string; password: string; username: string }, thunkAPI) => {
    try {
      return await thunkAPI.extra.api.register(email, password, username);
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.errors });
    }
  }
);

export const login =
  ({ email, password }: { email: string; password: string }): AppThunk<Promise<void>> =>
  async (dispatch, _, { api, router }) => {
    dispatch(userSlice.actions.userPending());
    try {
      const { user } = await api.login(email, password);
      await router.navigate('/articles');
      dispatch(userSlice.actions.setUser({ user }));
    } catch (error) {
      console.error(error);
      dispatch(userSlice.actions.userFailed({ error: error.response.data.errors }));
    }
  };
