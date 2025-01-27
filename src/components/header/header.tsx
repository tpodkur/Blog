import { Link, useLocation } from 'react-router-dom';

import { useAppDispath, useAppSelector } from '../../redux.ts';
import { userSlice } from '../user/user.slice.ts';
import UserInfo from '../user/user-info/user-info.tsx';
import { logout } from '../user/user-thunks.ts';
import { isPrivateRoute, router } from '../../app/router.tsx';

import classes from './header.module.scss';

const Header = () => {
  const dispath = useAppDispath();
  const location = useLocation();
  const isUserLoggedIn = useAppSelector((state) => userSlice.selectors.isLoggedIn(state));
  const { username, image } = useAppSelector((state) => userSlice.selectors.user(state)) ?? { username: '' };
  const handleLodOut = () => {
    dispath(logout());
    if (isPrivateRoute(location.pathname)) router.navigate('/unauthorized');
  };

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
      <button className={`${classes.button} ${classes['button--bordered']}`} onClick={handleLodOut}>
        Log Out
      </button>
    </div>
  );

  const login = (
    <div className={classes.login}>
      <Link to="sign-in" className={classes.link}>
        <button tabIndex={-1} className={classes.button}>
          Sign In
        </button>
      </Link>
      <Link to="sign-up" className={classes.link}>
        <button tabIndex={-1} className={`${classes.button} ${classes['button--accent']}`}>
          Sign Up
        </button>
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
