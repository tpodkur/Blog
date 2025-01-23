import { useParams } from 'react-router-dom';

import { ArticleId, articlesSlice } from '../articles.slice.ts';
import { useAppSelector } from '../../../redux.ts';
import ArticleForm from '../../forms/article-form/article-form.tsx';
import Spinner from '../../spinner/spinner.tsx';
import { updateArticle } from '../articles-thunks.ts';

import classes from './edit-article.module.scss';

const EditArticle = () => {
  const { articleId = '' } = useParams<{ articleId: ArticleId }>();
  const isPending = useAppSelector((state) => articlesSlice.selectors.isRequestArticlePending(state));
  const article = useAppSelector((state) => articlesSlice.selectors.articleById(state, articleId));

  const spinner = (
    <div className={classes.spinner}>
      <Spinner size="large" />
    </div>
  );

  const content = <ArticleForm {...article} formName={'Edit article'} actionThunkToDispatchBySubmit={updateArticle} />;

  return <div className={classes['edit-article']}>{isPending || !article ? spinner : content}</div>;
};

export default EditArticle;
