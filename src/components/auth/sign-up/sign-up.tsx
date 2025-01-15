import classes from '../auth.module.scss';

const SignUp = () => {
  return (
    <form method="post" className={classes.auth}>
      <h1 className={classes.auth__title}>Sign In</h1>
      <label className={classes.auth__label}>
        Email address
        <input type="email" name="email" placeholder="Email address" className={classes.auth__input} />
      </label>
      <label className={classes.auth__label}>
        Password
        <input type="password" name="password" placeholder="Password" className={classes.auth__input} />
      </label>
      <input type="submit" value="Login" className={classes.auth__submit} />
      <p className={classes.auth__message}>
        Don&#39;t have an account? <a className={classes.auth__link}>Sign Up </a>
      </p>
    </form>
  );
};

export default SignUp;
