import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { register, login, getUser, updateUser } from './user-thunks.ts';

export type User = {
  username: string;
  email: string;
  image?: string;
};

type UserState = {
  user: User | null;
  requests: {
    registerStatus: 'idle' | 'pending' | 'success' | 'failed';
    loginStatus: 'idle' | 'pending' | 'success' | 'failed';
    userStatus: 'idle' | 'pending' | 'success' | 'failed';
    updateStatus: 'idle' | 'pending' | 'success' | 'failed';
  };
};

const initialUserState: UserState = {
  user: null,
  requests: {
    registerStatus: 'idle',
    loginStatus: 'idle',
    userStatus: 'idle',
    updateStatus: 'idle',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  selectors: {
    user: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
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
      state.requests.registerStatus = 'pending';
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.requests.registerStatus = 'success';
      state.user = user;
    });
    builder.addCase(register.rejected, (state) => {
      state.requests.registerStatus = 'failed';
    });
    builder.addCase(login.pending, (state) => {
      state.requests.loginStatus = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.requests.loginStatus = 'success';
      state.user = user;
    });
    builder.addCase(login.rejected, (state) => {
      state.requests.loginStatus = 'failed';
    });
    builder.addCase(getUser.pending, (state) => {
      state.requests.userStatus = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.requests.userStatus = 'success';
      state.user = user;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.requests.userStatus = 'failed';
    });
    builder.addCase(updateUser.pending, (state) => {
      state.requests.updateStatus = 'pending';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.requests.updateStatus = 'success';
      state.user = user;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.requests.updateStatus = 'failed';
    });
  },
});
