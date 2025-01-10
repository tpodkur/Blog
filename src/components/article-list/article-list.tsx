import Pagination from '../pagination/pagination.tsx';
import Article from '../article/article.tsx';

import classes from './article-list.module.scss';

const ArticleList = () => {
  return (
    <>
      <ul className={classes['article-list']}>
        <li className={classes.article}>
          <Article />
        </li>
        <li className={classes.article}>
          <Article />
        </li>
        <li className={classes.article}>
          <Article />
        </li>
      </ul>
      <div className={classes['article-list__pagination']}>
        <Pagination page={1} onPageChange={console.log} totalItemsCount={100} />
      </div>
    </>
  );
};

export default ArticleList;
