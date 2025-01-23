import { Navigate } from 'react-router-dom';

import SignIn from '../forms/auth/sign-in/sign-in.tsx';
import { useAppSelector } from '../../redux.ts';
import { userSlice } from '../user-info/user.slice.ts';

import classes from './please-auth-message.module.scss';

const PleaseAuthMessage = () => {
  const isUserLoggedIn = useAppSelector((state) => userSlice.selectors.isLoggedIn(state));

  return (
    <div className={classes['please-auth-message']}>
      {isUserLoggedIn && <Navigate to="/" replace />}
      <p className={classes['please-auth-message__text']}>Sorry! This is private page. Please log in or register:</p>
      <SignIn />
    </div>
  );
};

export default PleaseAuthMessage;
