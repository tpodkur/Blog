import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import React, { useState } from 'react';

import classes from '../form.module.scss';
import { updateUser } from '../../user/user-thunks.ts';
import { useAppDispath, useAppSelector } from '../../../redux.ts';
import { userSlice } from '../../user/user.slice.ts';

type FormValues = Record<string, string>;

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
  image: z.string().url().or(z.literal('')),
});

const EditProfile = () => {
  const dispatch = useAppDispath();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(EditProfileSchema), mode: 'onSubmit' });
  const errorMessage = useAppSelector((state) => userSlice.selectors.updateUserError(state));

  const isEmptyForm = (data: FormValues) => {
    for (const prop in data) {
      if (data[prop]) return false;
    }
    return true;
  };

  const getObjectWithoutEmptyFields = (data: FormValues) => {
    const res: FormValues = {};
    for (const prop in data) {
      if (data[prop]) {
        res[prop] = data[prop];
      }
    }
    return res;
  };

  const onSubmit = handleSubmit((data) => {
    if (isEmptyForm(data)) {
      dispatch(userSlice.actions.setEditFormError('At least one field must be not empty.'));
      return;
    }
    const clearData = getObjectWithoutEmptyFields(data);
    dispatch(updateUser(clearData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        showPopup();
        reset();
      }
    });
  });

  const [style, setStyle] = useState<React.CSSProperties>({ opacity: '0' });
  const showPopup = () => {
    setStyle((prevState) => ({ ...prevState, opacity: '100%' }));
    setTimeout(() => {
      setStyle((prevState) => ({ ...prevState, opacity: '0' }));
    }, 1500);
  };

  const error = errorMessage.length ? <span className={classes['form__error-message']}>{errorMessage}</span> : null;

  return (
    <form method="post" onSubmit={onSubmit} className={classes.form}>
      <h1 className={classes.form__title}>Edit Profile</h1>
      <label className={classes.form__label}>
        Username
        <input
          type="text"
          placeholder="Username"
          className={`${classes.input} ${errors.username && classes['input--not-valid']}`}
          {...register('username')}
        />
      </label>
      {errors.username && <p className={classes['form__validation-message']}>{errors?.username?.message}</p>}
      <label className={classes.form__label}>
        Email address
        <input
          type="email"
          placeholder="Email address"
          className={`${classes.input} ${errors.email && classes['input--not-valid']}`}
          {...register('email')}
        />
        {errors.email && <p className={classes['form__validation-message']}>{errors?.email?.message}</p>}
      </label>
      <label className={classes.form__label}>
        New Password
        <input
          type="password"
          placeholder="New password"
          className={`${classes.input} ${errors.password && classes['input--not-valid']}`}
          {...register('password')}
        />
      </label>
      {errors.password && <p className={classes['form__validation-message']}>{errors?.password?.message}</p>}
      <label className={classes.form__label}>
        Avatar image (url)
        <input
          type="text"
          placeholder="Avatar image"
          className={`${classes.input} ${errors.image && classes['input--not-valid']}`}
          {...register('image')}
        />
      </label>
      {errors.image && <p className={classes['form__validation-message']}>{errors?.image?.message}</p>}
      <input type="submit" value="Save" className={classes.form__submit} />
      {error}
      <div style={style} className={classes.popup}>
        Submitted
      </div>
    </form>
  );
};

export default EditProfile;
