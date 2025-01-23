import classes from './page-not-found.module.scss';

const PageNotFound = () => {
  return (
    <div className={classes['page-not-found']}>
      <h1>404</h1>
      <p>Sorry! Page not found</p>
    </div>
  );
};

export default PageNotFound;
