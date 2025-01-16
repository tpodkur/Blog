import { Link } from 'react-router-dom';

import classes from './header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__title}>
        Realworld Blog
      </Link>
      <div>
        <Link to="sign-in">
          <button className={classes['login-button']}>Sign In</button>
        </Link>
        <Link to="sign-up">
          <button className={`${classes['login-button']} ${classes['login-button--accent']}`}>Sign Up</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
