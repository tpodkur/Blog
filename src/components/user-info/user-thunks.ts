import { createAppAsyncThunk } from '../../redux.ts';

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

export const login = createAppAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await thunkAPI.extra.api.login(email, password);
      await thunkAPI.extra.router.navigate('/articles');
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data.errors });
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
