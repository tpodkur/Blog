import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

import classes from '../../form.module.scss';

type FormValues = {
  email: string;
  password: string;
};

const SignInSchema: ZodType<FormValues> = z.object({
  email: z.string().min(1, { message: 'This is required.' }).email({ message: 'Must be a valid email.' }),
  password: z.string().min(1, { message: 'This is required.' }),
});

const SignIn = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(SignInSchema), mode: 'onBlur' });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <form method="post" onSubmit={onSubmit} className={classes.form}>
      <h1 className={classes.form__title}>Sign In</h1>
      <label className={classes.form__label}>
        Email address
        <input
          type="email"
          placeholder="Email address"
          className={`${classes.form__input} ${errors.email && classes['form__input--not-valid']}`}
          {...register('email')}
        />
        {errors.email && <p className={classes['form__validation-message']}>{errors?.email?.message}</p>}
      </label>
      <label className={classes.form__label}>
        Password
        <input
          type="password"
          placeholder="Password"
          className={`${classes.form__input} ${errors.password && classes['form__input--not-valid']}`}
          {...register('password')}
        />
      </label>
      {errors.password && <p className={classes['form__validation-message']}>{errors?.password?.message}</p>}
      <input type="submit" value="Login" className={classes.form__submit} disabled={!isValid} />
      <p className={classes.form__message}>
        Don&#39;t have an account?{' '}
        <Link to="/sign-up" className={classes.form__link}>
          Sign Up.
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
