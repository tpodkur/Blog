import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { Button } from 'antd';
import { useState } from 'react';

import classes from '../form.module.scss';
import { useAppDispath } from '../../../redux.ts';
import { createArticle, updateArticle } from '../../articles/articles-thunks.ts';

type FormValues = {
  title: string;
  description: string;
  text: string;
  tags: {
    value: string;
  }[];
};

type ArticleFormProps = {
  formName: string;
  id: string;
  title?: string;
  description?: string;
  text?: string;
  tags?: string[];
  doReset: boolean;
  formType: 'create' | 'update';
};

const CreateArticleSchema: ZodType<FormValues> = z.object({
  title: z.string().min(1, { message: 'This is required.' }),
  description: z.string().min(1, { message: 'This is required.' }),
  text: z.string().min(1, { message: 'This is required.' }),
  tags: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

const ArticleForm = ({ formName, id, title, description, text, tags, doReset, formType }: ArticleFormProps) => {
  const dispatch = useAppDispath();
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
      title: title,
      description: description,
      text: text,
      tags: tags?.length ? tags.map((tag) => ({ value: tag })) : [{ value: '' }, { value: '' }],
    },
  });
  const { fields, remove, append } = useFieldArray({
    name: 'tags',
    control,
  });
  const actionThunkToDispatchBySubmit = formType === 'create' ? createArticle : updateArticle;

  const onDeleteTag = (fieldIndex: number) => {
    remove(fieldIndex);
  };

  const onAppendTag = () => {
    append({ value: '' });
  };

  const onSubmit = handleSubmit((data) => {
    const { title, description, text, tags } = data;
    dispatch(
      actionThunkToDispatchBySubmit({
        id,
        title,
        description,
        text,
        tags: tags.filter((tagField) => !!tagField.value.length).map((tagField) => tagField.value),
      })
    ).then(() => {
      showPopup();
      if (doReset) {
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

  const tagsList = fields.map((field, index) => {
    return (
      <div key={field.id} className={classes.tag}>
        <input
          type="text"
          placeholder="Tag"
          className={`${classes.input} ${classes.tag__input}`}
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
      <h1 className={classes.form__title}>{formName}</h1>
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
      </label>
      <input type="submit" value="Send" className={`${classes.form__submit} ${classes['form__submit--size_S']}`} />
      <div style={style} className={classes.popup}>
        Submitted
      </div>
    </form>
  );
};

export default ArticleForm;
