import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type User = {
  username: string;
  email: string;
  token: string;
  avatar?: string | null;
};

type UserError = {
  username?: string;
  email?: string;
  password?: string;
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
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      const { username, email, token, avatar } = action.payload.user;
      return {
        ...state,
        user: {
          ...state.user,
          username,
          email,
          token,
          avatar,
        },
        request: {
          status: 'success',
          error: '',
        },
      };
    },
    removeUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },
    userPending: (state) => {
      return {
        ...state,
        request: {
          status: 'pending',
          error: '',
        },
      };
    },
    userFailed: (state, action: PayloadAction<{ error: UserError }>) => {
      const { error } = action.payload;

      let message = '';
      message += error.username ? `username ${error.username}` : '';
      message += error.email ? `email ${error.email}` : '';
      message += error.password ? `password ${error.password}` : '';

      return {
        ...state,
        request: {
          status: 'failed',
          error: message || 'Request failed with error',
        },
      };
    },
  },
});
