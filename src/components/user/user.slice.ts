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
    register: {
      status: 'idle' | 'pending' | 'success' | 'failed';
      error: string;
    };
    login: {
      status: 'idle' | 'pending' | 'success' | 'failed';
      error: string;
    };
    getUser: {
      status: 'idle' | 'pending' | 'success' | 'failed';
      error: string;
    };
    updateUser: {
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
    getUser: {
      status: 'idle',
      error: '',
    },
    updateUser: {
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
    loginError: (state) => state.requests.login.error,
    registerError: (state) => state.requests.register.error,
    updateUserError: (state) => state.requests.updateUser.error,
  },
  reducers: {
    removeUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },
    setEditFormError: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        requests: {
          ...state.requests,
          updateUser: {
            ...state.requests.updateUser,
            error: action.payload,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.requests.register.status = 'pending';
      state.requests.register.error = '';
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
      const { user } = action.payload;
      state.requests.register.status = 'success';
      state.user = user;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.requests.register.status = 'failed';
      state.requests.register.error = action.payload as string;
    });
    builder.addCase(login.pending, (state) => {
      state.requests.login.status = 'pending';
      state.requests.login.error = '';
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.requests.login.status = 'success';
      state.user = user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.requests.login.status = 'failed';
      state.requests.login.error = action.payload as string;
    });
    builder.addCase(getUser.pending, (state) => {
      state.requests.getUser.status = 'pending';
      state.requests.getUser.error = '';
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.requests.getUser.status = 'success';
      state.user = user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.requests.getUser.status = 'failed';
      state.requests.register.error = action.payload as string;
    });
    builder.addCase(updateUser.pending, (state) => {
      state.requests.updateUser.status = 'pending';
      state.requests.updateUser.error = '';
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const { user } = action.payload;
      state.requests.updateUser.status = 'success';
      state.user = user;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.requests.updateUser.status = 'failed';
      state.requests.updateUser.error = action.payload as string;
    });
  },
});
