import { Link } from 'react-router-dom';

import UserInfo from '../user-info/user-info.tsx';

import classes from './header.module.scss';

const Header = () => {
  // TODO get value from store
  const isUserLoggedIn = true;

  const profile = (
    <div className={classes.profile}>
      <Link to="create-article" className={classes.link}>
        <div className={`${classes.button} ${classes['button--accent']} ${classes['button--small']}`}>
          Create article
        </div>
      </Link>
      {/*TODO get values from store*/}
      <UserInfo author={'John Doe'} avatar={'a'} />
      <div className={`${classes.button} ${classes['button--bordered']}`}>Log Out</div>
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
