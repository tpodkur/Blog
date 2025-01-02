import classes from './header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <span className={classes.header__title}>Realworld Blog</span>
      <div className={classes['login-block']}>
        <button className={classes['login-block__button']}>Sign In</button>
        <button className={`${classes['login-block__button']} ${classes['login-block__button--accent']}`}>
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Header;
