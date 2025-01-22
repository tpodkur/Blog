import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { useState } from 'react';

import classes from '../form.module.scss';
import { updateUser } from '../../user-info/user-thunks.ts';
import { extractError } from '../../../shared/auth-provider.ts';
import { useAppDispath } from '../../../redux.ts';

type FormValues = {
  username: string;
  email: string;
  password: string;
  avatar: string;
};

const EditProfileSchema: ZodType<FormValues> = z.object({
  username: z
    .string()
    .min(3, { message: 'Your username needs to be at least 3 characters.' })
    .max(20, { message: 'Your username needs to be 20 characters maximum.' })
    .or(z.literal('')),
  email: z.string().email({ message: 'Must be a valid email.' }).or(z.literal('')),
  password: z
    .string()
    .min(6, { message: 'Your password needs to be at least 6 characters.' })
    .max(40, { message: 'Your password needs to be 40 characters maximum.' })
    .or(z.literal('')),
  avatar: z.string().url().or(z.literal('')),
});

const EditProfile = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispath();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(EditProfileSchema), mode: 'onSubmit' });

  const isEmptyForm = (data: FormValues) => {
    for (const prop in data) {
      if (data[prop]) return false;
    }
    return true;
  };

  const getObjectWithoutEmptyFields = (data: FormValues) => {
    const res = {};
    for (const prop in data) {
      if (data[prop]) {
        res[prop] = data[prop];
      }
    }
    return res;
  };

  const onSubmit = handleSubmit((data) => {
    if (isEmptyForm(data)) {
      setErrorMessage('At least one field must be not empty.');
      return;
    }
    const clearData = getObjectWithoutEmptyFields(data);
    dispatch(updateUser(clearData)).then((res) => {
      if (res.error) {
        setErrorMessage(extractError(res.payload.error));
      } else {
        setErrorMessage('');
        reset();
      }
    });
  });

  const error = errorMessage.length ? <span className={classes['form__error-message']}>{errorMessage}</span> : null;

  return (
    <form method="post" onSubmit={onSubmit} className={classes.form}>
      <h1 className={classes.form__title}>Edit Profile</h1>
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
        {errors.email && <p className={classes['form__validation-message']}>{errors?.email?.message}</p>}
      </label>
      <label className={classes.form__label}>
        New Password
        <input
          type="password"
          placeholder="New password"
          className={`${classes.form__input} ${errors.password && classes['form__input--not-valid']}`}
          {...register('password')}
        />
      </label>
      {errors.password && <p className={classes['form__validation-message']}>{errors?.password?.message}</p>}
      <label className={classes.form__label}>
        Avatar image (url)
        <input
          type="text"
          placeholder="Avatar image"
          className={`${classes.form__input} ${errors.avatar && classes['form__input--not-valid']}`}
          {...register('avatar')}
        />
      </label>
      {errors.avatar && <p className={classes['form__validation-message']}>{errors?.avatar?.message}</p>}
      <input type="submit" value="Save" className={classes.form__submit} />
      {error}
    </form>
  );
};

export default EditProfile;
