import { Link } from 'react-router-dom';

import classes from '../auth.module.scss';

const SignIn = () => {
  return (
    <form method="post" className={classes.auth}>
      <h1 className={classes.auth__title}>Create new account</h1>
      <label className={classes.auth__label}>
        Username
        <input type="text" name="username" placeholder="Username" className={classes.auth__input} />
      </label>
      <label className={classes.auth__label}>
        Email address
        <input type="email" name="email" placeholder="Email address" className={classes.auth__input} />
      </label>
      <label className={classes.auth__label}>
        Password
        <input type="password" name="password" placeholder="Password" className={classes.auth__input} />
      </label>
      <label className={classes.auth__label}>
        Repeat password
        <input type="password" name="repeat-password" placeholder="Repeat password" className={classes.auth__input} />
      </label>
      <label className={`${classes.auth__permission} ${classes.permission}`}>
        <input
          type="checkbox"
          name="agree-checkbox"
          id="agree-checkbox"
          className={classes.permission__input}
          checked
        />
        <span className={classes.permission__checkbox}></span>
        <span className={classes.permission__text}>I agree to the processing of my personal information</span>
      </label>
      <input type="submit" value="Create" className={classes.auth__submit} />
      <p className={classes.auth__message}>
        Already have an account?{' '}
        <Link to="/sign-up" className={classes.auth__link}>
          Sign In.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
