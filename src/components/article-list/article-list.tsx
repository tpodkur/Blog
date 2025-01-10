import Pagination from '../pagination/pagination.tsx';
import Article from '../article/article.tsx';
import { Article as ArticleType, articlesSlice } from '../../redux/articles.slice.ts';
import { useAppSelector } from '../../redux/store.ts';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const articles: ArticleType[] = useAppSelector((state) => articlesSlice.selectors.articles(state));

  return (
    <>
      <ul className={classes['article-list']}>
        {articles.map((article) => (
          <li className={classes.article} key={article.id}>
            <Article {...article} />
          </li>
        ))}
      </ul>
      <div className={classes['article-list__pagination']}>
        <Pagination page={1} onPageChange={console.log} totalItemsCount={100} />
      </div>
    </>
  );
};

export default ArticleList;
