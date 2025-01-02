import classes from './header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <span>Realworld Blog</span>
      <button>Sign In</button>
      <button>Sign Up</button>
    </header>
  );
};

export default Header;
