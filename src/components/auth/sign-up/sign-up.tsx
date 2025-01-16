import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useState } from 'react';

import classes from '../auth.module.scss';

type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  permission: boolean;
};

const SignUpSchema: ZodType<FormValues> = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Your username needs to be at least 3 characters.' })
      .max(20, { message: 'Your username needs to be 20 characters maximum.' }),
    email: z.string().min(1, { message: 'This is required.' }).email({ message: 'Must be a valid email.' }),
    password: z
      .string()
      .min(6, { message: 'Your password needs to be at least 6 characters.' })
      .max(40, { message: 'Your password needs to be 40 characters maximum.' }),
    confirmPassword: z.string(),
    permission: z.coerce.boolean().refine((x) => x, {
      message: 'You must agree to our terms and conditions.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match.',
    path: ['confirmPassword'],
  });

const SignUp = () => {
  const [checked, setChecked] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(SignUpSchema), mode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  const onCheckboxChange = () => setChecked((prev) => !prev);

  return (
    <form method="post" onSubmit={onSubmit} className={classes.auth}>
      <h1 className={classes.auth__title}>Create new account</h1>
      <label className={classes.auth__label}>
        Username
        <input
          type="text"
          placeholder="Username"
          className={`${classes.auth__input} ${errors.username && classes['auth__input--not-valid']}`}
          {...register('username')}
        />
      </label>
      {errors.username && <p className={classes['auth__validation-message']}>{errors?.username?.message}</p>}
      <label className={classes.auth__label}>
        Email address
        <input
          type="email"
          placeholder="Email address"
          className={`${classes.auth__input} ${errors.email && classes['auth__input--not-valid']}`}
          {...register('email')}
        />
      </label>
      {errors.email && <p className={classes['auth__validation-message']}>{errors?.email?.message}</p>}
      <label className={classes.auth__label}>
        Password
        <input
          type="password"
          placeholder="Password"
          className={`${classes.auth__input} ${errors.password && classes['auth__input--not-valid']}`}
          {...register('password')}
        />
      </label>
      {errors.password && <p className={classes['auth__validation-message']}>{errors?.password?.message}</p>}
      <label className={classes.auth__label}>
        Repeat password
        <input
          type="password"
          placeholder="Repeat password"
          className={`${classes.auth__input} ${errors.confirmPassword && classes['auth__input--not-valid']}`}
          {...register('confirmPassword')}
        />
      </label>
      {errors.confirmPassword && (
        <p className={classes['auth__validation-message']}>{errors?.confirmPassword?.message}</p>
      )}
      <label className={`${classes.auth__permission} ${classes.permission}`}>
        <input
          type="checkbox"
          className={classes.permission__input}
          {...register('permission')}
          onChange={onCheckboxChange}
          checked={checked}
        />
        <span className={classes.permission__checkbox}></span>
        <span className={classes.permission__text}>I agree to the processing of my personal information</span>
      </label>
      {errors.permission && <p className={classes['auth__validation-message']}>{errors?.permission?.message}</p>}
      <input type="submit" value="Create" className={classes.auth__submit} />
      <p className={classes.auth__message}>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes.auth__link}>
          Sign In.
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
