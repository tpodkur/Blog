import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../redux/store.ts';
import { ArticleId, articlesSlice } from '../../redux/articles.slice.ts';
import Article from '../article/article.tsx';

import classes from './article-page.module.scss';

const ArticlePage = () => {
  const { articleId = '' } = useParams<{ articleId: ArticleId }>();
  const article = useAppSelector((state) => articlesSlice.selectors.articleById(state, articleId));

  return (
    <div className={classes['article-page']}>
      <Article {...article} />
    </div>
  );
};

export default ArticlePage;
