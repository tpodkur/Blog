import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

import classes from '../form.module.scss';

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
    .max(20, { message: 'Your username needs to be 20 characters maximum.' }),
  email: z.string().min(1, { message: 'This is required.' }).email({ message: 'Must be a valid email.' }),
  password: z
    .string()
    .min(6, { message: 'Your password needs to be at least 6 characters.' })
    .max(40, { message: 'Your password needs to be 40 characters maximum.' }),
  avatar: z.string().url(),
});

const EditProfile = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(EditProfileSchema), mode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

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
    </form>
  );
};

export default EditProfile;
