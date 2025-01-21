import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useState } from 'react';

import classes from '../../form.module.scss';
import { useAppDispath } from '../../../../redux.ts';
import { register as userRegister } from '../../../user-info/user-thunks.ts';
import { extractError } from '../../../../shared/auth-provider.ts';

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
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispath();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(SignUpSchema), mode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    const { email, password, username } = data;
    dispatch(userRegister({ email, password, username })).then((res) => {
      if (res.error) {
        setErrorMessage(extractError(res.payload.error));
      } else {
        setErrorMessage('');
        reset();
      }
    });
  });

  const onCheckboxChange = () => setChecked((prev) => !prev);

  const error = errorMessage.length ? (
    <span className={classes['form__request-error-message']}>{errorMessage}</span>
  ) : null;

  return (
    <form method="post" onSubmit={onSubmit} className={classes.form}>
      <h1 className={classes.form__title}>Create new account</h1>
      <label className={classes.form__label}>
        Username
        <input
          type="text"
          placeholder="Username"
          className={`${classes.form__input} ${errors.username && classes['form__input--not-valid']}`}
          {...register('username')}
        />
      </label>
      {errors.username && <p className={classes['form__validation-message']}>{errors?.username?.message}</p>}
      <label className={classes.form__label}>
        Email address
        <input
          type="email"
          placeholder="Email address"
          className={`${classes.form__input} ${errors.email && classes['form__input--not-valid']}`}
          {...register('email')}
        />
      </label>
      {errors.email && <p className={classes['form__validation-message']}>{errors?.email?.message}</p>}
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
      <label className={classes.form__label}>
        Repeat password
        <input
          type="password"
          placeholder="Repeat password"
          className={`${classes.form__input} ${errors.confirmPassword && classes['form__input--not-valid']}`}
          {...register('confirmPassword')}
        />
      </label>
      {errors.confirmPassword && (
        <p className={classes['form__validation-message']}>{errors?.confirmPassword?.message}</p>
      )}
      <label className={`${classes.form__permission} ${classes.permission}`}>
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
      {errors.permission && <p className={classes['form__validation-message']}>{errors?.permission?.message}</p>}
      <input type="submit" value="Create" className={classes.form__submit} />
      <p className={classes.form__message}>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes.form__link}>
          Sign In.
        </Link>
      </p>
      {error}
    </form>
  );
};

export default SignUp;
