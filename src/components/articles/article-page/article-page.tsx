import { useParams } from 'react-router-dom';

import { ArticleId, articlesSlice } from '../articles.slice.ts';
import { useAppSelector } from '../../../store.ts';
import Article from '../article/article.tsx';
import Spinner from '../../spinner/spinner.tsx';

import classes from './article-page.module.scss';

const ArticlePage = () => {
  const { articleId = '' } = useParams<{ articleId: ArticleId }>();
  const isPending = useAppSelector((state) => articlesSlice.selectors.isRequestArticlePending(state));
  const article = useAppSelector((state) => articlesSlice.selectors.articleById(state, articleId));

  const spinner = (
    <div className={classes['article-page__spinner']}>
      <Spinner size="large" />
    </div>
  );

  const content = (
    <div className={classes['article-page__article']}>
      <Article article={article} smallSize={false} />
    </div>
  );

  return <div className={classes['article-page']}>{isPending || !article ? spinner : content}</div>;
};

export default ArticlePage;
