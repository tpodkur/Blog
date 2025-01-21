import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { register, login, getUser } from './user-thunks.ts';

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
  requests: {
    register: {
      status: 'idle' | 'pending' | 'success' | 'failed';
      error: string;
    };
    login: {
      status: 'idle' | 'pending' | 'success' | 'failed';
      error: string;
    };
    user: {
      status: 'idle' | 'pending' | 'success' | 'failed';
      error: string;
    };
  };
};

const initialUserState: UserState = {
  user: null,
  requests: {
    register: {
      status: 'idle',
      error: '',
    },
    login: {
      status: 'idle',
      error: '',
    },
    user: {
      status: 'idle',
      error: '',
    },
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  selectors: {
    user: (state) => state.user,
    isLoggedIn: (state) => !!state.user,
    registerReqestError: (state) => state.requests.register.error,
    loginReqestError: (state) => state.requests.login.error,
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
      state.requests.register.status = 'pending';
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.requests.register.status = 'success';
      state.user = user;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<{ error: UserError }>) => {
      const { error } = action.payload;
      state.requests.register.status = 'failed';
      state.requests.register.error = extractError(error) || 'Request failed with error';
    });
    builder.addCase(login.pending, (state) => {
      state.requests.login.status = 'pending';
    });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.requests.login.status = 'success';
      state.user = user;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<{ error: UserError }>) => {
      const { error } = action.payload;
      state.requests.login.status = 'failed';
      state.requests.login.error = extractError(error) || 'Request failed with error';
    });
    builder.addCase(getUser.pending, (state) => {
      state.requests.user.status = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.requests.user.status = 'success';
      state.user = user;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.requests.user.status = 'failed';
    });
  },
});

const extractError = (error: UserError): string => {
  let message = '';
  message += error.username ? `username ${error.username}` : '';
  message += error.email ? `email ${error.email}` : '';
  message += error.password ? `password ${error.password}` : '';
  message += error['email or password'] ? `email or password ${error['email or password']}` : '';

  return message;
};
