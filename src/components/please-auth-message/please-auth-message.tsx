import SignIn from '../forms/auth/sign-in/sign-in.tsx';

import classes from './please-auth-message.module.scss';

const PleaseAuthMessage = () => {
  return (
    <div className={classes['please-auth-message']}>
      <p className={classes['please-auth-message__text']}>Sorry! This is private page. Please log in or register:</p>
      <SignIn />
    </div>
  );
};

export default PleaseAuthMessage;
