import ArticleList from '../article-list/article-list.tsx';

import classes from './main.module.scss';

const Main = () => {
  return (
    <main className={classes.main}>
      <ArticleList />
    </main>
  );
};

export default Main;
