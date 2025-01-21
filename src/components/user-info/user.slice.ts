import { createSlice } from '@reduxjs/toolkit';

import { register } from './user-thunks.ts';

export type User = {
  username: string;
  email: string;
  avatar?: string | null;
};

type UserError = {
  username?: string;
  email?: string;
  password?: string;
  'email or password'?: string;
};

type UserState = {
  user: User | null;
  request: {
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: string;
  };
};

const initialUserState: UserState = {
  user: null,
  request: {
    status: 'idle',
    error: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  selectors: {
    user: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
    requestError: (state) => state.request.error,
    isUserIdle: (state) => state.request.status === 'idle',
    isUserPending: (state) => state.request.status === 'pending',
    isUserSuccess: (state) => state.request.status === 'success',
    isUserFailed: (state) => state.request.status === 'failed',
  },
  reducers: {
    removeUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.request.status = 'pending';
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.request.status = 'success';
      state.user = user;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<{ error: UserError }>) => {
      const { error }: { error: UserError } = action.payload;

      let message = '';
      message += error.username ? `username ${error.username}` : '';
      message += error.email ? `email ${error.email}` : '';
      message += error.password ? `password ${error.password}` : '';
      message += error['email or password'] ? `email or password ${error['email or password']}` : '';

      state.request.status = 'failed';
      state.request.error = message || 'Request failed with error';
    });
  },
});
