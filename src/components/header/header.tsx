import { Link } from 'react-router-dom';

import { useAppDispath, useAppSelector } from '../../redux.ts';
import { userSlice } from '../user-info/user.slice.ts';
import UserInfo from '../user-info/user-info.tsx';
import { logout } from '../user-info/user-thunks.ts';

import classes from './header.module.scss';

const Header = () => {
  const dispath = useAppDispath();
  const isUserLoggedIn = useAppSelector((state) => userSlice.selectors.isLoggedIn(state));
  const { username, image } = useAppSelector((state) => userSlice.selectors.user(state)) ?? {};
  const handleLodOut = () => dispath(logout());

  const profile = (
    <div className={classes.profile}>
      <Link to="new-article" className={classes.link}>
        <div className={`${classes.button} ${classes['button--accent']} ${classes['button--small']}`}>
          Create article
        </div>
      </Link>
      <Link to="edit-profile" className={classes.link}>
        <span className={classes.user}>
          <UserInfo author={username} image={image} />
        </span>
      </Link>
      <div className={`${classes.button} ${classes['button--bordered']}`} onClick={handleLodOut}>
        Log Out
      </div>
    </div>
  );

  const login = (
    <div className={classes.login}>
      <Link to="sign-in" className={classes.link}>
        <div className={`${classes.button}`}>Sign In</div>
      </Link>
      <Link to="sign-up" className={classes.link}>
        <div className={`${classes.button} ${classes['button--accent']}`}>Sign Up</div>
      </Link>
    </div>
  );

  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__title}>
        Realworld Blog
      </Link>
      {isUserLoggedIn ? profile : login}
    </header>
  );
};

export default Header;
