import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { Button } from 'antd';

import classes from '../form.module.scss';

type FormValues = {
  title: string;
  description: string;
  text: string;
  tags: {
    value: string;
  }[];
};

const CreateArticleSchema: ZodType<FormValues> = z.object({
  title: z.string(),
  description: z.string(),
  text: z.string(),
  tags: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

const CreateArticle = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(CreateArticleSchema),
    mode: 'onSubmit',
    defaultValues: {
      tags: [{ value: '' }, { value: '' }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: 'tags',
    control,
  });

  const onDeleteTag = (fieldIndex) => {
    remove(fieldIndex);
  };

  const onAppendTag = () => {
    append({ value: '' });
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  const tagsList = fields.map((field, index) => {
    return (
      <div key={field.id} className={classes.tag}>
        <input
          type="text"
          placeholder="Tag"
          className={`${classes.input} ${classes.tag__input} ${errors.tag && classes['input--not-valid']}`}
          {...register(`tags.${index}.value`)}
        />
        <Button danger className={`${classes['tag-button']}`} onClick={() => onDeleteTag(index)}>
          Delete
        </Button>
      </div>
    );
  });

  return (
    <form method="post" onSubmit={onSubmit} className={`${classes.form} ${classes['form--size_M']}`}>
      <h1 className={classes.form__title}>Create new article</h1>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Title
        <input
          type="text"
          placeholder="Title"
          className={`${classes.input} ${errors.title && classes['input--not-valid']}`}
          {...register('title')}
        />
        {errors.title && <p className={classes['form__validation-message']}>{errors?.title?.message}</p>}
      </label>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Short description
        <input
          type="text"
          placeholder="Short description"
          className={`${classes.input} ${errors.description && classes['input--not-valid']}`}
          {...register('description')}
        />
        {errors.description && <p className={classes['form__validation-message']}>{errors?.description?.message}</p>}
      </label>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Text
        <textarea
          className={`${classes.input} ${classes['input--textarea']} ${errors.text && classes['input--not-valid']}`}
          placeholder="Text"
          {...register('text')}
        ></textarea>
        {errors.text && <p className={classes['form__validation-message']}>{errors?.text?.message}</p>}
      </label>
      <label className={`${classes.form__label} ${classes['form__label--size_M']}`}>
        Tags
        <div className={classes['tags-list']}>
          <div className={classes['tags-list__inputs']}>{tagsList}</div>
          <Button
            color="primary"
            variant="outlined"
            className={`${classes['tags-list__add']} ${classes['tag-button']}`}
            onClick={onAppendTag}
          >
            Add tag
          </Button>
        </div>
        {errors.tag && <p className={classes['form__validation-message']}>{errors?.tag?.message}</p>}
      </label>
      <input type="submit" value="Send" className={`${classes.form__submit} ${classes['form__submit--size_S']}`} />
    </form>
  );
};

export default CreateArticle;
