import { createSlice } from '@reduxjs/toolkit';

export type User = {
  username: string | null;
  email: string | null;
  token: string | null;
  avatar: string | null;
};

const initialUserState: User = {
  username: null,
  email: null,
  token: null,
  avatar: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  selectors: {
    user: (state) => ({
      username: state.username,
      email: state.email,
      avatar: state.avatar,
    }),
  },
  reducers: {
    setUser: (_, action) => {
      const { username, email, token, avatar } = action.payload;
      return {
        username,
        email,
        token,
        avatar,
      };
    },
    removeUser: () => ({
      username: null,
      email: null,
      token: null,
      avatar: null,
    }),
  },
});
