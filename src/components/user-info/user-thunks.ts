import { AppThunk } from '../../store.ts';

import { userSlice } from './user.slice.ts';

export const register =
  ({ email, password, username }: { email: string; password: string; username: string }): AppThunk =>
  (dispatch, _, { api }) => {
    dispatch(userSlice.actions.userPending());
    api
      .register(email, password, username)
      .then(({ user }) => {
        dispatch(userSlice.actions.setUser({ user }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(userSlice.actions.userFailed({ error: error.response.data.errors }));
      });
  };

export const login =
  ({ email, password }: { email: string; username: string; password: string }): AppThunk =>
  (dispatch, _, { api }) => {
    dispatch(userSlice.actions.userPending());
    api
      .login(email, password)
      .then(({ user }) => {
        dispatch(userSlice.actions.setUser({ user }));
      })
      .catch((error) => {
        console.error(error);
        dispatch(userSlice.actions.userFailed({ error: error.response.data.errors }));
      });
  };
