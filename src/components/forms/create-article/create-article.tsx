import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';

import classes from '../form.module.scss';

const CreateArticleSchema: ZodType<FormValues> = z.object({
  title: z.string(),
  description: z.string(),
  text: z.string(),
  tags: z.array(z.string()),
  email: z.string().min(1, { message: 'This is required.' }).email({ message: 'Must be a valid email.' }),
  password: z.string().min(1, { message: 'This is required.' }),
});

const CreateArticle = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(CreateArticleSchema), mode: 'onSubmit' });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <form method="post" onSubmit={onSubmit} className={`${classes.form} ${classes['form--size_M']}`}>
      <h1 className={classes.form__title}>Create new article</h1>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Title
        <input
          type="text"
          placeholder="Title"
          className={`${classes.form__input} ${errors.title && classes['form__input--not-valid']}`}
          {...register('title')}
        />
        {errors.title && <p className={classes['form__validation-message']}>{errors?.title?.message}</p>}
      </label>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Short description
        <input
          type="text"
          placeholder="Short description"
          className={`${classes.form__input} ${errors.description && classes['form__input--not-valid']}`}
          {...register('description')}
        />
        {errors.description && <p className={classes['form__validation-message']}>{errors?.description?.message}</p>}
      </label>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Text
        <textarea
          className={`${classes.form__input} ${classes['form__input--textarea']} ${errors.text && classes['form__input--not-valid']}`}
          placeholder="Text"
          {...register('text')}
        ></textarea>
        {errors.text && <p className={classes['form__validation-message']}>{errors?.text?.message}</p>}
      </label>
      <input type="submit" value="Send" className={`${classes.form__submit} ${classes['form__submit--size_S']}`} />
    </form>
  );
};

export default CreateArticle;
