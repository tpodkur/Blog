import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispath, useAppSelector } from '../../redux/store.ts';
import { ArticleId, articlesSlice } from '../../redux/articles.slice.ts';
import Article from '../article/article.tsx';
import { requestArticle } from '../../shared/request-article.ts';
import Spinner from '../spinner/spinner.tsx';

import classes from './article-page.module.scss';

const ArticlePage = () => {
  const dispatch = useAppDispath();
  const { articleId = '' } = useParams<{ articleId: ArticleId }>();
  const isPending = useAppSelector((state) => articlesSlice.selectors.isRequestArticlePending(state));
  const article = useAppSelector((state) => articlesSlice.selectors.articleById(state, articleId));

  useEffect(() => {
    dispatch(requestArticle(articleId));
  }, [dispatch, articleId]);

  const spinner = (
    <div className={classes['article-page__spinner']}>
      <Spinner size="large" />
    </div>
  );

  const content = (
    <div className={classes['article-page__article']}>
      <Article {...article} />
    </div>
  );

  return <div className={classes['article-page']}>{isPending || !article ? spinner : content}</div>;
};

export default ArticlePage;
