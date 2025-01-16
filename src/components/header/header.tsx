import { Link } from 'react-router-dom';

import classes from './header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <Link to="/" className={classes.header__title}>
        Realworld Blog
      </Link>
      <div className={classes.login}>
        <Link to="sign-in" className={classes.link}>
          <div className={classes['login__button']}>Sign In</div>
        </Link>
        <Link to="sign-up" className={classes.link}>
          <div className={`${classes['login__button']} ${classes['login__button--accent']}`}>Sign Up</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
