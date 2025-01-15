import { Link } from 'react-router-dom';

import Pagination from '../pagination/pagination.tsx';
import Article from '../article/article.tsx';
import Spinner from '../spinner/spinner.tsx';
import { Article as ArticleType, articlesSlice } from '../../redux/articles.slice.ts';
import { useAppDispath, useAppSelector } from '../../redux/store.ts';
import { requestArticles } from '../../shared/article-thunks.ts';

import classes from './article-list.module.scss';

const ArticleList = () => {
  const dispatch = useAppDispath();
  const articles: ArticleType[] = useAppSelector((state) => articlesSlice.selectors.articles(state));
  const page = useAppSelector((state) => articlesSlice.selectors.page(state));
  const articlesCount = useAppSelector((state) => articlesSlice.selectors.count(state));

  const isRequestPending = useAppSelector((state) => articlesSlice.selectors.isRequestArticlesPending(state));
  const isRequestFailed = useAppSelector((state) => articlesSlice.selectors.isRequestArticlesFailed(state));
  const isRequestSuccess = useAppSelector((state) => articlesSlice.selectors.isRequestArticlesSuccess(state));

  const onPageChange = (page: number) => {
    dispatch(articlesSlice.actions.changePage({ page }));
    dispatch(requestArticles(page));
    scroll(0, 0);
  };

  const spinner = (
    <div className={classes['list-wrapper__spinner']}>
      <Spinner size="large" />
    </div>
  );

  const content = (
    <>
      <ul className={classes['article-list']}>
        {articles.map((article) => {
          return (
            <li className={classes.article} key={article.id}>
              <Link to={`/articles/${article.id}`} className={classes.link}>
                <Article {...article} />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={classes['article-list__pagination']}>
        <Pagination page={page} onPageChange={onPageChange} totalItemsCount={articlesCount} />
      </div>
    </>
  );

  const errorMessage = (
    <p className={classes['list-wrapper__message']}>
      Что-то пошло не так :( <br /> Попробуйте перезагрузить страницу
    </p>
  );

  return (
    <div className={classes['list-wrapper']}>
      {isRequestPending && spinner}
      {isRequestFailed && errorMessage}
      {isRequestSuccess && content}
    </div>
  );
};

export default ArticleList;
