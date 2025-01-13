import Pagination from '../pagination/pagination.tsx';
import Article from '../article/article.tsx';
import { Article as ArticleType, articlesSlice } from '../../redux/articles.slice.ts';
import { useAppDispath, useAppSelector } from '../../redux/store.ts';
import { requestArticles } from '../../shared/request-articles.ts';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const dispatch = useAppDispath();
  const articles: ArticleType[] = useAppSelector((state) => articlesSlice.selectors.articles(state));
  const page = useAppSelector((state) => articlesSlice.selectors.page(state));
  const articlesCount = useAppSelector((state) => articlesSlice.selectors.count(state));

  const onPageChange = (page: number) => {
    dispatch(articlesSlice.actions.changePage({ page }));
    dispatch(requestArticles(page));
    scroll(0, 0);
  };

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
        <Pagination page={page} onPageChange={onPageChange} totalItemsCount={articlesCount} />
      </div>
    </>
  );
};

export default ArticleList;
