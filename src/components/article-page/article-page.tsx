import { useAppSelector } from '../../redux/store.ts';
import { articlesSlice } from '../../redux/articles.slice.ts';
import Article from '../article/article.tsx';

import classes from './article-page.module.scss';

const ArticlePage = ({ id }: { id: string }) => {
  const article = useAppSelector((state) => articlesSlice.selectors.articleById(state, id));

  return (
    <div className={classes['article-page']}>
      <Article {...article} />
    </div>
  );
};

export default ArticlePage;
